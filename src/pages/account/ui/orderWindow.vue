<template>
  <Toast />
  <div class="d-sheet__overlay order__sheet-overlay" :class="{ active: active }">
    <div class="d-sheet__wrapper order__sheet-wrapper">
      <div
        class="d-sheet d-sheet--active order__sheet"
        :class="{ order: order }"
        data-sheet="order"
        :data-order="order"
      >
        <Loader v-if="this.loading"></Loader>
        <div class="d-sheet__content order" v-if="!order">
          <!-- Шапка -->
          <div class="order__header">
            <h3 class="order__header-title">Оформление заказа</h3>
            <button class="order__header-close" @click.prevent="close()">
              <i class="d-icon-times-flat"></i>
            </button>
          </div>

          <!-- Информация о плательщике -->
          <!--
          <div class="order__info">
            <div class="order__info-left">
              <div class="order__info-item">
                <p class="order__info-item-label">
                  Ваше юридическое лицо для заказа:&nbsp;
                  <span class="order__info-item-value">ООО «МСТ»</span>
                </p>
              </div>
              <div class="order__info-item">
                <p class="order__info-item-label">
                  ИНН:&nbsp;
                  <span class="order__info-item-value">7743255403</span>
                </p>
              </div>
            </div>
            <div class="order__info-right">
              <button class="order__info-edit">
                <i class="d-icon-pen2"></i>
              </button>
            </div>
          </div>
          -->
          <!-- Список товаров -->
          <div class="order__item-list" v-if="Object.keys(basketStore).length > 1">
            <div
              v-for="(org, org_id) in basketStore.data"
              :key="org_id"
              class="order__item-list-cont"
            >
              <div
                class="order__item"
                v-for="(warehouse, warehouse_id) in org.data"
                :key="warehouse_id"
              >
                <div class="mst__alert blue" v-if="warehouse.type == 'order' && warehouse.data">
                  <router-link
                    :to="{
                      name: 'purchasesOrder',
                      params: {
                        id: this.$route.params.id,
                        order_id: warehouse.id,
                      },
                    }"
                  >
                    В данный момент вы редактируете "Заказ #{{ warehouse.id }}"
                  </router-link>
                </div>
                <div class="mst__alert blue" v-if="warehouse.type == 'offer' && warehouse.data">
                  <router-link
                    :to="{
                      name: 'purchasesOffer',
                      params: {
                        id: this.$route.params.id,
                        offer_id: warehouse.id,
                      },
                    }"
                  >
                    В данный момент вы редактируете "Предложение #{{ warehouse.id }}"
                  </router-link>
                </div>
                <div class="order__item-header">
                  <div class="order__item-header-top">
                    <div class="order__item-header-left">
                      <div class="d-badge2 d-badge2--fit order__item-header-badge">
                        <div class="order__item-header-badge-image-container">
                          <img
                            :src="org.org_data.image"
                            :alt="org.org_data.name"
                            class="order__item-header-badge-image"
                          />
                        </div>
                        <p class="order__item-header-badge-text">{{ org.org_data.name }}</p>
                      </div>
                      <div class="d-divider d-divider--vertical order__item-header-divider"></div>
                      <div class="order__item-header-warehouse">
                        <p class="order__item-header-warehouse-label">Склад #{{ warehouse_id }}:</p>
                        <p class="order__item-header-warehouse-value">
                          {{
                            warehouse.warehouse_data.address_short
                              ? warehouse.warehouse_data.address_short
                              : warehouse.warehouse_data.address
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="order__item-header-right">
                      <a
                        href="#"
                        class="order__item-header-delete"
                        @click.prevent="
                          () => {
                            this.showClearBasketModal = true
                            this.id_clear_org = org.org_data.id
                            this.id_clear_store = warehouse_id
                          }
                        "
                      >
                        <i class="d-icon-trash"></i>
                      </a>
                    </div>
                  </div>
                  <div class="order__item-header-bottom">
                    <div class="order__item-header-address">
                      <i class="d-icon-location-flat order__item-header-icon"></i>
                      <p class="order__item-header-address-label">Адрес доставки:&nbsp;</p>
                      <p class="order__item-header-address-value">
                        {{
                          basketStore.store_data.name_short
                            ? basketStore.store_data.name_short
                            : basketStore.store_data.name
                        }},
                        {{
                          basketStore.store_data.address_short
                            ? basketStore.store_data.address_short
                            : basketStore.store_data.address
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="d-divider d-divider--full d-divider--big order__item-divider"></div>
                <div
                  class="order__item-content"
                  :class="{ 'order__item-noactive': product.count > Number(product.available) }"
                  v-for="(product, product_key) in warehouse.data"
                  :key="product_key"
                >
                  <div class="order__item-content-top">
                    <div class="order__item-product">
                      <div class="order__item-product-image-container">
                        <img
                          :src="product.image"
                          :alt="product.name"
                          class="order__item-product-image"
                        />
                      </div>
                      <div class="order__item-product-content">
                        <p class="order__item-product-title">
                          {{ product.name }}
                        </p>
                        <div class="order__item-product-additional">
                          <p class="order__item-product-article">Арт: {{ product.article }}</p>
                          <!-- <div class="order__item-product-discount">Скидка 27%</div> -->
                        </div>
                      </div>
                    </div>
                    <div class="order__item-content-top-right">
                      <span class="order__item-product-price nowrap" v-if="product.cost > 0"
                        >{{ product.cost.toLocaleString('ru') }} ₽</span
                      >
                      <div class="order__item-product-price-rrc">
                        <p v-if="product.prices.rrc_discount > 0">
                          -{{ product.prices.rrc_discount.toLocaleString('ru') }}% от РРЦ
                        </p>
                        <p v-else class="cart-no-discount">Без скидки от РРЦ</p>
                        <p v-if="product.price > 0">
                          {{ product.price.toLocaleString('ru') }} ₽ за ед.
                        </p>
                      </div>
                      <Counter
                        :classPrefix="'order__item-product'"
                        @ElemCount="ElemCount"
                        :item="{ basket, product }"
                        :mini="true"
                        :min="0"
                        :max="Number(product?.available)"
                        :value="Number(product?.count)"
                        :step="Number(product?.multiplicity ? product?.multiplicity : 1)"
                        :id="Number(product?.remain_id)"
                        :key="new Date().getTime() + '_' + product?.key"
                      />
                    </div>
                    <a
                      href="#"
                      class="cart__item-header-button"
                      @click="
                        clearBasketProduct(org.org_data.id, warehouse_id, product_key, product)
                      "
                    >
                      <i class="d-icon-trash"></i>
                    </a>
                  </div>
                  <div class="order__item-price">
                    <Counter
                      :classPrefix="'order__item-product'"
                      @ElemCount="ElemCount"
                      :item="{ basket, product }"
                      :mini="true"
                      :min="0"
                      :max="Number(product?.available)"
                      :value="Number(product?.count)"
                      :step="Number(product?.multiplicity ? product?.multiplicity : 1)"
                      :id="Number(product?.remain_id)"
                      :key="new Date().getTime() + '_1_' + product?.key"
                    />
                    <div class="order__item-product-price nowrap">
                      <p v-if="product.cost > 0">{{ product.cost.toLocaleString('ru') }} ₽</p>
                      <div class="order__item-product-price-rrc">
                        <p v-if="product.cost.rrc_discount > 0">
                          -{{ product.prices.rrc_discount.toLocaleString('ru') }}% от РРЦ
                        </p>
                        <p v-else class="cart-no-discount">Без скидки от РРЦ</p>
                        <p v-if="product.price > 0">
                          {{ product.price.toLocaleString('ru') }} ₽ за ед.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="cart__item-sales"
                    v-if="
                      (product.action?.length && !product.triggers.length) ||
                      (product.action?.length &&
                        product.triggers.length &&
                        org.cart_data.enabled.length &&
                        product.triggers.filter((item) => org.cart_data.enabled?.includes(item))
                          .length)
                    "
                  >
                    <button
                      class="cart__item-sales-label"
                      @click.prevent="salesActive(product.key)"
                      :class="{ 'cart__item-sales-label-open': sales_active[product.key] == true }"
                    >
                      Примененные акции<i
                        class="d-icon-angle-rounded-bottom product-card__seller-button-icon"
                        :class="{
                          'product-card__seller-button-icon-open':
                            sales_active[product.key] == true,
                        }"
                      ></i>
                    </button>
                    <div
                      class="cart__item-sales-container"
                      v-if="sales_active[product.key] == true"
                    >
                      <div
                        class="cart__item-sales-item"
                        v-for="(sale, ind) in product.action"
                        :key="ind"
                      >
                        <!-- <a class="cart__item-sales-item-name" :href="'/' + $route.params.id + '/purchases/actions/' + sale.id" tagret="_blank">{{ sale.name }}</a> -->
                        <router-link
                          v-if="sale.enabled == 1"
                          target="_blank"
                          :to="{
                            name: 'purchasesAction',
                            params: { action_id: sale.action_id },
                          }"
                        >
                          <p class="cart__item-sales-item-name">{{ sale.name }}</p>
                        </router-link>
                        <p class="cart__item-sales-item-values" v-if="sale.enabled == 1">
                          <span class="cart__item-sales-item-value" v-if="sale.type != 3"
                            >Индивидуальная скидка</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.percent_num > 0"
                            >{{ sale.percent_num }}% Скидка</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.delay_type == 2"
                            >Под реализацию
                            {{ sale.delay > 0 ? '- ' + sale.delay + 'дн' : '' }}</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.delay_type < 2"
                            >{{
                              sale.delay_type == 1 && sale.delay > 0
                                ? Number(sale.delay).toFixed(0) + ' дн. отсрочки'
                                : 'Предоплата'
                            }}
                          </span>
                          <span class="cart__item-sales-item-value" v-if="sale.delivery_type == 2"
                            >Бесплатная доставка</span
                          >
                          <span
                            class="cart__item-sales-item-value"
                            v-if="sale.condition_min_sum > 0"
                            >Мин. общ. сумма - {{ sale.condition_min_sum }} ₽</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.condition_SKU > 0"
                            >Мин. кол-во SKU - {{ sale.condition_SKU }} шт</span
                          >
                          <span
                            class="cart__item-sales-item-value"
                            v-if="sale.condition_min_count > 0"
                            >Мин. общ. кол-во товаров - {{ sale.condition_min_count }} шт</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.min_count > 1"
                            >Мин. кол-во товаров - {{ sale.min_count }} шт</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.multiplicity > 1"
                            >Кратность - {{ sale.multiplicity }} шт</span
                          >
                          <span class="cart__item-sales-item-value" v-if="sale.integration == 1"
                            >Интеграция с MachineStore</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="order__item-content-comment">
                  <button
                    class="d-button d-button-quaternary d-button-quaternary-small order__item-content-comment-add"
                    @click.prevent="
                      ((modalComment = true),
                      (modalCommentOrg = org_id),
                      (modalCommentStore = warehouse_id),
                      (modalCommentText = ''))
                    "
                    v-if="!warehouse.comment"
                  >
                    Добавить комментарий
                    <i class="d-icon-plus"></i>
                  </button>
                  <div class="order__item-content-description-container" v-else>
                    <div class="order__item-content-description-header">
                      <p class="order__item-prop-label order__item-comment-weight">Комментарий:</p>
                      <div class="order__item-content-description-actions">
                        <button
                          class="order__item-content-description-actions-button"
                          @click.prevent="
                            ((modalComment = true),
                            (modalCommentOrg = org_id),
                            (modalCommentStore = warehouse_id),
                            (modalCommentText = warehouse.comment))
                          "
                        >
                          <i class="d-icon-pen2"></i>
                        </button>
                        <div class="d-divider d-divider--vertical"></div>
                        <button
                          class="order__item-content-description-actions-button"
                          @click.prevent="
                            ((modalCommentDelete = true),
                            (modalCommentOrg = org_id),
                            (modalCommentStore = warehouse_id))
                          "
                        >
                          <i class="d-icon-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div class="order__item-prop-value order__item-comment-weight order--comment">
                      {{ prepareComment(warehouse.comment) }}
                    </div>
                  </div>
                </div>
                <div class="order__item-content-bottom">
                  <div class="order__item-content-bottom-left">
                    <div
                      class="order__item-prop"
                      v-if="org?.cart_data?.delay_type == 1 && org?.cart_data?.delay == 0"
                    >
                      <p class="order__item-prop-label">Отсрочка:&nbsp;</p>
                      <p class="order__item-prop-value">Предоплата</p>
                    </div>
                    <div class="order__item-prop" v-else>
                      <p class="order__item-prop-label">
                        {{
                          org?.cart_data?.delay_type == 1
                            ? 'Отсрочка:&nbsp;'
                            : 'Под реализацию:&nbsp;'
                        }}
                      </p>
                      <p class="order__item-prop-value">{{ org?.cart_data?.delay }} дней</p>
                    </div>
                    <div class="d-divider d-divider--vertical order__item-prop-divider"></div>
                    <div class="order__item-prop">
                      <p class="order__item-prop-label">Оплата доставки:&nbsp;</p>
                      <p class="order__item-prop-value">
                        {{ org?.cart_data?.payer == 1 ? 'Поставщик' : 'Покупатель' }}
                      </p>
                    </div>
                  </div>
                  <div class="order__item-content-bottom-right">
                    <button
                      v-if="warehouse.type == 'order'"
                      class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__item-buy"
                      @click.prevent="
                        () => {
                          if (org?.cart_data?.not_available) {
                            this.showChangedCount = true
                            this.showChangedId = org.org_data.id
                            this.showChangedIdStore = warehouse_id
                          } else {
                            orderSubmit(org.org_data.id, warehouse_id, 0)
                          }
                        }
                      "
                    >
                      Изменить заказ
                    </button>
                    <button
                      v-else
                      class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__item-buy"
                      @click.prevent="
                        () => {
                          if (org?.cart_data?.not_available) {
                            this.showChangedCount = true
                            this.showChangedId = org.org_data.id
                            this.showChangedIdStore = warehouse_id
                          } else {
                            orderSubmit(org.org_data.id, warehouse_id)
                          }
                        }
                      "
                    >
                      Оформить заказ
                    </button>
                    <!--
                      <div
                        class="d-divider d-divider--vertical order__item-content-bottom-right-divider"
                      ></div>
                      <button class="order__item-upload">
                        <i class="d-icon-upload2"></i>
                      </button>
                      -->
                  </div>
                </div>
                <div class="order__item-footer">
                  <button
                    class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__item-buy"
                    @click.prevent="
                      () => {
                        if (org?.cart_data?.not_available) {
                          this.showChangedCount = true
                          this.showChangedId = org.org_data.id
                          this.showChangedIdStore = warehouse_id
                        } else {
                          orderSubmit(org.org_data.id, warehouse_id)
                        }
                      }
                    "
                  >
                    Оформить заказ

                    <span class="order__item-buy-value"
                      >{{ org.cart_data.cost.toLocaleString('ru') }} ₽</span
                    >
                  </button>
                  <!--
                    <div
                      class="d-divider d-divider--vertical order__item-content-bottom-right-divider"
                    ></div>
                    <button class="order__item-upload">
                      <i class="d-icon-upload2"></i>
                    </button>
                    -->
                </div>
              </div>
            </div>
          </div>

          <!-- Итого -->
          <div class="order__footer" v-if="Object.keys(this.basketStore).length > 1">
            <div class="d-divider d-divider--full order__footer-divider"></div>

            <div class="order__footer-content">
              <div class="order__footer-left">
                <p class="order__footer-label">Итого</p>
              </div>
              <div class="order__footer-right">
                <p class="order__footer-value">
                  {{ this.basketStore.cart_data.cost.toLocaleString('ru') }} ₽
                </p>
                <div class="order__footer-actions">
                  <button
                    class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__footer-actions-buy"
                    @click.prevent="
                      () => {
                        if (this.basket?.cart_data?.not_available) {
                          this.showChangedCount = true
                          this.showChangedId = 'all'
                          this.showChangedIdStore = ''
                        } else {
                          orderSubmit('all')
                        }
                      }
                    "
                  >
                    Оформить все заказы
                  </button>
                  <!--
                    <div class="d-divider d-divider--vertical order__footer-actions-divider"></div>
                    <button class="order__footer-actions-upload">
                      <i class="d-icon-upload2"></i>
                    </button>
                  -->
                </div>
              </div>

              <div class="order__footer-top">
                <p class="order__footer-label">Итого</p>
                <p class="order__footer-value">
                  {{ this.basketStore.cart_data.cost.toLocaleString('ru') }} ₽
                </p>
              </div>
              <div class="order__footer-bottom">
                <div class="order__footer-actions">
                  <button
                    class="d-button d-button--sm-shadow d-button-primary d-button-primary-small order__footer-actions-buy"
                    @click.prevent="
                      () => {
                        if (this.basketStore?.cart_data?.not_available) {
                          this.showChangedCount = true
                          this.showChangedId = 'all'
                          this.showChangedIdStore = ''
                        } else {
                          orderSubmit('all', 0)
                        }
                      }
                    "
                  >
                    Оформить все заказы
                  </button>
                  <!--
                  <div class="d-divider d-divider--vertical order__footer-actions-divider"></div>
                  <button class="order__footer-actions-upload">
                    <i class="d-icon-upload2"></i>
                  </button>
                  -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order" v-else>
          <div class="order__header">
            <h3 class="order__header-title">Заказ #{{ order }} оформлен!</h3>
            <button class="order__header-close" @click.prevent="close()">
              <i class="d-icon-times-flat"></i>
            </button>
          </div>
          <div class="order__orders">
            <p>В ближайшее время с Вами свяжутся наши менеджеры.</p>
            <img class="k-order-img" src="/images/order.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <customModal v-model="this.salesModal" class="sales_cart">
      <div v-if="actionSale == 0">
        <h3>Внимание, отключение акций!</h3>
        <p>Акция: {{ saleOff }} будет отключена</p>
      </div>
      <div v-else>
        <h3>Внимание, подключение акций!</h3>
        <p>В корзине подключена акция: {{ saleOff }}</p>
      </div>

      <div class="sales_cart-buttons">
        <button
          type="button"
          class="d-button d-button-primary d-button--sm-shadow order-card__modal-buttons-cancel"
          @click.prevent="this.salesModal = false"
          v-if="actionSale == 0"
        >
          Отмена
        </button>
        <button
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow"
          @click.prevent="((accept = 1), ElemCount(countObject), (salesModal = false))"
        >
          Принять
        </button>
      </div>
    </customModal>
    <customModal v-model="modalComment" class="order-card__modal-comment">
      <h3>Введите комментарий к заказу</h3>
      <Editor
        v-model="this.modalCommentText"
        id="description"
        editorStyle="height: 248px"
        variant="simple"
        @text-change="this.error = ''"
      />
      <div v-if="error != ''" class="d-input-error vendor-change-error">
        <i class="d-icon-warning d-input-error__icon"></i>
        <span class="d-input-error__text">{{ error }}</span>
      </div>
      <div class="order-card__modal-buttons">
        <button
          type="button"
          href="#"
          class="d-button d-button-primary d-button--sm-shadow order-card__modal-buttons-cancel"
          @click.prevent="((modalCommentText = ''), (modalComment = false))"
        >
          Отмена
        </button>
        <button
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow"
          @click.prevent="saveComment"
        >
          Сохранить
        </button>
      </div>
    </customModal>
    <customModal
      v-model="modalCommentDelete"
      class="order-card__modal-comment order-card__modal-comment-del"
    >
      <h3>Удалить комментарий?</h3>

      <div class="order-card__modal-buttons">
        <button
          type="button"
          href="#"
          class="d-button d-button-primary d-button--sm-shadow order-card__modal-buttons-cancel"
          @click.prevent="modalCommentDelete = false"
        >
          Отмена
        </button>
        <button
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow"
          @click.prevent="deleteComment"
        >
          Удалить
        </button>
      </div>
    </customModal>
    <customModal v-model="this.showClearBasketModal" class="clear_cart">
      <b>Вы уверены, что хотите очистить корзину?</b>
      <p>Это действие невозможно будет отменить</p>
      <button class="d-button d-button-primary d-button-primary-small" @click="this.clearCart()">
        Да, очистить!
      </button>
    </customModal>
    <customModal v-model="this.showChangedCount" class="clear_cart cart_not-avialable">
      <h3>На складе не хватает товара</h3>
      <p>
        Пока вы формировали заказ, у Поставщиков изменилось количество товаров на складе. Мы внесли
        изменения в ваш заказ в соответствии с остатками продукции на складах. Вам необходимо
        проверить заказ и отправить его снова.
      </p>
      <div class="basket-change__info">
        <div class="basket-change__h2">Нет на складе:</div>
        <div class="basket-change__products">
          <div v-for="warehouse in this.basket.data" v-bind:key="warehouse.store_data.id">
            <div v-for="org in warehouse.data" v-bind:key="org.org_data.id">
              <div v-for="store in org.data" v-bind:key="store.warehouse_data.id">
                <div v-for="(item, p_key) in store.data" v-bind:key="p_key">
                  <div
                    class="basket-change__product"
                    v-if="Number(item.available) - item.count < 0"
                  >
                    <div class="basket-change__product-left">
                      <img :src="item.image" alt="" />
                      <div class="basket-change__product-info">
                        <div class="basket-change__product-name">{{ item.name }}</div>
                        <div class="basket-change__product-article">Арт.: {{ item.article }}</div>
                      </div>
                    </div>
                    <div class="basket-change__product-right">
                      <span class="basket-change__product-right-label">В наличии:</span>
                      <span class="basket-change__product-right-value"
                        >{{ item.available }} шт из {{ item.count }} шт</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="basket-change__buttons">
        <div
          class="d-button d-button-primary d-button-primary-small"
          @click="this.showChangedCount = false"
        >
          Проверить заказ
        </div>
        <div
          class="d-button d-button-primary d-button-primary-small"
          @click.prevent="
            () => {
              this.order_to_basket = true
              orderSubmit(this.showChangedId, this.showChangedIdStore)
              this.showChangedCount = false
            }
          "
        >
          Оформить с изменениями
        </div>
      </div>
    </customModal>
  </teleport>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import Counter from '@/shared/ui/Counter.vue'
import Editor from 'primevue/editor'
import Toast from 'primevue/toast'

export default {
  name: 'orderWindow',
  emits: ['close', 'catalogUpdate', 'orderSubmit'],
  components: { Loader, customModal, Counter, Editor, Toast },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      showClearBasketModal: false,
      showChangedCount: false,
      showChangedId: '',
      showChangedIdStore: '',
      basketStore: {},
      fetchIds: [],
      id_clear_org: 0,
      id_clear_store: 0,
      order: '',
      modalComment: false,
      modalCommentOrg: 0,
      modalCommentStore: 0,
      modalCommentText: '',
      error: '',
      modalCommentDelete: false,
      sales_active: {},
      salesModal: false,
      saleOff: [],
      newCount: 0,
      countObject: {},
      accept: 0,
      actionSale: 0,
      order_to_basket: false,
    }
  },
  computed: {
    ...mapGetters({
      basket: 'basket/basket',
      basketWarehouse: 'basket/basketWarehouse',
    }),
  },
  methods: {
    ...mapActions({
      getBasket: 'basket/getBasket',
      basketClear: 'basket/basketClear',
      basketProductRemove: 'basket/basketProductRemove',
      basketProductUpdate: 'basket/basketProductUpdate',
      orderSubmitApi: 'basket/orderSubmit',
      setBasketComment: 'basket/setBasketComment',
    }),
    salesActive(key) {
      if (key in this.sales_active) {
        this.sales_active[key] = !this.sales_active[key]
      } else {
        this.sales_active[key] = true
      }
    },
    close() {
      this.order = ''
      this.$emit('close')
    },
    clearCart() {
      this.loading = true
      this.showClearBasketModal = false
      this.basketClear({ org_id: this.id_clear_org, store_id: this.id_clear_store }).then(() => {
        this.id_clear_org = 0
        this.$emit('catalogUpdate')
        this.updateBasket()
      })
    },
    clearBasketProduct(org_id, store_id, key, product) {
      this.loading = true
      const data = {
        org_id: org_id,
        store_id: store_id,
        key: key,
        product: product,
      }
      this.basketProductRemove(data).then((response) => {
        this.$emit('catalogUpdate')
        this.loading = true
        this.updateBasket()
        if (!response?.data?.data?.success && response?.data?.data?.message) {
          this.$toast.add({
            severity: 'error',
            summary: 'Ошибка',
            detail: response?.data?.data?.message,
            life: 3000,
          })
        }
        this.loading = false
      })

      // Убедитесь, что dataLayer существует
      window.dataLayer = window.dataLayer || []

      // Отправка данных в dataLayer
      window.dataLayer.push({
        ecommerce: {
          currencyCode: 'RUB', // Валюта
          remove: {
            products: [
              {
                id: product.remain_id, // ID товара
                name: product.name, // Название товара
                price: product.price, // Цена товара
                quantity: product.count, // Количество товара
              },
            ],
          },
        },
      })
    },
    ElemCount(object) {
      if (!this.fetchIds.includes(object.item.product.key)) {
        this.fetchIds.push(object.item.product.key)
      }
      if (object.value == object.min) {
        this.clearBasketProduct(
          object.item.product.org_id,
          object.item.product.store_id,
          object.item.product.key,
          object.item.product,
        )
        return
      }
      if (object.value > Number(object.max)) {
        this.modal_remain = true
        const index = this.fetchIds.indexOf(object.item.product.key)
        if (index !== -1) {
          this.fetchIds.splice(index, 1) // Удаляем один элемент по индексу
        }
      } else {
        this.loading = true
        this.countObject = object
        const data = {
          org_id: object.item.product.org_id,
          store_id: object.item.product.store_id,
          id_remain: object.id,
          count: object.value,
          key: object.item.product.key,
          actions: object.item.product.actions,
          accept: this.accept,
        }
        this.basketProductUpdate(data).then((response) => {
          // console.log(response)
          if (!response?.data?.data?.success && response?.data?.data?.message) {
            // this.$toast.add({
            //   severity: 'error',
            //   summary: 'Ошибка',
            //   detail: response?.data?.data?.message,
            //   life: 3000,
            // })
            if (response?.data?.data?.data.names.length) {
              this.salesModal = true
              this.saleOff = response.data.data.data.names
              this.actionSale = response.data.data.data.action
            }
          }
          this.updateBasket()
          this.accept = 0
        })
        if (Number(object.value) != object.old_value) {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            ecommerce: {
              currencyCode: 'RUB', // Валюта
              add: {
                products: [
                  {
                    id: object.id, // ID товара
                    name: object.item.product.name, // Название товара
                    price: object.item.basket.price, // Цена товара
                    quantity: object.value, // Количество товара
                  },
                ],
              },
            },
          })
        }
      }
    },
    updateBasket() {
      this.loading = true
      this.getBasket().then(() => {
        this.loading = false
        this.$emit('catalogUpdate')
      })
    },
    async orderSubmit(orgId, warehouse_id) {
      this.loading = true
      this.getBasket().then((response) => {
        // console.log(response.data?.data?.data)
        if (response.data?.data?.data?.cart_data?.not_available && !this.order_to_basket) {
          this.loading = false
          this.showChangedCount = true
          this.showChangedId = orgId
          this.showChangedIdStore = warehouse_id
        } else {
          // orderSubmitApi
          this.orderSubmitApi({ orgId: orgId, warehouse_id: warehouse_id }).then((response) => {
            let arr = []
            console.log(response)
            let res = response.data?.data
            let products = res.products
            let nums = res.nums
            console.log(res)
            for (var key in products) {
              const product = products[key]
              arr.push({
                id: product.id_remain,
                name: product.name,
                price: product.price,
                quantity: product.count,
              })
            }
            this.order_to_basket = false
            window.dataLayer = window.dataLayer || []

            window.dataLayer.push({
              ecommerce: {
                currencyCode: 'RUB',
                purchase: {
                  actionField: {
                    id: 'TRX987',
                  },
                  products: arr,
                },
              },
            })
            this.$emit('orderSubmit', nums.join(', '))
            this.order = nums.join(', ')
            console.log(this.order)
            this.getBasket().then(() => {
              this.loading = false
              this.showChangedId = ''
              this.showChangedIdStore = ''
            })
          })
        }
      })
    },
    saveComment() {
      if (this.modalCommentText != '' && this.modalCommentText != '<p></p>') {
        this.loading = true
        this.setBasketComment({
          store_id: this.basketWarehouse,
          org_id: this.modalCommentOrg,
          org_store: this.modalCommentStore,
          comment: this.modalCommentText,
          set: 'set',
        }).then((res) => {
          if (res.data.success) {
            this.$toast.add({
              severity: 'success',
              summary: 'Успешно!',
              detail: 'Комментарий успешно обновлен!',
              life: 3000,
            })
            this.error = ''
            this.modalCommentText = ''
            this.modalCommentOrg = 0
            this.modalCommentStore = 0
            this.modalComment = false
            this.getBasket()
            this.loading = false
          } else {
            this.$toast.add({
              severity: 'error',
              summary: 'Произошла ошибка!',
              detail: 'Комментарий не обновлен! Попробуйте добавить комментарий еще раз',
              life: 3000,
            })
            this.loading = false
          }
        })
      } else {
        this.error = 'Введите комментарий!'
        return
      }
    },
    prepareComment(code) {
      let new_string = code.replace(/<(.|\n)*?>/g, '')
      new_string = new_string.replace(/\&nbsp;/g, ' ')
      new_string = new_string.replace(/\n/g, ' ')
      if (new_string.length > 120) {
        new_string = new_string.substring(0, 120) + '...'
      }
      return new_string
    },
    deleteComment() {
      this.loading = true
      this.setBasketComment({
        store_id: this.basketWarehouse,
        org_id: this.modalCommentOrg,
        org_store: this.modalCommentStore,
        comment: '',
        set: 'unset',
      }).then((res) => {
        if (res.data.success) {
          this.$toast.add({
            severity: 'success',
            summary: 'Успешно!',
            detail: 'Комментарий успешно удален!',
            life: 3000,
          })
          this.error = ''
          this.modalCommentText = ''
          this.modalCommentOrg = 0
          this.modalCommentStore = 0
          this.modalComment = false
          this.modalCommentDelete = false
          this.getBasket()
          this.loading = false
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Произошла ошибка!',
            detail: 'Комментарий не удален! Попробуйте еще раз',
            life: 3000,
          })
          this.loading = false
        }
      })
    },
  },
  mounted() {
    document.addEventListener('click', (event) => {
      if (
        !event.target.closest('.order__sheet') &&
        !event.target.closest('.header__cart') &&
        this.active === true
      ) {
        this.$emit('close')
      }
    })
    this.getBasket().then(() => {
      this.loading = false
    })
    if (Object.keys(this.basket).length > 1) {
      if (
        Object.prototype.hasOwnProperty.call(this.basket.data, this.basketWarehouse) &&
        this.basketWarehouse
      ) {
        this.basketStore = this.basket[this.basketWarehouse]
      } else {
        this.basketStore = {}
      }
    } else {
      this.basketStore = {}
    }

    

  },
  watch: {
    
    basketStore(newVal) {
      if (Object.keys(newVal).length) {
        this.loading = false
      } else {
        this.loading = false
        if (!this.order) {
          this.$emit('close')
        }
        this.$emit('catalogUpdate')
      }
    },
    basket(newVal) {
      if (Object.keys(newVal).length > 1) {
        if (
          Object.prototype.hasOwnProperty.call(newVal.data, this.basketWarehouse) &&
          this.basketWarehouse
        ) {
          this.basketStore = newVal.data[this.basketWarehouse]
        } else {
          this.basketStore = {}
        }
      } else {
        this.basketStore = {}
      }
    },
    basketWarehouse(newVal) {
      if (Object.keys(this.basket).length > 1 && newVal > 0) {
        if (Object.prototype.hasOwnProperty.call(this.basket.data, newVal)) {
          this.basketStore = this.basket.data[newVal]
        } else {
          this.basketStore = {}
        }
      } else {
        this.basketStore = {}
      }
    },

  },
}
</script>
<style lang="scss"></style>
