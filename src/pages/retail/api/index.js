import router from '@/router'

export default function (instance) {
  return {
    getOrders(payload) {
      const data = instance
        .post('front_getorders/', payload)
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
    getBalance(payload) {
      const data = instance
        .post('front_getobjects/', payload)
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
    getBalanceRequest(payload) {
      const data = instance
        .post('front_getobjects/', payload)
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
    setBalanceRequest(payload) {
      const data = instance
        .post('front_setobjects/', payload)
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
    getSales(payload) {
      const data = instance
        .post('front_sales/', payload)
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
