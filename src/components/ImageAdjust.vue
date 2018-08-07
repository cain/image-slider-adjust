<template>
    <div class="image-container">
        <Slider v-if="imageSelected"
            title="Brightness"
            colour="#25A95B"
            v-on:change="brightnessChange"
            :min="-40"
            :max="40"
            :interval="1"
            info="Slide to adjust image brightness! ☀️"
        />
        <Slider v-if="imageSelected"
            title="Contrast"
            colour="#4A90E2"
            v-on:change="contrastChange"
            :min="-40"
            :max="40"
            :interval="1"
            info="Slide to adjust image contrast! 🌓"
        />
        <Image-Upload
            v-on:imageSelected="onImageSelect"
            :brightness="brightness"
            :contrast="contrast"
        />
    </div>
</template>

<script>
import Slider from './Slider.vue';
import ImageUpload from './ImageUpload.vue';
export default {
    components: {
        Slider,
        ImageUpload
    },
    data() {
        return {
            brightness: 0,
            contrast: 0,
            imageSelected: false
        }
    },
    methods: {
        brightnessChange: function(v) { this.brightness = v },
        contrastChange: function(v) { this.contrast = v },
        onImageSelect: function(v) { 
            this.imageSelected = v
        }
    },
}
</script>

<style lang="scss" scoped>
.image-container {
    padding: $m-spacing * 2;
}
</style>
