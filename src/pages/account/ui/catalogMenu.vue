<template>
<div class="catalog catalog--desktop" :class="{ 'catalog--active':  active }">
				<div class="catalog__list" :class="{ 'catalog__list-nonactive' : !cataloglistShow }">
					<div class="catalog__top" >
						<button v-for="(item, index) in menu" :key="index"  class="catalog__head-item" @click.prevent="ShowCatalog()" :class="{ 'catalog__head-item--active': item.activeCatalog }">
							<i class="catalog__head-item-icon" :class="item.icon"></i>
              <span class="catalog__head-item-text">{{ item.name }}</span>
						</button>
					</div>
					<div class="catalog__content">
						<ul class="catalog__items-list" v-if="activeShowCatalog === 1">
							<li  class="catalog__item" v-for="(item, index) in catalog" :key="index">
								<button class="catalog__item-button" @click.prevent="ShowPodcatalog(index, item.pagetitle)">
									<div class="catalog__item-content">
										<img :src="item.menu_image" class="catalog__item-img" v-if="item.menu_image != ''"/>
										<p class="catalog__item-title">{{ item.pagetitle }}</p>
									</div>
									<i class="d-icon-angle-rounded catalog__item-arrow"></i>
								</button>
							</li>
						</ul>
            <ul class="catalog__items-list" v-else>
							<li  class="catalog__item" v-for="(item, index) in catalog_warehouse" :key="index">
								<button class="catalog__item-button" @click.prevent="ShowPodcatalog(index, item.pagetitle)">
									<div class="catalog__item-content">
										<img :src="item.image" class="catalog__item-img" v-if="item.image != ''"/>
										<p class="catalog__item-title">{{ item.pagetitle }}</p>
									</div>
									<i class="d-icon-angle-rounded catalog__item-arrow"></i>
								</button>
							</li>
						</ul>
					</div>
				</div>
				<div class="catalog__list" :class="{ 'catalog__list-nonshow': !cataloglistShow }" v-if="activeShowCatalog === 1">

            <div class="catalog__top">
              <button class="catalog__head-item catalog__head-item--back">
                <i class="d-icon-angle-rounded catalog__head-item-icon"></i
                ><span class="catalog__head-item-text" data-onclick>{{ breadcrumbs[0].name }}</span>
              </button>
              <div class="catalog__head-item catalog__head-item--sub">
                <span class="catalog__head-item-text">{{ cataloglistPagetitle }}</span>
              </div>
            </div>

            <div class="catalog__content" v-for="(item, index) in catalog" :key="index">
              <ul class="catalog__items-list">
                <li class="catalog__item catalog__item--sub">
                  <button class="catalog__item-button">
                    <div class="catalog__item-content">
                      <img src="" class="catalog__item-img" />
                      <p class="catalog__item-title"></p>
                    </div>
                    <i class="d-icon-angle-rounded catalog__item-arrow"></i>
                  </button>
                </li>
              </ul>
            </div>

				</div>
			</div>



</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import catalog from '../api/catalog'

export default{
  name: "catalogMenu",
  data (){
    return {
      catalogWarehouseParent: 1,
      catalog: [],
      catalog_warehouse: [],
      namePathIsNav: null,
      menu: [],
      activeShowCatalog: 1,
      cataloglistShow: false,
      cataloglistIndex: 0,
      cataloglistPagetitle: '',
      breadcrumbs: [{id:0, name:'Единый каталог'}],
      stepmenu: 1

    }
  },
  emits: ["toggleCatalog"],
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    this.get_opt_warehouse_catalog_from_api()
    this.get_opt_catalog_from_api()
    this.menu = this.getMenu()
  },
  methods: {
    ...mapActions(['get_opt_catalog_from_api', 'get_opt_warehouse_catalog_from_api']),
    toggleMenu(){
      this.$emit("toggleCatalog")
    },
    getMenu(){
      return [{
        name: "Каталоги поставщиков", icon: "d-icon-catalog", activeCatalog: false,
        },{
        name: "Единый каталог", icon: "d-icon-boxes", activeCatalog: true,
      }]
    },
    ShowCatalog(){
       for(let i=0; i<this.menu.length; i++){
        this.menu[i].activeCatalog = !this.menu[i].activeCatalog
        if(this.menu[i].activeCatalog === true){
          if(this.stepmenu === 1){
            this.breadcrumbs.splice(0, 1)
            this.breadcrumbs.push({ id: 0, name: this.menu[i].name });
          }else{
            this.breadcrumbs = []
            this.breadcrumbs.push({ id: 0, name: this.menu[i].name });
          }
          this.activeShowCatalog = i
        }
       }
    },
    ShowPodcatalog(index, pagetitle){
      if(this.cataloglistShow === false){
        this.cataloglistShow = true
      }
      this.cataloglistIndex = index
      this.cataloglistPagetitle = pagetitle
    }
  },
  computed: {
    ...mapGetters(['optcatalog', 'optcatalogwarehouse']),
  },
  watch: {
    optcatalog: function (newVal) {
      this.catalog = newVal
    },
    optcatalogwarehouse: function (newVal) {
      this.catalog_warehouse = newVal
      this.actualCatalog = {}
    },
  }
}

</script>

<style lang="scss" scoped>

.catalog__list-nonactive {
    border-top-right-radius: 30px;
}
.catalog__list-nonshow{
    display:none;
}
</style>
