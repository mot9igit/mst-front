<template>
 <router-link
        :to="{ name: cell_data.link_to, params: linkParams, props: cell_data.link_props }"
      >
  <div class="d-table-min__col-id" v-if="cell_data.type == 'id'" :class="cell_data.class">{{ value[cell_key] }}</div>
  <div class="d-table-min__col-status" v-else-if="cell_data.type == 'status'" :class="cell_data.class">{{ value[cell_key] }}</div>
  <div class="d-table-min__col-simple" v-else>

    <div class="cell_value-label">{{ cell_data.label }}</div>
    <div
      class="cell_value"
      v-if="cell_data.items"
      :class="cell_key == 'name' ? 'name ' + cell_data.class : cell_data.class"
    >
        <div v-for="item in cell_data.items" :key="item" class="multyitem_cell">
          <span v-if="value[item] && item.includes('inn')"
            >ИНН: {{ value[item] ? value[item] : '-' }}</span
          >
          <span v-if="value[item] && !item.includes('inn')" class="cell_value-inn">{{
            value[item]
          }}</span>
        </div>
    </div>
  </div>
</router-link>


</template>

<script>

export default {
  name: 'tableCell',
  emits: [

  ],
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    cell_data: {
      type: Object,
      default: () => {
        return {}
      },
    },
    cell_key: {
      type: String,
      default: null,
    },
    value: {
      type: Object,
      default: () => {
        return {}
      },
    },
    link_params: {
      type: Object,
      default: () => {
        return {}
      },
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      blank: {},
      numbers: {},
      chart_options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display: false,
          },
          title: {
            display: false,
            text: 'График',
          },
        },
      },
    }
  },
  computed: {
    isChecked: {
      get() {
        return this.selectedItems.includes(this.value.id)
      },
      set(value) {
        console.log(value)
        // Пустой сеттер, так как изменения обрабатываются в toggleSelection
      },
    },
    linkParams() {
      const linkparams = {}
      if (this.cell_data.type === 'link') {
        for (const key in this.cell_data.link_params) {
          if (
            this.cell_data.link_params[key] !== 'id' &&
            this.cell_data.link_params[key] !== 'store_id' &&
            this.cell_data.link_params[key] !== 'vendor_id' &&
            this.cell_data.link_params[key] !== 'pagetitle'
          ) {
            linkparams[key] = this.cell_data.link_params[key]
          } else {
            linkparams[key] = this.value[this.cell_data.link_params[key]]
          }
        }
      }
      return linkparams
    },
  },
  methods: {
    toggleSelection(id) {
      console.log(id)
      if (this.selectedItems.includes(id)) {
        // console.log('da')
        // console.log(this.selectedItems.filter(item => item !== id))
        this.$emit(
          'checkElem',
          this.selectedItems.filter((item) => item !== id),
        )
        // this.selectedItems = this.selectedItems.filter(item => item !== id);
      } else {
        // console.log('net')
        // this.selectedItems.push(id)
      }
      // const newSelectedItems = [...this.selectedItems]
      // const itemId = this.value.id
      // const index = newSelectedItems.indexOf(itemId)

      // if (index === -1) {
      //   // Добавляем элемент
      //   newSelectedItems.push(itemId)
      // } else {
      //   // Удаляем элемент
      //   newSelectedItems.splice(index, 1)
      // }

      // // Эмитим событие для обновления selectedItems в родительском компоненте
      // this.$emit('update:selectedItems', newSelectedItems)
    },
    actionElem(action) {
      if (action === 'delete') {
        this.$emit('deleteElem', this.value)
      }
      if (action === 'update') {
        this.$emit('updateElem', this.value)
      }
      if (action === 'edit') {
        this.$emit('editElem', this.value)
      }
      if (action === 'click') {
        this.$emit('clickElem', this.value)
      }
      if (action === 'approve') {
        this.$emit('approveElem', this.value)
      }
      if (action === 'disapprove') {
        this.$emit('disapproveElem', this.value)
      }
      if (action === 'view') {
        this.$emit('viewElem', this.value)
      }
    },
    editValue(number, name) {
      this.$emit('editNumber', { value: number, id: this.value.id, name: name })
    },
    actionCell(id) {
      this.$emit('actionCell', id)
    },
    prepareHtml(code){
      if(code){
        let new_string = code.replace(/<(.|\n)*?>/g, '')
        new_string = new_string.replace(/\&nbsp;/g, ' ')
        new_string = new_string.replace(/\n/g, '')
        if(new_string.length > 120){
          new_string = new_string.substring(0,120)+"..."
        }
        this.$emit('rowClass', true)
        return new_string
      }else{
        return ''
      }

    },
  },
  components: {

  },
  mounted() {
    this.blank = this.cell_data
    if (this.blank.type === 'actions') {
      for (const key in this.blank.available) {
        if (
          Object.prototype.hasOwnProperty.call(this.blank.available[key], 'link') &&
          Object.prototype.hasOwnProperty.call(this.blank.available[key], 'link_values')
        ) {
          if (this.blank.available[key].link && this.blank.available[key].link_values) {
            const link = this.blank.available[key].link
            const values = this.blank.available[key].link_values
            if (!values.includes(Number(this.value[link]))) {
              delete this.blank.available[key]
            }
          }
        }
      }
    }
    if (this.cell_data.type === 'number') {
      this.numbers[this.cell_key] = this.value[this.cell_key]
    }
  },
  unmounted() {
    this.numbers[this.cell_key] = this.value[this.cell_key]
  },
}
</script>

<style lang="scss">
.d-table-min__head{
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
}
.d-table-min__row-sort-label{
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 13px;
  text-align: right;
  color: #282828;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.d-table-min__row-sort-label i{
  font-size: 9px;
  padding-bottom: 2px;
}
.d-table-min__row-sort-list{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px;
  position: absolute;
  width: 148px;
  height: 66px;
  right: 0px;
  top: 18px;
  background: #FBFBFB;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
}
</style>
