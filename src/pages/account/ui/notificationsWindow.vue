<template>
      <Toast />
      <Loader v-if="loading"/>



    <div class="notifications__modal-header">
      <h3>Уведомления ({{ notifications.total }})</h3>
      <div class="notifications__modal-header-buttons">
        <button
          type="button"
          href="#"
          class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
          @click.prevent="readAllNotifications()"
          v-if="new_notes.length > 0"
          >
          Прочитать все
        </button>
        <button
          type="button"
          href="#"
          class="d-button d-button--sm-shadow d-button-quaternary d-button-quaternary-small notifications__modal-cansel"
          @click.prevent="deleteNotification()"
           v-if="notifications.total != 0"
          >
          Удалить все
        </button>
      </div>
    </div>
    <div class="notifications__modal-container" v-if="notifications.total != 0">
        <h4 v-if="new_notes.length">Новые  уведомления ({{ new_notes.length }})</h4>
        <div class="notifications__modal-list notifications__modal-list-new"  v-if="new_notes.length">
          <div class="notifications__modal-item" v-for="(item, index) in new_notes" :key="index">
            <div v-if="item.read == 0">
              <div class="notifications__modal-item-header">
                <div class="notifications__modal-item-header-left">
                  <i class="d-icon-bell-solid header__notification-icon"></i>
                  <span>{{ item.date }}</span>
                </div>
                <div class="notifications__modal-item-header-right">
                  <button class="clients__card-action" @click.prevent="deleteNotification(item.id)">
                    <i class="d-icon-trash"></i>
                  </button>
                </div>
              </div>
              <div class="notifications__modal-item-content">
                <h3>{{ notificationTitle(item.namespace) }}</h3>
                <div v-html="item.chunk"></div>
              </div>
            </div>
          </div>
        </div>
        <h4 v-if="old_notes.length">Старые  уведомления ({{ old_notes.length }})</h4>
        <div class="notifications__modal-list notifications__modal-list-old"  v-if="old_notes.length">
          <div class="notifications__modal-item" v-for="(item, index) in old_notes" :key="index">
            <div v-if="item.read != 0">
              <div class="notifications__modal-item-header">
                <div class="notifications__modal-item-header-left">
                  <i class="d-icon-bell-solid header__notification-icon"></i>
                  <span>{{ item.date }}</span>
                </div>
                <div class="notifications__modal-item-header-right">
                  <button class="clients__card-action" @click.prevent="deleteNotification(item.id)">
                    <i class="d-icon-trash"></i>
                  </button>
                </div>
              </div>
              <div class="notifications__modal-item-content">
                <h3>{{ notificationTitle(item.namespace) }}</h3>
                <div v-html="item.chunk"></div>
              </div>
            </div>
          </div>
        </div>

    </div>
    <div  class="notifications__modal-container-empty" v-else>
      <div class="dart-alert dart-alert-info">Ничего не найдено</div>
    </div>


</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import Toast from 'primevue/toast'
import Paginate from 'vuejs-paginate-next'

export default {
  name: 'ProfileHeader',
  data() {
    return {
      loading: true,
      showNotificationsModal: false,
      new_notes: [],
      old_notes: [],
      page: 1,
    }
  },
  emits: ['reloadSuccess'],
  components: { Loader, Toast, Paginate },
  props: {
    reload: {
      type: Boolean,
      default: false,
    },
     pagination_items_per_page: {
      type: Number,
      default: 5,
    },
    pagination_offset: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.getNotifications().then(() => {
      this.loading = false
    })

  },
  computed: {
    ...mapGetters({
      notifications: 'notifications/notifications',
    }),

  },
  methods: {
    ...mapActions({
      getNotifications: 'notifications/getNotifications',
      readAllNotifications: 'notifications/readAllNotifications',
      deleteNotifications: 'notifications/deleteNotifications',
    }),

    notificationTitle(num){
      let title = ''
      switch (num) {
        case '1':
          title = 'Изменение статуса заказа в маркетплейсе';
          break;
        case '2':
          title = 'Поступил новый оптовый заказ';
          break;
        case '3':
          title = 'Ваша компания отключена';
          break;
        case '4':
          title = 'Ваша компания подключена';
          break;
        case '5':
          title = 'Появился новый поставщик';
          break;
        case '6':
          title = 'Появился новый поставщик';
          break;
        case '7':
          title = 'Вас добавили в поставщики';
          break;
        case '8':
          title = 'Вас удалили из поставщиков';
          break;
        case '9':
          title = 'Ваш склад отключен';
          break;
        case '10':
          title = 'Ваш склад подключен';
          break;
        case '11':
          title = 'Вам отправлено предложение оформить заказ';
          break;
        case '12':
          title = 'Ваше предложение было отклонено';
          break;
        case '13':
          title = 'Ваше предложение было принято';
          break;
      }
      return title
    },
    fetchNotification(){
      this.getNewNotification({
        data_start: this.data_start
      }).then((res) => {
                for (let i = 0; i < res.data.data?.total; i++) {
                    setTimeout(() => {
                        let title = this.notificationTitle(res.data.data.items[i].namespace);
                        this.setViewNotification({
                          item: res.data.data.items[i].id
                        })
                        this.$toast.add({ severity: 'secondary', summary: title, detail: 'Чтобы узнать подробнее, нажмите ', info: res.data.data.items[i], life: 7000 });
                    }, i * 500);
                    this.getNotifications()

                }
            });
      this.data_start = new Date();
    },
    deleteNotification(id){
      this.deleteNotifications({
        notification_id: id
      }).then((res) => {
        if(res){
          if(id){
           this.$toast.add({
                severity: 'secondary',
                summary: 'Уведомление удалено!',
                detail: 'Вы успешно удалили уведомление ',
                life: 3000 });
            }else{
              this.$toast.add({
                severity: 'secondary',
                summary: 'Уведомления удалены!',
                detail: 'Вы успешно удалили все уведомления ',
                life: 3000 });
            }
        }else{
          this.$toast.add({
                severity: 'error',
                summary: 'Не удалось удалить уведомления!',
                detail: 'Произошла ошибка',
                life: 3000 });
        }
        this.getNotifications()
      })
    },


  },
  watch: {
    notifications: function(newVal){
      this.new_notes = []
      this.old_notes = []
     if(newVal.items.length){
      for (let i = 0; i < newVal.items.length; i++) {
        if(newVal.items[i].read == 0){
          this.new_notes.push(newVal.items[i])
        }else{
          this.old_notes.push(newVal.items[i])
        }
      }
    }else{
      this.new_notes = []
      this.old_notes = []
    }
    },
    reload: function(newVal){
      if(newVal == true){
        this.getNotifications().then(() => {
          this.$emit('reloadSuccess')
        })
      }
    }
  },
}
</script>
<style lang="scss">

.notifications__modal-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -24px;
}
.notifications__modal-header-buttons{
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 8px;
  max-width: 350px;
  width:320px;
  margin-right: 42px;
}
.notifications__modal-header-buttons button{
  min-width: calc(50% - 4px);
  max-width: calc(50% - 4px);
  width: calc(50% - 4px);
  font-size: 16px;
  font-weight: 500;
}
.notifications__modal-cansel{
  color: #757575;
}
.notifications__modal-container{
  width: 100%;
  padding-right: 20px;
}
.notifications__modal-container h4{
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #757575;
  margin: 20px 0;

}
.notifications__modal-list{
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.notifications__modal-item{
  width: 100%;
  height: auto;
  min-height: 115px;
  background-color: #ffffff85;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 16px 16px 16px 19px;
  position: relative;
}
.notifications__modal-list-new .notifications__modal-item:after{
  content: '';
  position:absolute;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  top: 5px;
  left: 5px;
  background-color:#f92c0d;

}
.notifications__modal-item-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.notifications__modal-list .header__notification-icon{
  width:20px;
  height:20px;
  font-size: 14px;
}
.notifications__modal-list-new .header__notification-icon{
   color:#f92c0d
}
.notifications__modal-list-old .header__notification-icon{
   color:#757575;
}
.notifications__modal-item-header-left{
  font-weight: 500;
  font-size: 12px;
  line-height: 123%;
  color: #757575;
}
.notifications__modal-item .std-notification__header,.notifications__modal-item h6,.notifications__modal-item .std-notification__span{
  display:none;
}
.notifications__modal-item .std-notification__content{
  margin-top: 8px;
  color: #757575;
}
.notifications__modal-container-empty{
  margin-top:30px;
}
</style>
