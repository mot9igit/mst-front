<template>
  <section class="shipments retail__sales" id="shipments">
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <h2>Акции</h2>
    <div class="dart-row dart-align-items-center dart-mb-1 retail__sales-top">
      <div class="d-col-xl-6 d-col-md-4" v-for="(ffilter, i) in filters" :key="i">
        <div class="form_input_group input_pl input-parent required" v-if="ffilter.type == 'text'">
          <InputText
            :id="ffilter.name"
            :placeholder="ffilter.placeholder"
            :name="i"
            class="d-input__field clients__filters-input-field"
            v-model="filterText"
            @input="setFilter('filter')"
          />
        </div>
      </div>
      <div class="retail__sales-button-container">
        <button
          type="button"
          href="#"
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow retail__sales-button"
          @click.prevent=""
        >
          <i class="d-icon-plus-flat clients__filters-create-icon"></i>
          Создать акцию
        </button>
      </div>
    </div>
    <div class="v-table__widgets">
      <slot name="widgets"></slot>
    </div>
    <Loader v-if="loading" />
    <div v-else>
      <div class="d-table__wrapper" v-if="this.retailSales.length > 0">
        <table class="d-table">
          <thead class="d-table__head">
            <tr class="d-table__row">
              <th v-for="(row, index) in table_data" :key="index" class="d-table__head-col">
                <div>
                  <span>
                    {{ row.label }}
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="d-table__body">
            <!-- v-if="sales.total != 0">-->
            <tr class="d-table__row" v-for="(item, i) in retailSales" :key="i">
              <td class="d-table__col">
                <div class="cell_value">
                  {{ item.id }}
                </div>
              </td>
              <td class="d-table__col">
                <div class="cell_value cell_value-center">
                  <div class="img_abs">
                    <img :src="item.image" :alt="item.name" v-if="item.image != ''" />
                    <img :src="site_url_prefix + 'assets/files/img/nopic.png'" alt="" v-else />
                  </div>
                </div>
              </td>
              <td class="d-table__col">
                <div class="cell_value">
                  {{ item.name }}
                </div>
              </td>
              <td class="d-table__col">
                <div class="cell_value">
                  {{ item.date_from }}
                </div>
              </td>
              <td class="d-table__col">
                <div class="cell_value">
                  {{ item.date_to }}
                </div>
              </td>
              <!--<td class="d-table__col">
              <div class="cell_value cell_value-center">
                <div class="cell_status_green">{{ item.status }}</div>
              </div>
            </td>-->
              <td class="d-table__col">
                <div class="cell_value cell_value-center">
                  <div class="cell_status_green cell_active" v-if="item.active == 1"></div>
                </div>
              </td>
              <td class="d-table__col">
                <div class="cell_value">
                  {{ item.store_name }}
                </div>
              </td>
              <td class="d-table__col">
                <div class="cell_value">
                  {{ item.comment }}
                </div>
              </td>
              <td class="d-table__col">
                <div class="cell_actions">
                  <button class="clients__card-action">
                    <i class="d-icon-pen2"></i>
                  </button>
                </div>
              </td>
              <td class="d-table__col">
                <div class="cell_actions">
                  <button class="clients__card-action">
                    <i class="d-icon-mixer"></i>
                  </button>
                </div>
              </td>
              <td class="d-table__col">
                <div class="cell_actions">
                  <button class="clients__card-action">
                    <i class="d-icon-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-pagination-wrap" v-if="countPages > 1">
          <paginate
            :page-count="countPages"
            :click-handler="pagClickCallback"
            :prev-text="'Пред'"
            :next-text="'След'"
            :container-class="'d-pagination d-table__footer-right-pagination'"
            :page-class="'d-pagination__item'"
            :active-class="'d-pagination__item--active'"
            :initialPage="this.page"
            :forcePage="this.page"
          >
          </paginate>
        </div>
      </div>
      <div class="profile-products__products" v-else>
        <div class="dart-alert dart-alert-info">Ничего не найдено</div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'

import InputText from 'primevue/inputtext'
import { toRaw } from 'vue'
import Paginate from 'vuejs-paginate-next'

export default {
  name: 'RetailActions',
  components: { Breadcrumbs, Loader, InputText, Paginate },
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25,
    },
    pagination_offset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: true,
      page: 1,
      filterText: '',
      filterValues: {},
      countPages: 0,
      retailSales: [],
      filters: {
        name: {
          name: 'Введите название акции',
          placeholder: 'Введите название акции',
          type: 'text',
        },
      },
      table_data: {
        id: {
          label: 'Номер',
          type: 'text',
        },
        image: {
          label: 'Баннер',
          type: 'image',
          baseurl: false,
        },
        name: {
          label: 'Название',
          type: 'link',
          // TODO
          link_to: 'promotion',
          link_params: {
            id: this.$route.params.id,
            action: 'id',
          },
          sort: true,
        },
        date_from: {
          label: 'Действует с',
          type: 'text',
          sort: true,
        },
        date_to: {
          label: 'Действует до',
          type: 'text',
          sort: true,
        },
        //status: {
        //  label: "Статус",
        //	type: "status",
        //},
        active: {
          label: 'Активно',
          type: 'boolean',
        },
        store_name: {
          label: 'Склад',
          type: 'text',
        },
        comment: {
          label: 'Комментарий',
          type: 'text',
        },
        edit: {
          icon: 'pi pi-pencil',
          label: '',
        },
        approve: {
          icon: 'pi pi-power-off',
          label: '',
        },
        delete: {
          icon: 'pi pi-trash',
          label: '',
        },
      },
    }
  },
  methods: {
    ...mapActions({
      getSales: 'retail/getSales',
      unsetSales: 'retail/unsetSales',
    }),
    setFilter(type = '0') {
      if (type === 'filter') {
        if (this.filterText.length >= 3 || this.filterText.length === 0) {
          setTimeout(() => {
            this.filter({
              filter: this.filterText,
              filtersdata: toRaw(this.filterValues),
              page: 1,
              perpage: this.pagination_items_per_page,
            })
          })
        }
      } else {
        this.filter({
          filter: this.filterText,
          filtersdata: toRaw(this.filterValues),
          page: 1,
          perpage: this.pagination_items_per_page,
        })
      }
    },
    filter(data) {
      this.loading = true
      this.unsetSales()
      this.page = 1
      this.getSales(data).then(() => {
        this.loading = false
      })
    },
    pagClickCallback(pageNum) {
      this.paginate({
        filter: this.filterText,
        filtersdata: toRaw(this.filterValues),
        page: pageNum,
        perpage: this.pagination_items_per_page,
      })

      const el = document.querySelector('retail__sales-container')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    paginate(data) {
      this.loading = true
      this.unsetDilers()
      this.page = data.page
      this.getDilers(data).then(() => {
        this.loading = false
      })
    },
  },
  mounted() {
    this.getSales({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.loading = false
    })
  },
  computed: {
    ...mapGetters({
      sales: 'retail/sales',
    }),
  },
  watch: {
    sales: function (newVal, oldVal) {
      this.countPages = Math.ceil(this.sales.total / this.pagination_items_per_page)
      if (this.countPages === 0) {
        this.countPages = 1
      }
      this.retailSales = newVal.items
    },
  },
}
</script>
<style lang="scss">
.retail__sales-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0 40px;
}
.retail__sales-top .form_input_group:after {
  content: '\e003';
  font-family: 'Iconly' !important;
  position: absolute;
  font-size: 16.8px;
  top: calc(50% - 8.4px);
  right: 20px;
}
.retail__sales-top .p-inputtext {
  width: 100%;
}
.retail__sales-top .p-inputtext {
  padding-right: 40px;
  box-shadow: none;
  border: 0.2px solid #75757575;
}
.retail__sales-top .p-inputtext:enabled:focus {
  border-color: #f92c0d;
}
.retail__sales-top .p-floatlabel:has(input:focus) label,
.retail__sales-top .p-floatlabel:has(input:-webkit-autofill) label,
.retail__sales-top .p-floatlabel:has(textarea:focus) label,
.retail__sales-top .p-floatlabel:has(.p-inputwrapper-focus) label {
  color: #f92c0d;
}
.retail__sales-top .d-table__col,
.retail__sales-top .d-table__row:first-child > .d-table__col {
  padding: 16px;
}
.retail__sales-button {
  font-size: 16px;
}
.retail__sales .img_abs img {
  max-width: 170px;
  max-height: 46px;
  object-fit: contain;
  margin: 0 auto;
}
.retail__sales .cell_value-center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 100%;
}
.cell_status_green {
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 15px;
  white-space: nowrap;
  background-color: #cdf0a9;
  margin: 0 auto;
  text-align: center;
  display: block;
}
.cell_active {
  height: 18px;
  width: 18px;
  //rotate: 135deg;
}
.cell_active:before {
  content: '\e04c';
  font-family: 'Iconly';
  position: relative;
  display: block;
  margin-top: 1px;
  margin-bottom: 0px;
  margin-left: -4px;
  margin-right: 0px;
  font-size: 9px;
}
.d-table__head {
  .d-table__row:first-child .d-table__head-col:nth-child(n + 9)::before,
  .d-table__row:first-child .d-table__col:nth-child(n + 9)::before {
    display: none;
  }
}
</style>
