<template>
    <div class="image-container">
        <Slider title="Brightness" colour="#25A95B" />
        <Slider title="Contrast" colour="#4A90E2" />
        <Image-Upload />
    </div>
</template>

<script>
import Slider from './Slider.vue';
import ImageUpload from './ImageUpload.vue';
export default {
    components: {
        Slider,
        ImageUpload
    }
}
</script>

<style lang="scss" scoped>
.image-container {
    padding: $m-spacing * 2;
}
</style>
