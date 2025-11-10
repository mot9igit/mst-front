<template>
  <section class="warehouse-analysis" id="warehouse-analysis">
    <!-- Верхушка страницы -->
    <div class="d-top">
      <Breadcrumbs />
    </div>

    <div class="warehouse-analysis__header">
      <h1 class="warehouse-analysis__header-title">Настройки склада</h1>
    </div>
    <div class="warehouse-analysis__header-storeinfo">
        <div class="warehouse-analysis__header-storeinfo-logo">
          <img :src="storeImage" />
        </div>
        <div class="warehouse-analysis__header-storeinfo-info">
          <div class="warehouse-analysis__header-storeinfo-info-name">{{ storeName }}</div>
          <div class="warehouse-analysis__header-storeinfo-info-address"><i class="d-icon-location"></i><span>{{ storeAddress }}</span></div>
        </div>
    </div>
    <Loader v-if="loading" />
    <form @submit.prevent="saveSettigs()">
      <div v-for="(item, index) in storeSettings" :key="index">
        <h3>{{ item.name }}</h3>
        <div v-for="(value, k) in item.settings" :key="k">
          {{ value.label }}
        </div>
      </div>
      <div class="lk-about__submit-container">
        <button
      class="d-button d-button-primary d-button--no-shadow lk-staff__header-button"
      type="submit"
      >
        <i class="d-icon-plus-flat lk-staff__header-button-icon"></i>
        Сохранить настройки
      </button>
      </div>

    </form>


  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Loader from '@/shared/ui/Loader.vue'

export default {
  name: 'storeSettings',
components: { Breadcrumbs, Loader },
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

      storeName: '',
      storeImage: null,
      storeAddress: '',

      storeSettings: [],

		}
  },
  mounted() {
    this.getOrgStore().then(() => {
      this.loading = false
    })

  },
  computed: {
    ...mapGetters({
      orgStore: 'org/orgStore',

    })
  },
  methods: {
    ...mapActions({
      getOrgStore: 'org/getOrgStore',

    }),

  },
  watch: {

    orgStore: function(newVal) {

          this.storeName = newVal.name_short
          this.storeImage = newVal.image
          this.storeAddress = newVal.address
          this.storeSettings = newVal.settings.groups

    }
  }
}
</script>
<style lang="scss">
.warehouse-analysis__header-storeinfo{
  display:flex;
  width:auto;
  gap: 8px;
  align-items: start;
  margin-bottom: 40px;
}
.warehouse-analysis__header-storeinfo-logo, .warehouse-analysis__header-storeinfo-logo img{
  height: 32px;
  width:auto;
}
.warehouse-analysis__header-storeinfo-info{
  display:flex;
  flex-direction: column;
  gap: 8px;
}
@media (width >1280px) {
.warehouse-analysis__header-storeinfo-info-name{
  font-weight: 600;
  font-size: 24px;
  line-height: 31px;
  color: #282828;
}
.warehouse-analysis__header-storeinfo-info-address{
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: -0.01em;
  color: #757575;
}
}
@media (width <=1280px) {
  .warehouse-analysis__header-storeinfo-info-name {
    font-size: 14px;
    line-height: 15px;
  }
  .warehouse-analysis__header-storeinfo-info-address {
    font-size: 12px;
    line-height: 14px;
  }
}
@media (width <=1024px) {
  .warehouse-analysis__header-storeinfo-info-name {
    font-size: 12px;
    line-height: 14px;
  }
  .warehouse-analysis__header-storeinfo-info-address {
    font-size: 10px;
    line-height: 12px;
  }
}
</style>
