<template>
  <el-select filterable remote placeholder="请输入卫星词" :remote-method="remoteMethod" :loading="loading" @change="handleChange" clearable v-bind="$attrs" v-on="$listeners" multiple>
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
    </el-option>
  </el-select>
</template>
<script>
import { getResultList } from '@/api/tms/management'
export default {
  name: 'TmsSelect',
  inheritAttrs: false,
  props: {
    SatelliteWordName: {
      type: Array,
      default: () => [],
    },
    AddOption: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      options: [],
      loading: false,
      changeOptions: [],// 盛放改变后去重后数据的新数组
    }
  },
  methods: {
    handleChange (v) {
      const value = this.options.find(m => m.id === v)
      this.$emit('relation-change', value)
    },
    async remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        try {
          const { data } = await getResultList({ name: query })
          this.options = data.data.map(m => {
            return {
              id: m.commonId,
              name: m.commonName,
            }
          })
          this.options.concat(this.changeOptions)
          let newJson = [] //盛放去重后数据的新数组
          for (var item1 of this.options) {  //循环json数组对象的内容
            let flag = true  //建立标记，判断数据是否重复，true为不重复
            for (var item2 of newJson) {  //循环新数组的内容
              if (item1.id == item2.id) { //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
                flag = false
              }
            }
            if (flag) { //判断是否重复
              newJson.push(item1) //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
            }
          }
          this.options = newJson
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
      } else {
        this.options = []
      }
    },
  },
  watch: {
    SatelliteWordName: function (n) {
      this.options = [{
        id: this.$attrs.value,
        name: n,
      }]
      // const addSelectOptions = [{
      //   id: this.$attrs.value,
      //   name: n,
      // }]
      // this.options.concat(addSelectOptions)
      // let newJson = [] //盛放去重后数据的新数组
      // for (var item1 of this.options) {  //循环json数组对象的内容
      //   let flag = true  //建立标记，判断数据是否重复，true为不重复
      //   for (var item2 of newJson) {  //循环新数组的内容
      //     if (item1.id == item2.id) { //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
      //       flag = false
      //     }
      //   }
      //   if (flag) { //判断是否重复
      //     newJson.push(item1) //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
      //   }
      // }
      // this.options = newJson
    },
    AddOption: function (n) {
      n = n.map(m => {
        return {
          id: m.commonId,
          name: m.commonName,
        }
      })
      // this.options = n
      this.options = n.concat(this.options)
      for (var item1 of this.options) {  //循环json数组对象的内容
        let flag = true  //建立标记，判断数据是否重复，true为不重复
        for (var item2 of this.changeOptions) {  //循环新数组的内容
          if (item1.id == item2.id) { //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
            flag = false
          }
        }
        if (flag) { //判断是否重复
          this.changeOptions.push(item1) //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
        }
      }
      this.options = this.changeOptions
    },
  },
}
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>

