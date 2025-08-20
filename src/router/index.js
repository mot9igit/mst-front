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
import PurchasesAction from '../pages/purchases/action.vue'
import Wholesale from '../pages/wholesale/index.vue'
import WholesaleOrders from '../pages/wholesale/orders.vue'
import WholesaleOrder from '../pages/wholesale/order.vue'
import WholesalePrices from '../pages/wholesale/prices.vue'
import WholesaleSale from '../pages/wholesale/sale.vue'
import WholesaleSaleNew from '../pages/wholesale/saleNew.vue'
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
import ProfileHash from '../pages/profile/profileHash.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn,
      meta: {
        breadcrumb: {
          label: 'Авторизация',
        },
      },
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
          meta: {
            breadcrumb: {
              label: 'Аккаунт',
            },
          },
          children: [
            {
              path: '/profile',
              meta: {
                breadcrumb: {
                  label: 'Профиль',
                },
              },
              children: [
                {
                  path: '',
                  name: 'profile',
                  props: true,
                  label: 'Профиль изменения данных',
                  component: userProfile,
                },
                {
                  path: ':hash',
                  name: 'profileHash',
                  props: true,
                  label: 'Профиль изменения данных',
                  component: ProfileHash,
                },
              ],
            },
            {
              path: '/:id',
              meta: {
                breadcrumb: {
                  label: 'Организация',
                },
              },
              children: [
                {
                  path: '',
                  name: 'org',
                  props: true,
                  label: 'Организация',
                  component: Organization,
                },
                {
                  path: 'purchases',
                  name: 'purchases',
                  redirect: { name: 'purchasesCatalogIndexPage' },
                  meta: {
                    breadcrumb: {
                      label: 'Закупки',
                    },
                  },
                  children: [
                    {
                      path: 'catalog',
                      name: 'purchasesCatalogIndex',
                      redirect: { name: 'purchasesCatalogIndexPage' },
                      children: [
                        {
                          path: '',
                          props: true,
                          name: 'purchasesCatalogIndexPage',
                          label: 'Закупки',
                          component: Purchases,
                        },
                        {
                          path: ':category_id',
                          name: 'purchasesCatalog',
                          props: true,
                          label: 'Оптовый каталог',
                          component: PurchasesCatalog,
                          meta: {
                            breadcrumb: {
                              label: 'Каталог',
                            },
                          },
                        },
                        {
                          path: 'warehouses/:org_w_id/:warehouse_id',
                          meta: {
                            breadcrumb: {
                              label: 'Каталог поставщика',
                            },
                          },
                          children: [
                            {
                              path: '',
                              name: 'purchasesCatalogWarehouse',
                              component: PurchasesCatalog,
                              label: 'Каталог поставщика',
                            },
                            {
                              path: ':warehouse_cat_id',
                              meta: {
                                breadcrumb: {
                                  label: 'Каталог поставщика',
                                },
                              },
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
                          path: 'req/:requirement_id',
                          name: 'purchasesCatalogRequirement',
                          props: true,
                          meta: {
                            breadcrumb: {
                              label: 'Потребность',
                            },
                          },
                          component: PurchasesCatalog,
                        },
                        {
                          path: 'search/:search',
                          name: 'purchasesCatalogSearch',
                          props: true,
                          label: 'Оптовый каталог',
                          component: PurchasesCatalog,
                          meta: {
                            breadcrumb: {
                              label: 'Поиск',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'actions/:action_id',
                      name: 'purchasesAction',
                      props: true,
                      label: 'Акция',
                      component: PurchasesAction,
                      meta: {
                        breadcrumb: {
                          label: 'Акция',
                        },
                      },
                    },
                    {
                      path: 'orders',
                      meta: {
                        breadcrumb: {
                          label: 'Мои заказы',
                        },
                      },
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
                          meta: {
                            breadcrumb: {
                              label: 'Мой заказ',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'vendors',
                      name: 'purchasesVendors',
                      props: true,
                      label: 'Мои поставщики',
                      component: PurchasesVendors,
                      meta: {
                        breadcrumb: {
                          label: 'Мои поставщики',
                        },
                      },
                    },
                  ],
                },
                {
                  path: 'wholesale',
                  name: 'wholesale',
                  meta: {
                    breadcrumb: {
                      label: 'Оптовые продажи',
                    },
                  },
                  children: [
                    {
                      path: '',
                      name: 'wholesaleIndex',
                      props: true,
                      label: 'Оптовые продажи',
                      component: Wholesale,
                    },
                    {
                      path: 'orders',
                      meta: {
                        breadcrumb: {
                          label: 'Оптовые заказы',
                        },
                      },
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
                          meta: {
                            breadcrumb: {
                              label: 'Оптовый заказ',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'prices',
                      meta: {
                        breadcrumb: {
                          label: 'Оптовые цены',
                        },
                      },
                      children: [
                        {
                          path: '',
                          name: 'wholesalePrices',
                          props: true,
                          label: 'Оптовые цены',
                          component: WholesalePrices,
                        },
                        {
                          path: 'new',
                          name: 'wholesaleSaleNew',
                          props: true,
                          label: 'Акция',
                          component: WholesaleSaleNew,
                          meta: {
                            breadcrumb: {
                              label: 'Создание акции',
                            },
                          },
                        },
                        {
                          path: ':action',
                          name: 'wholesaleSale',
                          props: true,
                          label: 'Акция',
                          component: WholesaleSale,
                          meta: {
                            breadcrumb: {
                              label: 'Редактирование акции',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'clients',
                      name: 'wholesaleClients',
                      props: true,
                      label: 'Клиенты',
                      component: WholesaleClients,
                      meta: {
                        breadcrumb: {
                          label: 'Мои клиенты',
                        },
                      },
                    },
                    {
                      path: 'shipments',
                      name: 'wholesaleShipments',
                      props: true,
                      label: 'Отгрузки',
                      component: WholesaleShipments,
                      meta: {
                        breadcrumb: {
                          label: 'Отгрузки',
                        },
                      },
                    },
                  ],
                },
                {
                  path: 'retail',
                  name: 'retail',
                  meta: {
                    breadcrumb: {
                      label: 'Розничные продажи',
                    },
                  },
                  children: [
                    {
                      path: '',
                      props: true,
                      name: 'retailIndex',
                      label: 'Розничные продажи',
                      component: Retail,
                    },
                    {
                      path: 'orders',
                      meta: {
                        breadcrumb: {
                          label: 'Розничные заказы',
                        },
                      },
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
                          meta: {
                            breadcrumb: {
                              label: 'Розничные заказ',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'actions',
                      name: 'retailActions',
                      props: true,
                      label: 'Акции',
                      component: RetailActions,
                      meta: {
                        breadcrumb: {
                          label: 'Розничные акции',
                        },
                      },
                    },
                    {
                      path: 'balance',
                      name: 'retailBalance',
                      props: true,
                      label: 'Баланс',
                      component: RetailBalance,
                      meta: {
                        breadcrumb: {
                          label: 'Баланс',
                        },
                      },
                    },
                    {
                      path: 'compareProducts',
                      name: 'retailCompareProducts',
                      props: true,
                      label: 'Сопоставление товаров',
                      component: RetailCompareProducts,
                      meta: {
                        breadcrumb: {
                          label: 'Сопоставление товаров',
                        },
                      },
                    },
                  ],
                },
                {
                  path: 'warehouse',
                  name: 'warehouse',
                  meta: {
                    breadcrumb: {
                      label: 'Мой склад',
                    },
                  },
                  children: [
                    {
                      path: '',
                      props: true,
                      name: 'warehouseIndex',
                      label: 'Мой склад',
                      component: Warehouse,
                    },
                    {
                      path: 'review',
                      name: 'warehouseReview',
                      props: true,
                      label: 'Анализ склада',
                      component: WarehouseReview,
                      meta: {
                        breadcrumb: {
                          label: 'Анализ склада',
                        },
                      },
                    },
                    {
                      path: 'products',
                      name: 'warehouseProducts',
                      props: true,
                      label: 'Коллекции товара',
                      component: WarehouseProducts,
                      meta: {
                        breadcrumb: {
                          label: 'Коллекции товаров',
                        },
                      },
                    },
                    {
                      path: 'customization',
                      name: 'warehouseCustomization',
                      props: true,
                      label: 'Настройки склада',
                      component: WarehouseCustomization,
                      meta: {
                        breadcrumb: {
                          label: 'Настройки склада',
                        },
                      },
                    },
                  ],
                },
                {
                  path: 'org',
                  name: 'organization',
                  redirect: { name: 'organizationIndexPage' },
                  meta: {
                    breadcrumb: {
                      label: 'Моя компания',
                    },
                  },
                  children: [
                    {
                      path: '',
                      props: true,
                      name: 'organizationIndexPage',
                      label: 'Моя компания',
                      component: Organization,
                    },
                    {
                      path: 'card',
                      name: 'profileCard',
                      props: true,
                      label: 'Карточка компании',
                      component: ProfileCard,
                      meta: {
                        breadcrumb: {
                          label: 'Карточка компании',
                        },
                      },
                    },
                    {
                      path: 'stuff',
                      name: 'profileStuff',
                      props: true,
                      label: 'Сотрудники',
                      component: ProfileStuff,
                      meta: {
                        breadcrumb: {
                          label: 'Сотрудники',
                        },
                      },
                    },
                    {
                      path: 'access',
                      name: 'profileAccess',
                      props: true,
                      label: 'Политики доступа',
                      component: ProfileAccess,
                      meta: {
                        breadcrumb: {
                          label: 'Политики доступа',
                        },
                      },
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
      meta: {
        breadcrumb: {
          label: 'Не найдено',
        },
      },
    },
  ],
})

export default router
