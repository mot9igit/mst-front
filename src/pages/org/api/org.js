export default function (instance) {
  return {
    getOrg(payload) {
      const data = instance
        .post('front_org/', payload)
        .then(function (res) {
          return res
        })
        .catch(function (err) {
          // TODO: подключить компонент обработки ошибок
          // console.log(err)
          if (err.response) {
            return false
          } else {
            return 'technical error'
          }
        })
      return data
    },
  }
}
