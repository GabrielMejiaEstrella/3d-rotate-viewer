const frameCount = 36;
const imgElement = document.getElementById('rotatingImage');
let currentFrame = 1;
let isDragging = false;
let lastX = 0;
let velocity = 0;
let animationId = null;

function updateImage(frame) {
  // wrap frame number
  if (frame < 1) frame = frameCount;
  if (frame > frameCount) frame = 1;
  currentFrame = frame;
  imgElement.src = `images/frame${Math.round(currentFrame)}.jpg`;
}

function onDragStart(e) {
  isDragging = true;
  lastX = e.pageX || e.touches[0].pageX;
  velocity = 0;
  cancelAnimationFrame(animationId); // stop inertia if user grabs again
}

function onDragMove(e) {
  if (!isDragging) return;

  const x = e.pageX || e.touches[0].pageX;
  const deltaX = x - lastX;
  lastX = x;

  // Convert drag distance to frame movement
  currentFrame -= deltaX * 0.2; // 0.2 = sensitivity factor
  updateImage(currentFrame);

  // Store velocity based on last movement
  velocity = -deltaX * 0.3; // tweak multiplier for inertia strength
}

function onDragEnd() {
  isDragging = false;
  applyInertia();
}

function applyInertia() {
  // keep spinning while velocity is significant
  if (Math.abs(velocity) > 0.05) {
    currentFrame += velocity * 0.1; // convert velocity to frame speed
    updateImage(currentFrame);

    // apply friction to slow down over time
    velocity *= 0.25;

    animationId = requestAnimationFrame(applyInertia);
  }
}

const viewer = document.getElementById('viewer');
viewer.addEventListener('mousedown', onDragStart);
viewer.addEventListener('mousemove', onDragMove);
viewer.addEventListener('mouseup', onDragEnd);
viewer.addEventListener('mouseleave', onDragEnd);

viewer.addEventListener('touchstart', onDragStart);
viewer.addEventListener('touchmove', onDragMove);
viewer.addEventListener('touchend', onDragEnd);


