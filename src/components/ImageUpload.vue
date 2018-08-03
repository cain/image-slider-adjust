<template>
    <div>
        <form class="image-input__form" ref="form">
            <input @change="previewThumbnail" class="image-input__input" ref="fileInput" type="file" />
        </form>
        <!-- Used in place of an image tag -->
        <canvas class="image-input"
        ref="canvas"
        >
        </canvas>
    </div>
</template>

<script>
export default {
    data() {
        return {
            width: 0,
            height: 0,
        }
    },
    mounted() {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.img = document.createElement("img");


        HTMLCanvasElement.prototype.contrast = function (value) {
            var
            canvas = this,
            context = canvas.getContext('2d'),
            imageData = context.getImageData(0, 0, canvas.width, canvas.height),
            canvasPixelArray = imageData.data,
            canvasPixelArrayLength = canvasPixelArray.length,
            i = 0;

            value = (parseFloat(value) || 0) + 1;

            for (; i < canvasPixelArrayLength; i += 4) {
                canvasPixelArray[i] = ((((canvasPixelArray[i] / 255) - 0.5) * value) + 0.5) * 255;
                canvasPixelArray[i + 1] = ((((canvasPixelArray[i + 1] / 255) - 0.5) * value) + 0.5) * 255;
                canvasPixelArray[i + 2] = ((((canvasPixelArray[i + 2] / 255) - 0.5) * value) + 0.5) * 255;
            }

            context.putImageData(imageData, 0, 0);

            return canvas;
        };
    },
    methods: {
        previewThumbnail: function (event) {
        var input = event.target;

        if (input.files && input.files[0]) 
            {
                var reader = new FileReader();
                // Set as source
                reader.onload = (e) => {
                    this.img.src = e.target.result;
                }

                reader.readAsDataURL(input.files[0]);

                this.img.onload = () => {

                    function drawImageScaled(img, ctx) {
                        var canvas = ctx.canvas ;
                        ctx.clearRect(0,0,canvas.width, canvas.height);
                        ctx.canvas.width = img.width;
                        ctx.canvas.height = img.height;
                        ctx.drawImage(img, 0,0, img.width, img.height);
                        // const editedImg = contrastImage(ctx.getImageData(0,0,ctx.canvas.width, ctx.canvas.height), 20);
                        // ctx.putImageData(editedImg, 0, 0);
                    }

                    drawImageScaled(this.img, this.ctx);
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.image-input {
    width: 100%;
}
</style>
