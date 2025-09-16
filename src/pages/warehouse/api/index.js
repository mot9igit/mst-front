import router from '@/router'

export default function (instance) {
  return {
    getCollections(payload) {
      const data = instance
        .post('front_group/', payload)
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
    getCollection(payload) {
      const data = instance
        .post('front_group/', payload)
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
    setCollection(payload) {
      const data = instance
        .post('front_group/', payload)
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
    deleteCollection(payload) {
      const data = instance
        .post('front_group/', payload)
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
