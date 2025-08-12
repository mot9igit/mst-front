import router from '@/router'

export default function (instance) {
  return {
    getBasket(payload) {
      const data = instance
        .post('front_opt/', payload)
        .then(function (res) {
          return res
        })
        .catch(function (err) {
          // TODO: подключить компонент обработки ошибок
          // console.log(err)
          if (err.response) {
            if (err.status == 403) {
              localStorage.removeItem('user')
              router.push({ name: 'home' })
            }
          } else {
            return 'technical error'
          }
        })
      return data
    },
    basketProductAdd(payload) {
      const data = instance
        .post('front_opt/', payload)
        .then(function (res) {
          return res
        })
        .catch(function (err) {
          // TODO: подключить компонент обработки ошибок
          // console.log(err)
          if (err.response) {
            if (err.status == 403) {
              localStorage.removeItem('user')
              router.push({ name: 'home' })
            }
          } else {
            return 'technical error'
          }
        })
      return data
    },
    basketProductRemove(payload) {
      const data = instance
        .post('front_opt/', payload)
        .then(function (res) {
          return res
        })
        .catch(function (err) {
          // TODO: подключить компонент обработки ошибок
          // console.log(err)
          if (err.response) {
            if (err.status == 403) {
              localStorage.removeItem('user')
              router.push({ name: 'home' })
            }
          } else {
            return 'technical error'
          }
        })
      return data
    },
    basketClear(payload) {
      const data = instance
        .post('front_opt/', payload)
        .then(function (res) {
          return res
        })
        .catch(function (err) {
          // TODO: подключить компонент обработки ошибок
          // console.log(err)
          if (err.response) {
            if (err.status == 403) {
              localStorage.removeItem('user')
              router.push({ name: 'home' })
            }
          } else {
            return 'technical error'
          }
        })
      return data
    },
    basketProductUpdate(payload) {
      const data = instance
        .post('front_opt/', payload)
        .then(function (res) {
          return res
        })
        .catch(function (err) {
          // TODO: подключить компонент обработки ошибок
          // console.log(err)
          if (err.response) {
            if (err.status == 403) {
              localStorage.removeItem('user')
              router.push({ name: 'home' })
            }
          } else {
            return 'technical error'
          }
        })
      return data
    },
    setOrgBasketStore(payload) {
      const data = instance
        .post('front_opt/', payload)
        .then(function (res) {
          return res
        })
        .catch(function (err) {
          // TODO: подключить компонент обработки ошибок
          // console.log(err)
          if (err.response) {
            if (err.status == 403) {
              localStorage.removeItem('user')
              router.push({ name: 'home' })
            }
          } else {
            return 'technical error'
          }
        })
      return data
    },
    orderSubmit(payload) {
      const data = instance
        .post('front_opt/', payload)
        .then(function (res) {
          return res
        })
        .catch(function (err) {
          // TODO: подключить компонент обработки ошибок
          // console.log(err)
          if (err.response) {
            if (err.status == 403) {
              localStorage.removeItem('user')
              router.push({ name: 'home' })
            }
          } else {
            return 'technical error'
          }
        })
      return data
    },
  }
}
