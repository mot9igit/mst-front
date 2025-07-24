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
                            <a href="/" class="sidebar__item-list-item-content">
                              <i class="sidebar__item-list-item-icon d-icon-doc" v-if="subitem.icon == '' || subitem.icon == undefined"></i>
                              <i class="sidebar__item-list-item-icon" v-else :class="subitem.icon"></i>
                              {{ subitem.name }}
                            </a>
                          </li>
                        </ul>
                      </li>

								</ul>
							</nav>
</template>
<script>
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
  methods: {
    getMenu(){
      return [{
        name: "Закупки", icon: "d-icon-cube", collapse: true,
        children: [{
          name: "Оптовый каталог", icon: "d-icon-doc",
        },{
          name: "Мои заказы", icon: "d-icon-cart",
        },{
          name: "Мои поставщики", icon: "d-icon-cube",
        }]

      },{
        name: "Оптовые продажи", icon: "d-icon-bag", collapse: false,
        children: [{
          name: "Заказы", icon: "d-icon-doc",
        },{
          name: "Оптовые цены", icon: "d-icon-cart",
        },{
          name: "Клиенты", icon: "d-icon-people",
        },{
          name: "Отгрузки", icon: "d-icon-truck",
        }]
      },{
        name: "Розничные продажи", icon: "d-icon-sales", collapse: false,

        children: [{
          name: "Заказы", icon: "d-icon-doc",
        },{
          name: "Акции", icon: "d-icon-percent-rounded",
        },{
          name: "Баланс", icon: "d-icon-wallet",
        },{
          name: "Сопоставление товаров", icon: "d-icon-shuffle",
        }]
      },{
        name: "Мой склад", icon: "d-icon-boxes-2", collapse: false,

        children: [{
          name: "Анализ склада", icon: "d-icon-line-chart",
        },{
          name: "Коллекции товара", icon: "d-icon-layers",
        },{
          name: "Настройки склада", icon: "d-icon-conveyor",
        }]
      },{
        name: "Моя компания", icon: "d-icon-company", collapse: false,
        children: [{
          name: "Карточка компании", icon: "d-icon-focus",
        },{
          name: "Сотрудники", icon: "d-icon-user",
        },{
          name: "Политики доступа", icon: "d-icon-lock-open",
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
