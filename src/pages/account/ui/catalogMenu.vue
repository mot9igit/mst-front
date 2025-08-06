<template>
  <div class="catalog catalog--desktop" :class="{ 'catalog--active': active }" id="catalogMenu">
    <div class="catalog__list" :class="{ 'catalog__list-nonactive': !cataloglistShow }">
      <div class="catalog__top">
        <button
          v-for="(item, index) in menu"
          :key="index"
          class="catalog__head-item"
          @click.prevent="ShowCatalog()"
          :class="{ 'catalog__head-item--active': item.activeCatalog }"
        >
          <i class="catalog__head-item-icon" :class="item.icon"></i>
          <span class="catalog__head-item-text">{{ item.name }}</span>
        </button>
      </div>
      <div class="catalog__content">
        <ul class="catalog__items-list" v-if="activeShowCatalog === 1">
          <li class="catalog__item" v-for="(item, index) in catalog" :key="index">
            <button
              class="catalog__item-button"
              @click.prevent="ShowPodcatalog(index, item.pagetitle, item.id)"
              v-if="item.children != undefined"
            >
              <div class="catalog__item-content">
                <img
                  :src="item.menu_image"
                  class="catalog__item-img"
                  v-if="item.menu_image != ''"
                />
                <p class="catalog__item-title">{{ item.pagetitle }}</p>
              </div>
              <i class="d-icon-angle-rounded catalog__item-arrow"></i>
            </button>
            <router-link
              :to="{
                name: 'purchasesCatalog',
                params: {
                  id: this.$route.params.id,
                  category_id: item.id,
                },
              }"
              class="catalog__item-button"
              v-else
              @click.prevent="headerDesignOff"
            >
              <div class="catalog__item-content">
                <img
                  :src="item.menu_image"
                  class="catalog__item-img"
                  v-if="item.menu_image != ''"
                />
                <p class="catalog__item-title">{{ item.pagetitle }}</p>
              </div>
            </router-link>
          </li>
        </ul>
        <ul class="catalog__items-list" v-else>
          <li class="catalog__item" v-for="(item, index) in catalog_warehouse" :key="index">
            <button
              class="catalog__item-button"
              @click.prevent="ShowPodcatalog(index, item.pagetitle, item.id)"
              v-if="item.children != undefined"
            >
              <div class="catalog__item-content">
                <img :src="item.image" class="catalog__item-img" v-if="item.image != ''" />
                <p class="catalog__item-title">{{ item.pagetitle }}</p>
              </div>
              <i class="d-icon-angle-rounded catalog__item-arrow"></i>
            </button>
            <button
              class="catalog__item-button"
              @click.prevent="ShowPodcatalog(index, item.pagetitle, item.id)"
              v-else
            >
              <div class="catalog__item-content">
                <img :src="item.image" class="catalog__item-img" v-if="item.image != ''" />
                <p class="catalog__item-title">{{ item.pagetitle }}</p>
              </div>

            </button>
<!--           <router-link
              class="catalog__item-button"
              :to="{
                name: 'purchasesCatalogWarehouseCategory',
                params: {
                  id: this.$route.params.id,
                  org_w_id: item.org_w_id,
                //  warehouse_id: item.warehouse_id,
                //  warehouse_cat_id: item.id,
                },
              }"
              v-else
              @click.prevent="headerDesignOff"
            >
              <div class="catalog__item-content">
                <img :src="item.image" class="catalog__item-img" v-if="item.image != ''" />
                <p class="catalog__item-title">{{ item.pagetitle }}</p>
              </div>
            </router-link>-->
          </li>
        </ul>
      </div>
    </div>
    <div class="catalog__list" :class="{ 'catalog__list-nonshow': !cataloglistShow }">
      <div class="catalog__top">
        <button
          class="catalog__head-item catalog__head-item--back"
          @click.prevent="catalogNavigation()"
        >
          <i class="d-icon-angle-rounded catalog__head-item-icon"></i
          ><span class="catalog__head-item-text">{{ catalogListPrevios }}</span>
        </button>
     <router-link
              :to="{
                name: 'purchasesCatalog',
                params: {
                  id: this.$route.params.id,
                  category_id: catalogListIndex,
                },
              }"
              v-if="activeShowCatalog === 1 && stepmenu > 1"
              @click.prevent="headerDesignOff">
              <div class="catalog__head-item catalog__head-item--sub">
                <span class="catalog__head-item-text">{{ catalogListName }}</span>
              </div>
      </router-link>

      <router-link
              :to="{
                name: 'purchasesCatalogWarehouseCategory',
                params: {
                  id: this.$route.params.id,
                  org_w_id: breadcrumbs[1].category_id,
                  warehouse_id: breadcrumbs[2].category_id,
                  warehouse_cat_id: catalogListIndex,
                },
              }"
              v-else-if="activeShowCatalog === 0 && stepmenu > 3"
              @click.prevent="headerDesignOff">
              <div class="catalog__head-item catalog__head-item--sub">
                <span class="catalog__head-item-text">{{ catalogListName }}</span>
              </div>
      </router-link>

        <div class="catalog__head-item catalog__head-item--sub" v-else>
          <span class="catalog__head-item-text">{{ catalogListName }}</span>
        </div>
      </div>

      <div class="catalog__content">
        <ul class="catalog__items-list">
          <li
            class="catalog__item catalog__item--sub"
            v-for="(subitem, subindex) in childrens"
            :key="subindex"
          >
            <button
              class="catalog__item-button"
              @click.prevent="activeShowCatalog === 0 && stepmenu === 2 ? ShowPodcatalogList(subindex, subitem.pagetitle, subitem.warehouse_id) : ShowPodcatalogList(subindex, subitem.pagetitle, subitem.id)"
              v-if="subitem.children != undefined"
            >
              <div class="catalog__item-content">
                <img src="" class="catalog__item-img" />
                <p class="catalog__item-title">{{ subitem.pagetitle }}</p>
              </div>
              <i class="d-icon-angle-rounded catalog__item-arrow"></i>
            </button>

            <div v-else>
              <router-link
                :to="{
                  name: 'purchasesCatalogWarehouseCategory',
                  params: {
                    id: this.$route.params.id,
                    org_w_id: subitem.org_w_id,
                    warehouse_id: subitem.warehouse_id,
                    warehouse_cat_id: subitem.id,
                  },
                }"
                class="catalog__item-button"
                v-if="subitem.org_w_id"
                @click.prevent="headerDesignOff"
              >
                <div class="catalog__item-content">
                  <img src="" class="catalog__item-img" />
                  <p class="catalog__item-title">{{ subitem.pagetitle }}</p>
                </div>
              </router-link>
              <router-link
                :to="{
                  name: 'purchasesCatalog',
                  params: {
                    id: this.$route.params.id,
                    category_id: subitem.id,
                  },
                }"
                class="catalog__item-button"
                v-else
                @click.prevent="headerDesignOff"
              >
                <div class="catalog__item-content">
                  <img src="" class="catalog__item-img" />
                  <p class="catalog__item-title">{{ subitem.pagetitle }}</p>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'catalogMenu',
  data() {
    return {
      catalog: [],
      catalog_warehouse: [],
      namePathIsNav: null,
      menu: [],
      activeShowCatalog: 1,
      cataloglistShow: false,
      breadcrumbs: [
        { id: 0, name: 'Единый каталог', child: 1,  category_id: 0},
        { id: 1, name: '', child: 0, category_id: 0 },
      ],
      stepmenu: 1,
      childrens: [],
      catalogListPreviosIndex: [],
      catalogListName: '',
      catalogListIndex: 0,
      catalogListPrevios: '',
      headerDesign: true,
    }
  },
  emits: ['toggleCatalog', 'headerDesignOff', 'menuClose'],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.getOptWarehouseCatalog()
    this.getOptCatalog()
    this.menu = this.getMenu()
    document.addEventListener('click', event => {
      //console.log(event)
      // let catalog = document.getElementById('catalogMenu')
      // let catalogBtn = document.getElementById('catalogBtn')
      //console.log(event.target.closest('#catalogMenu'))
      //console.log(event.target.closest('#catalogBtn'))
      //
      if (!event.target.closest('#catalogMenu')
          && !event.target.closest('#catalogBtn')
          && !event.target.closest('.catalog__item-button')) {
        this.$emit("menuClose")
      }
     })
  },
  methods: {
    ...mapActions({
      getOptCatalog: 'catalog/getOptCatalog',
      getOptWarehouseCatalog: 'catalog/getOptWarehouseCatalog',
    }),
    toggleMenu() {
      this.$emit('toggleCatalog')
    },
    headerDesignOff(){
      this.headerDesign = !this.headerDesign
      this.$emit('headerDesignOff')
    },
    getMenu() {
      return [
        {
          name: 'Каталоги поставщиков',
          icon: 'd-icon-catalog',
          activeCatalog: false,
        },
        {
          name: 'Единый каталог',
          icon: 'd-icon-boxes',
          activeCatalog: true,
        },
      ]
    },
    ShowCatalog() {
      for (let i = 0; i < this.menu.length; i++) {
        this.menu[i].activeCatalog = !this.menu[i].activeCatalog
        this.cataloglistShow = false
        if (this.menu[i].activeCatalog === true) {
          this.breadcrumbs = []
          this.breadcrumbs.push({ id: 0, name: this.menu[i].name, child: i, category_id: 0 })
          this.breadcrumbs.push({ id: 1, name: '', child: 0, category_id: 0 })
          this.activeShowCatalog = i
        }
        this.stepmenu = 1
      }
    },
    ShowPodcatalog(index, pagetitle, categoryId) {
      if (this.cataloglistShow === false) {
        this.cataloglistShow = true
      }
      this.catalogListName = pagetitle
      this.catalogListIndex = categoryId
      this.catalogListPrevios = this.breadcrumbs[0].name
      this.stepmenu = 2
      this.breadcrumbs.splice(1)
      this.breadcrumbs.push({ id: 1, name: pagetitle, child: index, category_id: categoryId })
      if (this.activeShowCatalog === 1) {
        this.childrens = this.catalog[index].children
      } else {
        this.childrens = this.catalog_warehouse[index].children
      }
    },
    ShowPodcatalogList(index, pagetitle, categoryId) {
      let parentnumber = this.breadcrumbs.length - 1
      let thisnumber = this.breadcrumbs.length
      this.catalogListPreviosIndex = this.breadcrumbs.push({
        id_parent: this.breadcrumbs[parentnumber].child,
      })
      this.catalogListPrevios = this.breadcrumbs[parentnumber].name
      this.catalogListName = pagetitle
      this.catalogListIndex = categoryId
      this.childrens = this.childrens[index].children
      this.breadcrumbs.splice(thisnumber)
      this.breadcrumbs.push({ id: thisnumber, name: pagetitle, child: index, category_id: categoryId })
      this.stepmenu++
    },
    catalogNavigation() {
      if (this.breadcrumbs.length < 3) {
        this.childrens = []
        this.stepmenu = 1
        this.breadcrumbs.splice(1)
        this.breadcrumbs.push({ id: 1, name: '', child: 0, category_id: 0 })
        this.catalogListName = ''
        this.catalogListIndex = ''
        this.cataloglistShow = false
      } else {
        let parentid = this.breadcrumbs.length - 1
        let firstchildrenid = this.breadcrumbs[1].child
        this.breadcrumbs.splice(parentid)
        this.stepmenu--
        if (this.activeShowCatalog === 1) {
          this.childrens = this.catalog[firstchildrenid].children
        } else {
          this.childrens = this.catalog_warehouse[firstchildrenid].children
        }
        //  console.log(this.breadcrumbs.length)
        this.catalogListPrevios = this.breadcrumbs[parentid - 2].name
        this.catalogListName = this.breadcrumbs[parentid - 1].name
        this.catalogListIndex = this.breadcrumbs[parentid - 1].category_id
        for (let i = 1; i < this.breadcrumbs.length - 1; i++) {
          let id = this.breadcrumbs[i + 1].child
          this.childrens = this.childrens[id].children
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      optCatalog: 'catalog/optCatalog',
      optCatalogWarehouse: 'catalog/optCatalogWarehouse',
    }),

  },
  watch: {
    optCatalog: function (newVal) {
      this.catalog = newVal
    },
    optCatalogWarehouse: function (newVal) {
      this.catalog_warehouse = newVal
      this.actualCatalog = {}
    },
    active: function (newVal) {
      this.headerDesign = newVal
    //  if(newVal === true){
    //    this.clickAroundActive = newVal
    //  }
    },
  },
}
</script>

<style lang="scss" scoped>
.catalog__list-nonactive {
  border-top-right-radius: 30px;
}
.catalog__list-nonshow {
  display: none;
}
.catalog__head-item-text {
  text-align: left;
}
.catalog__item-title,
.catalog__head-item,
.catalog__head-item--back{
  color: #282828;
}
.catalog__head-item--active{
  color: #fff;
}
.catalog {
    margin-top: 3px;
}
</style>
