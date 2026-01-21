import { createRouter, createWebHistory } from 'vue-router'
// import notFound from '../pages/not-found/index.vue'
// import SignIn from '../pages/sign-in/index.vue'
// import Account from '../pages/account/index.vue'
// import Organization from '../pages/org/index.vue'
// import userProfile from '../pages/profile/index.vue'
// import OrgAdd from '../pages/org/add.vue'
// import Purchases from '../pages/purchases/index.vue'
// import PurchasesOrders from '../pages/purchases/orders.vue'
// import PurchasesOrder from '../pages/purchases/order.vue'
// import PurchasesOffers from '../pages/purchases/offers.vue'
// import PurchasesOffer from '../pages/purchases/offer.vue'
// import PurchasesCatalog from '../pages/purchases/сatalog.vue'
// import PurchasesVendors from '../pages/purchases/vendors.vue'
// import PurchasesAction from '../pages/purchases/action.vue'
// import Wholesale from '../pages/wholesale/index.vue'
// import WholesaleOrders from '../pages/wholesale/orders.vue'
// import WholesaleOrder from '../pages/wholesale/order.vue'
// import WholesaleOffers from '../pages/wholesale/offers.vue'
// import WholesaleOffer from '../pages/wholesale/offer.vue'
// import WholesalePrices from '../pages/wholesale/prices.vue'
// import WholesaleSaleNew from '../pages/wholesale/saleNew.vue'
// import WholesaleClients from '../pages/wholesale/clients.vue'
// import WholesaleClientsAdd from '../pages/wholesale/clientsAdd.vue'
// import WholesaleClientsOffer from '../pages/wholesale/clientsOffer.vue'
// import WholesaleShipments from '../pages/wholesale/shipments.vue'
// import Retail from '../pages/retail/index.vue'
// import RetailOrders from '../pages/retail/orders.vue'
// import RetailOrder from '../pages/retail/order.vue'
// import RetailActions from '../pages/retail/actions.vue'
// import retailSaleNew from '../pages/retail/saleNew.vue'
// import RetailBalance from '../pages/retail/balance.vue'
// import RetailCompareProducts from '../pages/retail/compareProducts.vue'
// import RetailCompareStoreProducts from '../pages/retail/compareStoreProducts.vue'
// import Warehouse from '../pages/warehouse/index.vue'
// import WarehouseReview from '../pages/warehouse/review.vue'
// import WarehouseReviewStore from '../pages/warehouse/reviewStore.vue'
// import WarehouseStoreSettings from '../pages/warehouse/storeSettings.vue'
// import WarehouseCollections from '../pages/warehouse/collections.vue'
// import WarehouseCollection from '../pages/warehouse/collection.vue'
// import WarehouseCustomization from '../pages/warehouse/customization.vue'
// import ProfileCard from '../pages/org/card.vue'
// import ProfileStuff from '../pages/org/staff.vue'
// import ProfileStuffEdit from '../pages/org/staffEdit.vue'
// import ProfileStuffCreate from '../pages/org/staffCreate.vue'
// import ProfileAccess from '../pages/org/access.vue'
// import ProfileHash from '../pages/profile/profileHash.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/sign-in/index.vue'),
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
          component: () => import('../pages/account/index.vue'),
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
                  component: () => import('../pages/profile/index.vue'),
                },
                {
                  path: ':hash',
                  name: 'profileHash',
                  props: true,
                  label: 'Профиль изменения данных',
                  component: () => import('../pages/profile/profileHash.vue'),
                },
                {
                  path: 'orgAdd',
                  name: 'OrgAdd',
                  props: true,
                  label: 'Создание Организации',
                  component: () => import('../pages/org/add.vue'),
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
                  component: () => import('../pages/org/index.vue'),
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
                          component: () => import('../pages/purchases/index.vue'),
                        },
                        {
                          path: ':category_id',
                          name: 'purchasesCatalog',
                          props: true,
                          label: 'Оптовый каталог',
                          component: () => import('../pages/purchases/сatalog.vue'),
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
                              component: () => import('../pages/purchases/сatalog.vue'),
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
                                  component: () => import('../pages/purchases/сatalog.vue'),
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
                          component: () => import('../pages/purchases/сatalog.vue'),
                        },
                        {
                          path: 'complect/:action_id',
                          name: 'purchasesCatalogComplect',
                          props: true,
                          meta: {
                            breadcrumb: {
                              label: 'Комплект',
                            },
                          },
                          component: () => import('../pages/purchases/сatalog.vue'),
                        },
                        {
                          path: 'search',
                          name: 'purchasesCatalogSearch',
                          props: true,
                          label: 'Оптовый каталог',
                          component: () => import('../pages/purchases/сatalog.vue'),
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
                      component: () => import('../pages/purchases/action.vue'),
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
                          component: () => import('../pages/purchases/orders.vue'),
                        },
                        {
                          path: ':order_id',
                          name: 'purchasesOrder',
                          props: true,
                          label: 'Заказы',
                          component: () => import('../pages/purchases/order.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Мой заказ',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'offers',
                      meta: {
                        breadcrumb: {
                          label: 'Предложения',
                        },
                      },
                      children: [
                        {
                          path: '',
                          name: 'purchasesOffers',
                          props: true,
                          label: 'Заказы',
                          component: () => import('../pages/purchases/offers.vue'),
                        },
                        {
                          path: ':offer_id',
                          name: 'purchasesOffer',
                          props: true,
                          label: 'Предложение',
                          component: () => import('../pages/purchases/offer.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Предложение',
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
                      component: () => import('../pages/purchases/vendors.vue'),
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
                      redirect: { name: 'wholesaleOrders' },
                      props: true,
                      label: 'Оптовые продажи',
                      component: () => import('../pages/wholesale/index.vue'),
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
                          component: () => import('../pages/wholesale/orders.vue'),
                        },
                        {
                          path: ':order_id',
                          name: 'wholesaleOrder',
                          props: true,
                          label: 'Заказы',
                          component: () => import('../pages/wholesale/order.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Оптовый заказ',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'offers',
                      meta: {
                        breadcrumb: {
                          label: 'Мои предложения',
                        },
                      },
                      children: [
                        {
                          path: '',
                          name: 'wholesaleOffers',
                          props: true,
                          label: 'Мои предложения',
                          component: () => import('../pages/wholesale/offers.vue'),
                        },
                        {
                          path: ':offer_id',
                          name: 'wholesaleOffer',
                          props: true,
                          label: 'Предложение',
                          component: () => import('../pages/wholesale/offer.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Предложение',
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
                          component: () => import('../pages/wholesale/prices.vue'),
                        },
                        {
                          path: 'new',
                          name: 'wholesaleSaleNew',
                          props: true,
                          label: 'Акция',
                          component: () => import('../pages/wholesale/saleNew.vue'),
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
                          component: () => import('../pages/wholesale/saleNew.vue'),
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
                      meta: {
                        breadcrumb: {
                          label: 'Мои клиенты',
                        },
                      },
                      children: [
                        {
                          path: '',
                          props: true,
                          name: 'wholesaleClients',
                          label: 'Клиенты',
                          component: () => import('../pages/wholesale/clients.vue'),
                        },
                        {
                          path: 'add',
                          props: true,
                          name: 'WholesaleClientsAdd',
                          label: 'Клиенты',
                          component: () => import('../pages/wholesale/clientsAdd.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Создание виртуальной организации',
                            },
                          },
                        },
                        {
                          path: ':client_id',
                          props: true,
                          name: 'WholesaleClientsEdit',
                          label: 'Клиенты',
                          component: () => import('../pages/wholesale/clientsAdd.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Создание виртуальной организации',
                            },
                          },
                        },
                        {
                          path: 'offer/:id_org_from',
                          name: 'WholesaleClientsOffer',
                          meta: {
                            breadcrumb: {
                              label: 'Предложение',
                            },
                          },
                          children: [
                            {
                              path: '',
                              props: true,
                              name: 'WholesalesOfferClient',
                              label: 'Предложение',
                              component: () => import('../pages/wholesale/clientsOffer.vue'),
                            },
                            {
                              path: 'search',
                              name: 'purchasesCatalogSearchOffer',
                              props: true,
                              label: 'Оптовый каталог для предложения',
                              component: () => import('../pages/purchases/сatalog.vue'),
                              meta: {
                                breadcrumb: {
                                  label: 'Поиск',
                                },
                              },
                            },
                            {
                              path: 'req/:requirement_id',
                              name: 'purchasesOfferCatalogRequirement',
                              props: true,
                              meta: {
                                breadcrumb: {
                                  label: 'Потребность',
                                },
                              },
                              component: () => import('../pages/purchases/сatalog.vue'),
                            },
                            {
                              path: 'catalog/:category_id',
                              name: 'purchasesOfferCatalog',
                              props: true,
                              label: 'Оптовый каталог',
                              component: () => import('../pages/purchases/сatalog.vue'),
                              meta: {
                                breadcrumb: {
                                  label: 'Каталог',
                                },
                              },
                            },
                            {
                              path: ':org_w_id/:warehouse_id',
                              name: 'purchasesOfferCatalogWarehouse',
                              meta: {
                                breadcrumb: {
                                  label: 'Каталог поставщика',
                                },
                              },
                              children: [
                                {
                                  path: '',
                                  name: 'purchasesWarehouseOfferCatalog',
                                  component: () => import('../pages/purchases/сatalog.vue'),
                                  label: 'Каталог поставщика',
                                },
                                {
                                  path: ':warehouse_cat_id',
                                  name: 'purchasesCatalogWarehouseCategoryOffer',
                                  meta: {
                                    breadcrumb: {
                                      label: 'Каталог поставщика',
                                    },
                                  },
                                  children: [
                                    {
                                      path: '',
                                      name: 'purchasesOfferCatalogWarehouseCategory',
                                      label: 'Мой оптовик',
                                      component: () => import('../pages/purchases/сatalog.vue'),
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
                      path: 'shipments',
                      name: 'wholesaleShipments',
                      props: true,
                      label: 'Отгрузки',
                      component: () => import('../pages/wholesale/shipments.vue'),
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
                      redirect: { name: 'retailOrders' },
                      label: 'Розничные продажи',
                      component: () => import('../pages/retail/index.vue'),
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
                          component: () => import('../pages/retail/orders.vue'),
                        },
                        {
                          path: ':order_id',
                          name: 'retailOrder',
                          props: true,
                          label: 'Заказ',
                          component: () => import('../pages/retail/order.vue'),
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
                      meta: {
                        breadcrumb: {
                          label: 'Розничные акции',
                        },
                      },
                      children: [
                        {
                          path: '',
                          name: 'retailActions',
                          props: true,
                          label: 'Розничные акции',
                          component: () => import('../pages/retail/actions.vue'),
                        },
                        {
                          path: 'new',
                          name: 'retailSaleNew',
                          props: true,
                          label: 'Акция',
                          component: () => import('../pages/retail/saleNew.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Создание акции',
                            },
                          },
                        },
                        {
                          path: ':action',
                          name: 'retailSale',
                          props: true,
                          label: 'Акция',
                          component: () => import('../pages/retail/saleNew.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Редактирование акции',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'balance',
                      name: 'retailBalance',
                      props: true,
                      label: 'Баланс',
                      component: () => import('../pages/retail/balance.vue'),
                      meta: {
                        breadcrumb: {
                          label: 'Баланс',
                        },
                      },
                    },
                    {
                      path: 'compareProducts',
                      meta: {
                        breadcrumb: {
                          label: 'Сопоставление товаров',
                        },
                      },
                      children: [
                        {
                          path: '',
                          name: 'retailCompareProducts',
                          props: true,
                          label: 'Сопоставление товаров',
                          component: () => import('../pages/retail/compareProducts.vue'),
                        },
                        {
                          path: ':store_id',
                          name: 'retailCompareStoreProducts',
                          props: true,
                          label: 'Сопоставление товаров на складе',
                          component: () => import('../pages/retail/compareStoreProducts.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Сопоставление товаров на складе',
                            },
                          },
                        },
                      ],
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
                      component: () => import('../pages/warehouse/index.vue'),
                    },
                    {
                      path: 'review',
                      meta: {
                        breadcrumb: {
                          label: 'Анализ склада',
                        },
                      },
                      children: [
                        {
                          path: '',
                          name: 'warehouseReview',
                          props: true,
                          label: 'Анализ склада',
                          component: () => import('../pages/warehouse/review.vue'),
                        },
                        {
                          path: ':store_id',
                          name: 'warehouseReviewStore',
                          props: true,
                          label: 'Статистика склада',
                          component: () => import('../pages/warehouse/reviewStore.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Статистика склада',
                            },
                          },
                        },
                        {
                          path: 'settings/:store_id',
                          name: 'warehouseStoreSettings',
                          props: true,
                          label: 'Настройки склада',
                          component: () => import('../pages/warehouse/storeSettings.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Настройки склада',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'collections',
                      meta: {
                        breadcrumb: {
                          label: 'Коллекции товаров',
                        },
                      },
                      children: [
                        {
                          path: '',
                          name: 'WarehouseCollections',
                          props: true,
                          label: 'Коллекции товара',
                          component: () => import('../pages/warehouse/collections.vue'),
                        },
                        {
                          path: 'new',
                          name: 'WarehouseCollectionNew',
                          props: true,
                          label: 'Коллекция товара',
                          component: () => import('../pages/warehouse/collection.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Создание коллекции',
                            },
                          },
                        },
                        {
                          path: ':collection_id',
                          name: 'WarehouseCollection',
                          props: true,
                          label: 'Коллекция товара',
                          component: () => import('../pages/warehouse/collection.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Редактирование коллекции',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'customization',
                      name: 'warehouseCustomization',
                      props: true,
                      label: 'Настройки склада',
                      component: () => import('../pages/warehouse/customization.vue'),
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
                      component: () => import('../pages/org/index.vue'),
                    },
                    {
                      path: 'card',
                      name: 'profileCard',
                      props: true,
                      label: 'Карточка компании',
                      component: () => import('../pages/org/card.vue'),
                      meta: {
                        breadcrumb: {
                          label: 'Карточка компании',
                        },
                      },
                    },
                    {
                      path: 'stuff',
                      meta: {
                        breadcrumb: {
                          label: 'Сотрудники',
                        },
                      },
                      children: [
                        {
                          path: '',
                          name: 'profileStuff',
                          props: true,
                          label: 'Сотрудники',
                          component: () => import('../pages/org/staff.vue'),
                        },
                        {
                          path: ':manager_id',
                          name: 'profileStuffEdit',
                          props: true,
                          label: 'Редактирование сотрудника',
                          component: () => import('../pages/org/staffEdit.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Редактирование сотрудника',
                            },
                          },
                        },
                        {
                          path: 'create',
                          name: 'profileStuffCreate',
                          props: true,
                          label: 'Создание сотрудника',
                          component: () => import('../pages/org/staffCreate.vue'),
                          meta: {
                            breadcrumb: {
                              label: 'Создание сотрудника',
                            },
                          },
                        },
                      ],
                    },
                    {
                      path: 'access',
                      name: 'profileAccess',
                      props: true,
                      label: 'Политики доступа',
                      component: () => import('../pages/org/access.vue'),
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
      component: () => import('../pages/not-found/index.vue'),
      meta: {
        breadcrumb: {
          label: 'Не найдено',
        },
      },
    },
  ],
})

export default router
