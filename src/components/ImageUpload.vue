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
import { editCanvas, drawImageScaled } from '../utils'
export default {
    props: {
        contrast: {
            type: Number,
            required: true,
        },
        brightness: {
            type: Number,
            required: true,
        }
    },
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
                    drawImageScaled(this.img, this.ctx);
                    this.imageSelected = true;
                    this.$emit('imageSelected', this.imageSelected);
                    if(this.contrast + this.brightness !== 0) {
                        this.editImage();
                    }
                }
            }
        },
        editImage: function () {
            this.ctx.putImageData(editCanvas(this.ctx, this.img, this.contrast, this.brightness), 0, 0);
        }
    },
    watch: {
        contrast: function() {
            this.editImage()
        },
        brightness: function() {
            this.editImage();
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
