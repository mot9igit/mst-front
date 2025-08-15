import 'vue-final-modal/style.css'
import 'primeicons/primeicons.css'
import './assets/styles/style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import { createYmaps } from 'vue-yandex-maps'
import { version } from '../package'
import router from './router'
import store from './store'
import ApiPlugin from '@/shared/api'
import LoadPlugin from '@/shared/api/load'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import PrimeButton from 'primevue/button'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import { createVfm } from 'vue-final-modal'

const app = createApp(App)
const vfm = createVfm()

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}',
    },
  },
})

app.config.globalProperties.site_url_prefix = 'https://mst.tools/'
app.config.globalProperties.version = version
app.config.globalProperties.cfg = {
  vendors: {
    perpage: 12,
  },
}

app.use(store)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
  ripple: true,
  locale: {
    startsWith: 'Начинается с',
    contains: 'Содержит',
    notContains: 'Не содержит',
    endsWith: 'Заканчивается',
    equals: 'Равно',
    notEquals: 'Не равно',
    noFilter: 'Нет фильтра',
    filter: 'Фильтр',
    lt: 'Меньше чем',
    lte: 'Меньше чем или равно',
    gt: 'Более чем',
    gte: 'Более чем или равно',
    dateIs: 'Дата равна',
    dateIsNot: 'Дата не равна',
    dateBefore: 'Дата до',
    dateAfter: 'Дата после',
    custom: 'Пользовательский',
    clear: 'Очистить',
    apply: 'Принять',
    matchAll: 'Сопоставить все',
    matchAny: 'Совпадение с любым',
    addRule: 'Добавить правило',
    removeRule: 'Удалить правило',
    accept: 'Да',
    reject: 'Нет',
    choose: 'Выбрать',
    upload: 'Загрузить',
    cancel: 'Отмена',
    completed: 'Завершено',
    pending: 'В ожидании',
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    monthNamesShort: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ],
    chooseYear: 'Выбрать год',
    chooseMonth: 'Выбрать месяц',
    chooseDate: 'Выбрать дату',
    prevDecade: 'Предыдущее десятилетие',
    nextDecade: 'Следующее десятилетие',
    prevYear: 'Предыдущий год',
    nextYear: 'Следующий год',
    prevMonth: 'Предыдущий месяц',
    nextMonth: 'Следующий месяц',
    prevHour: 'Предыдущий час',
    nextHour: 'Следующий час',
    prevMinute: 'Предыдущая минута',
    nextMinute: 'Следующая минута',
    prevSecond: 'Предыдущая секунда',
    nextSecond: 'Следующая секунда',
    am: 'до полудня',
    pm: 'после полудня',
    today: 'Сегодня',
    weekHeader: 'Нед.',
    firstDayOfWeek: 1,
    dateFormat: 'dd.mm.yy',
    weak: 'Простой',
    medium: 'Нормальный',
    strong: 'Хороший',
    passwordPrompt: 'Введите пароль',
    emptyFilterMessage: 'Результатов не найдено',
    searchMessage: '{0} результатов доступно',
    selectionMessage: '{0} элементов выбрано',
    emptySelectionMessage: 'Нет выбранного элемента',
    emptySearchMessage: 'Результатов не найдено',
    emptyMessage: 'Нет доступных вариантов',
    aria: {
      trueLabel: 'Верно',
      falseLabel: 'Неверно',
      nullLabel: 'Не выбран',
      star: '1 звезда',
      stars: '{star} звёзд',
      selectAll: 'Выбраны все элементы',
      unselectAll: 'Все элементы не выбраны',
      close: 'Закрыть',
      previous: 'Предыдущий',
      next: 'Следующий',
      navigation: 'Навигация',
      scrollTop: 'Прокрутить в начало',
      moveTop: 'Переместить в начало',
      moveUp: 'Переместить вверх',
      moveDown: 'Переместить вниз',
      moveBottom: 'Переместить в конец',
      moveToTarget: 'Переместить в приёмник',
      moveToSource: 'Переместить в источник',
      moveAllToTarget: 'Переместить всё в приёмник',
      moveAllToSource: 'Переместить всё в источник',
      pageLabel: '{page}',
      firstPageLabel: 'Первая страница',
      lastPageLabel: 'Последняя страница',
      nextPageLabel: 'Следующая страница',
      previousPageLabel: 'Предыдущая страница',
      rowsPerPageLabel: 'Строк на странице',
      jumpToPageDropdownLabel: 'Перейти к раскрывающемуся списку страниц',
      jumpToPageInputLabel: 'Перейти к вводу страницы',
      selectRow: 'Выбрана строка',
      unselectRow: 'Строка не выбрана',
      expandRow: 'Строка развёрнута',
      collapseRow: 'Строка свёрнута',
      showFilterMenu: 'Показать меню фильтра',
      hideFilterMenu: 'Скрыть меню фильтра',
      filterOperator: 'Оператор фильтра',
      filterConstraint: 'Ограничение фильтра',
      editRow: 'Редактирование строки',
      saveEdit: 'Сохранить правку',
      cancelEdit: 'Отменить правку',
      listView: 'В виде списка',
      gridView: 'В виде сетки',
      slide: 'Слайд',
      slideNumber: '{slideNumber}',
      zoomImage: 'Увеличить изображение',
      zoomIn: 'Увеличить',
      zoomOut: 'Уменьшить',
      rotateRight: 'Повернуть вправо',
      rotateLeft: 'Повернуть влево',
    },
  },
})
app.component('PrimeButton', PrimeButton)
app.use(router)
app.use(ToastService)
app.use(ConfirmationService)
app.use(vfm)
app.use(VueCookies, { expires: '7d' })
app.use(
  createYmaps({
    apikey: '7270e707-f1a7-4397-a1d7-0c545cf0b735',
  }),
)
app.use(ApiPlugin)
app.use(LoadPlugin)
app.use(mdiVue, {
  icons: mdijs,
})
app.mount('#app')

app.config.globalProperties.$filters = {
  round(value) {
    return value.toFixed(2)
  },
}
