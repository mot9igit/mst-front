<template>
  <div class="clients__card-container"  v-for="(row, index) in table_data" :key="index" >
      <div class="clients__card">
        <div class="clients__card-left">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img :src="row.image" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">{{ row.name }}</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>{{ row.req?.fact_address}}</span>
              </div>
            </div>
          </div>

          <div class="d-divider d-divider--vertical clients__card-divider"></div>
          <div class="clients__card-data">
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">{{ row.req?.inn }}</p>
            </div>
            <div
              class="d-divider d-divider--vertical clients__card-divider clients__card-data-divider"
            ></div>
            <div class="clients__card-contact-container">
              <a href="tel:+70000000000" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>{{ row.phone }}</span>
              </a>
              <a href="mailto:andreev@tk-tehnolorg.ru" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>{{ row.email }}</span>
              </a>
            </div>
          </div>
        </div>

        <div class="clients__card-right">
          <div class="clients__card-right-left">
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-vendor" v-if="row.owner_id > 0 && row.owner_id == this.$route.params.id">Создан поставщиком</div>
            <div class="clients__card-vendor" v-else></div>
          </div>
          <div class="clients__card-right-right">
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <button class="d-button d-button-primary d-button--sm-shadow clients__card-offer">
              <i class="d-icon-plus-flat clients__card-offer-icon"></i>
              Предложение
            </button>
            <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-action-container">
              <button class="clients__card-action">
                <i class="d-icon-pen2"></i>
              </button>
              <div
                class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
              ></div>
              <button class="clients__card-action">
                <i class="d-icon-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="clients__card-top">
          <div class="clients__card-info">
            <div class="clients__card-info-image-container">
              <img src="/icons/spo-logo.svg" alt="" class="clients__card-info-image" />
            </div>
            <div class="clients__card-info-content">
              <p class="clients__card-info-title">{{ item.name }}</p>
              <div class="clients__card-info-address">
                <i class="d-icon-location clients__card-info-address-icon"></i>
                <span>{{ item.req?.fact_address}}</span>
              </div>
            </div>
          </div>

          <div class="clients__card-top-right">
            <div class="clients__card-top-right-top">
              <button class="d-button d-button-primary d-button--sm-shadow clients__card-offer">
                <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                Предложение
              </button>
              <div class="clients__card-action-container">
                <button class="clients__card-action">
                  <i class="d-icon-pen2"></i>
                </button>
                <div
                  class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                ></div>
                <button class="clients__card-action">
                  <i class="d-icon-trash"></i>
                </button>
              </div>
            </div>
            <div class="clients__card-vendor-wrapper">
              <div class="clients__card-vendor" v-if="row.owner_id > 0 && row.owner_id == this.$route.params.id">Создан поставщиком</div>
              <div class="clients__card-vendor" v-else></div>
            </div>
          </div>
        </div>

        <div class="clients__card-bottom">
          <div class="clients__card-bottom-left">
            <div class="clients__card-contact-container">
              <a href="tel:+70000000000" class="clients__card-contact">
                <i class="d-icon-telephone clients__card-contact-icon"></i>
                <span>{{ row.phone }}</span>
              </a>
              <a href="mailto:andreev@tk-tehnolorg.ru" class="clients__card-contact">
                <i class="d-icon-mail2 clients__card-contact-icon"></i>
                <span>{{ row.email }}</span>
              </a>
            </div>
            <div class="clients__card-inn">
              <p class="clients__card-inn-label">ИНН:</p>
              <p class="clients__card-inn-value">{{ row.req?.inn }}</p>
            </div>
          </div>


        </div>
      </div>
    </div>
</template>

<script>
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import Chart from 'primevue/chart'

export default {
  name: 'tableCell',
  emits: [
    'deleteElem',
    'updateElem',
    'editElem',
    'clickElem',
    'viewElem',
    'checkElem',
    'approveElem',
    'disapproveElem',
    'editNumber',
    'update:selectedItems',
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
            this.cell_data.link_params[key] !== 'vendor_id'
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
        this.selectedItems.push(id)
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
  },
  components: {
    Button,
    InputNumber,
    Checkbox,
    Chart,
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

<style lang="scss" scoped>
.kenostButton {
  padding: 8px !important;
  background: #f8f8f8 !important;
  box-shadow: 0px 1px 5px 0px #00000033;
  box-shadow: 0px 3px 1px 0px #0000001f;
  box-shadow: 0px 2px 2px 0px #00000024;
  color: #adadad;
}
.kenostButton + .kenostButton {
  margin-left: 8px;
}
.img_abs {
  img {
    max-width: 75px;
    max-height: 70px;
    object-fit: contain;
  }
}
.p-button {
  color: #343434;
  background: transparent;
  border-color: transparent;
  &:enabled:hover {
    background: transparent;
    border-color: transparent;
    color: #343434;
  }
  &:hover {
    color: #343434;
  }
}
.cell__error {
  color: #f00;
}
.cell__success {
  color: #0f0;
}
.name {
  text-align: left;
}
.cell_description {
  display: block;
  padding-top: 5px;
  font-size: 14px;
  letter-spacing: 0.5px;
  font-weight: bold;
  color: #666666;
}
</style>
