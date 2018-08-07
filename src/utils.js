
export function editCanvas(ctx, img, contrast, brightness) {
  const canvas = ctx.canvas;
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawImageScaled(img, ctx);
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  return contrastCanvas(contrast, brightnessCanvas(brightness, imageData))
}

/**
 * @author KonvaJS https://github.com/konvajs/konva
 * https://github.com/konvajs/konva/blob/master/src/filters/Contrast.js#L14
 */

function contrastCanvas(contrast, imageData) {
  const adjust = Math.pow(parseInt(contrast + 100) / 100, 2);
  let data = imageData.data,
  nPixels = data.length,
  red = 150,
  green = 150,
  blue = 150,
  i;

  for (i = 0; i < nPixels; i += 4) {
      red = data[i];
      green = data[i + 1];
      blue = data[i + 2];

      //Red channel
      red /= 255;
      red -= 0.5;
      red *= adjust;
      red += 0.5;
      red *= 255;

      //Green channel
      green /= 255;
      green -= 0.5;
      green *= adjust;
      green += 0.5;
      green *= 255;

      //Blue channel
      blue /= 255;
      blue -= 0.5;
      blue *= adjust;
      blue += 0.5;
      blue *= 255;

      red = red < 0 ? 0 : red > 255 ? 255 : red;
      green = green < 0 ? 0 : green > 255 ? 255 : green;
      blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;

      data[i] = red;
      data[i + 1] = green;
      data[i + 2] = blue;
  }
  return imageData;
}

export function drawImageScaled(img, ctx) {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.drawImage(img, 0,0, img.width, img.height);
}

/**
 * @author Jonathan Neal <jonathantneal@hotmail.com>
 * https://github.com/jonathantneal
 * https://gist.github.com/jonathantneal/2053865
 */

function brightnessCanvas(value, imageData) {
  let
  canvasPixelArray = imageData.data,
	i = 0;
  
	const canvasPixelArrayLength = canvasPixelArray.length;

	const trueVal = parseFloat(value) || 0;

	for (; i < canvasPixelArrayLength; i += 4) {
		canvasPixelArray[i] += trueVal;
		canvasPixelArray[i + 1] += trueVal;
		canvasPixelArray[i + 2] += trueVal;
	}

	return imageData;
}