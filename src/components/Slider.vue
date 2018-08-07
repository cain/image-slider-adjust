<template>
    <div class="slider">
        <p class="slider-title" :style="{color: colour}">
            {{ title }}
        </p>
        <vue-slider
        tooltip="false"
        ref="slider"
        :min="min"
        :max="max"
        :interval="interval"
        v-model="sliderValue"
        :slider-style="sliderStyle"
        :bg-style="{ background: `rgba(${colour}, 0.6)` }"
        :process-style="{ background: colour }"
        ></vue-slider>
        <small>
            {{ info }}
        </small>
    </div>
</template>

<script>
import vueSlider from 'vue-slider-component'

export default {
    props: {
        title: {
            type: String
        },
        colour: {
            type: String
        },
        min: {
            type: Number,
            required: true,
            default: 0
        },
        max: {
            type: Number,
            required: true,
            default: 100
        },
        interval: {
            type: Number,
            required: true,
            default: 1
        },
        info: {
            type: String,
        }
    },
    components: {
        vueSlider
    },
    data () {
        return {
            sliderValue: 0
        }
    },
    watch: {
        sliderValue: function() {
            this.$emit('change', this.sliderValue)
        }
    },
    computed: {
        sliderStyle: function() {
            return { 'box-shadow': 'none', background: this.colour, border: '2px solid #fff', 'box-sizing': 'border-box' }
        }
    },
    methods: {
        setValue: function(value) {
            this.sliderValue = value;
        }
    }
}
</script>

<style lang="scss" scoped>
    .slider {
        background: #FFFFFF;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: $border-radius;
        padding: $m-spacing * 2;
        margin: $m-spacing * 2 0px;
        color: $c-text-main;
        &-title {
            font-weight: 700;
            margin: 0px;
        }
    }
</style>

