const frameCount = 8; // number of images
const imgElement = document.getElementById('rotatingImage');
let currentFrame = 1;
let isDragging = false;
let startX = 0;
let velocity = 0;
let animationId = null;

function updateImage(frame) {
  imgElement.src = `images/frame${frame}.jpg`;
}

function onDragStart(e) {
  isDragging = true;
  startX = e.pageX || e.touches[0].pageX;
  velocity = 0; // reset velocity
  cancelAnimationFrame(animationId); // stop any ongoing inertia
  e.preventDefault();
}

function onDragMove(e) {
  if (!isDragging) return;
  const x = e.pageX || e.touches[0].pageX;
  const deltaX = x - startX;
  startX = x;

  // The frame change per move
  const frameChange = deltaX > 0 ? -1 : 1;
  currentFrame += frameChange;

  // Keep frame in range
  if (currentFrame < 1) currentFrame = frameCount;
  if (currentFrame > frameCount) currentFrame = 1;

  updateImage(currentFrame);

  // Store velocity based on deltaX (for inertia)
  velocity = frameChange * 2; // tweak multiplier for faster/slower spin
}

function onDragEnd() {
  isDragging = false;
  applyInertia();
}

// Inertia animation
function applyInertia() {
  if (Math.abs(velocity) < 0.05) return; // stop if speed is almost 0

  // Update frame based on velocity
  currentFrame += velocity;
  if (currentFrame < 1) currentFrame = frameCount;
  if (currentFrame > frameCount) currentFrame = 1;
  updateImage(Math.round(currentFrame));

  // Apply friction (slows down over time)
  velocity *= 0.95; // adjust 0.95 → 0.90 for faster slow-down

  animationId = requestAnimationFrame(applyInertia);
}

const viewer = document.getElementById('viewer');
viewer.addEventListener('mousedown', onDragStart);
viewer.addEventListener('mousemove', onDragMove);
viewer.addEventListener('mouseup', onDragEnd);
viewer.addEventListener('mouseleave', onDragEnd);

viewer.addEventListener('touchstart', onDragStart);
viewer.addEventListener('touchmove', onDragMove);
viewer.addEventListener('touchend', onDragEnd);
