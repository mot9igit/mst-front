import router from '@/router'

export default function (instance) {
  return {
    getNewNotification(payload) {
      const data = instance
        .post('front_notification/', payload)
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
    setViewNotification(payload) {
      const data = instance
        .post('front_notification/', payload)
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
    getNotifications(payload) {
      const data = instance
        .post('front_notification/', payload)
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
