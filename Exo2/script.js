let capture;
let gridSize = 10;
let targetHue = 50; // Set the target hue value (0-360)

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('videoContainer');
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
  colorMode(HSB, 360, 100, 100); // Set color mode to HSB
}

function draw() {
  background(255);

  // Flip the image horizontally
  translate(width, 0);
  scale(-1, 1);

  capture.loadPixels();
  for (let y = 0; y < capture.height; y += gridSize) {
    for (let x = 0; x < capture.width; x += gridSize) {
      let index = (y * capture.width + x) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];
      let pixelColor = color(r, g, b);
      let pixelHue = hue(pixelColor);

      // Compare the pixel hue with the target hue
      if (abs(pixelHue - targetHue) < 10) { // Adjust the threshold as needed
        fill(0, 100, 100); // Highlight matching pixels
      } else {
        fill(r, g, b);
      }

      noStroke();
      let lum = (r + g + b) / 3;
      let dia = map(lum, 0, 255, gridSize, 0);
      circle(x + gridSize / 2, y + gridSize / 2, dia);
    }
  }
}