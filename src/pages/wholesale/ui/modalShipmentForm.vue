<template>
  <div class="shippings__modal-header">
    <h2 class="shippings__modal-header-title">
      <span v-if="mode == 0">Отгрузка №{{ ship?.id }}</span>
      <span v-else>Редактирование отгрузки №{{ ship?.id }}</span>
    </h2>
    <div class="shippings__modal-header-actions" v-if="mode == 0">
      <i class="d-icon-pen2" @click="this.$emit('editMode')"></i>
      <div class="d-divider d-divider--big d-divider--vertical"></div>
      <i class="d-icon-trash" @click="this.$emit('deleteShip')"></i>
    </div>
  </div>

  {{ ship }}
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import { toRaw } from 'vue'
import DatePicker from 'primevue/datepicker'

export default {
  name: 'modalShipmentForm',
  data() {
    return {
      loading: true,
    }
  },
  props: {
    ship: {
      type: Object,
      default: () => {
        return {}
      },
    },
    mode: {
      type: Number,
      default: 0,
    },
  },
  emits: ['editShip', 'editMode', 'deleteShip'],
  components: { Loader, DatePicker },
  mounted() {},
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
  },
  watch: {},
}
</script>
<style lang="scss">
.shippings__modal {
  &-header {
    display: flex;

    align-items: center;
    justify-content: space-between;
    margin-top: -24px;

    &-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 26px;
      letter-spacing: -0.01em;
      color: #282828;
    }
    &-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-right: 24px;
      i {
        width: 16px;
        height: 16px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .d-divider {
        margin: 0;
        height: 8px;
      }
    }
  }
}
</style>
