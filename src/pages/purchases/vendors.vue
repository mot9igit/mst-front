<template>
  <section class="shipments vendors" id="shipments">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>
    <Toast/>
    <Loader v-if="loading" />
    <div v-else>
      <!-- Доступные производители -->
      <div class="clients__content" v-if="publicVendors.total > 0">
        <h2 class="clients__content-h2">Бренды</h2>
        <div class="clients__content-container">
          <div class="clients__content-container-item" v-for="(item, index) in publicVendors.items" :key="index">
            <div class="clients__content-container-item-banner" :style="'background-image:url(' + item.banner +');'" v-if="item.banner"></div>
            <div class="clients__content-container-item-banner" v-else>  
              
                <div class="clients__content-container-item-banner-container">
                  <img :src="item.image" class="clients__content-container-item-banner-container-logo"/>
                  {{ item.name }}
                </div>
              
            </div>
            
            <div class="clients__content-container-item-content">
              <div class="clients__content-container-item-content-info">
                <img :src="item.image" class="clients__content-container-item-content-info-logo"/>
                <div class="clients__content-container-item-content-info-text">
                  <div class="clients__content-container-item-content-info-text-name">{{ item.name }}</div>
                  <div class="clients__content-container-item-content-info-text-address">{{ item.address }}</div>
                </div>  
              </div>
              <div class="clients__content-container-item-content-descr">
                {{ item.description }}
              </div>
            </div>
            <div class="clients__content-container-item-button">
              <button
                  class="d-button d-button-primary d-button--sm-shadow"
                  @click.prevent="setVendor(item.id)"
                >
                  Подключить
              </button>
            </div>
            
          </div>
        </div>
        <div class="clients__content-button" v-if="publicVendors.total > publicVendors.total_visible">
          <button
            class="clients__content-button-show_more_org-button"
            @click.prevent="paginatePublicVendors"
          >
            <span class="clients__content-button-show_more_org-button-label">Еще</span>
            <span class="clients__content-button-show_more_org-button-badge">{{
                Number(publicVendors.total) - Number(publicVendors.total_visible)
            }}</span>
            <i
              class="d-icon-arrow-right clients__content-button-show_more_org-button-icon"
            ></i>
          </button>
        </div>
      </div>

      <div class="clients__header">
        <div class="clients__header-title-wrapper">
          <h1 class="clients__header-title">
            Мои поставщики (<span v-if="opts.total > -1">{{ opts.total }}</span
            ><span v-else>0</span>)
          </h1>
        </div>
        <p class="clients__header-description">
          Доступные организации, которые являются вашими поставщиками
        </p>
      </div>
      

      <div class="clients__filters">
        <div class="clients__filters-left" v-if="Object.keys(opts.items).length">
          <div class="clients__filters-input-container" v-for="(ffilter, i) in filters" :key="i">
            <div class="d-input d-input--light clients__filters-input" v-if="ffilter.type == 'text'">
              <input
                type="text"
                :id="ffilter.name"
                :placeholder="ffilter.placeholder"
                :name="i"
                class="d-input__field clients__filters-input-field"
                v-model="filterText"
                @input="setFilter('filter')"
              />
              <!---->
              <div class="d-input__actions clients__filters-input-actions">
                <button class="d-icon-wrapper clients__filters-input-button">
                  <i class="d-icon-search-big"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
          @click.prevent="this.modalAdd = true"
        >
          Добавить оптовую компанию <i class="d-icon-plus-flat clients__filters-create-icon"></i>
        </button>
      </div>
      
      <div class="clients__card-container">
        <template v-if="Object.keys(opts.items).length">
          <div class="clients__card dart-row" v-for="(item, index) in opts.items" :key="index">
            <div class="clients__card-left d-col-21">
              <div class="clients__card-info d-col-7 clients__devider">
                <div class="clients__card-info-image-container">
                  <img :src="item.image" alt="" class="clients__card-info-image" />
                </div>
                <div class="clients__card-info-content">
                  <p class="clients__card-info-title">{{ item.name }}</p>
                  <div class="clients__card-info-address">
                    <i class="d-icon-location clients__card-info-address-icon"></i>
                    <span>{{
                      item.req?.fact_address != '' ? item.req?.fact_address : 'адрес не указан'
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="clients__card-data d-col-14">
                <div class="clients__card-inn d-col-12 clients__devider">
                  <p class="clients__card-inn-label">ИНН:</p>
                  <p class="clients__card-inn-value">
                    {{ item.req?.inn != '' ? item.req?.inn : 'не указан' }}
                  </p>
                </div>
                <!-- clients__devider -->
                <div class="clients__card-contact-container d-col-12">
                  <a :href="'tel:' + item.phone.replace(/[^+\d]/g, '')" class="clients__card-contact">
                    <i class="d-icon-telephone clients__card-contact-icon"></i>
                    <span>{{ item.phone }}</span>
                  </a>
                  <a :href="'mailto:' + item.email" class="clients__card-contact">
                    <i class="d-icon-mail2 clients__card-contact-icon"></i>
                    <span>{{ item.email }}</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="clients__card-right d-col-3">
              <!--  <div class="clients__card-right-left d-col-3">
              <div class="d-divider d-divider--vertical clients__card-divider"></div>
            <div class="clients__card-price-container">
                <div class="clients__card-price">
                  <span class="clients__card-price-label">ДЗ:</span>
                  <span class="clients__card-price-value">5 500 000 ₽</span>
                </div>
                <div class="clients__card-price clients__card-price--secondary">
                  <span class="clients__card-price-label">ПЗД:</span>
                  <span class="clients__card-price-value">3 200 000 ₽</span>
                </div>
              </div>

              <div class="clients__card-vendor" v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id">Создан поставщиком</div>
            </div>-->
              <div class="clients__card-right-right d-col-24">
                <div class="clients__card-action-container d-col-6">
                  <button class="clients__card-action" @click.prevent="changeOpts(item.id, '')">
                    <i class="d-icon-trash"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="clients__card-top">
              <div class="clients__card-info">
                <div class="clients__card-info-image-container">
                  <img :src="item.image" alt="" class="clients__card-info-image" />
                </div>
                <div class="clients__card-info-content">
                  <p class="clients__card-info-title">{{ item.name }}</p>
                  <div class="clients__card-info-address">
                    <i class="d-icon-location clients__card-info-address-icon"></i>
                    <span>{{
                      item.req?.fact_address != '' ? item.req?.fact_address : 'адрес не указан'
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="clients__card-top-right">
                <div class="clients__card-top-right-top">
                  <!--
                  <button class="d-button d-button-primary d-button--sm-shadow clients__card-offer">
                    <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                    Предложение
                  </button>
                  -->
                  <div class="clients__card-action-container">
                    <!--
                      <button class="clients__card-action">
                        <i class="d-icon-pen2"></i>
                      </button>

                    <div
                      class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                    ></div>
                    -->
                    <!-- <button class="clients__card-action" @click.prevent="changeOpts(item.id, '')">
                      <i class="d-icon-trash"></i>
                    </button> -->
                  </div>
                </div>
                <div class="clients__card-vendor-wrapper">
                  <!--
                    <div
                      class="clients__card-vendor"
                      v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
                    >
                      Создан поставщиком
                    </div>
                  -->
                </div>
              </div>
            </div>

            <div class="clients__card-bottom">
              <div class="clients__card-bottom-left">
                <div class="clients__card-contact-container">
                  <a :href="'tel:' + item.phone.replace(/[^+\d]/g, '')" class="clients__card-contact">
                    <i class="d-icon-telephone clients__card-contact-icon"></i>
                    <span>{{ item.phone }}</span>
                  </a>
                  <a :href="'mailto:' + item.email" class="clients__card-contact">
                    <i class="d-icon-mail2 clients__card-contact-icon"></i>
                    <span>{{ item.email }}</span>
                  </a>
                </div>
                <div class="clients__card-inn">
                  <p class="clients__card-inn-label">ИНН:</p>
                  <p class="clients__card-inn-value">
                    {{ item.req?.inn != '' ? item.req?.inn : 'не указан' }}
                  </p>
                </div>
              </div>

              <!--<div class="clients__card-price-container">
              <div class="clients__card-price">
                <span class="clients__card-price-label">ДЗ:</span>
                <span class="clients__card-price-value">5 500 000 ₽</span>
              </div>
              <div class="clients__card-price clients__card-price--secondary">
                <span class="clients__card-price-label">ПЗД:</span>
                <span class="clients__card-price-value">3 200 000 ₽</span>
              </div>
            </div>-->
            </div>
            <div class="clients__card-top-mobile">
              <div class="clients__card-top-right-top">
                <!--
                <button class="d-button d-button-primary d-button--sm-shadow clients__card-offer">
                  <i class="d-icon-plus-flat clients__card-offer-icon"></i>
                  Предложение
                </button>
                -->
                <div class="clients__card-action-container">
                  <!--
                  <button class="clients__card-action">
                    <i class="d-icon-pen2"></i>
                  </button>
                  <div
                    class="d-divider d-divider--vertical clients__card-divider clients__card-action-divider"
                  ></div>
                  -->
                  <button class="clients__card-action" @click.prevent="changeOpts(item.id, '')">
                    <i class="d-icon-trash"></i>
                  </button>
                </div>
              </div>
              <!--
              <div class="clients__card-vendor-wrapper">
                <div
                  class="clients__card-vendor"
                  v-if="item.owner_id > 0 && item.owner_id == this.$route.params.id"
                >
                  Создан поставщиком
                </div>
              </div>
              -->
            </div>
          </div>
        </template>
        <template v-else>
          <div class="dart-alert dart-alert-info">Подключенные Поставщики не найдены.</div>
        </template>
        <div class="clients__paginate" v-if="this.countPages > 1">
          <paginate
            :page-count="this.countPages"
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
    </div>
    <teleport to="body" v-if="this.modalAdd === true">
      <customModal v-model="this.modalAdd" class="clients-form__modal-main">
        <addVendorWindow @closeAddWindow="close()" @addVendor="addNewVendor()" />
      </customModal>
    </teleport>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Paginate from 'vuejs-paginate-next'
import Loader from '@/shared/ui/Loader.vue'
import { toRaw } from 'vue'
import customModal from '@/shared/ui/Modal.vue'
import addVendorWindow from '../account/ui/addVendorWindow.vue'
import Toast from 'primevue/toast'

export default {
  name: 'purchasesVendors',
  components: { Breadcrumbs, Loader, Paginate, customModal, addVendorWindow, Toast },
  props: {
    pagination_items_per_page_public: {
      type: Number,
      default: 3,
    },
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
      modalAdd: false,
      page: 1,
      pagePublic: 1,
      filterText: '',
      countPages: 0,
      filters: {
        name: {
          name: 'Название организации',
          placeholder: 'Введите название организации',
          type: 'text',
        },
      },
    }
  },
  methods: {
    ...mapActions({
      getOpts: 'purchases/getOpts',
      toggleOpts: 'purchases/toggleOpts',
      unsetOpts: 'purchases/unsetOpts',
      getOptVendorsAvailable: 'org/getOptVendorsAvailable',
      getOptVendorsSelected: 'org/getOptVendorsSelected',
      getPublicVendors: 'org/getPublicVendors',
      setNewOrgProfileVendor: 'purchases/setNewOrgProfileVendor'
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
    // TODO: сделать подтверждение удаления
    changeOpts(id, action) {
      const data = {
        id: id,
        action: action,
      }
      this.toggleOpts(data).then(() => {
        this.loading = true
        this.unsetOpts()
        this.page = 1
        this.getOpts(data).then(() => {
          this.loading = false
          this.updateVendors()
        })
      })
    },
    filter(data) {
      console.log(data)
      this.loading = true
      this.unsetOpts()
      this.page = 1
      this.getOpts(data).then(() => {
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
      const el = document.querySelector('.clients__card-container')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    paginate(data) {
      this.loading = true
      this.unsetOpts()
      this.page = data.page
      this.getOpts(data).then(() => {
        this.loading = false
      })
    },
    close() {
      this.modalAdd = false
    },
    addNewVendor() {
      this.modalAdd = false
      this.getOpts({
        page: this.page,
        perpage: this.pagination_items_per_page,
      }).then(() => {
        this.loading = false
        this.updateVendors()
      })
    },
    updateVendors() {
      this.getOptVendorsAvailable({
        filter: '',
        page: 1,
        perpage: this.cfg.vendors.perpage,
      }).then(() => {
        this.getOptVendorsSelected({
          filter: '',
          page: 1,
          perpage: this.cfg.vendors.perpage,
        }).then(() => {})
      })
    },
    paginatePublicVendors(){
      this.loading = true
      this.pagePublic++
      this.getPublicVendors({
        page: this.pagePublic,
        perpage: this.pagination_items_per_page_public,
      }).then(() => {
        this.loading = false
      })
    },
    setVendor(id){
      this.loading = true
      this.setNewOrgProfileVendor({
        vendor_id: id
      }).then((res) => {
        if(res.data.success){
          this.$toast.add({
              severity: 'success',
              summary: 'Поставщик добавлен!',
              detail: 'Поставщик успешно добавлен!',
              life: 3000,
            })
          this.page = 1
          this.pagePublic = 1
          this.getOpts({
            page: this.page,
            perpage: this.pagination_items_per_page,
          }).then(() => {
            this.getPublicVendors({
              page: this.pagePublic,
              perpage: this.pagination_items_per_page_public,
            }).then(() => {
              this.loading = false
            })
          })
        }else{
          this.$toast.add({
              severity: 'error',
              summary: 'Ошибка',
              detail: "Ошибка добавления поставщика",
              life: 3000,
            })
            this.loading = false
        }
        
      })
    }
  },
  mounted() {
    this.getOpts({
      page: this.page,
      perpage: this.pagination_items_per_page,
    }).then(() => {
      this.getPublicVendors({
        page: this.pagePublic,
        perpage: this.pagination_items_per_page_public,
      }).then(() => {
        this.loading = false
      })
    })
  },
  computed: {
    ...mapGetters({
      opts: 'purchases/opts',
      publicVendors: 'org/publicVendors'
    }),
  },
  watch: {
    opts: function () {
      this.countPages = Math.ceil(this.opts.total / this.pagination_items_per_page)
      if (this.countPages === 0) {
        this.countPages = 1
      }
    },
  },
}
</script>
<style lang="scss">
.clients__content{
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 80px;
  &-h2{   
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    color: #282828;
  }
  &-container{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    &-item{
      max-height: 489px;
      height: 498px;
      min-height: 489px;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0px 4px 13.2px -5px rgba(0, 0, 0, 0.41);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      gap: 22px;
      padding: 0;
      &-banner{
        max-height: 190px;
        min-height: 190px;
        width: 100%;
        overflow: hidden;
        background-color: #EBEBEB;
        display: flex;
        align-items: center;
        justify-content: center;
        background-position: center center;
        background-size: cover;
        padding: 0 16px;
        &-container{
          display: flex;
          align-items: center;
          gap: 16px;
          color: #282828;
          font-size: 29px;
          line-height: 29px;
          font-weight: 700;
          &-logo{           
            width: 63px;
            height: 63px;
            border-radius: 42px;
            aspect-ratio: 1;
          }
        }
      }
      &-content{
        padding: 0 16px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        align-items: start;
        width: 100%;
        min-height: 179px;
        max-height: 179px;
        overflow: hidden;
        
        &-info{
          display: flex;
          min-height: 47px;
          gap: 8px;
          align-items: start;
          position: relative;
          box-sizing: border-box;
          &-logo{
            aspect-ratio: 1;        
            width: 24px;
            height: 24px;
            border-radius: 14px;
          }
          &-text{
            display: flex;
            flex-direction: column;
            gap: 8px;
            position: relative;
            &-name{          
              font-weight: 700;
              font-size: 16px;
              line-height: 21px;
              color: #282828;
            }
            &-address{   
              font-weight: 400;
              font-size: 14px;
              line-height: 18px;
              color: #757575;
              max-height: 18px;
              overflow: hidden;
              position:relative;
            }
          }

        }

        &-descr{       
          max-height: 105px;
          overflow: hidden;
          font-weight: 400;
          font-size: 16px;
          line-height: 21px;
          color: #282828;
        }
      }
      &-button{
          margin-top: 10px;
          display: flex;
          width: 100%;
          padding: 0 16px;
          align-items: center;
          justify-content: center;
          button{
            width: auto;
          }
      }
    }
  }
  &-button{
    width: 100%;
    display: flex;
    justify-content: center;
    &-show_more_org-button{
      color: #fff;
      background-color: #282828;
      border: 1px solid #282828;
      height: 40px;
      border-radius: 20px;
      font-size: 16px;
      line-height: 21px;
      padding: 8px 24px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
      &-icon{
        width: 24px;
        height: 24px;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &-show_more_org-button:hover{
      color: #282828;
      background-color: transparent;
    }
  }
}
</style>
