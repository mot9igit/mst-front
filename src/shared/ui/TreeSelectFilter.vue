<template>
  <TreeSelect
    v-bind="$attrs"
    :model-value="modelValue"
    @update:modelValue="handleUpdate"
    @select="handleSelect"
    @deselect="handleDeselect"
  />
</template>

<script>
import TreeSelect from '@zanmato/vue3-treeselect'
import '@zanmato/vue3-treeselect/dist/vue3-treeselect.min.css'

export default {
  name: 'TreeSelectFilter',
  inheritAttrs: false,
  components: {
    TreeSelect,
  },
  props: {
    modelValue: {},
  },
  emits: ['update:modelValue', 'select', 'deselect', 'clear'],
  data() {
    return {
      userAction: false,
    }
  },
  methods: {
    isEmpty(value) {
      if (value === null || value === undefined) return true
      if (Array.isArray(value)) return value.length === 0
      return value === ''
    },
    handleSelect(node, instanceId) {
      this.userAction = true
      this.$emit('select', node, instanceId)
    },
    handleDeselect(node, instanceId) {
      this.userAction = true
      this.$emit('deselect', node, instanceId)
    },
    handleUpdate(value) {
      const hadValue = !this.isEmpty(this.modelValue)
      this.$emit('update:modelValue', value)
      this.$nextTick(() => {
        if (!this.userAction && hadValue && this.isEmpty(value)) {
          this.$emit('deselect', null, null)
          this.$emit('clear', value)
        }
        this.userAction = false
      })
    },
  },
}
</script>