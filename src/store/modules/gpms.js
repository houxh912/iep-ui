const gpms = {
  state: {
    dataList: [
    ],
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
  },
}
export default gpms