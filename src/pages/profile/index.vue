<template>
  <section class="profile" id="profile">
    <Toast/>
    <!-- Верхушка страницы -->


    <Loader v-if="loading"/>

    <Tabs v-model="tabException" class="profile__tabs">
      <TabList class="profile__tabs-tabs">
        <div class="d-tab2" :class="{ 'd-tab2--active': tabException == 0 }" :value="0">
          <button class="collection__tabs-link" @click.prevent="tabException = 0">
            <span>Настройки профиля</span>
          </button>
        </div>
        <div v-if="motivationUser" class="d-tab2" :class="{ 'd-tab2--active': tabException == 1 }" :value="1">
          <button class="collection__tabs-link" @click.prevent="tabException = 1">
            <span>Каталог программ лояльности</span>
          </button>
        </div>
        <div v-if="motivationUser" class="d-tab2" :class="{ 'd-tab2--active': tabException == 2 }" :value="2">
          <button class="collection__tabs-link" @click.prevent="tabException = 2">
            <span>Программа мотивации</span>
          </button>
        </div>
      </TabList>

      <TabPanels>
        <TabPanel v-if="tabException == 0" class="profile-settings">

    <h2 class="profile__title">Профиль пользователя</h2>

    <form @submit.prevent="editProfileInfo">
      <div class="profile__info">

        <div class="profile__info-item" v-for="(field, index_field) in profile_info" :key="index_field">
          <div class="profile__info-label-wrapper">
            <p class="profile__info-label">{{ field.lable }}</p>
            <p class="profile__info-label-description">{{ field.text }}</p>
          </div>
          <div class="profile__info-input-wrapper">
            <div class="d-input d-input--light profile__info-input">

              <input
                v-if="field.name === 'phone'"
                type="text"
                v-model="this.getUserInfo[field.name]"
                :placeholder="field.placeholder"
                :name="field.name"
                class="d-input__field profile__info-input-field"
                @input="formatPhone"
              />
              <input
              v-else
                type="text"
                v-model="this.getUserInfo[field.name]"
                :placeholder="field.placeholder"
                :name="field.name"
                class="d-input__field profile__info-input-field"
              />

            </div>
            <div class="d-input-error" v-if="field.name === 'phone' && errors.phone != ''">
                <i class="d-icon-warning d-input-error__icon"></i>
                <span class="d-input-error__text">
                  {{ errors.phone }}
                </span>
            </div>
          </div>
        </div>

        <div class="profile__flex">

          <button
            type="submit"
            href="#"
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__submit-button"
          >
            Сохранить
          </button>
        </div>
      </div>
    </form>

    <form @submit.prevent="editProfileData">
      <div class="profile__info2">
        <div class="profile__info-item profile__info-item--alt" v-for="(field, index_field) in profile_data" :key="index_field">
          <div class="profile__info-label-wrapper">
            <p class="profile__info-label">{{ field.lable }}</p>
            <p class="profile__info-label-description">{{ field.text }}</p>
          </div>
          <div class="profile__info-input-wrapper">
            <div class="d-input d-input--light profile__info-input">
              <input
                type="text"
                v-model="this.getUserData[field.name]"
                :placeholder="field.placeholder"
                :name="field.name"
                @input="errors[field.name] = ''"
                class="d-input__field profile__info-input-field"
              />
            </div>
            <div class="d-input-error" v-if="errors[field.name] != ''">
                <i class="d-icon-warning d-input-error__icon"></i>
                <span class="d-input-error__text">
                  {{ errors[field.name] }}
                </span>
            </div>
          </div>
        </div>
        <div class="profile__flex">
          <p class="profile__info-label-description">* Изменения необходимо подтвердить в вашей почте. Мы отправим письмо после сохранения изменений.</p>
          <button
            type="submit"
            href="#"
            class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__submit-button"
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    </form>

        </TabPanel>

        <TabPanel v-if="motivationUser && tabException == 1">
          <div class="profile-catalog">
            <div class="profile-catalog__block">
              <div class="profile-catalog__header">
                <h2 class="clients__content-h2 profile-catalog__title">
                  Программы мотивации, которые можно подключить
                </h2>
                <div class="profile-catalog__search">
                  <i class="pi pi-search profile-catalog__search-icon"></i>
                  <input class="profile-catalog__search-input" placeholder="Найти программу" />
                </div>
              </div>
              <div class="clients__content-container">
                <div
                  class="clients__content-container-item profile-catalog__item"
                  v-for="(item, index) in availablePrograms"
                  :key="index"
                >
                  <div
                    class="clients__content-container-item-banner"
                    :style="'background-image:url(' + item.banner + ');'"
                  ></div>

                  <div class="clients__content-container-item-content">
                    <div class="clients__content-container-item-content-info">
                      <img
                        :src="item.image"
                        class="clients__content-container-item-content-info-logo"
                      />
                      <div class="clients__content-container-item-content-info-text">
                        <div class="clients__content-container-item-content-info-text-name">
                          {{ item.name }}
                        </div>
                        <div class="clients__content-container-item-content-info-text-address">
                          {{ item.address }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="clients__content-container-item-content-descr"
                      v-html="item.description"
                    ></div>
                  </div>
                  <div class="profile-catalog__actions">
                    <div class="profile-catalog__actions-buttons">
                      <button
                        type="button"
                        class="d-button d-button-secondary d-button--sm-shadow profile-catalog__button"
                        @click.prevent="openProgram(item, 'catalog')"
                      >
                        Подробнее
                      </button>
                      <button
                        type="button"
                        class="d-button d-button-primary d-button--sm-shadow profile-catalog__button"
                        @click.prevent="connectProgram(item)"
                      >
                        Подключить
                      </button>
                    </div>
                    <label class="profile-catalog__offer">
                      <Checkbox
                        v-model="item.checked"
                        :binary="true"
                        :inputId="'profile-offer-' + item.id"
                        :name="'profile-offer-' + item.id"
                        @update:modelValue="item.connectError = ''"
                      />
                      <span class="profile-catalog__offer-text">
                        Подтверждаю, что ознакомился и принимаю условия публичной оферты
                      </span>
                    </label>
                    <p class="profile-catalog__error" v-if="item.connectError">
                      {{ item.connectError }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="clients__content-button"
                v-if="availablePrograms.length < motivationCatalogItems.length"
              >
                <button
                  class="clients__content-button-show_more_org-button"
                  @click.prevent="showMoreAvailable"
                >
                  <span class="clients__content-button-show_more_org-button-label">Еще</span>
                  <span class="clients__content-button-show_more_org-button-badge">{{
                    motivationCatalogItems.length - availablePrograms.length
                  }}</span>
                  <i class="d-icon-arrow-right clients__content-button-show_more_org-button-icon"></i>
                </button>
              </div>
            </div>

            <div class="profile-catalog__block">
              <div class="profile-catalog__header">
                <h2 class="clients__content-h2 profile-catalog__title">
                  Подключенные программы мотивации
                </h2>
                <div class="profile-catalog__search">
                  <i class="pi pi-search profile-catalog__search-icon"></i>
                  <input class="profile-catalog__search-input" placeholder="Найти программу" />
                </div>
              </div>
              <div class="clients__content-container">
                <div
                  class="clients__content-container-item profile-catalog__item profile-catalog__item--connected"
                  v-for="(item, index) in connectedPrograms"
                  :key="index"
                >
                  <div
                    class="clients__content-container-item-banner"
                    :style="'background-image:url(' + item.banner + ');'"
                  ></div>

                  <div class="clients__content-container-item-content">
                    <div class="clients__content-container-item-content-info">
                      <img
                        :src="item.image"
                        class="clients__content-container-item-content-info-logo"
                      />
                      <div class="clients__content-container-item-content-info-text">
                        <div class="clients__content-container-item-content-info-text-name">
                          {{ item.name }}
                        </div>
                        <div class="clients__content-container-item-content-info-text-address">
                          {{ item.address }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="clients__content-container-item-content-descr"
                      v-html="item.description"
                    ></div>
                  </div>
                  <div class="profile-catalog__actions">
                    <div class="profile-catalog__actions-buttons">
                      <button
                        type="button"
                        class="d-button d-button-secondary d-button--sm-shadow profile-catalog__button"
                        @click.prevent="openProgram(item, 'connected')"
                      >
                        Подробнее
                      </button>
                      <button
                        type="button"
                        class="d-button d-button-primary d-button--sm-shadow profile-catalog__button"
                        @click.prevent="disconnectProgram(item)"
                      >
                        Отключить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel v-if="motivationUser && tabException == 2">
          <div class="profile-motivation">
            <h2 class="profile-motivation__title">Участие в программах мотивации</h2>

            <div class="profile-motivation__balance">
              <div class="profile-motivation__balance-value">
                <div class="profile-motivation__balance-label">Ваш баланс</div>
                <div class="profile-motivation__balance-number">
                  {{ motivationBalance }} ₽
                </div>
                <button
                  type="button"
                  class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile-motivation__balance-button"
                  @click.prevent="openWithdrawModal"
                >
                  <i class="item-list-item-icon d-icon-wallet"></i>
                  Вывести
                </button>
                <div class="profile-motivation__balance-min">
                 * {{ motivationBalanceMin }} ₽ - минимальная сумма вывода
                </div>
              </div>

              <div class="profile-motivation__brands">
                <div class="profile-motivation__brands-title">Начисления по брендам</div>
                <div class="profile-motivation__brands-list">
                  <div
                    class="profile-motivation__brands-item"
                    v-for="(brand, index) in motivationBalanceBrands"
                    :key="index"
                  >
                    <div class="d-badge2 d-badge2--fit order__item-header-badge">
                      <div class="order__item-header-badge-image-container">
                        <img
                          :src="brand.image"
                          :alt="brand.name"
                          class="order__item-header-badge-image"
                        />
                      </div>
                      <p class="order__item-header-badge-text">{{ brand.name }}</p>
                    </div>
                    <span class="profile-motivation__brands-item-sum">{{ brand.sum }} ₽</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="profile-motivation__history">
              <div class="profile-motivation__history-actions">
                <button
                  type="button"
                  class="d-button d-button-secondary d-button--sm-shadow profile-motivation__history-button"
                  @click.prevent="openUploadCheck"
                >
                  <i class="item-list-item-icon d-icon-doc"></i>
                  Загрузить чек
                </button>
                <button
                  type="button"
                  class="d-button d-button-primary d-button--sm-shadow profile-motivation__history-button"
                  @click.prevent="openScanner"
                >
                  <i class="pi pi-qrcode"></i>
                  Сканировать чек
                </button>
                <input
                  ref="checkCameraInput"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  class="profile__check-input"
                  @change="handleCheckFile"
                />
              </div>
              <BaseTable
                :items_data="motivationTransactions"
                :total="motivationTransactions.length"
                :table_data="motivationTableData"
                :pagination_items_per_page="100"
                :show_filter="false"
              />
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <teleport to="body">
      <customModal v-model="this.modalEditProfile" class="profile__info-modal">
        <div class="profile__info-modal-success" v-if="successModalInfo">
          <h2>Изменения сохранены!</h2>
          <p>Ваши настройки были успешно применены.</p>
        </div>
        <div class="profile__info-modal-success" v-else>
          <h3>На вашу почту {{ getUser.profile.email }} отправлено письмо!</h3>
          <p>Пожалуйста, откройте его и следуйте инструкциям для подтверждения редактирования.
            Если письмо не пришло, проверьте папку «Спам» или подождите несколько минут.</p>
        </div>
        <button
          type="button"
          href="#"
          class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__info-button"
          @click.prevent="this.modalEditProfile = false"
        >
              Ок
        </button>
      </customModal>
    </teleport>

    <teleport to="body">
      <customModal v-model="this.modalWithdraw" class="profile__withdraw-modal">
  <div class="profile__withdraw">
    <h2 class="profile__withdraw-title">Вывод средств</h2>
    <p class="profile__withdraw-label">доступная сумма для вывода</p>
    <div class="profile__withdraw-sum">{{ motivationBalance }} ₽</div>

    <div class="profile__withdraw-divider"></div>

    <p class="profile__withdraw-text">
      Вывод осуществляется через СБП по номеру
      <span class="profile__withdraw-phone">{{ profilePhone }}</span>,
      который вы указали в профиле. Вывод возможен только на номер, который зарегистрирован на вас.
    </p>

    <label class="profile__withdraw-label">Сумма для вывода:</label>
    <input
      type="number"
      :min="withdrawMin"
      :max="withdrawMax"
      step="0.01"
      class="modal__input profile__withdraw-input"
      :placeholder="withdrawMin"
      v-model="withdrawSum"
      @input="withdrawSumError = ''"
    />

    <p class="profile__withdraw-field-error profile__withdraw-field-error--under-input" v-if="withdrawSumError">{{ withdrawSumError }}</p>

    <div class="profile__withdraw-select">
      <Dropdown
        v-model="withdrawBank"
        :options="withdrawBanks"
        option-label="name"
        option-value="value"
        placeholder="Укажите банк для зачисления"
        class="profile__withdraw-dropdown"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="profile__withdraw-select-value">
            <img class="profile__withdraw-select-badge" :src="selectedWithdrawBank.logo" :alt="selectedWithdrawBank.name" />
            <span class="profile__withdraw-select-label">{{ selectedWithdrawBank.name }}</span>
          </div>
          <span v-else class="profile__withdraw-select-label profile__withdraw-select-label--placeholder">
            Укажите банк для зачисления
          </span>
        </template>
        <template #option="slotProps">
          <div class="profile__withdraw-select-value">
            <img class="profile__withdraw-select-badge" :src="slotProps.option.logo" :alt="slotProps.option.name" />
            <span class="profile__withdraw-select-label">{{ slotProps.option.name }}</span>
            <i v-if="withdrawBank === slotProps.option.value" class="d-icon-check profile__withdraw-select-check"></i>
          </div>
        </template>
      </Dropdown>
    </div>

    <p class="profile__withdraw-field-error" v-if="withdrawBankError">{{ withdrawBankError }}</p>

    <button
      type="button"
      :disabled="withdrawLoading"
      class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__withdraw-submit"
      @click.prevent="submitWithdraw"
    >
      Ок
    </button>
  </div>
  <div class="profile__withdraw-loader" v-if="withdrawLoading">
    <div>
      <div class="profile__withdraw-loader-spinner"></div>
      <p>Обрабатываем перевод...</p>
    </div>
  </div>
</customModal>

<customModal v-model="this.modalWithdrawSuccess" class="profile__withdraw-success-modal">
  <div class="profile__withdraw-success">
    <h2 class="profile__withdraw-title">Перевод выполнен</h2>
    <p class="profile__withdraw-success-text">Перевод поступит в течение 5 банковских дней.</p>
    <button
      type="button"
      class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__withdraw-submit"
      @click.prevent="modalWithdrawSuccess = false"
    >
      Ок
    </button>
  </div>
</customModal>

<customModal v-model="this.modalUploadCheck" class="profile__upload-modal">
  <div class="profile__upload">
    <h2 class="profile__withdraw-title">Загрузка чека</h2>
    <p class="profile__withdraw-label">
      Загрузите файл чека, чтобы мы начислили баллы за покупку.
    </p>

    <div class="profile__check-dropzone"
      @click="this.$refs.checkFileInput.click()"
      @dragover.prevent
      @drop.prevent="handleCheckFileDrop"
    >
      <div class="profile__check-dropzone-custom">
        <i class="pi pi-cloud-upload"></i>
        <b>Перетащите файл в эту область</b>
        <p>Вы также можете загрузить файл, <span>нажав сюда</span></p>
      </div>
      <input
        ref="checkFileInput"
        type="file"
        class="profile__check-input"
        @change="handleCheckFile"
      />
    </div>

    <div class="profile__check-file" v-if="uploadCheckFile">
      <i class="d-icon-doc profile__check-file-icon"></i>
      <span class="profile__check-file-name">{{ uploadCheckFile }}</span>
    </div>

    <button
      type="button"
      :disabled="!uploadCheckFile || uploadCheckLoading"
      class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__withdraw-submit"
      @click.prevent="fakeUploadCheck"
    >
      Загрузить
    </button>
  </div>
  <div class="profile__withdraw-loader" v-if="uploadCheckLoading">
    <div>
      <div class="profile__withdraw-loader-spinner"></div>
      <p>Обрабатываем чек...</p>
    </div>
  </div>
</customModal>

<customModal v-model="this.modalUploadSuccess" class="profile__withdraw-success-modal">
  <div class="profile__withdraw-success">
    <h2 class="profile__withdraw-title">Чек распознан</h2>
    <p class="profile__withdraw-success-text">
      После проверки вам будут начислены средства на баланс.
    </p>
    <button
      type="button"
      class="d-button d-button-primary d-button-primary-small d-button--sm-shadow profile__withdraw-submit"
      @click.prevent="modalUploadSuccess = false"
    >
      Ок
    </button>
  </div>
</customModal>
</teleport>

  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from '@/shared/ui/Loader.vue'
import customModal from '@/shared/ui/Modal.vue'
import Toast from 'primevue/toast'
import Checkbox from 'primevue/checkbox'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import BaseTable from '@/shared/ui/table/table.vue'
import Dropdown from 'primevue/dropdown'
import { motivationCatalogItems, motivationConnectedItems } from '@/shared/api/motivationPrograms'


export default {
  name: 'userProfile',
  components: {
    Loader,
    customModal,
    Toast,
    Checkbox,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    BaseTable,
    Dropdown,
  },
  data() {
    return {
      modalEditProfile: false,
      modalWithdraw: false,
      withdrawBanks: [
        {
          value: 'sber',
          name: 'Сбербанк',
          logo: '/images/temp/banks/sber_bank.png',
        },
        {
          value: 'vtb',
          name: 'ВТБ',
          logo: '/images/temp/banks/vtb_bank.png',
        },
        {
          value: 'tbank',
          name: 'Т-Банк',
          logo: '/images/temp/banks/tbank_bank.png',
        },
        {
          value: 'alfa',
          name: 'Альфа-Банк',
          logo: '/images/temp/banks/alfa_bank.png',
        },
        {
          value: 'gazprom',
          name: 'Газпромбанк',
          logo: '/images/temp/banks/gazprombank_bank.png',
        },
      ],
      withdrawBank: null,
      withdrawSum: '',
      withdrawLoading: false,
      withdrawSumError: '',
      withdrawBankError: '',
      modalWithdrawSuccess: false,
      modalUploadCheck: false,
      modalUploadSuccess: false,
      uploadCheckLoading: false,
      uploadCheckFile: null,
      successModalInfo: true,
      loading: false,
      tabException: 0,
      availableVisible: 3,
      motivationCatalogItems,
      motivationConnectedItems,
      motivationBalance: '12 580',
      motivationBalanceMin: '1 000',
      motivationBalanceBrands: [
        {
          name: 'Интерскол',
          sum: '5 000',
          image: '/images/temp/logo_interskol.jpg',
        },
        {
          name: 'Трек',
          sum: '7 580',
          image: '/images/temp/logo_track.jpg',
        },
      ],
      motivationTransactions: [
        {
          id: 20,
          date: '23.09.2026',
          brand: 'Трек',
          sum: '480 ₽',
          products:
            '<div>Арт.: ТР-2401, "Тормозные колодки «Чемпион»" - 1 шт.</div>',
          status_name: 'Отклонен',
          status_color: 'FF4400',
          status_key: 'rejected',
        },
        {
          id: 18,
          date: '22.09.2026',
          brand: 'Интерскол',
          sum: '820 ₽',
          products:
            '<div>Арт.: 1.247.01, "Дрель-шуруповерт аккумуляторная ДА-18/4" - 1 шт.</div>',
          status_name: 'На проверке',
          status_color: 'C4CAE5',
          status_key: 'checking',
        },
        {
          id: 19,
          date: '22.09.2026',
          brand: 'Трек',
          sum: '730 ₽',
          products:
            '<div>Арт.: ТР-1330, "Стойки стабилизатора «Классика»" - 1 шт.</div>',
          status_name: 'На проверке',
          status_color: 'C4CAE5',
          status_key: 'checking',
        },
        {
          id: 17,
          date: '21.09.2026',
          brand: 'Трек',
          sum: '1 800 ₽',
          products:
            '<div>Арт.: ТР-3002, "Тормозные колодки TRS передние" - 1 шт.</div><div>Арт.: ТР-3003, "Тормозные колодки TRS задние" - 1 шт.</div><div>Арт.: ТР-3004, "Датчик износа колодок" - 1 шт.</div>',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
        },
        {
          id: 16,
          date: '19.09.2026',
          brand: 'Трек',
          sum: '1 880 ₽',
          products:
            '<div>Арт.: ТР-1102, "Шаровая опора «Чемпион»" - 2 шт.</div><div>Арт.: ТР-1120, "Рулевой наконечник «Чемпион»" - 1 шт.</div><div>Арт.: ТР-1105, "Гайка шаровой опоры" - 2 шт.</div>',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
        },
        {
          id: 15,
          date: '18.09.2026',
          brand: 'Интерскол',
          sum: '1 980 ₽',
          products:
            '<div>Арт.: 1.249.06, "Перфоратор П-45/1300Э" - 1 шт.</div><div>Арт.: 1.183.12, "Бур SDS-Max 18×520 мм" - 1 шт.</div><div>Арт.: 1.183.30, "Долото SDS-Max 20×250 мм" - 1 шт.</div>',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
        },
        {
          id: 14,
          date: '17.09.2026',
          brand: 'Трек',
          sum: '1 900 ₽',
          products:
            '<div>Арт.: ТР-2210, "Ремкомплект рулевой рейки «Чемпион»" - 1 шт.</div><div>Арт.: ТР-2212, "Сальник рулевой рейки" - 1 шт.</div><div>Арт.: ТР-2215, "Пыльник рулевой рейки" - 1 шт.</div>',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
        },
        {
          id: 13,
          date: '15.09.2026',
          brand: 'Интерскол',
          sum: '1 040 ₽',
          products:
            '<div>Арт.: 1.390.01, "Газонокосилка МКМ-2000" - 1 шт.</div><div>Арт.: 1.390.10, "Нож газонокосилки" - 1 шт.</div><div>Арт.: 1.390.20, "Колесо газонокосилки" - 2 шт.</div>',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
        },
        {
          id: 12,
          date: '12.09.2026',
          brand: 'Трек',
          sum: '2 000 ₽',
          products:
            '<div>Арт.: ТР-1801, "Штанга задней подвески «Чемпион»" - 1 шт.</div><div>Арт.: ТР-1803, "Сайлентблок штанги" - 2 шт.</div><div>Арт.: ТР-1805, "Болт штанги" - 2 шт.</div><div>Арт.: ТР-1806, "Гайка М12" - 4 шт.</div>',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
        },
        {
          id: 11,
          date: '11.09.2026',
          brand: 'Интерскол',
          sum: '1 160 ₽',
          products:
            '<div>Арт.: 1.251.02, "Пила цепная ПЦ-16/2000" - 1 шт.</div><div>Арт.: 1.251.30, "Пильная цепь 3/8″" - 1 шт.</div><div>Арт.: 1.251.40, "Масло для смазки цепи" - 1 шт.</div>',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
        },
        {
          id: 10,
          date: '08.09.2026',
          brand: 'Интерскол',
          sum: '820 ₽',
          products:
            '<div>Арт.: 1.260.01, "Лобзик МЭ-85/1200Э" - 1 шт.</div>',
          status_name: 'Зачислен',
          status_color: 'CDF0A9',
          status_key: 'ready',
        },
        {
          id: 9,
          date: '04.09.2026',
          brand: 'Трек',
          sum: '640 ₽',
          products:
            '<div>Арт.: ТР-1501, "Сайлентблоки переднего рычага (комплект)" - 1 шт.</div>',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
        },
        {
          id: 8,
          date: '01.09.2026',
          brand: 'Интерскол',
          sum: '1 380 ₽',
          products:
            '<div>Арт.: 1.173.01, "УШМ-125/1100Э (болгарка)" - 1 шт.</div><div>Арт.: 1.173.11, "Отрезной круг 125×1,2 мм" - 2 шт.</div><div>Арт.: 1.173.20, "Защитный кожух УШМ" - 1 шт.</div>',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
        },
        {
          id: 7,
          date: '26.08.2026',
          brand: 'Трек',
          sum: '890 ₽',
          products:
            '<div>Арт.: ТР-1200, "Рулевые наконечники (комплект)" - 2 шт.</div>',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
        },
        {
          id: 6,
          date: '21.08.2026',
          brand: 'Интерскол',
          sum: '1 250 ₽',
          products:
            '<div>Арт.: 1.249.01, "Перфоратор П-26/800ЭВР" - 1 шт.</div><div>Арт.: 1.182.10, "Бур SDS-Plus 10×100 мм" - 1 шт.</div><div>Арт.: 1.249.50, "Смазка для перфоратора" - 1 шт.</div>',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
        },
        {
          id: 5,
          date: '18.08.2026',
          brand: 'Трек',
          sum: '480 ₽',
          products:
            '<div>Арт.: ТР-2401, "Тормозные колодки «Чемпион»" - 1 шт.</div>',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
        },
        {
          id: 4,
          date: '13.08.2026',
          brand: 'Интерскол',
          sum: '550 ₽',
          products:
            '<div>Арт.: 1.245.06, "Дрель-шуруповерт ДА-12ЭР" - 1 шт.</div>',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
        },
        {
          id: 3,
          date: '10.08.2026',
          brand: 'Трек',
          sum: '1 500 ₽',
          products:
            '<div>Арт.: ТР-1800, "Штанга задней подвески" - 1 шт.</div><div>Арт.: ТР-1803, "Сайлентблок штанги" - 2 шт.</div><div>Арт.: ТР-1805, "Болт штанги" - 2 шт.</div>',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
        },
        {
          id: 2,
          date: '06.08.2026',
          brand: 'Интерскол',
          sum: '450 ₽',
          products:
            '<div>Арт.: 1.251.01, "Пила цепная ПЦ-14/1800" - 1 шт.</div>',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
        },
        {
          id: 1,
          date: '03.08.2026',
          brand: 'Трек',
          sum: '350 ₽',
          products:
            '<div>Арт.: ТР-1330, "Стойки стабилизатора (комплект)" - 1 шт.</div>',
          status_name: 'Выплачен',
          status_color: 'BBFF00',
          status_key: 'paid',
        },
      ],
      motivationTableData: {
        date: {
          label: 'Дата',
          type: 'text',
        },
        brand: {
          label: 'Бренд',
          type: 'text',
        },
        sum: {
          label: 'Сумма к получению',
          type: 'text',
        },
        products: {
          label: 'Товары',
          type: 'html',
        },
        status: {
          label: 'Статус',
          type: 'status',
        },
      },
      editFields: {},
      getUserData: {
        username: '',
        email: '',
        newpassw: '',
        newpassw_again: '',
      },
      profile_data: [
        {
          name: 'username',
          lable: 'Логин',
          text: 'Используется для входа в систему',
          placeholder: 'Введите новое имя пользователя',
        },
        {
          name: 'email',
          lable: 'Личный e-mail',
          text: 'Виден только коллегам, используется для восстановления пароля',
          placeholder: 'Введите новый e-mail',
        },
        {
          name: 'newpassw',
          lable: 'Новый пароль',
          text: 'Установить новый пароль для входа в систему',
          placeholder: 'Введите новый пароль',
        },
        {
          name: 'newpassw_again',
          lable: 'Новый пароль',
          text: 'Введите новый пароль повторно',
          placeholder: 'Пароли должны совпадать',
        },
      ],
      getUserInfo: {
        fullname: '',
        phone: '',
      },
      profile_info: [
        {
          name: 'fullname',
          lable: 'ФИО',
          text: 'Ваши фамилия, имя и отчество',
          placeholder: 'Введите ваши ФИО',
        },
        {
          name: 'phone',
          lable: 'Личный телефон',
          text: 'Виден только коллегам',
          placeholder: 'Введите ваш личный номер телефона',
        },
      ],
      errors: {
        phone:'',
        username:'',
        email:'',
        newpassw:'',
        newpassw_again:'',
      },
    }
  },
  mounted() {
    this.getSessionUser()
     if (this.$route.query.update === 'true') {
        //Обновляем профиль
        this.getSessionUser().then(() => {
          this.$router.replace({ query: { ...this.$route.query, update: undefined } });
        })
      }
  },
  methods: {
    ...mapActions({
      editUser: 'user/edit_profile',
      getSessionUser: 'user/getSessionUser',

    }),
    showMoreAvailable() {
      this.availableVisible += 3
    },
    openProgram(item, source) {
      const route = this.$router.resolve({
        name: 'profileMotivationProgram',
        params: { source, program_id: item.id },
      })
      window.open(route.href, '_blank')
    },
    connectProgram(item) {
      if (!item.checked) {
        item.connectError = 'Подтвердите согласие с условиями публичной оферты'
        return
      }
      item.connectError = ''
      const idx = this.motivationCatalogItems.indexOf(item)
      if (idx === -1) return
      this.motivationCatalogItems.splice(idx, 1)
      item.checked = false
      this.motivationConnectedItems.push(item)
    },
    disconnectProgram(item) {
      const idx = this.motivationConnectedItems.indexOf(item)
      if (idx === -1) return
      this.motivationConnectedItems.splice(idx, 1)
      item.checked = false
      this.motivationCatalogItems.push(item)
      if (this.motivationCatalogItems.length > this.availableVisible) {
        this.availableVisible = this.motivationCatalogItems.length
      }
    },
    openWithdrawModal() {
      this.withdrawSum = ''
      this.withdrawBank = null
      this.withdrawSumError = ''
      this.withdrawBankError = ''
      this.modalWithdraw = true
    },
    submitWithdraw() {
      this.withdrawSumError = ''
      this.withdrawBankError = ''
      if (!this.withdrawBank) {
        this.withdrawBankError = 'Укажите банк для зачисления'
      }
      if (!this.withdrawSumValid) {
        this.withdrawSumError = this.withdrawSum
          ? `Сумма должна быть от ${this.withdrawMin} до ${this.withdrawMax} ₽`
          : 'Укажите сумму для вывода'
      }
      if (this.withdrawSumError || this.withdrawBankError) return
      this.withdrawLoading = true
      setTimeout(() => {
        this.withdrawLoading = false
        this.modalWithdraw = false
        this.modalWithdrawSuccess = true
      }, 1500)
    },
    openUploadCheck() {
      this.uploadCheckFile = null
      this.uploadCheckLoading = false
      this.modalUploadCheck = true
    },
    openScanner() {
      this.uploadCheckLoading = false
      if (this.$refs.checkCameraInput) this.$refs.checkCameraInput.click()
    },
    handleCheckFile(event) {
      const file = event.target.files && event.target.files[0]
      if (file) {
        this.uploadCheckFile = file.name
        this.uploadCheckLoading = false
        this.modalUploadCheck = true
      }
      event.target.value = ''
    },
    handleCheckFileDrop(event) {
      const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]
      if (file) this.uploadCheckFile = file.name
    },
    fakeUploadCheck() {
      this.uploadCheckLoading = true
      setTimeout(() => {
        this.uploadCheckLoading = false
        this.modalUploadCheck = false
        this.uploadCheckFile = null
        this.modalUploadSuccess = true
      }, 1500)
    },
    formatPhone(event) {
      let value = event.target.value.replace(/\D/g, ""); // Удаляем все нецифровые символы
      this.errorPhone = ''
      if (value.length > 11) {
        value = value.slice(0, 11); // Ограничиваем ввод до 11 цифр
      }
      // Форматируем номер по маске: +X (XXX) XXX-XX-XX
      let formatted = "+";
      if (value.length > 0) formatted += value[0];
      if (value.length > 1) formatted += " (" + value.substring(1, 4);
      if (value.length > 4) formatted += ") " + value.substring(4, 7);
      if (value.length > 7) formatted += "-" + value.substring(7, 9);
      if (value.length > 9) formatted += "-" + value.substring(9, 11);
      this.getUserInfo.phone = formatted;
    },
    formatPhoneInput(value) {
      value.replace(/\D/g, ""); // Удаляем все нецифровые символы
      let formatted = "";
      formatted += value[0];
      formatted += value[1];
      formatted += " (" + value.substring(2, 5);
      formatted += ") " + value.substring(5, 8);
      formatted += "-" + value.substring(8, 10);
      formatted += "-" + value.substring(10, 12);
      return formatted;
    },
    validatePhone(phone) {
      const regex = /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
      return regex.test(phone);
    },
    formatPhoneNumber(phone) {
      return phone.replace(/\D/g, ''); // Удаляет все нецифровые символы
    },
    async editProfileInfo(){
      let newFIO = this.getUserInfo.fullname
      let newPhone = this.getUserInfo.phone
      let oldFIO = this.getUser.profile.fullname
      let oldPhone = this.formatPhoneInput(this.getUser.profile.phone)
      if (!this.validatePhone(newPhone)) {
        this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректный номер телефона', life: 3000 });
        this.errors.phone = 'Введите корректный номер телефона'
        return
      } else{
        if(oldPhone != newPhone){
          this.editFields.phone = this.formatPhoneNumber(newPhone)
        }
        if(oldFIO != newFIO){
          this.editFields.fullname = newFIO
        }
        if(Object.keys(this.editFields).length != 0){
          this.editUser({
            action: 'profile/edit',
            form: this.editFields,
            }).then((res) => {
            if(!res.data.success){
              this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: res.data.message, life: 3000 });
            } else {
              this.modalEditProfile = true
              this.successModalInfo = true
              this.editFields = {}
            }
          })
        }else{
          this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Вы не внесли никаких изменений', life: 3000 });
        }
      }
    },

    validateLogin(login) {
      const regex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
      return regex.test(login);
    },
    validateEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    },

    async editProfileData(){
      let newUsername = this.getUserData.username
      let newEmail = this.getUserData.email
      let newPassword = this.getUserData.newpassw
      let newPasswordAgain = this.getUserData.newpassw_again
      let isEditUser = ''
      if(newUsername != this.getUser.username){
        if (!this.validateLogin(newUsername)) {
          this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректный логин', life: 3000 });
          this.errors.username = 'Введите корректный логин, состоящий из латинских букв, цифр и спец.символов'

        } else{
          this.editFields.username = newUsername
        }
      }
      if(newEmail != this.getUser.profile.email){
          if (!this.validateEmail(newEmail)) {
            this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректный email', life: 3000 });
            this.errors.email = 'Введите корректный email'

          } else{
            this.editFields.email = newEmail
          }
      }
      if (newPassword != '') {
            if (newPassword.length < 6) {
              this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректный пароль', life: 3000 });
              this.errors.newpassw = 'Пароль должен содержать минимум 6 символов'

            } else{
              if(newPassword != newPasswordAgain){
                this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Некорректно введен пароль повторно', life: 3000 });
                this.errors.newpassw_again = 'Пароли не совпадают'

              }else{
                this.editFields.password = newPassword
              }

            }
      }
      if(Object.keys(this.editFields).length != 0){
          isEditUser = this.errors.newpassw + this.errors.newpassw_again + this.errors.email + this.errors.username
          if(isEditUser === ''){
            this.editUser({
              action: 'profile/edit',
              form: this.editFields,
              }).then((res) => {
              if(!res.data.success){
                this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: res.data.message, life: 3000 });
              } else {
                this.modalEditProfile = true
                this.successModalInfo = false
                this.editFields = {}
                this.getSessionUser()

              }
            })
          }else{
            this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Одно или несколько полей заполнено некорректно', life: 3000 });
          }
        }else{
          this.$toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Вы не внесли никаких изменений', life: 3000 });
        }
    },
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
    motivationUser() {
      return this.getUser?.motivation === true
    },
    availablePrograms() {
      return this.motivationCatalogItems.slice(0, this.availableVisible)
    },
    connectedPrograms() {
      return this.motivationConnectedItems
    },
    profilePhone() {
      const phone = this.getUser?.profile?.phone
      return phone ? this.formatPhoneInput(phone) : ''
    },
    selectedWithdrawBank() {
      return this.withdrawBanks.find((bank) => bank.value === this.withdrawBank) || this.withdrawBanks[0]
    },
    withdrawMin() {
      return Number(String(this.motivationBalanceMin).replace(/\D/g, '')) || 0
    },
    withdrawMax() {
      return Number(String(this.motivationBalance).replace(/\D/g, '')) || 0
    },
    withdrawSumValid() {
      if (!this.withdrawSum) return false
      const value = Number(String(this.withdrawSum).replace(/,/g, '.'))
      if (isNaN(value)) return false
      return value >= this.withdrawMin && value <= this.withdrawMax
    },
    withdrawFormValid() {
      return !!this.withdrawBank && this.withdrawSumValid
    },
  },
  watch: {
    getUser: function(newVal){
      this.getUserData.username = newVal.username
      this.getUserData.email = newVal.profile.email
      this.getUserInfo.fullname = newVal.profile.fullname
      this.getUserInfo.phone = newVal.profile.phone ? this.formatPhoneInput(newVal.profile.phone) : ''
    }
  },



}
</script>
<style lang="scss">
.profile-settings {
  padding-top: 40px;
}
.profile__tabs .p-tabpanels {
  background-color: transparent;
}
.profile__tabs-tabs {
  .p-tablist-tab-list {
    background-color: transparent;
    gap: 8px;
    border: none;
  }
  .collection__tabs-link {
    padding: 0;
    font: inherit;
    color: inherit;
  }
}
.profile-catalog {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-top: 40px;

  &__block {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }

  &__search {
    position: relative;
    display: flex;
    align-items: center;
    width: 260px;
    max-width: 100%;

    &-icon {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #757575;
      font-size: 14px;
      pointer-events: none;
    }

    &-input {
      width: 100%;
      height: 40px;
      border: 1px solid #757575;
      border-radius: 999px;
      padding: 0 38px 0 16px;
      background-color: #fff;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: #282828;
      outline: none;

      &::placeholder {
        color: #757575;
      }
    }
  }

  &__block:nth-of-type(2) {
    margin-top: 32px;
  }

  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    color: #282828;
  }

  .clients__content-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    &-item {
      min-height: 500px;
      height: auto;
      max-height: unset;
      overflow: visible;
      background: #ffffff;
      box-shadow: 0px 4px 13.2px -5px rgba(0, 0, 0, 0.41);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      gap: 22px;
      padding: 0;

      &-banner {
        max-height: 175px;
        min-height: 175px;
        width: 100%;
        overflow: hidden;
        background-color: #ebebeb;
        display: flex;
        align-items: center;
        justify-content: center;
        background-position: center center;
        background-size: cover;
        padding: 0 16px;
        border-radius: 16px 16px 0 0;
      }

      &-content {
        padding: 0 16px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        align-items: start;
        width: 100%;
        min-height: 155px;
        max-height: 155px;
        overflow: hidden;

        &-info {
          display: flex;
          min-height: 47px;
          gap: 8px;
          align-items: start;

          &-logo {
            aspect-ratio: 1;
            width: 24px;
            height: auto;
            border-radius: 14px;
          }

          &-text {
            display: flex;
            flex-direction: column;
            gap: 8px;

            &-name {
              font-weight: 700;
              font-size: 16px;
              line-height: 21px;
              color: #282828;
            }

            &-address {
              font-weight: 400;
              font-size: 14px;
              line-height: 18px;
              color: #757575;
              max-height: 18px;
              overflow: hidden;
            }
          }
        }

        &-descr {
          max-height: 105px;
          overflow: hidden;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          color: #282828;

          p {
            margin: 0;
          }
        }
      }
    }
  }

  .clients__content-button {
    width: 100%;
    display: flex;
    justify-content: center;

    &-show_more_org-button {
      color: #fff;
      background-color: #282828;
      border: 1px solid #282828;
      height: 40px;
      border-radius: 20px;
      font-size: 16px;
      line-height: 21px;
      padding: 8px 24px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      &:hover {
        color: #282828;
        background-color: transparent;
      }

      &-icon {
        width: 24px;
        height: 24px;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &__actions {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 0 16px;
    width: 100%;
    flex: 1;

    &-buttons {
      display: flex;
      gap: 24px;
      justify-content: center;
      width: 100%;

      .profile-catalog__button {
        flex: 1;
        width: 100%;
      }
    }
  }

  &__button {
    width: 100%;
    padding: 8px 20px;
    white-space: nowrap;
  }

  &__offer {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    .p-checkbox,
    .p-checkbox-input,
    .p-checkbox-box {
      width: 20px;
      min-width: 20px;
      height: 20px;
    }

    .p-checkbox-box {
      border-radius: 50%;
      border-color: #757575;
    }

    .p-checkbox-checked .p-checkbox-box {
      border-color: #f92c0d;
      background-color: #fff;
      color: #f92c0d;
    }

    .p-checkbox-checked .p-checkbox-icon {
      color: transparent;
      background-color: #f92c0d;
      border-radius: 50%;
      width: 12px;
      height: 12px;
    }

    &-text {
      font-size: 12px;
      line-height: 16px;
      color: #757575;
    }
  }

  &__error {
    margin: -16px 0 0 28px;
    font-size: 10px;
    line-height: 16px;
    color: #f92c0d;
  }

  &__item--connected {
    .profile-catalog__actions {
      gap: 18px;
      justify-content: flex-end;
      padding-bottom: 16px;

      &-buttons {
        gap: 24px;
        justify-content: center;

        .profile-catalog__button {
          flex: 1;
          width: 100%;
        }
      }
    }
  }

  @media (width<1024px) {
    .clients__content-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (width<800px) {
    .clients__content-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
.profile__flex{
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 10px;
}
.profile__submit-button {
  font-size: 16px;
  padding: 8px 28px;
  height: 40px;
}
.profile__info2 {
  margin-bottom: 80px
}
.profile__info-input:after {
  content: '\e031';
  font-family: 'Iconly';
  position: relative;
  display: block;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 9px;
  font-size: 18px;
}
.profile__info-modal .modal-content{
  max-width: 700px;
}
.profile__info-modal-success{
  display: flex;
  flex-direction: column;
  gap:24px;
  justify-content: space-around;
  align-items: center;
  padding: 40px;
}
.profile__info-modal .profile__info-button{
  margin:0 auto;
}
.profile__info-input-wrapper{
  display: flex;
  flex-direction: column;
  width:100%;
}
.profile__info-input-wrapper .d-input-error{
  width:auto
}
.profile-motivation {
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    color: #282828;
  }

  &__balance {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    gap: 40px;
    background: #fbfbfb;
    box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
    border-radius: 10px;
    padding: 32px;

    &-value {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      border-right: 0.5px solid #75757575;
      padding-right: 40px;
    }

    &-label {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
      color: #757575;
    }

    &-number {
      font-size: 44px;
      line-height: 52px;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: #282828;
      margin: 8px 0 23px;
    }

    &-button {
      gap: 8px;
      width: fit-content;
      min-height: 40px;
    }

    &-min {
      margin-top: 14px;
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
      color: #757575;
    }
  }

  &__brands {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    width: 100%;

    &-title {
      font-size: 18px;
      line-height: 24px;
      font-weight: 600;
      color: #282828;
      margin-bottom: 16px;
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;

      .d-badge2 {
        background: #ededed;
        color: #282828;
        padding: 3px 12px;
        min-width: 0;
        gap: 8px;

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

      &-sum {
        font-size: 16px;
        line-height: 21px;
        font-weight: 600;
        color: #282828;
      }
    }
  }

  &__history {
    display: flex;
    flex-direction: column;
    gap: 24px;

    &-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 24px;
    }

    &-button {
      width: auto;
      padding: 8px 20px;
      white-space: nowrap;
      gap: 8px;

      .d-icon-doc {
        font-weight: 900;
      }
    }
  }
}

.profile-motivation .cell--status {
  &.cell--status-ready,
  &.cell--status-checking,
  &.cell--status-paid {
    color: #282828;
  }
}

.profile-motivation .d-table {
  .d-table__head-col,
  .d-table__col,
  .cell_value {
    text-align: center;
  }
}

.profile__withdraw-modal .modal-content {
  max-width: 660px;
}

.profile__withdraw {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  width: 100%;
  padding: 0 8px;

  &-title {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    letter-spacing: -0.01em;
    color: #282828;
    margin-bottom: 24px;
  }

  &-label {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
  }

  &-sum {
    font-weight: 600;
    font-size: 32px;
    line-height: 42px;
    letter-spacing: -0.01em;
    color: #282828;
    margin-top: 8px;
    padding-bottom: 20px;
  }

  &-divider {
    height: 0.5px;
    background-color: #75757575;
    width: 100%;
    margin-bottom: 24px;
  }

  &-input {
    margin-top: 8px;
    margin-bottom: 24px;
    width: 100%;
    border-radius: 28px;
    min-height: 40px;
  }

  &-input::-webkit-outer-spin-button,
  &-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
    margin-bottom: 24px;
  }

  &-phone {
    font-weight: 700;
    white-space: nowrap;
  }

  &-field-error {
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: #f92c0d;
    margin-top: 8px;
    margin-bottom: 8px;

    &--under-input {
      margin-top: -18px;
      margin-bottom: 12px;
    }
  }

  &-select {
    width: 100%;
  }

  &-dropdown {
    width: 100%;

    &.p-select {
      --p-select-border-radius: 20px;
      width: 100%;
      border-color: #757575;
      border-radius: 20px;
      background-color: #fff;
      min-height: 40px;
      height: 40px;
      padding: 0 12px;
      box-shadow: none;
      overflow: hidden;
    }

    .p-overlay {
      border-radius: 12px;
    }

    .p-select-label {
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: #282828;
      padding: 10px 8px !important;
    }

    .p-select-label.p-placeholder {
      color: #757575;
    }

    .p-select-dropdown {
      color: #757575;
      width: auto;
      padding-left: 0;
    }

    .p-select-overlay {
      border-radius: 12px;
      box-shadow: 0px 4px 13.4px -5px rgba(0, 0, 0, 0.26);
      border: 1px solid #e2e8f0;
      overflow: hidden;
    }

    .p-select-option {
      display: flex;
      align-items: center;
      padding: 10px 12px;

      &.p-focus {
        background-color: #f5f5f5;
      }
    }

    .p-select-empty-message {
      color: #757575;
    }
  }

  &-select-badge {
    display: block;
    width: 72px;
    max-width: 72px;
    height: 20px;
    flex-shrink: 0;
    object-fit: contain;
    object-position: left center;
  }

  &-select-value {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  &-select-label {
    flex: 1;
    text-align: left;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #282828;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--placeholder {
      color: #757575;
    }
  }

  &-check {
    margin-left: auto;
    color: #f92c0d;
    flex-shrink: 0;
  }

  &-submit {
    max-width: 112px;
    margin: 32px auto 0;
  }
}

.profile__withdraw-loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
  z-index: 10;
  -webkit-backdrop-filter: blur(22.8px);
  backdrop-filter: blur(22.8px);
  border-radius: 12px;

  &-spinner {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 3px solid #f5f5f5;
    border-top-color: #f92c0d;
    animation: profile-withdraw-spin 0.8s linear infinite;
    margin: 0 auto;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    color: #282828;
    text-align: center;
    margin-top: 10px;
  }
}

@keyframes profile-withdraw-spin {
  to {
    transform: rotate(360deg);
  }
}

.profile__withdraw-success-modal .modal-content {
  max-width: 460px;
}

.profile__withdraw-success {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  padding: 0 8px;

  &-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #757575;
    margin-bottom: 8px;
  }
}

.profile__upload-modal .modal-content {
  max-width: 540px;
}

.profile__upload {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  width: 100%;
  padding: 0 8px;

  & .profile__withdraw-label {
    margin-bottom: 24px;
  }
}

.profile__check-dropzone {
  border: 2px dashed #e2e2e2;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.2s;
  text-align: center;

  &:hover,
  &.dragover {
    border-color: #f92c0d;
  }

  &-custom {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;

    & i {
      font-size: 72px;
      color: #e2e2e2;
    }

    & b {
      font-size: 14px;
      margin-top: 22px;
      color: #282828;
    }

    & p {
      color: #a0a0a0;
      font-size: 14px;
      margin: 0;

      span {
        color: #f92c0d;
        text-decoration: underline;
      }
    }
  }
}

.profile__check-input {
  display: none;
}

.profile__check-file {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding: 10px 14px;
  border-radius: 12px;
  background-color: #f5f5f5;

  &-icon {
    color: #f92c0d;
    font-size: 18px;
    flex-shrink: 0;
  }

  &-name {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #282828;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media (width < 800px) {
  .profile-motivation__balance {
    grid-template-columns: 1fr;

    &-value {
      border-right: none;
      border-bottom: 0.5px solid #75757575;
      padding-right: 0;
      padding-bottom: 24px;
    }
  }
}
</style>
