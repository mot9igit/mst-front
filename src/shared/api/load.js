export default {
  install: (app, options) => {
    app.config.globalProperties.$load = async (action, errHandler) => {
      try {
        await action()
      } catch (error) {
        if (errHandler) {
          errHandler(error)
        } else {
          console.log(error)
        }
      }
    }
    app.provide('load', options)
  },
}
