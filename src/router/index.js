import { createRouter, createWebHistory } from 'vue-router'
import notFound from '../pages/not-found/index.vue'
import SignIn from '../pages/sign-in/index.vue'
import Account from '../pages/account/index.vue'
import Organization from '../pages/org/index.vue'
import userProfile from '../pages/profile/index.vue'
import Purchases from '../pages/purchases/index.vue'
import PurchasesOrders from '../pages/purchases/orders.vue'
import PurchasesOrder from '../pages/purchases/order.vue'
import PurchasesCatalog from '../pages/purchases/сatalog.vue'
import PurchasesVendors from '../pages/purchases/vendors.vue'
import Wholesale from '../pages/wholesale/index.vue'
import WholesaleOrders from '../pages/wholesale/orders.vue'
import WholesaleOrder from '../pages/wholesale/order.vue'
import WholesalePrices from '../pages/wholesale/prices.vue'
import WholesaleClients from '../pages/wholesale/clients.vue'
import WholesaleShipments from '../pages/wholesale/shipments.vue'
import Retail from '../pages/retail/index.vue'
import RetailOrders from '../pages/retail/orders.vue'
import RetailOrder from '../pages/retail/order.vue'
import RetailActions from '../pages/retail/actions.vue'
import RetailBalance from '../pages/retail/balance.vue'
import RetailCompareProducts from '../pages/retail/compareProducts.vue'
import Warehouse from '../pages/warehouse/index.vue'
import WarehouseReview from '../pages/warehouse/review.vue'
import WarehouseProducts from '../pages/warehouse/products.vue'
import WarehouseCustomization from '../pages/warehouse/customization.vue'
import ProfileCard from '../pages/org/card.vue'
import ProfileStuff from '../pages/org/staff.vue'
import ProfileAccess from '../pages/org/access.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn,
    },
    {
      path: '',
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('user')) {
          next()
        } else {
          next({ name: 'home' })
        }
      },
      children: [
        {
          path: '/account',
          name: 'account',
          props: true,
          label: 'Профиль',
          component: Account,
          children: [
            {
              path: '/profile',
              name: 'profile',
              props: true,
              label: 'Профиль пользователя',
              component: userProfile,
            },
            {
              path: '/:id',
              children: [
                {
                  path: '',
                  name: 'org',
                  props: true,
                  meta: {
                    breadcrumb: {
                      label: 'Организация',
                    },
                  },
                  label: 'Организация',
                  component: Organization,
                },
                {
                  path: 'purchases',
                  children: [
                    {
                      path: '',
                      name: 'purchases',
                      props: true,
                      label: 'Закупки',
                      component: Purchases,
                    },
                    {
                      path: 'search/:search',
                      name: 'purchasesCatalogSearch',
                      props: true,
                      label: 'Оптовый каталог',
                      component: PurchasesCatalog,
                    },
                    {
                      path: ':category_id',
                      name: 'purchasesCatalog',
                      props: true,
                      label: 'Оптовый каталог',
                      component: PurchasesCatalog,
                    },
                    {
                      path: 'warehouses/:org_w_id/:warehouse_id',
                      children: [
                        {
                          path: '',
                          name: 'purchasesCatalogWarehouse',
                          component: PurchasesCatalog,
                          label: 'Каталог оптовика',
                          meta: {
                            breadcrumb: {
                              label: 'Каталог оптовика',
                              link: 'warehouse_id',
                            },
                          },
                        },
                        {
                          path: ':warehouse_cat_id',
                          children: [
                            {
                              path: '',
                              name: 'purchasesCatalogWarehouseCategory',
                              label: 'Мой оптовик',
                              component: PurchasesCatalog,
                            },
                          ],
                        },
                      ],
                    },
                    {
                      path: 'orders',
                      children: [
                        {
                          path: '',
                          name: 'purchasesOrders',
                          props: true,
                          label: 'Заказы',
                          component: PurchasesOrders,
                        },
                        {
                          path: ':order_id',
                          name: 'purchasesOrder',
                          props: true,
                          label: 'Заказы',
                          component: PurchasesOrder,
                        },
                      ],
                    },
                    {
                      path: 'vendors',
                      name: 'purchasesVendors',
                      props: true,
                      label: 'Мои поставщики',
                      component: PurchasesVendors,
                    },
                  ],
                },
                {
                  path: 'wholesale',
                  children: [
                    {
                      path: '',
                      name: 'wholesale',
                      props: true,
                      label: 'Оптовые продажи',
                      component: Wholesale,
                    },
                    {
                      path: 'orders',
                      children: [
                        {
                          path: '',
                          name: 'wholesaleOrders',
                          props: true,
                          label: 'Заказы',
                          component: WholesaleOrders,
                        },
                        {
                          path: ':order_id',
                          name: 'wholesaleOrder',
                          props: true,
                          label: 'Заказы',
                          component: WholesaleOrder,
                        },
                      ],
                    },
                    {
                      path: 'prices',
                      name: 'wholesalePrices',
                      props: true,
                      label: 'Оптовые цены',
                      component: WholesalePrices,
                    },
                    {
                      path: 'clients',
                      name: 'wholesaleClients',
                      props: true,
                      label: 'Клиенты',
                      component: WholesaleClients,
                    },
                    {
                      path: 'shipments',
                      name: 'wholesaleShipments',
                      props: true,
                      label: 'Отгрузки',
                      component: WholesaleShipments,
                    },
                  ],
                },
                {
                  path: 'retail',
                  children: [
                    {
                      path: '',
                      name: 'retail',
                      props: true,
                      label: 'Розничные продажи',
                      component: Retail,
                    },
                    {
                      path: 'orders',
                      children: [
                        {
                          path: '',
                          name: 'retailOrders',
                          props: true,
                          label: 'Заказы',
                          component: RetailOrders,
                        },
                        {
                          path: ':order_id',
                          name: 'retailOrder',
                          props: true,
                          label: 'Заказы',
                          component: RetailOrder,
                        },
                      ],
                    },
                    {
                      path: 'actions',
                      name: 'retailActions',
                      props: true,
                      label: 'Акции',
                      component: RetailActions,
                    },
                    {
                      path: 'balance',
                      name: 'retailBalance',
                      props: true,
                      label: 'Баланс',
                      component: RetailBalance,
                    },
                    {
                      path: 'compareProducts',
                      name: 'retailCompareProducts',
                      props: true,
                      label: 'Сопоставление товаров',
                      component: RetailCompareProducts,
                    },
                  ],
                },
                {
                  path: 'warehouse',
                  children: [
                    {
                      path: '',
                      name: 'warehouse',
                      props: true,
                      label: 'Мой склад',
                      component: Warehouse,
                    },
                    {
                      path: 'review',
                      name: 'warehouseReview',
                      props: true,
                      label: 'Анализ склада',
                      component: WarehouseReview,
                    },
                    {
                      path: 'products',
                      name: 'warehouseProducts',
                      props: true,
                      label: 'Коллекции товара',
                      component: WarehouseProducts,
                    },
                    {
                      path: 'customization',
                      name: 'warehouseCustomization',
                      props: true,
                      label: 'Настройки склада',
                      component: WarehouseCustomization,
                    },
                  ],
                },
                {
                  path: 'org',
                  children: [
                    {
                      path: '',
                      name: 'organization',
                      props: true,
                      label: 'Моя компания',
                      component: Organization,
                    },
                    {
                      path: 'card',
                      name: 'profileCard',
                      props: true,
                      label: 'Карточка компании',
                      component: ProfileCard,
                    },
                    {
                      path: 'stuff',
                      name: 'profileStuff',
                      props: true,
                      label: 'Сотрудники',
                      component: ProfileStuff,
                    },
                    {
                      path: 'access',
                      name: 'profileAccess',
                      props: true,
                      label: 'Политики доступа',
                      component: ProfileAccess,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: notFound,
    },
  ],
})

export default router
