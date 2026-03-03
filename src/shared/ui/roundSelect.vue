<template>
  <button class="d-round-tree_button" v-if="!active" @click.prevent="showOptions()">
    <div class="d-round-tree_button-cont">
      <div class="d-round-tree_button-text">{{ placeholder }}</div>
      <div
        class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
      ></div>
      <i
        class="d-round-tree_button-icon d-icon d-icon-angle-rounded-bottom"
        :class="{ 'd-round-tree_button-icon--active': activeList }"
      ></i>
    </div>
  </button>
  <div
    class="d-round-tree_select"
    v-if="!active && activeList"
    :id="name"
    @mouseleave="((active = false), (activeList = false))"
  >
    <div class="d-round-tree_select-item" v-for="(item, index) in options" :key="index">
      <lable
        :for="index + '_option'"
        class="d-round-tree_select-label"
        @click.prevent="
          ((activeName = item.label), (active = true), (activeList = false), this.$emit('select'))
        "
      >
        <input type="checkbox" :id="index + '_option'" class="d-round-tree_select-checkbox" />
        <img :src="item.image" class="d-round-tree_select-img" v-if="item.image" />
        {{ item.label }}</lable
      >
    </div>
  </div>
  <div class="d-round-tree_cancel" v-if="active">
    <div class="d-round-tree_button-text">{{ placeholder }}: {{ activeName }}</div>
    <div
      class="d-divider d-divider--vertical d-divider--big vendor-change__selected-item-data-divider"
    ></div>
    <i
      class="d-round-tree_button-icon d-icon d-icon-times"
      @click.prevent="(((active = false), (activeName = '')), this.$emit('deselect'))"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'roundSelect',
  props: {
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Фильтр',
    },
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      activeList: false,
      active: false,
      activeName: '',
    }
  },
  emits: ['select', 'deselect'],
  methods: {
    showOptions() {
      this.activeList = !this.activeList
      setTimeout(() => {
        this.renderList()
      }, 10)
    },
    renderList() {
      if (this.activeList === true) {
        let opt = document.getElementById(this.name)
        let sh = document.querySelector('.shipments').clientWidth
        let m = opt.getBoundingClientRect()
        let min = sh - m.left

        if (min < 314) {
          opt.style.right = '0'
          opt.style.opacity = '1'
        } else {
          opt.style.left = '0'
          opt.style.opacity = '1'
        }
      }
    },
    clickAround() {},
  },
  mounted() {},
  watch: {},
}
</script>

<style lang="scss">
.d-round-tree_button {
  width: auto;
  height: 40px;
  background: #ededed;
  border-radius: 53px;
  padding: 8px 16px;
  transition: 0.2s;
}
.d-round-tree_button-cont {
  display: flex;
  gap: 0px;
  align-items: center;
}
.d-round-tree_button-text {
  font-family: 'Geist';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #282828;
}
.d-round-tree_button-cont .d-divider--vertical {
  margin-block: 0;
  margin-inline: 8px;
  width: 1px;
  height: 11px;
  opacity: 1;
}
.d-round-tree_button-icon {
  width: 24px;
  height: auto;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;
  transition: 0.2s;
  margin-top: -2px;
}
.d-round-tree_button-icon--active {
  transform: rotate(-180deg);
  color: #f92c0d;
  margin-top: 3px;
}
.d-round-tree_select {
  position: absolute;
  z-index: 100;
  width: auto;
  min-width: 314px;
  height: auto;
  top: 48px;
  opacity: 0;
  //left: 0;
  background: #ffffff;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  border-radius: 9px;
  padding: 8px;
  transition: 0.2s;
}
.d-round-tree_select-item {
  height: 32px;
  padding: 7px 8px;
}
.d-round-tree_select-checkbox {
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  border: 0.5px solid #757575;
  border-radius: 3px;
}
.d-round-tree_select-label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #757575;
  height: 18px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
}
.d-round-tree_select-img {
  width: 16px;
  height: 16px;
  border-radius: 30px;
}
.d-round-tree_cancel {
  width: max-content;
  height: 40px;
  background: #282828;
  border-radius: 53px;
  padding: 8px 16px;
  transition: 0.2s;
  display: flex;
  gap: 0;
  align-items: center;
  transition: 0.2s;
}
.d-round-tree_cancel .d-round-tree_button-text,
.d-round-tree_cancel .d-round-tree_button-icon {
  color: #fff;
}
.d-round-tree_cancel .d-round-tree_button-icon,
.d-round-tree_select-checkbox {
  cursor: pointer;
}
</style>
