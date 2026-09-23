<template>
  <section class="promo sale_page program" id="program">
    <div class="d-top">
      <breadcrumbs />
    </div>

    <div
      class="promos__banners-item promos__banners-item--primary promos__banners-item--big promo__banner program__banner"
      v-if="program"
    >
      <img
        :src="program.banner"
        class="promos__banners-item-image"
        loading="lazy"
      />
      <div class="promos__banners-item-badges">
        <div class="promos__banners-item-badges-item">Программа мотивации</div>
        <span class="promos__banners-item-badges-text">0+</span>
      </div>
    </div>

    <div class="program__grid" v-if="program">
      <div class="promotions__card program__grid-descr">
        <div class="promotions__card-header">
          <div class="promotions__card-header-left">
            <i class="d-icon-lines promotions__card-icon"></i>
            <p class="promotions__card-title">Описание</p>
          </div>
        </div>
        <div class="promotions__card-content">
          <div class="promotions__card-values">
            <div class="promotions__card-value-container">
              <span class="promotions__card-label">Название программы:</span>
              <p class="promotions__card-value promotions__card-value--bold">
                {{ program.label }}
              </p>
            </div>
            <div class="promotions__card-value-container">
              <span class="promotions__card-label">Описание программы:</span>
              <p class="promotions__card-value" v-html="program.description"></p>
            </div>
          </div>
        </div>
      </div>

      <div class="promotions__card">
        <div class="promotions__card-header">
          <div class="promotions__card-header-left">
            <i class="d-icon-company promotions__card-icon"></i>
            <p class="promotions__card-title">Организатор</p>
          </div>
        </div>
        <div class="promotions__card-content promo__cards-item-content promo__cards-item-content--small">
          <div class="promotions__card-values promotions__card-values--md-long promo__cards-item-values">
            <div class="promotions__card-value-container">
              <span class="promotions__card-label">Организатор:</span>
              <p class="d-badge2 d-badge2--fit order__item-header-badge program__card-badge">
                <span class="order__item-header-badge-image-container">
                  <img :src="program.image" class="order__item-header-badge-image" :alt="program.name" />
                </span>
                <span class="order__item-header-badge-text">{{ program.name }}</span>
              </p>
            </div>
            <div class="promotions__card-value-container">
              <span class="promotions__card-label">Исполнитель:</span>
              <p class="d-badge2 d-badge2--fit order__item-header-badge program__card-badge program__card-badge--executor">
                <span class="order__item-header-badge-image-container">
                  <img src="/images/favicon/favicon - light.png" class="order__item-header-badge-image" alt="ООО «МС»" />
                </span>
                <span class="order__item-header-badge-text">ООО «МС»</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="promotions__card">
        <div class="promotions__card-header">
          <div class="promotions__card-header-left">
            <i class="d-icon-calendar3 promotions__card-icon"></i>
            <p class="promotions__card-title">Даты проведения</p>
          </div>
        </div>
        <div class="promotions__card-content promo__cards-item-content promo__cards-item-content--small">
          <div class="promotions__card-values promotions__card-values--md-long promo__cards-item-values promo__cards-item-date-values">
<div class="promotions__card-info">
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label d-md-max-content">Срок проведения:</span>
                    <div class="promotions__card-value promotions__card-value--bold promotions__card-delivery-conds-value promo__cards-item-conds-value">
                      <div class="promo__cards-item-conds-value-content">
                        <span>с {{ programDates.from }}</span>
                        <div class="d-divider d-divider--vertical d-divider--no-margin promo__cards-item-conds-value-divider"></div>
                        <span>до {{ programDates.to }}</span>
                      </div>
                      <p class="promo__cards-item-conds-value-total">{{ programDates.days }} дн.</p>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>

    <div class="program__products-title" v-if="program">Вознаграждение</div>

    <BaseTable
      v-if="program"
      class="program__table"
      :items_data="programProducts"
      :total="programProducts.length"
      :table_data="programTableData"
      :pagination_items_per_page="100"
      :show_filter="false"
    />

    <div class="program__empty" v-if="!program">Программа не найдена</div>
  </section>
</template>
<script>
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import BaseTable from '@/shared/ui/table/table.vue'
import {
  motivationCatalogItems,
  motivationConnectedItems,
  trackProducts,
  interskolProducts,
} from '@/shared/api/motivationPrograms'

export default {
  name: 'profileMotivationProgram',
  components: { breadcrumbs, BaseTable },
  data() {
    return {
      motivationCatalogItems,
      motivationConnectedItems,
      programDates: {
        from: '1 октября 2026 г.',
        to: '31 декабря 2026 г.',
        days: 92,
      },
      programTableData: {
        image: {
          label: 'Фото',
          type: 'image',
        },
        name: {
          label: 'Товар',
          type: 'text',
          description: { type: 'field', key: 'article' },
        },
        price_rrc: {
          label: 'РРЦ',
          type: 'text',
        },
        reward: {
          label: 'Вознаграждение',
          type: 'text',
        },
      },
    }
  },
  computed: {
    program() {
      const { source, program_id } = this.$route.params
      const list =
        source === 'connected' ? this.motivationConnectedItems : this.motivationCatalogItems
      return list.find((item) => item.id === Number(program_id))
    },
    programProducts() {
      if (!this.program) return []
      const source =
        this.program.name.toLowerCase() === 'трек' ? trackProducts : interskolProducts
      const percent = this.program.percent || 0
      return source.map((item) => ({
        id: item.id,
        image: item.image,
        name: item.name,
        article: item.article,
        price_rrc: new Intl.NumberFormat('ru-RU').format(item.price),
        reward: new Intl.NumberFormat('ru-RU').format(Math.round((item.price * percent) / 100)),
      }))
    },
  },
}
</script>
<style lang="scss">
.program {
  &__banner {
    max-height: 360px;
    overflow: hidden;

    .promos__banners-item-image {
      max-height: 360px;
      object-fit: cover;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto;
    gap: 16px;
    align-items: stretch;

    .promotions__card {
      height: auto;
      margin-top: 0 !important;

      &-content {
        height: 100%;
      }
    }

    &-descr {
      grid-row: 1 / 3;
    }
  }

  &__products-title {
    margin: 48px 0 24px;
    padding-left: 4px;
    font-size: 22px;
    font-weight: 600;
    line-height: 28px;
    color: #282828;
  }

  &__table {
    margin-top: 0;

    .d-table__head-col,
    .d-table__col {
      text-align: center;
    }

    .cell_value {
      justify-content: center;
    }

    .cell_description {
      font-size: 12px;
      font-weight: 300;
      color: #757575;
      text-align: center;
    }

    .img_abs {
      display: flex;
      justify-content: center;
    }
  }

  &__card-badge {
    background: #ededed;
    color: #282828;
    padding: 3px 12px;
    min-width: 0;
    gap: 8px;

    &--executor {
      justify-content: flex-start;
      margin-right: auto;
    }

    .order__item-header-badge-image-container {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .order__item-header-badge-image {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      object-fit: cover;
    }

    .order__item-header-badge-text {
      font-weight: 700;
      font-size: 15px;
      line-height: 20px;
      color: #282828;
    }
  }

  &__empty {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
    padding-top: 40px;
  }

  @media (width < 800px) {
    &__grid {
      grid-template-columns: 1fr;

      &-descr {
        grid-row: auto;
      }
    }
  }
}
</style>