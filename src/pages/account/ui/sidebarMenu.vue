<template>
  <nav class="sidebar__nav">
								<ul class="sidebar__list">

                      <li class="sidebar__block sidebar__item" v-for="(item, index) in menu" :key="index" :class="{ 'sidebar__item--expanded': item.collapse }">
                        <button class="sidebar__item-button"  @click.prevent="sidebarItem(index)">
                          <div class="sidebar__item-button-content">
                            <i class="sidebar__item-icon d-icon-cube" v-if="item.icon == '' || item.icon == undefined"></i>
                            <i class="sidebar__item-icon" v-else :class="item.icon"></i>
                            <span class="sidebar__item-text">{{ item.name }}</span>
                          </div>
                          <i class="d-icon-angle-rounded-bottom sidebar__item-dropdown"  v-if="item.children"></i>
                        </button>

                        <ul class="sidebar__item-list" v-if="item.children">
                          <li class="sidebar__item-list-item" v-for="(subitem, index) in item.children" :key="index">
                            <router-link class="sidebar__item-list-item-content" :to="subitem.to">
                              <i class="sidebar__item-list-item-icon d-icon-doc" v-if="subitem.icon == '' || subitem.icon == undefined"></i>
                              <i class="sidebar__item-list-item-icon" v-else :class="subitem.icon"></i>
                              {{ subitem.name }}
                            </router-link>
                          </li>
                        </ul>
                      </li>

								</ul>
	</nav>
</template>
<script>
import { mapGetters } from 'vuex'

export default{
  name: "sidebarMenu",
  data (){
    return {
      menu: [],
      active: false
    }
  },
  mounted(){
    this.menu = this.getMenu()
  },
    computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      orgs: 'orgs',
    }),
  },
  methods: {
    getMenu(){
      return [{
        name: "Закупки", icon: "d-icon-cube", collapse: true,
        children: [{
          name: "Оптовый каталог", icon: "d-icon-doc", to: { name: "purchasesCatalog", params: { id: this.$route.params.id } },
        },{
          name: "Мои заказы", icon: "d-icon-cart", to: { name: "purchasesOrders", params: { id: this.$route.params.id } },
        },{
          name: "Мои поставщики", icon: "d-icon-cube", to: { name: "purchasesVendors", params: { id: this.$route.params.id } },
        }]

      },{
        name: "Оптовые продажи", icon: "d-icon-bag", collapse: false,
        children: [{
          name: "Заказы", icon: "d-icon-doc", to: { name: "WholesaleMain", params: { id: this.$route.params.id } },
        },{
          name: "Оптовые цены", icon: "d-icon-cart", to: { name: "WholesalePrices", params: { id: this.$route.params.id } },
        },{
          name: "Клиенты", icon: "d-icon-people", to: { name: "WholesaleClients", params: { id: this.$route.params.id } },
        },{
          name: "Отгрузки", icon: "d-icon-truck", to: { name: "WholesaleShipments", params: { id: this.$route.params.id } },
        }]
      },{
        name: "Розничные продажи", icon: "d-icon-sales", collapse: false,

        children: [{
          name: "Заказы", icon: "d-icon-doc", to: { name: "RetailOrders", params: { id: this.$route.params.id } },
        },{
          name: "Акции", icon: "d-icon-percent-rounded", to: { name: "RetailActions", params: { id: this.$route.params.id } },
        },{
          name: "Баланс", icon: "d-icon-wallet", to: { name: "RetailBalance", params: { id: this.$route.params.id } },
        },{
          name: "Сопоставление товаров", icon: "d-icon-shuffle", to: { name: "RetailCompareproducts", params: { id: this.$route.params.id } },
        }]
      },{
        name: "Мой склад", icon: "d-icon-boxes-2", collapse: false,

        children: [{
          name: "Анализ склада", icon: "d-icon-line-chart", to: { name: "WarehouseReview", params: { id: this.$route.params.id } },
        },{
          name: "Коллекции товара", icon: "d-icon-layers", to: { name: "WarehouseProducts", params: { id: this.$route.params.id } },
        },{
          name: "Настройки склада", icon: "d-icon-conveyor", to: { name: "WarehouseCustomization", params: { id: this.$route.params.id } },
        }]
      },{
        name: "Моя компания", icon: "d-icon-company", collapse: false,
        children: [{
          name: "Карточка компании", icon: "d-icon-focus", to: { name: "ProfileCard", params: { id: this.$route.params.id } },
        },{
          name: "Сотрудники", icon: "d-icon-user", to: { name: "ProfileStuff", params: { id: this.$route.params.id } },
        },{
          name: "Политики доступа", icon: "d-icon-lock-open", to: { name: "ProfileAccess", params: { id: this.$route.params.id } },
        }]
      }
    ]
    },
    sidebarItem(index) {
      this.active = this.menu[index].collapse
    //  this.active = !this.active
    //  this.menu[index].collapse = this.active
      if(this.active === true ){
        this.menu[index].collapse = false
      }else{

        for(let i=0; i<this.menu.length; i++){
          if(i != index){
            this.menu[i].collapse = false
          }else{
            this.menu[i].collapse = true
          }
      }
    }
  }
  }
}
</script>
<style lang="scss" scoped>

</style>
