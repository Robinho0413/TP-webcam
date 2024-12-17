// Set the video capture as a global variable.
let capture;
let gridSize = 10;

function setup() {
  describe('Video capture from the device webcam.');
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('videoContainer');

  // Use the createCapture() function to access the device's
  // camera and start capturing video.
  capture = createCapture(VIDEO);

  // Make the capture frame half of the canvas.
  capture.size(width, height);

  // Use capture.hide() to remove the p5.Element object made
  // using createCapture(). The video will instead be rendered as
  // an image in draw().
  capture.hide();
}

function draw() {
  background(255);

  capture.loadPixels();
  for (let y = 0; y < capture.height; y += gridSize) {
    for (let x = 0; x < capture.width; x += gridSize) {
      let index = (y * capture.width + x) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];
      let lum = (r + g + b) / 3;
      let dia = map(lum, 0, 255, gridSize, 0);
      fill(r, g, b);
      noStroke();
      circle(x + gridSize / 2, y + gridSize / 2, dia);
    }
  }
}