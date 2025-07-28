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
								<button class="catalog__item-button" @click.prevent="ShowPodcatalog(index, item.pagetitle)" v-if="item.children != undefined">
									<div class="catalog__item-content">
										<img :src="item.menu_image" class="catalog__item-img" v-if="item.menu_image != ''"/>
										<p class="catalog__item-title">{{ item.pagetitle }}</p>
									</div>
									<i class="d-icon-angle-rounded catalog__item-arrow"></i>
								</button>
                <button class="catalog__item-button" v-else>
									<div class="catalog__item-content">
										<img :src="item.menu_image" class="catalog__item-img" v-if="item.menu_image != ''"/>
										<p class="catalog__item-title">{{ item.pagetitle }}</p>
									</div>
								</button>
							</li>
						</ul>
            <ul class="catalog__items-list" v-else>
							<li  class="catalog__item" v-for="(item, index) in catalog_warehouse" :key="index">
								<button class="catalog__item-button" @click.prevent="ShowPodcatalog(index, item.pagetitle)" v-if="item.children != undefined">
									<div class="catalog__item-content">
										<img :src="item.image" class="catalog__item-img" v-if="item.image != ''"/>
										<p class="catalog__item-title">{{ item.pagetitle }}</p>
									</div>
									<i class="d-icon-angle-rounded catalog__item-arrow"></i>
								</button>
                <button class="catalog__item-button" v-else>
									<div class="catalog__item-content">
										<img :src="item.image" class="catalog__item-img" v-if="item.image != ''"/>
										<p class="catalog__item-title">{{ item.pagetitle }}</p>
									</div>
								</button>
							</li>
						</ul>
					</div>
				</div>
				<div class="catalog__list" :class="{ 'catalog__list-nonshow': !cataloglistShow }">

            <div class="catalog__top">
              <button class="catalog__head-item catalog__head-item--back" @click.prevent="catalogNavigation()">
                <i class="d-icon-angle-rounded catalog__head-item-icon"></i><span class="catalog__head-item-text">{{ catalogListPrevios }}</span>
              </button>
              <div class="catalog__head-item catalog__head-item--sub">
                <span class="catalog__head-item-text">{{ catalogListName }}</span>
              </div>
            </div>

            <div class="catalog__content">
              <ul class="catalog__items-list">
                <li class="catalog__item catalog__item--sub"  v-for="(subitem, subindex) in childrens" :key="subindex">
                  <button class="catalog__item-button" @click.prevent="ShowPodcatalogList(subindex, subitem.pagetitle)" v-if="subitem.children != undefined">
                    <div class="catalog__item-content">
                      <img src="" class="catalog__item-img" />
                      <p class="catalog__item-title">{{subitem.pagetitle}}</p>
                    </div>
                    <i class="d-icon-angle-rounded catalog__item-arrow"></i>
                  </button>
                  <button class="catalog__item-button" v-else>
                    <div class="catalog__item-content">
                      <img src="" class="catalog__item-img" />
                      <p class="catalog__item-title">{{subitem.pagetitle}}</p>
                    </div>
                    
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
      catalog: [],
      catalog_warehouse: [],
      namePathIsNav: null,
      menu: [],
      activeShowCatalog: 1,
      cataloglistShow: false,
      breadcrumbs: [{id:0, name:'Единый каталог', child: 1},{id:1, name:'', child: 0}],
      stepmenu: 1,
      childrens: [],
      catalogListPreviosIndex: [],
      catalogListName: '',
      catalogListPrevios: '',

    }
  },
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
        this.cataloglistShow = false
        if(this.menu[i].activeCatalog === true){
            this.breadcrumbs = []
            this.breadcrumbs.push({ id: 0, name: this.menu[i].name, child: i});
            this.breadcrumbs.push({ id: 1, name: '', child: 0});
            this.activeShowCatalog = i
          }
          this.stepmenu = 1 
       }
    },
    ShowPodcatalog(index, pagetitle){
      if(this.cataloglistShow === false){
        this.cataloglistShow = true
      }
      this.catalogListName = pagetitle
          this.catalogListPrevios = this.breadcrumbs[0].name
          this.stepmenu = 2
          this.breadcrumbs.splice(1)
          this.breadcrumbs.push({ id: 1, name: pagetitle, child: index }); 
      if(this.activeShowCatalog === 1){
        this.childrens = this.catalog[index].children
      }else{
        this.childrens = this.catalog_warehouse[index].children 
      }  
    },
    ShowPodcatalogList(index, pagetitle){
      let parentnumber = this.breadcrumbs.length - 1 
      let thisnumber = this.breadcrumbs.length
      this.catalogListPreviosIndex = this.breadcrumbs.push({id_parent: this.breadcrumbs[parentnumber].child})
      this.catalogListPrevios = this.breadcrumbs[parentnumber].name
      this.catalogListName = pagetitle
      this.childrens = this.childrens[index].children
      this.breadcrumbs.splice(thisnumber)
      this.breadcrumbs.push({ id: thisnumber, name: pagetitle, child: index });
      this.stepmenu++
          
    },
    catalogNavigation(){
      if(this.breadcrumbs.length < 3){
        this.childrens = []
        this.stepmenu = 1
        this.breadcrumbs.splice(1)
        this.breadcrumbs.push({ id: 1, name: '', child: 0 });
        this.cataloglistShow = false
      }else{
        let parentid = this.breadcrumbs.length - 1
        let firstchildrenid = this.breadcrumbs[1].child
        this.breadcrumbs.splice(parentid)
        this.stepmenu--
        if(this.activeShowCatalog === 1){
            this.childrens = this.catalog[firstchildrenid].children
          }else{
            this.childrens = this.catalog_warehouse[firstchildrenid].children 
          }
          console.log(this.breadcrumbs.length)
        for(let i=1; i<this.breadcrumbs.length; i++){
          this.catalogListPrevios = this.breadcrumbs[i-1].name
          this.catalogListName = this.breadcrumbs[i].name
          let id = this.breadcrumbs[i+1].child
          this.childrens = this.childrens[id].children
          this.cataloglistShow = true
        }
      }
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
.catalog__head-item-text{
  text-align: left;
}
</style>
