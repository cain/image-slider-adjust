<template>
    <div>
        <div :class="{ image: imageSelected }">
            <canvas width="0" height="0" class="image-canvas" ref="canvas"></canvas>
            <div class="image-info" v-if="imageSelected">
                <div>
                    <strong>Name:</strong> {{ fileName }}
                </div>
                <button class="image-info__button">Upload</button>
            </div>
        </div>
        <form class="image-upload" ref="form">
            Click here to select an image
            <input @change="previewThumbnail" class="image-upload__input" ref="fileInput" type="file" accept="image/*" />
        </form>
    </div>
</template>

<script>
export default {
    props: ['contrast', 'brightness'],
    data() {
        return {
            width: 0,
            height: 0,
            imageSelected: false,
            fileName: false
        }
    },
    mounted() {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.img = document.createElement("img");
    },
    methods: {
        drawImageScaled: function(img, ctx) {
            var canvas = ctx.canvas ;
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.canvas.width = img.width;
            ctx.canvas.height = img.height;
            ctx.drawImage(img, 0,0, img.width, img.height);
        },
        previewThumbnail: function (event) {
            const input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                // Set as source
                reader.onload = (e) => {
                    this.img.src = e.target.result;
                    this.fileName = event.target.files[0].name;
                }

                reader.readAsDataURL(input.files[0]);

                this.img.onload = () => {
                    this.drawImageScaled(this.img, this.ctx);
                    this.imageSelected = true;
                    this.$emit('imageSelected', this.imageSelected);
                }
            }
        },
    },
    watch: {
        contrast: function() {
            var canvas = this.ctx.canvas;
            this.ctx.clearRect(0,0, canvas.width, canvas.height);
            this.drawImageScaled(this.img, this.ctx);
            
            var adjust = Math.pow(parseInt(this.contrast + 100) / 100, 2);
            const imgd = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
            var data = imgd.data,
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
            this.ctx.putImageData(imgd, 0, 0);
        }
    }
}
</script>

<style lang="scss" scoped>
.image-canvas {
    max-width: 100%;
    border-radius: $border-radius $border-radius 0px 0px;
}

.image {

    border: 1px solid #DCDEE4;
    border-radius: $border-radius;
    &-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: $m-spacing * 2;
        color: $c-text-main;
        text-transform: uppercase;
        font-size: 12px;
        &__button {
            -webkit-appearance: none;
            border: none;
            color: #4A90E2;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
        }
    }

    &-upload {
        position: relative;
        border: 1px solid #DCDEE4;
        border-radius: $border-radius;
        padding: $m-spacing;
        margin-top: $m-spacing * 2;
        font-size: 12px;
        color: $c-text-main;
        font-weight: bold;
        cursor: pointer;
        &__input {
            opacity: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }
    }
}
</style>
