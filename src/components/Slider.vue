<template>
    <div class="slider">
        <p class="slider-title" :style="{color: colour}">{{title}}</p>
        <vue-slider
        tooltip="false"
        :value.sync="sliderValue"
        :slider-style="{ 'box-shadow': 'none', background: colour, border: '2px solid #fff', 'box-sizing': 'border-box' }"
        :bg-style="{ background: `rgba(${colour}, 0.6)` }"
        :process-style="{ background: colour }"
        ></vue-slider>
    </div>
</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
    props: ['title', 'colour'],
    components: {
        vueSlider
    },
    data () {
        return {
            sliderValue: 50
        }
  },
}
</script>

<style lang="scss" scoped>
    .slider {
        background: #FFFFFF;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        padding: $m-spacing * 2;;
        margin-top: $m-spacing * 2;
        &-title {
            font-weight: 700;
            margin: 0px;
        }
    }
</style>

