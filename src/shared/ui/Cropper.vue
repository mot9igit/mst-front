<template>
  <VuePictureCropper
    class="dart-cropper"
    :img="p"
    :options="options"
    :presetMode="presetMode"
    @crop="ready"
    :ref="vpcRef"
  />
</template>
<script>
import VuePictureCropper from 'vue-picture-cropper'
import 'cropperjs/dist/cropper.css'
import 'vue-picture-cropper/style.css'
import { ref } from 'vue'
import { computed } from 'vue'

export default {
  name: 'CropperCut',
  components: {
    VuePictureCropper,
  },
  emits: ['cropData'],
  props: {
    pic: {
      type: String,
      default: null,
    },
    options: {
      type: Object,
      default: () => {
        return {}
      },
    },
    presetMode: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      vpcRef: ref(null),
      p: null,
    }
  },
  methods: {
    ready(data) {
      this.$emit('cropData', data)
    },
  },
  mounted() {
    this.p = this.pic
  },
  setup() {
    // Bind a ref to the component
    const vpcRef = ref(null)

    // Derive the Cropper instance from the component ref to use getFile() etc. for the crop result
    const cropper = computed(() => vpcRef.value?.cropper ?? null)

    // Return them so they can be used in the template
    return {
      vpcRef,
      cropper,
    }
  },
  computed: {},
  watch: {},
}
</script>
<style lang="scss">
.dart-cropper {
  display: flex;
  align-items: center;
  justify-content: center;

  .cropper-modal {
    border-radius: 8px;
  }
  .cropper-view-box {
    outline: 1px solid transparent;
    outline-color: transparent;
  }
  .cropper-line {
    background-color: transparent;
  }
  .cropper-point {
    background-color: #c0c0c0;
    height: 12px;
    opacity: 1;
    width: 12px;
    border-radius: 2px;
  }
  .cropper-point.point-e {
    cursor: ew-resize;
    margin-top: -6px;
    right: -6px;
    top: 50%;
    opacity: 0;
  }
  .cropper-point.point-n {
    cursor: ns-resize;
    left: 50%;
    margin-left: -6px;
    top: -6px;
    opacity: 0;
  }
  .cropper-point.point-w {
    cursor: ew-resize;
    left: -6px;
    margin-top: -6px;
    top: 50%;
    opacity: 0;
  }
  .cropper-point.point-s {
    bottom: -6px;
    cursor: s-resize;
    left: 50%;
    margin-left: -6px;
    opacity: 0;
  }
  .cropper-point.point-ne {
    cursor: nesw-resize;
    right: -6px;
    top: -6px;
  }
  .cropper-point.point-nw {
    cursor: nwse-resize;
    left: -6px;
    top: -6px;
  }
  .cropper-point.point-sw {
    bottom: -6px;
    cursor: nesw-resize;
    left: -6px;
  }
  .cropper-point.point-se {
    bottom: -6px;
    right: -6px;
  }
  .cropper-dashed {
    border: none;
  }
  .cropper-bg {
    background-image: none;
    background-color: #67676738;
  }
}
.cropper_banner {
  width: 595px;
  height: 402px;
}
.cropper_image {
  width: 480px;
  height: 480px;
}
</style>
