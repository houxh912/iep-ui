
// import {
//   getProject,
//   getGroupDept,
// } from '@/api/evaluate/question'
export default {
  data () {
    return {

      projectIdDic: [],
    }
  },
  computed: {
    searchOption () {
      return [
        { label: '项目名称', prop: 'status', type: 'select', data: this.projectIdDic  },
      ]
    },
  },
  created () {
  },
}
