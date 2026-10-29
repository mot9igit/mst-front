import router from '@/router'

export default function (instance) {
  return {
    getOrders(payload) {
      const data = instance
        .post('front_getshipping/', payload)
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
    acceptCode(payload) {
      const data = instance
        .post('front_getshipping/', payload)
        .then(function (res) {
          return res
        })
        .catch(function (err) {
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
    saveShippingCity(payload) {
      const data = instance
        .post('front_getshipping/', payload)
        .then(function (res) {
          return res
        })
        .catch(function (err) {
          if (err.response) {
            if (err.response.status == 403) {
              localStorage.removeItem('user')
              router.push({ name: 'home' })
            }
            throw err
          } else {
            throw new Error('technical error')
          }
        })
      return data
    },
  }
}