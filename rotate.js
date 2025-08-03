const frameCount = 36;
const imgElement = document.getElementById('rotatingImage');
let currentFrame = 1;
let isDragging = false;
let lastX = 0;
let velocity = 0;
let animationId = null;

function wrapFrame(frame) {
  // ensure frame always stays between 1 and frameCount
  frame = ((frame - 1) % frameCount + frameCount) % frameCount + 1;
  return frame;
}

function updateImage(frame) {
  frame = wrapFrame(frame);
  currentFrame = frame;
  imgElement.src = `images/frame${Math.round(currentFrame)}.jpg`;
}

function onDragStart(e) {
  isDragging = true;
  lastX = e.pageX || e.touches[0].pageX;
  velocity = 0;
  cancelAnimationFrame(animationId);
}

function onDragMove(e) {
  if (!isDragging) return;
  const x = e.pageX || e.touches[0].pageX;
  const deltaX = x - lastX;
  lastX = x;

  currentFrame -= deltaX * 0.2; // adjust sensitivity
  updateImage(currentFrame);

  velocity = -deltaX * 0.65; // inertia strength
}

function onDragEnd() {
  isDragging = false;
  applyInertia();
}

function applyInertia() {
  if (Math.abs(velocity) > 0.05) {
    currentFrame += velocity * 0.1; // scale velocity down for smoothness
    updateImage(currentFrame);
    velocity *= 0.65; // your low-friction value is fine here, because wrapFrame prevents errors
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


