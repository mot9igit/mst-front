<template>
  <Toast />
  <section class="promo sale_page shipments order_content" id="promo">
    <Loader v-if="loading" />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
    </div>

    <div class="promo__cards-wrap">
      <div class="dart-row">
        <div class="d-col-md-12">
          <div class="promotions__card promotions__card--height">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-lines promotions__card-icon"></i>
                <p class="promotions__card-title">Контент акции</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="promotions__card-values">
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Название акции:</span>
                  <p class="promotions__card-value promotions__card-value--bold">
                    x3x3x3x3x3x3x3x3x3
                  </p>
                </div>
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Описание акции:</span>
                  <p class="promotions__card-value">x3x3x3x3x3x3x3x3x3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-col-md-12">
          <div class="promotions__card promotions__card--height">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-lines promotions__card-icon"></i>
                <p class="promotions__card-title">Контент акции</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="promotions__card-values">
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Название акции:</span>
                  <p class="promotions__card-value promotions__card-value--bold">
                    x3x3x3x3x3x3x3x3x3
                  </p>
                </div>
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Описание акции:</span>
                  <p class="promotions__card-value">x3x3x3x3x3x3x3x3x3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="promo__cards-wrap">
      <div class="dart-row">
        <div class="d-col-md-12">
          <div class="promotions__card promotions__card--height">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-lines promotions__card-icon"></i>
                <p class="promotions__card-title">Контент акции</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="promotions__card-values">
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Название акции:</span>
                  <p class="promotions__card-value promotions__card-value--bold">
                    x3x3x3x3x3x3x3x3x3
                  </p>
                </div>
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Описание акции:</span>
                  <p class="promotions__card-value">x3x3x3x3x3x3x3x3x3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-col-md-12">
          <div class="promotions__card promotions__card--height">
            <div class="promotions__card-header">
              <div class="promotions__card-header-left">
                <i class="d-icon-lines promotions__card-icon"></i>
                <p class="promotions__card-title">Контент акции</p>
              </div>
            </div>
            <div class="promotions__card-content">
              <div class="promotions__card-values">
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Название акции:</span>
                  <p class="promotions__card-value promotions__card-value--bold">
                    x3x3x3x3x3x3x3x3x3
                  </p>
                </div>
                <div class="promotions__card-value-container">
                  <span class="promotions__card-label">Описание акции:</span>
                  <p class="promotions__card-value">x3x3x3x3x3x3x3x3x3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Toast from 'primevue/toast'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DashBoard',
  components: { Loader, breadcrumbs, Toast, customModal },

  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),
  },
  watch: {},
}
</script>
<style lang="scss">
.sale_page {
  .dart-row {
    margin-bottom: 32px;
  }
  .d-col-xl-6 {
    min-width: 30%;
    width: 30%;
  }
  .p-inputtext {
    border-color: #75757575;
    box-shadow: 0px 1px 0px 0px #75757575;
    width: 100%;
  }
  .p-floatlabel label {
    color: #757575;
  }
  .form_input_group:after {
    content: '\e01d';
    font-family: 'Iconly' !important;
    position: absolute;
    font-size: 16.8px;
    top: calc(50% - 8.4px);
    right: 20px;
    color: #757575;
  }
}
.promo__cards-wrap {
  & + .promo__cards-wrap {
    margin-top: 16px;
  }
  .dart-row {
    margin-left: 0;
    margin-right: 0;
  }
}
.promotions__card {
  height: auto;
  box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
  &.promotions__card--height {
    height: 100%;
  }
  & + .promotions__card {
    margin-top: 16px;
  }
}
.promotions__card-header {
  border-radius: 12px 12px 0 0;
  border-bottom: 0.3px solid #75757575;
}
.promo__cards-item-values-fractions {
  width: 370px;
}
.d-fractions__item-text,
.d-fractions__item-text--bottom {
  text-align: center;
  width: 100%;
}
.promo__cards-item-values-fractions {
  gap: 20px;
}
.d-fractions__item-block {
  width: 100%;
}
.promo__cards-date-container {
  width: 100%;
  min-width: 300px;
}
.promo__card-block-value {
  width: 145px;
}
.promotions__card-last .promotions__card-block-inner {
  gap: 0;
}
.promotions__card-last .promo__card-block-title-container,
.promotions__card-last .promo__card-block-description,
.promotions__card-last .promo__card-block-value {
  width: auto;
}
.promo__cards-date-container .d-fractions__item {
  min-width: 70px;
}
@media (width <= 1200px) {
  .promo__card-block-description,
  .promo__cards-item-conds-value-total {
    font-size: 14px;
  }
  .promotions__card-header {
    border-radius: 6px 6px 0 0;
  }
  .promo__cards-item-date-values {
    flex-direction: column;
    gap: 12px;
  }
  .promo__cards-date-container .d-fractions__item {
    min-width: 100px;
  }
}
@media (width <= 800px) {
  .promo__cards-item-values {
    gap: 24px;
  }
  .promo__cards-date-container .d-fractions__item {
    min-width: 70px;
  }
  .promo__cards-item-date-values {
    flex-direction: row;
    gap: 12px;
  }
  .promo__cards-item-date-values .promo__cards-item-conds-value {
    gap: 12px;
  }
}
.promo-master__footer {
  position: fixed;
  bottom: 0;
  left: 0;
}
.promo-master__content {
  padding-bottom: 60px;
}
.promo-master {
  padding-top: 115px;
}
.promo-modal__header {
  position: absolute;
  z-index: 1001;
}
.promotions .promotions__card,
.promotions .promotions__card-container {
  height: 100%;
}
.sale_seeall-button {
  width: 100%;
  margin: 40px 0 24px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.sale_seeall-button p {
  color: #757575;
  width: 35%;
}
@media (width <= 780px) {
  .promo .v-table {
    display: block;
  }
}
</style>
