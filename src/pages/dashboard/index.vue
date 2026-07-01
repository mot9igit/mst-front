<template>
  <Toast />
  <section class="promo sale_page shipments order_content dashboard" id="promo">
    <Loader v-if="loading" />
    <!-- Верхушка страницы -->
    <div class="d-top">
      <breadcrumbs />
    </div>
    <div class="dashboard__header">
      <div class="dashboard__header-title">
        <h1 class="dashboard__header-title-h1">
          Дашборд проекта МС: цифровой сервис закупок и аналитики
        </h1>
        <p class="dashboard__header-title-text">
          Данный отчёт включает комплекс метрик, позволяющих оценить текущее развитие проекта,
          информация в нём обновляется автоматически в режиме реального времени
        </p>
      </div>
      <div class="dashboard__header-filters">
        <label class="dashboard__header-filters-label">Выбрать период:</label>
        <DatePicker
          v-if="!datepicker_loading"
          v-model="this.filters.value"
          @hide="changeFilter()"
          dateFormat="dd.mm.yy"
          :placeholder="this.filters.placeholder"
          :manualInput="false"
          showIcon
          showClear
          iconDisplay="input"
          selectionMode="range"
          class="catalog-filters-dates"
          :key="dates1"
          :defaultValue="start_dates"
        >
        </DatePicker>
      </div>
    </div>

    <div class="dashboard__content">
      <div class="promo__cards-wrap">
        <div class="dart-row">
          <div class="d-col-md-12">
            <div class="promotions__card promotions__card--height">
              <div
                class="promotions__card-header"
                :class="{ 'promotions__card-header--active': show_more.registration }"
              >
                <div class="promotions__card-header-left">
                  <i class="d-icon-card-plus promotions__card-icon"></i>
                  <p class="promotions__card-title">Регистрации</p>
                </div>
                <div
                  class="promotions__card-header-right"
                  @click.prevent="show_more.registration = !show_more.registration"
                >
                  <i
                    class="d-icon-angle-rounded-bottom-bold d-select__arrow promos__header-select-icon"
                    :class="{ 'promos__header-select-icon--active': show_more.registration }"
                  ></i>
                </div>
                <div
                  class="promotions__card-header-right-upload"
                  @click.prevent="uploadData('connection')"
                >
                  <i
                    class="d-icon-download d-select__arrow promotions__card-header-right-upload-icon"
                  ></i>
                </div>
              </div>
              <div
                class="promotions__card-content"
                :class="{ 'promotions__card-content--active': show_more.registration }"
              >
                <div class="promotions__card-values">
                  <div
                    class="promotions__card-value-container promotions__card-value-container--main"
                  >
                    <span class="promotions__card-label">Всего:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">
                        {{ dashboard_data?.registration?.total_now }}
                      </p>
                      <span
                        class="promotions__card-badge"
                        :class="{
                          'promotions__card-badge-green':
                            Number(dashboard_data?.registration?.total_prev) > 0,
                          'promotions__card-badge-red':
                            Number(dashboard_data?.registration?.total_prev) < 0,
                          'promotions__card-badge-null':
                            Number(dashboard_data?.registration?.total_prev) == 0,
                        }"
                        >{{
                          Number(dashboard_data?.registration?.total_prev) > 0
                            ? '+' + dashboard_data?.registration?.total_prev
                            : dashboard_data?.registration?.total_prev
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Брендов:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">
                        {{ dashboard_data?.registration?.vendor_now }}
                      </p>
                      <span
                        class="promotions__card-badge"
                        :class="{
                          'promotions__card-badge-green':
                            Number(dashboard_data?.registration?.vendor_prev) > 0,
                          'promotions__card-badge-red':
                            Number(dashboard_data?.registration?.vendor_prev) < 0,
                          'promotions__card-badge-null':
                            Number(dashboard_data?.registration?.vendor_prev) == 0,
                        }"
                        >{{
                          Number(dashboard_data?.registration?.vendor_prev) > 0
                            ? '+' + dashboard_data?.registration?.vendor_prev
                            : dashboard_data?.registration?.vendor_prev
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="d-divider d-divider--vertical"></div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Оптовиков:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">
                        {{ dashboard_data?.registration?.warehouse_now }}
                      </p>
                      <span
                        class="promotions__card-badge"
                        :class="{
                          'promotions__card-badge-green':
                            Number(dashboard_data?.registration?.warehouse_prev) > 0,
                          'promotions__card-badge-red':
                            Number(dashboard_data?.registration?.warehouse_prev) < 0,
                          'promotions__card-badge-null':
                            Number(dashboard_data?.registration?.warehouse_prev) == 0,
                        }"
                        >{{
                          Number(dashboard_data?.registration?.warehouse_prev) > 0
                            ? '+' + dashboard_data?.registration?.warehouse_prev
                            : dashboard_data?.registration?.warehouse_prev
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="d-divider d-divider--vertical"></div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Магазинов:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">
                        {{ dashboard_data?.registration?.store_now }}
                      </p>
                      <span
                        class="promotions__card-badge"
                        :class="{
                          'promotions__card-badge-green':
                            Number(dashboard_data?.registration?.store_prev) > 0,
                          'promotions__card-badge-red':
                            Number(dashboard_data?.registration?.store_prev) < 0,
                          'promotions__card-badge-null':
                            Number(dashboard_data?.registration?.store_prev) == 0,
                        }"
                        >{{
                          Number(dashboard_data?.registration?.store_prev) > 0
                            ? '+' + dashboard_data?.registration?.store_prev
                            : dashboard_data?.registration?.store_prev
                        }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-md-12">
            <div class="promotions__card promotions__card--height">
              <div
                class="promotions__card-header"
                :class="{ 'promotions__card-header--active': show_more.integration }"
              >
                <div class="promotions__card-header-left">
                  <img class="d-icon-catalog d-icon" src="/icons/icon_integration.svg" />
                  <p class="promotions__card-title">Интеграции</p>
                </div>
                <div
                  class="promotions__card-header-right"
                  @click.prevent="show_more.integration = !show_more.integration"
                >
                  <i
                    class="d-icon-angle-rounded-bottom-bold d-select__arrow promos__header-select-icon"
                    :class="{ 'promos__header-select-icon--active': show_more.integration }"
                  ></i>
                </div>
              </div>
              <div
                class="promotions__card-content"
                :class="{ 'promotions__card-content--active': show_more.integration }"
              >
                <div class="promotions__card-values">
                  <div
                    class="promotions__card-value-container promotions__card-value-container--main"
                  >
                    <span class="promotions__card-label">Всего:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">
                        {{ dashboard_data?.integration?.total_now }}
                      </p>
                      <span
                        class="promotions__card-badge"
                        :class="{
                          'promotions__card-badge-green':
                            Number(dashboard_data?.integration?.total_prev) > 0,
                          'promotions__card-badge-red':
                            Number(dashboard_data?.integration?.total_prev) < 0,
                          'promotions__card-badge-null':
                            Number(dashboard_data?.integration?.total_prev) == 0,
                        }"
                        >{{
                          Number(dashboard_data?.integration?.total_prev) > 0
                            ? '+' + dashboard_data?.integration?.total_prev
                            : dashboard_data?.integration?.total_prev
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Брендов:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">
                        {{ dashboard_data?.integration?.vendor_now }}
                      </p>
                      <span
                        class="promotions__card-badge"
                        :class="{
                          'promotions__card-badge-green':
                            Number(dashboard_data?.integration?.vendor_prev) > 0,
                          'promotions__card-badge-red':
                            Number(dashboard_data?.integration?.vendor_prev) < 0,
                          'promotions__card-badge-null':
                            Number(dashboard_data?.integration?.vendor_prev) == 0,
                        }"
                        >{{
                          Number(dashboard_data?.integration?.vendor_prev) > 0
                            ? '+' + dashboard_data?.integration?.vendor_prev
                            : dashboard_data?.integration?.vendor_prev
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="d-divider d-divider--vertical"></div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Оптовиков:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">
                        {{ dashboard_data?.integration?.warehouse_now }}
                      </p>
                      <span
                        class="promotions__card-badge"
                        :class="{
                          'promotions__card-badge-green':
                            Number(dashboard_data?.integration?.warehouse_prev) > 0,
                          'promotions__card-badge-red':
                            Number(dashboard_data?.integration?.warehouse_prev) < 0,
                          'promotions__card-badge-null':
                            Number(dashboard_data?.integration?.warehouse_prev) == 0,
                        }"
                        >{{
                          Number(dashboard_data?.integration?.warehouse_prev) > 0
                            ? '+' + dashboard_data?.integration?.warehouse_prev
                            : dashboard_data?.integration?.warehouse_prev
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="d-divider d-divider--vertical"></div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Магазинов:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">
                        {{ dashboard_data?.integration?.store_now }}
                      </p>
                      <span
                        class="promotions__card-badge"
                        :class="{
                          'promotions__card-badge-green':
                            Number(dashboard_data?.integration?.store_prev) > 0,
                          'promotions__card-badge-red':
                            Number(dashboard_data?.integration?.store_prev) < 0,
                          'promotions__card-badge-null':
                            Number(dashboard_data?.integration?.store_prev) == 0,
                        }"
                        >{{
                          Number(dashboard_data?.integration?.store_prev) > 0
                            ? '+' + dashboard_data?.integration?.store_prev
                            : dashboard_data?.integration?.store_prev
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="d-divider d-divider--vertical"></div>
                  <div class="promotions__card-value-container">
                    <span class="promotions__card-label">Отключилось:</span>
                    <div class="promotions__card-value-container-item">
                      <p class="promotions__card-value">
                        {{ dashboard_data?.integration?.out_now }}
                      </p>
                      <span
                        class="promotions__card-badge"
                        :class="{
                          'promotions__card-badge-green':
                            Number(dashboard_data?.integration?.out_prev) > 0,
                          'promotions__card-badge-red':
                            Number(dashboard_data?.integration?.out_prev) < 0,
                          'promotions__card-badge-null':
                            Number(dashboard_data?.integration?.out_prev) == 0,
                        }"
                        >{{
                          Number(dashboard_data?.integration?.out_prev) > 0
                            ? '+' + dashboard_data?.integration?.out_prev
                            : dashboard_data?.integration?.out_prev
                        }}</span
                      >
                    </div>
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
              <div
                class="promotions__card-header"
                :class="{ 'promotions__card-header--active': show_more.connection }"
              >
                <div class="promotions__card-header-left">
                  <img class="d-icon-catalog d-icon" src="/icons/icon_user_plus.svg" />
                  <p class="promotions__card-title">Подключение поставщиков</p>
                </div>
                <div
                  class="promotions__card-header-right"
                  @click.prevent="show_more.connection = !show_more.connection"
                >
                  <i
                    class="d-icon-angle-rounded-bottom-bold d-select__arrow promos__header-select-icon"
                    :class="{ 'promos__header-select-icon--active': show_more.connection }"
                  ></i>
                </div>
              </div>
              <div
                class="promotions__card-content"
                :class="{ 'promotions__card-content--active': show_more.connection }"
              >
                <div class="promotions__card-values-cont">
                  <div class="promotions__card-values">
                    <div
                      class="promotions__card-value-container promotions__card-value-container--main"
                    >
                      <span class="promotions__card-values-title">Подключили поставщика:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.connection?.total_c_now }}
                        </p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.connection?.total_c_prev) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.connection?.total_c_prev) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.connection?.total_c_prev) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.connection?.total_c_prev) > 0
                              ? '+' + dashboard_data?.connection?.total_c_prev
                              : dashboard_data?.connection?.total_c_prev
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="promotions__card-value-container"></div>
                  </div>
                  <div class="promotions__card-values">
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">С поставщиками:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.connection?.have_now }}
                        </p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.connection?.have_prev) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.connection?.have_prev) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.connection?.have_prev) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.connection?.have_prev) > 0
                              ? '+' + dashboard_data?.connection?.have_prev
                              : dashboard_data?.connection?.have_prev
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Без поставщиков:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.connection?.nohave_now }}
                          <span class="promotions__card-label">(на сегодня)</span>
                        </p>
                        <!-- <span class="promotions__card-badge promotions__card-badge-null">0</span> -->
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Бренды:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.connection?.vendor_now }}
                        </p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.connection?.vendor_prev) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.connection?.vendor_prev) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.connection?.vendor_prev) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.connection?.vendor_prev) > 0
                              ? '+' + dashboard_data?.connection?.vendor_prev
                              : dashboard_data?.connection?.vendor_prev
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Оптовики:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.connection?.warehouse_now }}
                        </p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.connection?.warehouse_prev) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.connection?.warehouse_prev) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.connection?.warehouse_prev) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.connection?.warehouse_prev) > 0
                              ? '+' + dashboard_data?.connection?.warehouse_prev
                              : dashboard_data?.connection?.warehouse_prev
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Магазины:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.connection?.store_now }}
                        </p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.connection?.store_prev) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.connection?.store_prev) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.connection?.store_prev) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.connection?.store_prev) > 0
                              ? '+' + dashboard_data?.connection?.store_prev
                              : dashboard_data?.connection?.store_prev
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="promotions__card-values-cont">
                  <div class="promotions__card-values">
                    <div
                      class="promotions__card-value-container promotions__card-value-container--main"
                    >
                      <span class="promotions__card-values-title">Подключили клиентов:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.connection?.total_now }}
                        </p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.connection?.total_prev) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.connection?.total_prev) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.connection?.total_prev) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.connection?.total_prev) > 0
                              ? '+' + dashboard_data?.connection?.total_prev
                              : dashboard_data?.connection?.total_prev
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="promotions__card-value-container"></div>
                  </div>
                  <div class="promotions__card-values">
                    <div
                      class="promotions__card-values-contt"
                      v-for="(item, ind) in connection_temp_orgs"
                      :key="ind"
                    >
                      <div class="promotions__card-value-container">
                        <span class="promotions__card-label">{{ item.name }}:</span>
                        <div class="promotions__card-value-container-item">
                          <p class="promotions__card-value">{{ item.count_now }}</p>
                          <span
                            class="promotions__card-badge"
                            :class="{
                              'promotions__card-badge-green': Number(item.count_prev) > 0,
                              'promotions__card-badge-red': Number(item.count_prev) < 0,
                              'promotions__card-badge-null': Number(item.count_prev) == 0,
                            }"
                            >{{
                              Number(item.count_prev) > 0 ? '+' + item.count_prev : item.count_prev
                            }}</span
                          >
                        </div>
                      </div>
                      <div class="d-divider d-divider--vertical"></div>
                    </div>
                    <button
                      class="promotions__card-value-container-button show_more_org-button"
                      v-if="Object.keys(connection_modal_orgs).length"
                      @click.prevent="show_more_orgs.connection = !show_more_orgs.connection"
                    >
                      <span class="promotions__card-value-container-button-label">Еще</span>
                      <span class="promotions__card-value-container-button-badge">{{
                        this.dashboard_data?.connection?.orgs?.total - 4
                      }}</span>
                      <i
                        class="d-icon-angle-rounded-bottom-bold d-select__arrow promos__header-select-icon"
                        :class="{ 'promos__header-select-icon--active': show_more_orgs.connection }"
                      ></i>
                    </button>
                  </div>
                  <div
                    class="promotions__card-values promotions__card-values--hidden"
                    v-if="show_more_orgs.connection"
                  >
                    <div
                      class="promotions__card-values-contt"
                      v-for="(item, ind) in connection_modal_orgs"
                      :key="ind"
                    >
                      <div class="promotions__card-value-container">
                        <span class="promotions__card-label">{{ item.name }}:</span>
                        <div class="promotions__card-value-container-item">
                          <p class="promotions__card-value">{{ item.count_now }}</p>
                          <span
                            class="promotions__card-badge"
                            :class="{
                              'promotions__card-badge-green': Number(item.count_prev) > 0,
                              'promotions__card-badge-red': Number(item.count_prev) < 0,
                              'promotions__card-badge-null': Number(item.count_prev) == 0,
                            }"
                            >{{
                              Number(item.count_prev) > 0 ? '+' + item.count_prev : item.count_prev
                            }}</span
                          >
                        </div>
                      </div>
                      <div class="d-divider d-divider--vertical"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-md-12">
            <div class="promotions__card promotions__card--height">
              <div
                class="promotions__card-header"
                :class="{ 'promotions__card-header--active': show_more.orders }"
              >
                <div class="promotions__card-header-left">
                  <i class="d-icon-cube promotions__card-icon"></i>
                  <p class="promotions__card-title">Заказы</p>
                </div>
                <div
                  class="promotions__card-header-right"
                  @click.prevent="show_more.orders = !show_more.orders"
                >
                  <i
                    class="d-icon-angle-rounded-bottom-bold d-select__arrow promos__header-select-icon"
                    :class="{ 'promos__header-select-icon--active': show_more.orders }"
                  ></i>
                </div>
              </div>
              <div
                class="promotions__card-content"
                :class="{ 'promotions__card-content--active': show_more.orders }"
              >
                <div class="promotions__card-values-cont">
                  <div class="promotions__card-values">
                    <div
                      class="promotions__card-value-container promotions__card-value-container--main"
                    >
                      <span class="promotions__card-values-title"
                        >Клиенты сделавшие заказ
                        <span class="promotions__card-values-title-grey">(впервые)</span>:</span
                      >
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.orders?.org_now }}
                          <span class="promotions__card-values-title-grey"
                            >({{ dashboard_data?.orders?.total_new }})</span
                          >
                        </p>
                        <!-- <span class="promotions__card-badge promotions__card-badge-red">-3</span> -->
                      </div>
                    </div>
                    <div class="promotions__card-value-container">
                      <!-- <button class="promotions__card-value-container-button">
                        <span class="promotions__card-value-container-button-label">Еще</span>
                        <span class="promotions__card-value-container-button-badge">229</span>
                        <i
                          class="d-icon-arrow-right promotions__card-value-container-button-icon"
                        ></i>
                      </button> -->
                    </div>
                  </div>
                  <div class="promotions__card-values">
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Оптовики:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.orders?.warehouse_now }}
                        </p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.orders?.warehouse_prev) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.orders?.warehouse_prev) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.orders?.warehouse_prev) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.orders?.warehouse_prev) > 0
                              ? '+' + dashboard_data?.orders?.warehouse_prev
                              : dashboard_data?.orders?.warehouse_prev
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Магазины:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.orders?.store_now }}
                        </p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.orders?.store_prev) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.orders?.store_prev) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.orders?.store_prev) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.orders?.store_prev) > 0
                              ? '+' + dashboard_data?.orders?.store_prev
                              : dashboard_data?.orders?.store_prev
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Сумма:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">{{ dashboard_data?.orders?.cost_now }}</p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.orders?.cost_prev_number) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.orders?.cost_prev_number) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.orders?.cost_prev_number) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.orders?.cost_prev_number) > 0
                              ? '+' + dashboard_data?.orders?.cost_prev
                              : dashboard_data?.orders?.cost_prev
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Количество:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.orders?.total_now }}
                        </p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.orders?.total_prev) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.orders?.total_prev) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.orders?.total_prev) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.orders?.total_prev) > 0
                              ? '+' + dashboard_data?.orders?.total_prev
                              : dashboard_data?.orders?.total_prev
                          }}</span
                        >
                      </div>
                    </div>
                    <div class="d-divider d-divider--vertical"></div>
                    <div class="promotions__card-value-container">
                      <span class="promotions__card-label">Без заказов:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.orders?.org_noorder_now }}
                        </p>
                        <span
                          class="promotions__card-badge"
                          :class="{
                            'promotions__card-badge-green':
                              Number(dashboard_data?.orders?.org_noorder_prev) > 0,
                            'promotions__card-badge-red':
                              Number(dashboard_data?.orders?.org_noorder_prev) < 0,
                            'promotions__card-badge-null':
                              Number(dashboard_data?.orders?.org_noorder_prev) == 0,
                          }"
                          >{{
                            Number(dashboard_data?.orders?.org_noorder_prev) > 0
                              ? '+' + dashboard_data?.orders?.org_noorder_prev
                              : dashboard_data?.orders?.org_noorder_prev
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="promotions__card-values-cont">
                  <div class="promotions__card-values">
                    <div
                      class="promotions__card-value-container promotions__card-value-container--main"
                    >
                      <span class="promotions__card-values-title">Получили заказы:</span>
                      <div class="promotions__card-value-container-item">
                        <p class="promotions__card-value">
                          {{ dashboard_data?.orders?.org_seller_now }}
                        </p>
                        <!-- <span class="promotions__card-badge promotions__card-badge-red">-3</span> -->
                      </div>
                    </div>
                    <div class="promotions__card-value-container"></div>
                  </div>
                  <div class="promotions__card-values">
                    <div
                      class="promotions__card-values-contt"
                      v-for="(item, ind) in orders_temp_orgs"
                      :key="ind"
                    >
                      <div class="promotions__card-value-container">
                        <span class="promotions__card-label">{{ item.name }}:</span>
                        <div class="promotions__card-value-container-item">
                          <p class="promotions__card-value">
                            {{ item.count_now }}
                            <span class="promotions__card-values-title-grey" v-if="item.cost_now"
                              >({{ item.cost_now }})</span
                            >
                          </p>
                          <span
                            class="promotions__card-badge"
                            :class="{
                              'promotions__card-badge-green': Number(item.count_prev) > 0,
                              'promotions__card-badge-red': Number(item.count_prev) < 0,
                              'promotions__card-badge-null': Number(item.count_prev) == 0,
                            }"
                            >{{
                              Number(item.count_prev) > 0 ? '+' + item.count_prev : item.count_prev
                            }}</span
                          >
                        </div>
                      </div>
                      <div class="d-divider d-divider--vertical"></div>
                    </div>
                    <button
                      class="promotions__card-value-container-button show_more_org-button"
                      v-if="Object.keys(orders_modal_orgs).length"
                      @click.prevent="show_more_orgs.orders = !show_more_orgs.orders"
                    >
                      <span class="promotions__card-value-container-button-label">Еще</span>
                      <span class="promotions__card-value-container-button-badge">{{
                        this.dashboard_data?.orders?.orgs?.total - 3
                      }}</span>
                      <i
                        class="d-icon-angle-rounded-bottom-bold d-select__arrow promos__header-select-icon"
                        :class="{ 'promos__header-select-icon--active': show_more_orgs.orders }"
                      ></i>
                    </button>
                  </div>
                  <div
                    class="promotions__card-values promotions__card-values--hidden"
                    v-if="show_more_orgs.orders"
                  >
                    <div
                      class="promotions__card-values-contt"
                      v-for="(item, ind) in orders_modal_orgs"
                      :key="ind"
                    >
                      <div class="promotions__card-value-container">
                        <span class="promotions__card-label">{{ item.name }}:</span>
                        <div class="promotions__card-value-container-item">
                          <p class="promotions__card-value">{{ item.count_now }}</p>
                          <span class="promotions__card-values-title-grey" v-if="item.cost_now"
                            >({{ item.cost_now }})</span
                          >
                          <span
                            class="promotions__card-badge"
                            :class="{
                              'promotions__card-badge-green': Number(item.count_prev) > 0,
                              'promotions__card-badge-red': Number(item.count_prev) < 0,
                              'promotions__card-badge-null': Number(item.count_prev) == 0,
                            }"
                            >{{
                              Number(item.count_prev) > 0 ? '+' + item.count_prev : item.count_prev
                            }}</span
                          >
                        </div>
                      </div>
                      <div class="d-divider d-divider--vertical"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <customModal v-model="modalDashboard">
      <modalDash :title="title" :tabs="dashboard_data[modalMode]" :mode="modalMode"></modalDash>
    </customModal>
  </section>
</template>
<script>
import breadcrumbs from '@/shared/ui/breadcrumbs.vue'
import Toast from 'primevue/toast'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import DatePicker from 'primevue/datepicker'
import { mapActions, mapGetters } from 'vuex'
import modalDash from './ui/modalDash.vue'

export default {
  name: 'DashBoard',
  components: { Loader, breadcrumbs, Toast, customModal, DatePicker, modalDash },

  data() {
    return {
      loading: true,
      datepicker_loading: true,
      filters: {
        value: [],
        placeholder: '-- --',
      },
      modalDashboard: false,
      modalMode: '',
      title: '',
      tabs: {},
      connection_temp_orgs: {},
      connection_modal_orgs: {},
      orders_temp_orgs: {},
      orders_modal_orgs: {},
      start_dates: [],
      show_more: {
        registration: true,
        integration: false,
        connection: false,
        orders: false,
      },
      show_more_orgs: {
        connection: false,
        orders: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      dashboard_data: 'addition/dashboard_data',
    }),
  },
  mounted() {
    this.getDashboardData({ filter: this.filters.value }).then(() => {
      if (this.filters.value.length == 0) {
        this.start_dates[0] = new Date(this.dashboard_data.dates.now_format[0])
        this.start_dates[1] = new Date(this.dashboard_data.dates.now_format[1])
        this.datepicker_loading = false
      }
      if (
        this.dashboard_data.connection.orgs.total <= 4 &&
        this.dashboard_data.connection.orgs.total > 0
      ) {
        this.connection_temp_orgs = this.dashboard_data.connection.orgs.items
      } else {
        if (this.dashboard_data.connection.orgs.total > 4) {
          for (let i = 0; i < this.dashboard_data.connection.orgs.total; i++) {
            if (i < 4) {
              this.connection_temp_orgs[i] = this.dashboard_data.connection.orgs.items[i]
            } else {
              this.connection_modal_orgs[i] = this.dashboard_data.connection.orgs.items[i]
            }
          }
        }
      }
      if (this.dashboard_data.orders.orgs.total <= 3 && this.dashboard_data.orders.orgs.total > 0) {
        this.orders_temp_orgs = this.dashboard_data.orders.orgs.items
      } else {
        if (this.dashboard_data.orders.orgs.total > 3) {
          for (let i = 0; i < this.dashboard_data.orders.orgs.total; i++) {
            if (i < 3) {
              this.orders_temp_orgs[i] = this.dashboard_data.orders.orgs.items[i]
            } else {
              this.orders_modal_orgs[i] = this.dashboard_data.orders.orgs.items[i]
            }
          }
        }
      }
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      getDashboardData: 'addition/getDashboardData',
      uploadDashboardData: 'addition/uploadDashboardData',
    }),
    changeFilter() {
      this.loading = true
      this.getDashboardData({ filter: this.filters.value }).then(() => {
        this.loading = false
      })
    },
    modalFilter(data) {
      this.filters.value = data
      this.changeFilter()
    },
    uploadData(type) {
      this.loading = true
      this.uploadDashboardData({
        type: type,
      }).then((res) => {
        this.loading = false
      })
    },
  },
  watch: {
    title: function (newVal) {
      if (newVal) {
        if (newVal == 'Заказы') {
          this.modalMode = 'orders'
        } else {
          this.modalMode = 'connection'
        }
      } else {
        this.modalMode = ''
      }
    },
    dashboard_data: function (newVal) {
      this.connection_temp_orgs = {}
      this.connection_modal_orgs = {}
      this.orders_temp_orgs = {}
      this.orders_modal_orgs = {}
      if (newVal.connection.orgs.total <= 4 && newVal.connection.orgs.total > 0) {
        this.connection_temp_orgs = newVal.connection.orgs.items
      } else {
        if (newVal.connection.orgs.total > 4) {
          for (let i = 0; i < newVal.connection.orgs.total; i++) {
            if (i < 4) {
              this.connection_temp_orgs[i] = newVal.connection.orgs.items[i]
            } else {
              this.connection_modal_orgs[i] = newVal.connection.orgs.items[i]
            }
          }
        }
      }
      if (newVal.orders.orgs.total <= 3 && newVal.orders.orgs.total > 0) {
        this.orders_temp_orgs = newVal.orders.orgs.items
      } else {
        if (newVal.orders.orgs.total > 3) {
          for (let i = 0; i < newVal.orders.orgs.total; i++) {
            if (i < 3) {
              this.orders_temp_orgs[i] = newVal.orders.orgs.items[i]
            } else {
              this.orders_modal_orgs[i] = newVal.orders.orgs.items[i]
            }
          }
        }
      }
    },
  },
}
</script>
<style lang="scss">
.dashboard__header {
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 59px;
  &-title {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 687px;
    &-h1 {
      font-weight: 600;
      font-size: 24px;
      line-height: 31px;

      color: #282828;
    }
    &-text {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;

      color: #757575;
    }
  }
  &-filters {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 16px;
    min-width: 384px;
    &-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;

      color: #757575;
    }
  }
}
.dashboard {
  .p-datepicker {
    width: 100%;
  }
  .catalog-filters-dates.p-inputwrapper-focus.p-focus .p-inputtext {
    color: #fff;
    background: #282828 !important;
  }
  .catalog-filters-dates:not(.p-inputwrapper-focus) .p-inputtext {
    color: #282828 !important;
    background: #fff !important;
    border: 1px solid #75757575;
  }
  .catalog-filters-dates .p-inputtext {
    font-size: 14px;
    line-height: 18px;
    padding-block: 11px;
    padding-inline: 16px 22px;
    border: none;
    border-radius: 53px;
    box-shadow: none;
    cursor: pointer;
  }
  .catalog-filters-dates.p-inputwrapper-focus.p-focus .p-inputtext::placeholder {
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
    color: #fff;
  }
  .catalog-filters-dates .p-inputtext::placeholder {
    font-size: 14px;
    line-height: 18px;
    color: #282828;
    font-weight: 500;
  }
  .catalog-filters-dates.p-inputwrapper-focus.p-focus .p-datepicker-input-icon-container {
    color: #fff;
  }
  .catalog-filters-dates .p-datepicker-input-icon-container {
    color: #282828;
    padding-left: 14px;
    padding-right: 4px;
    display: flex;
    align-items: center;
    height: 16px;
  }
  .catalog-filters-dates .p-datepicker-input-icon-container .p-icon {
    width: 12px;
    height: 14px;
  }
  .catalog-filters-dates .p-datepicker-input-icon-container::before {
    content: '';
    width: 1px;
    height: 11px;
    background-color: #757575;
    display: block;
    position: absolute;
    top: 3px;
    left: 0;
  }

  .p-datepicker-day-selected-range {
    color: #fff !important;
  }
}
.catalog-filters-dates-overlay-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  padding: 8px 0;
}
.catalog-filters-dates-overlay-footer button {
  width: 100%;
  box-shadow: none;
}
.sale_page .dashboard__content {
  .d-divider {
    height: 8px;
  }
  .dart-row {
    margin-bottom: 40px;
    gap: 24px;
    .d-col-md-12 {
      width: calc(50% - 12px);
      padding: 0;
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
    &-header {
      border-radius: 12px 12px 0 0;
      border-bottom: none;
      &-left {
        gap: 16px;
      }
      &-right {
        display: none;
      }
      &-right-upload {
        display: none;
        //display: flex;
        align-items: center;
        justify-content: end;
        cursor: pointer;
        &-icon {
          color: #282828;
          font-weight: 500;
          font-size: 19px;
        }
      }
      .promotions__card-icon {
        color: #757575;
        font-weight: 500;
        font-size: 19px;
      }
      .d-icon-catalog {
        width: auto;
        height: 19px;
      }
      .promotions__card-title {
        font-weight: 600;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: -0.01em;
      }
    }

    &-content {
      .promotions__card-values {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 0;
        &--hidden {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          border-top: 1px solid #75757575;
          padding-top: 19px;
          gap: 19px 12px;
          .d-divider--vertical {
            margin-left: 12px;
          }
        }
        &-contt {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-grow: 1;
          .d-divider {
            margin: 0 auto;
          }
        }
        &-title {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;

          color: #282828;
          &-grey {
            color: #757575;
          }
        }
        .promotions__card-value-container {
          gap: 8px;
          &-item {
            display: flex;
          }

          &-button {
            padding: 9px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background-color: #ededed;
            border-radius: 23px;
            height: 40px;
            min-height: 40px;
            max-height: 40px;
            transition: all 0.2s ease;
            &-label {
              font-weight: 500;
              font-size: 16px;
              line-height: 21px;
              color: #282828;
              transition: all 0.2s ease;
            }
            &-badge {
              background-color: transparent;
              border: 1px solid #282828;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0px 8px;
              font-weight: 400;
              font-size: 16px;
              line-height: 21px;
              color: #282828;
              border-radius: 20px;
              transition: all 0.2s ease;
            }
            &-icon {
              font-size: 16px;
              width: 16px;
              height: 16px;
              color: #282828;
              transition: all 0.2s ease;
            }
          }
          &-button:hover {
            background-color: #282828;
          }
          &-button:hover .promotions__card-value-container-button-label {
            color: #fff;
          }
          &-button:hover .promotions__card-value-container-button-badge {
            background-color: #fff;
            border: 1px solid #282828;
          }
          &-button:hover .promotions__card-value-container-button-icon {
            color: #fff;
          }
          .promotions__card-label {
            color: #757575;
            font-size: 14px;
            margin-bottom: 0px;
            font-weight: 400;
            line-height: 18px;
          }
          .promotions__card-value {
            font-weight: 600;
            font-size: 16px;
            line-height: 21px;
            color: #282828;
          }
          .promotions__card-badge {
            padding: 1.5px 0;
            border-radius: 0px;
            font-weight: 500;
            font-size: 14px;
            line-height: 18px;
          }
          .promotions__card-value-container-item {
            align-items: center;
            gap: 16px;
          }
          .promotions__card-badge-green {
            background-color: transparent;
            color: #549d15;
          }
          .promotions__card-badge-null {
            background-color: transparent;
            color: #bb7900;
          }
          .promotions__card-badge-red {
            background-color: transparent;
            color: #f92c0d;
          }
        }
        .promotions__card-value-container--main {
          .promotions__card-value {
            font-weight: 600;
            font-size: 32px;
            line-height: 42px;
            letter-spacing: -0.01em;
            color: #282828;
          }
          .promotions__card-badge {
            padding: 0px 8px;
            border-radius: 30px;
            font-weight: 500;
            font-size: 14px;
            line-height: 18px;
          }
          .promotions__card-value-container-item {
            align-items: start;
            gap: 8px;
          }
          .promotions__card-badge-green {
            background-color: #e7f9d4;
            color: #549d15;
          }
          .promotions__card-badge-null {
            background-color: #f9efcb;
            color: #bb7900;
          }
          .promotions__card-badge-red {
            background-color: #fde1dd;
            color: #f92c0d;
          }
        }
      }
      .promotions__card-values-cont {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .promotions__card-values-cont:not(:first-child) {
        border-top: 0.5px solid #75757575;
        margin-top: 32px;
        padding-top: 22px;
        .show_more_org-button .promos__header-select-icon {
          font-size: 11px;
          &--active {
            transform: rotate(-180deg);
          }
        }
        .show_more_org-button:hover .promos__header-select-icon {
          color: #fff;
        }
      }
    }
  }
}
.promotions__card-value .promotions__card-values-title-grey {
  margin-left: 4px;
}
@media (width <= 1536px) {
  .show_more_org-button:hover .promos__header-select-icon {
    color: #3e3e3e !important;
  }
  .show_more_org-button .promos__header-select-icon {
    color: #fff;
  }
  .dashboard__content .promo__cards-wrap:last-child .dart-row {
    flex-direction: column;
    gap: 40px;
    .d-col-md-12 {
      width: 100%;
    }
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values-cont {
    display: grid;
    grid-template-areas:
      'A'
      'B'
      'D';
    gap: 19px 0;
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values-cont
    .promotions__card-values:first-child {
    grid-area: A;
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values-cont
    .promotions__card-values:nth-child(2) {
    grid-area: B;
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values-cont
    .promotions__card-values--hidden {
    grid-area: D;
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values-cont {
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values:first-child {
    width: 209px;
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:first-child
    .promotions__card-content
    .promotions__card-values:first-child {
    flex-grow: 1;
  }
  .sale_page .dashboard__content .promotions__card-content .promotions__card-values:last-child {
    flex-grow: 1;
  }
  .promotions__card {
    position: relative;
  }
  .promotions__card-header {
    height: 54px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container-button {
    // position: absolute;
    // top: 11px;
    // right: 32px;
    padding: 5.5px 20px;
    background-color: #3e3e3e;
    height: 32px;
    min-height: 32px;
    max-height: 32px;
    border: 1px solid #3e3e3e;
    &-label {
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
    }
    &-badge {
      display: none;
    }
    &-icon {
      color: #fff;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
    }
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container-button:hover {
    background-color: transparent;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container-button:hover
    .promotions__card-value-container-button-label {
    color: #282828;
  }

  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container-button:hover
    .promotions__card-value-container-button-icon {
    color: #282828;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container
    .promotions__card-label {
    font-size: 16px;
    line-height: 21px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container:not(.promotions__card-value-container--main)
    .promotions__card-value {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container--main
    .promotions__card-value {
    font-weight: 600;
    font-size: 32px;
    line-height: 42px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values-cont:not(:first-child) {
    margin-top: 32px;
    padding-top: 32px;
  }
  .sale_page .dashboard__content .promotions__card-header .promotions__card-title {
    font-size: 16px;
    line-height: 26px;
  }
}
@media (width <= 1260px) {
  .sale_page .dashboard__content .promotions__card-content .promotions__card-values-cont {
    gap: 29px;
  }
  .promotions__card-header {
    height: 48px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container-button {
    top: 8px;
    &-label {
      font-size: 14px;
      line-height: 18px;
    }
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container
    .promotions__card-label {
    font-size: 10px;
    line-height: 13px;
  }
  .sale_page .dashboard__content .promotions__card-content .promotions__card-values-title {
    font-size: 10px;
    line-height: 13px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container:not(.promotions__card-value-container--main)
    .promotions__card-value {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container--main
    .promotions__card-value {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values-cont:not(:first-child) {
    margin-top: 24px;
    padding-top: 24px;
  }
  .sale_page .dashboard__content .promotions__card-header .promotions__card-title {
    font-size: 14px;
    line-height: 18px;
  }
  .sale_page .dashboard__content .promotions__card-header .promotions__card-icon {
    font-weight: 500;
    font-size: 13px;
  }
  .sale_page .dashboard__content .promotions__card-header .d-icon-catalog {
    width: auto;
    height: 13px;
  }
  .dashboard__header-title-text {
    font-size: 14px;
    line-height: 18px;
    max-width: 80%;
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values:first-child {
    width: 131px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container--main
    .promotions__card-badge {
    font-size: 10px;
    line-height: 13px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container
    .promotions__card-badge {
    font-size: 10px;
    line-height: 13px;
  }
  .dashboard__header-filters-label {
    font-size: 14px;
    line-height: 16px;
  }
  .dashboard .catalog-filters-dates .p-inputtext {
    font-size: 10px;
    line-height: 13px;
    padding-block: 9.5px;
    padding-inline: 16px 22px;
  }
  .p-datepicker-calendar,
  .p-datepicker-day-view {
    font-size: 10px !important;
  }
  .dashboard__header-filters {
    min-width: 304px;
  }
  .sale_page .dashboard__content .promo__cards-wrap + .promo__cards-wrap {
    margin-top: 60px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container
    .promotions__card-value-container-item {
    align-items: center;
    gap: 8px;
  }
  .sale_page .dashboard__content .dart-row {
    gap: 38px;
  }
  .sale_page .dashboard__content .dart-row .d-col-md-12 {
    width: calc(50% - 19px);
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values-cont {
    gap: 14px;
  }
  .sale_page .dashboard__content .promotions__card-header-left {
    gap: 8px;
  }
  .sale_page .dashboard__content .promotions__card-header-right-upload-icon {
    font-size: 14px;
  }
}
@media (width <= 1024px) {
  .sale_page .dashboard__content .promotions__card-content .promotions__card-values-cont {
    gap: 14px;
  }
  .shipments h1 {
    line-height: 21px;
  }
  .promotions__card-header {
    height: 32px;
    min-height: 32px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container-button {
    top: 4px;
    right: 16px;
    padding: 5.5px 14.5px;
    height: 24px;
    max-height: 24px;
    min-height: 24px;
    &-label {
      font-size: 10px;
      line-height: 13px;
    }
    &-icon {
      font-size: 7px;
      line-height: 9px;
      height: 8px;
      width: 8px;
    }
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container
    .promotions__card-label {
    font-size: 9px;
    line-height: 12px;
  }
  .sale_page .dashboard__content .promotions__card-content .promotions__card-values-title {
    font-size: 9px;
    line-height: 12px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container:not(.promotions__card-value-container--main)
    .promotions__card-value {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container--main
    .promotions__card-value {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values-cont:not(:first-child) {
    margin-top: 16px;
    padding-top: 16px;
  }
  .sale_page .dashboard__content .promotions__card-header .promotions__card-title {
    font-size: 10px;
    line-height: 13px;
  }
  .sale_page .dashboard__content .promotions__card-header .promotions__card-icon {
    font-weight: 500;
    font-size: 13px;
  }
  .sale_page .dashboard__content .promotions__card-header .d-icon-catalog {
    width: auto;
    height: 13px;
  }
  .dashboard__header-title-text {
    font-size: 12px;
    line-height: 16px;
    max-width: 70%;
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values:first-child {
    width: 115px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container--main
    .promotions__card-badge {
    font-size: 10px;
    line-height: 13px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container
    .promotions__card-badge {
    font-size: 9px;
    line-height: 12px;
  }
  .dashboard__header-filters-label {
    font-size: 10px;
    line-height: 13px;
  }
  .dashboard .catalog-filters-dates .p-inputtext {
    font-size: 9px;
    line-height: 12px;
    padding-block: 6px;
    padding-inline: 16px 22px;
  }
  .p-datepicker-calendar,
  .p-datepicker-day-view {
    font-size: 10px !important;
  }
  .dashboard__header-filters {
    min-width: 192px;
  }
  .sale_page .dashboard__content .promo__cards-wrap + .promo__cards-wrap {
    margin-top: 55px;
  }
  .sale_page .dashboard__content .dart-row {
    gap: 32px;
    margin-bottom: 32px;
  }
  .sale_page .dashboard__content .dart-row .d-col-md-12 {
    width: calc(50% - 16px);
  }
  .dashboard__content .promo__cards-wrap:last-child .dart-row {
    gap: 32px;
  }
}
@media (width <= 880px) {
  .shipments h1 {
    font-size: 14px;
    line-height: 18px;
  }
  .promotions__card-header {
    height: 32px;
    min-height: 32px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container-button {
    top: 4px;
    right: 16px;
    padding: 5.5px 14.5px;
    height: 24px;
    max-height: 24px;
    min-height: 24px;
    &-label {
      font-size: 10px;
      line-height: 13px;
    }
    &-icon {
      font-size: 7px;
      line-height: 9px;
      height: 8px;
      width: 8px;
    }
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container
    .promotions__card-label {
    font-size: 8px;
    line-height: 10px;
  }
  .sale_page .dashboard__content .promotions__card-content .promotions__card-values-title {
    font-size: 8px;
    line-height: 10px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container:not(.promotions__card-value-container--main)
    .promotions__card-value {
    font-weight: 600;
    font-size: 10px;
    line-height: 13px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container--main
    .promotions__card-value {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values-cont:not(:first-child) {
    margin-top: 21px;
    padding-top: 20px;
  }
  .sale_page .dashboard__content .promotions__card-header .promotions__card-title {
    font-size: 10px;
    line-height: 13px;
  }
  .sale_page .dashboard__content .promotions__card-header .promotions__card-icon {
    font-weight: 500;
    font-size: 13px;
  }
  .sale_page .dashboard__content .promotions__card-header .d-icon-catalog {
    width: auto;
    height: 13px;
  }
  .dashboard__header-title-text {
    font-size: 10px;
    line-height: 13px;
    max-width: 60%;
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values:first-child {
    width: 103px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container--main
    .promotions__card-badge {
    font-size: 9px;
    line-height: 12px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container
    .promotions__card-badge {
    font-size: 8px;
    line-height: 10px;
  }
  .dashboard__header-filters-label {
    font-size: 10px;
    line-height: 13px;
  }
  .dashboard .catalog-filters-dates .p-inputtext {
    font-size: 9px;
    line-height: 12px;
    padding-block: 6px;
    padding-inline: 16px 22px;
  }
  .p-datepicker-calendar,
  .p-datepicker-day-view {
    font-size: 10px !important;
  }
  .dashboard__header-filters {
    min-width: 174px;
  }
  .sale_page .dashboard__content .promo__cards-wrap + .promo__cards-wrap {
    margin-top: 55px;
  }
  .sale_page .dashboard__content .dart-row {
    gap: 32px;
    margin-bottom: 32px;
  }
  .sale_page .dashboard__content .dart-row .d-col-md-12 {
    width: calc(50% - 16px);
  }
  .dashboard__content .promo__cards-wrap:last-child .dart-row {
    gap: 32px;
  }
  .sale_page .dashboard__content .promotions__card-header-right-upload-icon {
    font-size: 12px;
  }
}
@media (width <= 800px) {
  .shipments h1 {
    font-size: 12px;
    line-height: 16px;
  }
  .promotions__card-header {
    height: 24px;
    min-height: 24px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container-button {
    top: 4px;
    right: 16px;
    padding: 2px 8px;
    height: 16px;
    max-height: 16px;
    min-height: 16px;
    &-label {
      font-size: 9px;
      line-height: 12px;
    }
    &-icon {
      font-size: 7px;
      line-height: 9px;
      height: 8px;
      width: 8px;
    }
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container
    .promotions__card-label {
    font-size: 8px;
    line-height: 10px;
  }
  .sale_page .dashboard__content .promotions__card-content .promotions__card-values-title {
    font-size: 8px;
    line-height: 10px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container:not(.promotions__card-value-container--main)
    .promotions__card-value {
    font-weight: 600;
    font-size: 9px;
    line-height: 12px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container--main
    .promotions__card-value {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values-cont:not(:first-child) {
    margin-top: 16px;
    padding-top: 16px;
  }
  .sale_page .dashboard__content .promotions__card-header .promotions__card-title {
    font-size: 9px;
    line-height: 12px;
  }
  .sale_page .dashboard__content .promotions__card-header .promotions__card-icon {
    font-weight: 500;
    font-size: 11px;
  }
  .sale_page .dashboard__content .promotions__card-header .d-icon-catalog {
    width: auto;
    height: 11px;
  }
  .dashboard__header-title-text {
    font-size: 8px;
    line-height: 12px;
    max-width: 65%;
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values:first-child {
    width: 64px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container--main
    .promotions__card-badge {
    font-size: 7px;
    line-height: 9px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container
    .promotions__card-badge {
    font-size: 8px;
    line-height: 10px;
  }
  .dashboard__header-filters-label {
    font-size: 7px;
    line-height: 9px;
  }
  .dashboard .catalog-filters-dates .p-inputtext {
    font-size: 8px;
    line-height: 12px;
    padding-block: 6px;
    padding-inline: 8px 22px;
    border-radius: 4px;
  }
  .p-datepicker-calendar,
  .p-datepicker-day-view {
    font-size: 10px !important;
  }
  .dashboard__header-filters {
    min-width: 159px;
    gap: 8px;
  }
  .dashboard .catalog-filters-dates .p-datepicker-input-icon-container .p-icon {
    width: 9px;
    height: 8px;
  }
  .sale_page .dashboard__content .promo__cards-wrap + .promo__cards-wrap {
    margin-top: 45px;
  }
  .sale_page .dashboard__content .dart-row {
    gap: 16px;
    margin-bottom: 24px;
  }
  .sale_page .dashboard__content .dart-row .d-col-md-12 {
    width: calc(50% - 8px);
  }
  .dashboard__content .promo__cards-wrap:last-child .dart-row {
    gap: 24px;
  }
  .dashboard__content .promo__cards-wrap:first-child .promotions__card-values {
    display: grid;
    grid-template-areas:
      'A A A A A A'
      'B C D E F G';
    row-gap: 16px;
  }
  .dashboard__content
    .promo__cards-wrap:first-child
    .promotions__card-values
    .promotions__card-value-container--main {
    grid-area: A;
  }
}
@media (width <= 600px) {
  .shipments.dashboard {
    padding-top: 16px;
  }
  .sale_page .dashboard__content .promo__cards-wrap + .promo__cards-wrap {
    margin-top: 55px;
  }
  .dashboard__content .promo__cards-wrap:last-child .dart-row {
    gap: 32px;
  }
  .sale_page
    .dashboard__content
    .promotions__card-content
    .promotions__card-values
    .promotions__card-value-container-button {
    justify-self: end;
    position: relative;
    height: 32px;
    min-height: 32px;
    max-height: 32px;
    top: 0;
    right: 0;
    background-color: transparent;
    padding: 5.5px 15px;
    &-label {
      color: #282828;
      font-size: 16px;
      line-height: 21px;
    }
    .promos__header-select-icon {
      color: #282828;
      font-size: 11px;
      line-height: 16px;
      width: 16px;
      height: 16px;
    }
  }
  .sale_page
    .dashboard__content
    .promo__cards-wrap:last-child
    .promotions__card-content
    .promotions__card-values {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: start;
    &-contt {
      width: 100%;
    }
    .d-divider {
      display: none;
    }
    .promotions__card-value-container.promotions__card-value-container--main {
      // flex-direction: row;
      // justify-content: space-between;
      width: 100% !important;
    }
    .promotions__card-value-container:not(.promotions__card-value-container--main) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0 0 8px 0;
      border-bottom: 1px solid rgba(117, 117, 117, 0.4588235294);
    }
  }
  .dashboard {
    .promotions__card {
      margin-top: 0px;
    }

    &__header {
      flex-direction: column;
      gap: 40px;
      align-items: start;
      justify-content: start;
      margin-bottom: 0;
      &-title {
        gap: 8px;
        h1 {
          font-weight: 600;
          font-size: 20px;
          line-height: 26px;
          letter-spacing: -0.01em;
          margin-bottom: 0;
        }
        &-text {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          max-width: 100%;
        }
      }
      &-filters {
        gap: 16px;
        min-width: 100%;
        &-label {
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
        }
        .p-datepicker .p-inputtext {
          font-size: 14px;
          line-height: 18px;
          padding-block: 11px;
          padding-inline: 16px 22px;
          border-radius: 8px;
        }
        .p-datepicker-input-icon-container .p-icon {
          width: 14px !important;
          height: 12px !important;
        }
      }
    }
    &__content {
      position: relative;
      width: calc(100% + 40px);
      margin-left: -20px;
      padding-top: 64px;
      padding-bottom: 60px;
      .promo__cards-wrap:first-child .dart-row {
        flex-direction: column;
        .d-col-md-12 {
          width: 100%;
          .promotions__card.promotions__card--height {
            margin: 0;
          }
        }
      }
      .promo__cards-wrap {
        .dart-row {
          gap: 32px;
          margin-bottom: 0;
        }
        .promotions__card.promotions__card--height {
          box-shadow: none;
        }
        .promotions__card-header {
          height: 48px;
          border-radius: 22px;
          padding: 14px 20px;
          transition: all 0.2s ease;
          &-left {
            gap: 16px;
            .promotions__card-icon {
              font-size: 16px;
            }
            .d-icon {
              height: 16px;
            }
            .promotions__card-title {
              font-size: 16px;
              line-height: 21px;
            }
          }
          &-right-upload {
            display: none;
          }
          &-right {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 21px;
            height: 21px;
            cursor: pointer;
            .promos__header-select-icon {
              font-size: 8px;
              transform: rotate(-180deg);
              transition: all 0.2s ease;
            }
            .promos__header-select-icon--active {
              transform: rotate(0deg);
            }
          }
        }
        .promotions__card-header--active {
          height: 48px;
          border-radius: 22px 22px 0 0;
          border-bottom: 0.3px solid #75757575;
        }
        .promotions__card-content {
          display: none;
        }
        .promotions__card-content.promotions__card-content--active {
          display: flex;
          transition: all 0.2s ease;
          padding: 24px 20px;
          background: #f3f3f3;
          box-shadow: 0px 10px 9.3px -5px rgba(0, 0, 0, 0.08);
          border-radius: 0 0 18px 18px;
          .promotions__card-values {
            .promotions__card-value-container.promotions__card-value-container--main
              .promotions__card-value {
              font-size: 24px;
              line-height: 31px;
            }
            .promotions__card-value-container:not(.promotions__card-value-container--main)
              .promotions__card-value {
              font-size: 14px;
              line-height: 18px;
            }
            .promotions__card-label {
              font-size: 14px;
              line-height: 18px;
            }
            .promotions__card-value-container.promotions__card-value-container--main
              .promotions__card-values-title {
              font-size: 14px;
              line-height: 18px;
            }
            .promotions__card-value-container.promotions__card-value-container--main
              .promotions__card-badge {
              margin-top: -16px;
            }
            .promotions__card-badge {
              font-size: 12px;
              line-height: 16px;
            }

            .promotions__card-value-container--main .promotions__card-badge-red {
              background-color: #ffcec7;
            }

            .promotions__card-value-container--main .promotions__card-badge-green {
              background-color: #d5ffaa;
            }

            .promotions__card-value-container--main .promotions__card-badge-null {
              background-color: #ffefb5;
            }
          }
        }
      }
      .promo__cards-wrap:last-child .promotions__card-content--active {
        flex-direction: column;
        padding: 8px;
        gap: 8px;
        .promotions__card-values.promotions__card-values--hidden {
          padding-bottom: 16px;
        }

        .promotions__card-values-cont {
          background: #ffffff;
          border-radius: 18px;
          padding: 24px 16px 12px;
          border: none;
          margin: 0;
          display: flex;
          flex-direction: column !important;
          gap: 32px;
          position: relative;

          .promotions__card-values:first-child {
            max-width: 100%;
            width: 100%;
            .promotions__card-value-container--main {
              width: 70%;
            }
            .promotions__card-value-container-button {
              position: relative;
              height: 32px;
              min-height: 32px;
              max-height: 32px;

              background-color: transparent;
              padding: 5.5px 15px;
              &-label {
                color: #282828;
                font-size: 16px;
                line-height: 21px;
              }
              &-icon {
                color: #282828;
                font-size: 11px;
                line-height: 16px;
                width: 16px;
                height: 16px;
              }
            }
            .promotions__card-value-container-button:hover {
              background-color: #3e3e3e;
            }
            .promotions__card-value-container-button:hover
              .promotions__card-value-container-button-label {
              color: #fff;
            }
            .promotions__card-value-container-button:hover
              .promotions__card-value-container-button-icon {
              color: #fff;
            }
          }
          .promotions__card-values:last-child {
            flex-direction: column;
            justify-content: start;
            align-items: start;
            gap: 8px;
            .promotions__card-values-contt {
              width: 100%;
            }
            .promotions__card-value-container {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              min-width: 100%;
              gap: none;
            }
            .promotions__card-value-container:not(:last-child) {
              border-bottom: 1px solid #75757575;
              padding-bottom: 8px;
            }
            .d-divider {
              display: none;
            }
          }
        }
      }
    }
  }
}
@media (width <= 320px) {
  .dashboard__header-title h1 {
    font-size: 16px;
    line-height: 21px;
  }
  .dashboard__header-title-text {
    font-size: 12px;
    line-height: 16px;
  }
  .dashboard__header-filters-label {
    font-size: 12px;
    line-height: 16px;
  }
  .dashboard__content .promo__cards-wrap .promotions__card-header-left .promotions__card-title {
    font-size: 14px;
    line-height: 16px;
  }
  .dashboard__content .promo__cards-wrap .promotions__card-header--active,
  .dashboard__content .promo__cards-wrap .promotions__card-header {
    height: 40px;
  }
  .dashboard__content
    .promo__cards-wrap
    .promotions__card-content.promotions__card-content--active
    .promotions__card-values
    .promotions__card-label,
  .dashboard__content
    .promo__cards-wrap
    .promotions__card-content.promotions__card-content--active
    .promotions__card-values
    .promotions__card-value-container.promotions__card-value-container--main
    .promotions__card-values-title {
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
