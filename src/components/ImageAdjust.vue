<template>
    <div>
        <div :class="{ image: imageSelected }">
            <canvas width="0" height="0" class="image-canvas" ref="canvas"></canvas>
            <div class="image-info" v-if="imageSelected">
                <div class="image-info__name">
                    <span>Name</span> <span>{{ fileName }}</span>
                </div>
                <a @click="uploadImage" class="image-info__button">Upload</a>
            </div>
        </div>
        <form class="image-upload" ref="form">
            Click here to select an image 👋
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
        },
        uploadImage: function (e) {
            // downloading since we have no where to upload :)
            e.target.href = this.canvas.toDataURL();
            e.target.download = this.fileName;
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
        align-content: center;
        padding: $m-spacing * 2;
        color: $c-text-main;
        text-transform: uppercase;
        font-size: 12px;
        &__name {
            border: 1px solid #DCDEE4;
            border-left: none;
            padding: $m-spacing $m-spacing $m-spacing 0;
            border-radius: $border-radius;
            box-sizing: border-box;
            max-width: 100%;
            overflow: hidden;
            margin-right: $m-spacing;
            text-overflow: ellipsis;
            letter-spacing: 1.1px;
            span:first-child {
                background: #F6F8FA;
                border: 1px solid #DCDEE4;
                box-sizing: border-box;
                border-radius: 5px 0px 0px 5px;
                font-weight: bold;
                padding: $m-spacing;
                font-size: 12px;
                margin-right: $m-spacing;
            }
            span:last-child {
                color: #25A95B;
                font-weight: 600;
                font-size: 12px;
                white-space: nowrap;
            }
        }
        &__button {
            -webkit-appearance: none;
            border: none;
            color: #4A90E2;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            display: flex;
            align-items: center;
        }
    }

    &-upload {
        position: relative;
        border: 1px solid #DCDEE4;
        border-radius: $border-radius;
        padding: $m-spacing;
        margin-top: $m-spacing * 2;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
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
