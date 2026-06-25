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
import { computed } from 'vue';

export default {
  name: 'Cropper',
  components: {
    VuePictureCropper,
  },
  emits: [],
  props: {
    pic: {
      type: String,
      default: null
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
      p: null
    }
  },
  methods: {
    ready(data){
      console.log(data)
    }
  },
  mounted() {
    //this.p=this.pic
    this.p = 'http://localhost:5173/public/images/small-window.png'
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
  computed: {
    
  },
  watch: {
    
  },
}
</script>
<style lang="scss">
.dart-cropper{
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.cropper_banner{
  width: 595px;
  height: 402px;
}
.cropper_image{
  width: 480px;
  height: 480px;
}
</style>
