const change = {
  state: {
    hide: true,
    padding: 320,
    count: 0,
    screenWidth: '',
  },
  actions: {},
  mutations: {
    hideAside (state) {
      state.count++
      state.hide = !state.hide
      if (state.count % 2 == 1) {
        var t1 = setInterval(() => {
          if (state.padding > 20) {
            state.padding -= 5
          } else {
            clearInterval(t1)
          }
        }, 10)
      } else {
        if (document.body.clientWidth > 1270) {
          state.padding = 320
        }
        if (
          1025 <= document.body.clientWidth &&
          document.body.clientWidth <= 1270
        ) {
          state.padding = 240
        }
        if (document.body.clientWidth < 1025) {
          state.padding = 20
        }
      }
    },
    show (state) {
      state.padding = 320
    },
    response (state) {
      state.padding = 240
    },
    hide (state) {
      state.padding = 20
    },
  },
}
export default change
