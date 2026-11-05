<template>
  <div class="post-order-window">
    <div class="post-order-window__header">
      <h2 class="post-order-window__title">Заказ №{{ order?.id || '-' }}</h2>
      <div
        v-if="statusName"
        class="cell--status post-order-window__status"
        :style="statusStyle"
        :class="statusClass"
      >
        {{ statusName }}
      </div>
    </div>

    <div class="post-order-window__info-block">
      <h3 class="post-order-window__info-title">Информация о заказе</h3>
      <div class="post-order-window__info">
        <div v-for="item in infoItems" :key="item.label" class="post-order-window__info-item">
          <div class="post-order-window__info-label">{{ item.label }}</div>
          <div class="post-order-window__info-value">{{ item.value || '-' }}</div>
          <div v-if="item.details?.length" class="post-order-window__details">
            <div
              v-for="detail in item.details"
              :key="detail.label"
              class="post-order-window__detail"
            >
              <div class="post-order-window__detail-label">{{ detail.label }}</div>
              <div class="post-order-window__detail-value">
                <span>{{ detail.value || '-' }}</span>
                <InfoTooltip v-if="detail.tooltip" :text="detail.tooltip" copyable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3 class="post-order-window__subtitle">Состав заказа</h3>
    <BaseTable
      :items_data="products"
      :total="products.length"
      :pagination_items_per_page="products.length || 1"
      :pagination_offset="0"
      :page="1"
      :show_filter="false"
      :table_data="products_table_data"
    />

    <div class="collection__modal-buttons">
      <button
        type="button"
        class="d-button d-button-primary d-button--sm-shadow clients__filters-create"
        @click="$emit('cancel')"
      >
        Ок
      </button>
    </div>
  </div>
</template>

<script>
import BaseTable from '@/shared/ui/table/table.vue'
import InfoTooltip from '@/shared/ui/InfoTooltip.vue'

function firstValue(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '') ?? ''
}

function splitDimensions(value) {
  if (!value || typeof value !== 'string') return []
  const parts = value
    .split(/[x×х*]/i)
    .map((part) => part.trim())
    .filter(Boolean)
  return parts.length === 3 ? parts : []
}

function normalizeColor(value) {
  return value ? String(value).replace(/^#/, '') : ''
}

export default {
  name: 'PostOrderWindow',
  components: {
    BaseTable,
    InfoTooltip,
  },
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['cancel'],
  data() {
    return {
      products_table_data: {
        image: {
          label: 'Фото',
          type: 'image',
          class: 'cell_centeralign',
        },
        name: {
          label: 'Наименование',
          type: 'text',
          class: 'cell_centeralign',
        },
        article: {
          label: 'Артикул',
          type: 'text',
          class: 'cell_centeralign',
        },
        count: {
          label: 'Кол-во',
          type: 'text',
          class: 'cell_centeralign',
        },
        height: {
          label: 'Высота (ед.)',
          type: 'text',
          class: 'cell_centeralign',
        },
        width: {
          label: 'Ширина (ед.)',
          type: 'text',
          class: 'cell_centeralign',
        },
        depth: {
          label: 'Глубина (ед.)',
          type: 'text',
          class: 'cell_centeralign',
        },
        volume: {
          label: 'Объём (ед.)',
          type: 'text',
          class: 'cell_centeralign',
        },
        weight_netto: {
          label: 'Вес нетто (ед.)',
          type: 'text',
          class: 'cell_centeralign',
        },
        weight_brutto: {
          label: 'Вес брутто (ед.)',
          type: 'text',
          class: 'cell_centeralign',
        },
      },
    }
  },
  computed: {
    statusSource() {
      const status = this.order?.status
      if (status && typeof status === 'object') return status
      const orderStatus = this.order?.order_status
      if (orderStatus && typeof orderStatus === 'object') return orderStatus
      return {}
    },
    statusName() {
      return firstValue(
        this.order?.status_name,
        this.statusSource?.name,
        typeof this.order?.status === 'string' ? this.order.status : '',
      )
    },
    statusKey() {
      return firstValue(this.order?.status_key, this.statusSource?.api_key)
    },
    statusClass() {
      return this.statusKey ? 'cell--status-' + this.statusKey : ''
    },
    statusStyle() {
      const style = {}
      const backgroundColor = normalizeColor(
        firstValue(this.order?.status_color, this.statusSource?.color),
      )
      if (backgroundColor) style.backgroundColor = '#' + backgroundColor
      const color = firstValue(
        this.order?.color_text,
        this.order?.status_color_text,
        this.statusSource?.color_text,
        this.statusSource?.status_color_text,
      )
      if (color) style.color = color
      return style
    },
    pickupPoint() {
      return firstValue(
        this.order?.pickup_point,
        this.order?.pvz,
        this.order?.delivery_point,
        'Ближайший 5POST',
      )
    },
    managerInfo() {
      if (!this.order?.logistic_manager_id) return ''
      const email = firstValue(this.order?.logistic_manager_email, '-')
      const phone = firstValue(this.order?.logistic_manager_phone, '-')
      return `email: ${email}, к.т.: ${phone}`
    },
    cargoReceiver() {
      return this.formatPerson(
        firstValue(
          this.order?.logistic_manager,
          this.order?.logistic_manager_name,
          this.order?.receiver,
          this.order?.responsible,
          this.order?.manager,
        ),
      )
    },
    infoItems() {
      return [
        {
          label: 'Тип доставки',
          value: 'МС Логистика Х5',
          details: [
            {
              label: 'Пункт выдачи',
              value: this.pickupPoint,
            },
            {
              label: 'Ответственный за получение груза',
              value: this.cargoReceiver,
              tooltip: this.managerInfo,
            },
          ],
        },
        {
          label: 'Склад отправителя',
          value: this.formatStore(firstValue(this.order?.seller_address, this.order?.seller_store)),
        },
        {
          label: 'Склад покупателя',
          value: this.formatStore(firstValue(this.order?.buyer_address, this.order?.buyer_store)),
        },
        {
          label: 'Маршрут',
          value: firstValue(this.order?.way, this.order?.route, this.order?.route_name),
        },
        {
          label: 'Дата доставки',
          value: firstValue(this.order?.delivery_date, this.order?.date, this.order?.shipping_date),
        },
      ]
    },
    products() {
      const raw = firstValue(
        this.order?.products,
        this.order?.items,
        this.order?.order_products,
        this.order?.products_list,
      )
      const list = Array.isArray(raw)
        ? raw
        : raw && typeof raw === 'object'
          ? Object.values(raw)
          : []
      return list.map((product, index) => this.normalizeProduct(product, index))
    },
  },
  methods: {
    normalizeProduct(product, index) {
      const item = product || {}
      const source = {
        ...(item.product && typeof item.product === 'object' ? item.product : {}),
        ...item,
      }
      const params = source.params || source.parameters || source.characteristics || {}
      const dimensions =
        source.dimensions && typeof source.dimensions === 'object' ? source.dimensions : {}
      const size = splitDimensions(firstValue(source.dimensions, source.size, source.gabarites))
      return {
        ...source,
        id: firstValue(source.id, item.id, index),
        image: firstValue(source.image, source.photo, source.product_image, source.preview),
        name: firstValue(source.name, source.product_name, source.title),
        article: firstValue(source.article, source.vendor_code, source.sku),
        count: firstValue(source.count, source.quantity, source.qty),
        height: firstValue(
          source.height,
          source.height_cm,
          source.product_height,
          dimensions.height,
          params.height,
          size[0],
        ),
        width: firstValue(
          source.width,
          source.width_cm,
          source.product_width,
          dimensions.width,
          params.width,
          size[1],
        ),
        depth: firstValue(
          source.depth,
          source.depth_cm,
          source.product_depth,
          source.length,
          dimensions.depth,
          dimensions.length,
          params.depth,
          params.length,
          size[2],
        ),
        volume: firstValue(
          source.volume,
          source.volume_m3,
          source.cube,
          source.capacity,
          params.volume,
        ),
        weight_netto: firstValue(source.weight_netto, params.weight_netto),
        weight_brutto: firstValue(source.weight_brutto, params.weight_brutto),
      }
    },
    formatStore(store) {
      if (!store) return ''
      if (Array.isArray(store)) {
        return store
          .map((item) => this.formatStore(item))
          .filter(Boolean)
          .join(', ')
      }
      if (typeof store === 'object') {
        return firstValue(
          store.address,
          store.address_short,
          store.name,
          store.name_short,
          store.org_name,
        )
      }
      return store
    },
    formatPerson(person) {
      if (!person) return ''
      if (typeof person === 'object') {
        return firstValue(person.name, person.full_name, person.fio, person.title, person.email)
      }
      return person
    },
  },
}
</script>

<style lang="scss" scoped>
.post-order-window {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-right: 32px;
  }

  &__title {
    margin: 0;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: -0.01em;
    color: #282828;
  }

  &__status {
    font-size: 12px;
    line-height: 14px;
    padding: 4px 12px;
    font-weight: 600;
    border-radius: 41px;
    display: inline-block;
  }

  &__info-block {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__info-title {
    margin: 0;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #757575;
  }

  &__info {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    padding-bottom: 24px;
    border-bottom: 0.5px solid #75757575;
  }

  &__info-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 16px;
    border-left: 0.5px solid #75757575;
  }

  &__info-item:first-child {
    padding-left: 0;
    border-left: none;
  }

  &__info-label {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
  }

  &__info-value {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: #282828;
    white-space: pre-wrap;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 12px;
  }

  &__detail {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__detail-label {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
  }

  &__detail-value {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #282828;
  }

  &__subtitle {
    margin: 0;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #282828;
  }

  :deep(.v-table) {
    margin: 0;
  }

  :deep(.d-table__wrapper) {
    margin-top: 0;
  }

  @media (width <= 1024px) {
    &__info {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      row-gap: 24px;
    }

    &__info-item {
      padding: 0 12px;
    }

    &__info-item:nth-child(odd) {
      padding-left: 0;
      border-left: none;
    }
  }

  @media (width <= 600px) {
    &__info {
      grid-template-columns: minmax(0, 1fr);
    }

    &__info-item {
      padding: 16px 0 0;
      border-top: 0.5px solid #75757575;
      border-left: none;
    }

    &__info-item:first-child {
      padding-top: 0;
      border-top: none;
    }
  }
}
</style>
