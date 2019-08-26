const gpms = {
  state: {
    dataList: [
    ],
    customerDialogShow: false,
  },
  mutations: {
    SET_PROJECT_JOIN_PK: (state, joinObject) => {
      state.dataList.push(joinObject)
    },
    SET_PROJECT_REMOVE_PK: (state, id) => {
      // state.dataList.remove(joinObject)
      if (id==-1) {
        state.dataList=[]
      } 
      for (var i = state.dataList.length-1; i>-1; i--)
        if (state.dataList[i].id==id)
            state.dataList.splice(i,1)
    },
    SET_CUSTOMER_DIALOG_SHOW: (state, customerDialogShow) => {
      state.customerDialogShow = customerDialogShow
    },
  },
}
export default gpms