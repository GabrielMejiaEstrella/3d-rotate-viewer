const frameCount = 8; // number of images
const imgElement = document.getElementById('rotatingImage');
let currentFrame = 1;
let isDragging = false;
let startX = 0;

function updateImage(frame) {
  imgElement.src = `images/frame${frame}.jpg`;
}

function onDragStart(e) {
  isDragging = true;
  startX = e.pageX || e.touches[0].pageX;
  e.preventDefault();
}

function onDragMove(e) {
  if (!isDragging) return;
  const x = e.pageX || e.touches[0].pageX;
  const deltaX = x - startX;
  startX = x;

  // Change frame based on drag direction
  currentFrame += deltaX > 0 ? -1 : 1;
  if (currentFrame < 1) currentFrame = frameCount;
  if (currentFrame > frameCount) currentFrame = 1;

  updateImage(currentFrame);
}

function onDragEnd() {
  isDragging = false;
}

const viewer = document.getElementById('viewer');
viewer.addEventListener('mousedown', onDragStart);
viewer.addEventListener('mousemove', onDragMove);
viewer.addEventListener('mouseup', onDragEnd);
viewer.addEventListener('mouseleave', onDragEnd);

viewer.addEventListener('touchstart', onDragStart);
viewer.addEventListener('touchmove', onDragMove);
viewer.addEventListener('touchend', onDragEnd);

