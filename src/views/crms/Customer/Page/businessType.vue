<template>
  <div class="type">
    <div class="tags">
      <el-tag type="info" v-for="(item, index) in getList" :key="index" closable @close="tagClose(item, index)">{{item.label}}</el-tag>
    </div>
    <div class="first">
      <el-select v-model="type_one" placeholder="请选择" @change="changeValue">
        <el-option v-for="(item, index) in dictGroup.prms_business_type" :key="index" :label="item.label" :value="index"></el-option>
      </el-select>
    </div>
    <div class="second">
      <el-select v-model="type_two" placeholder="请选择" multiple @change="changeMultiple" @remove-tag="removeTag">
        <el-option v-for="(item, index) in selectList" :key="index" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Array,
      // default: '',
    },
  },
  computed: {
    ...mapGetters(['dictGroup']),
    selectList () { // 当前二级选择框的list
      if (this.type_one === '') {
        return []
      } else {
        return this.dictGroup.prms_business_type[this.type_one].children
      }
    },
    getList () {
      let data = []
      for (let item of this.list) {
        data.push(this.getTagsList(item))
      }
      return data
    },
  },
  data () {
    return {
      init: false,
      list: [], // 展示的tag
      type_one: '',
      type_two: [],
      secondList: [], // 当前下拉框种选中的数据
    }
  },
  methods: {
    changeValue () {
      this.type_two = []
      this.$nextTick(() => {
        let list = []
        for (let item of this.selectList) {
          for (let t of this.list) {
            if (item.value == t.value) {
              list.push(item)
              break
            }
          }
        }
        for (let item of list) {
          this.type_two.push(item.value)
        }
        this.secondList = list
      })
    },
    getTagsList (val) {
      for (let j = 0; j < this.dictGroup.prms_business_type.length; j++) {
        const item = this.dictGroup.prms_business_type[j]
        if (item.children && item.children.length > 0) {
          for (let i = 0; i < item.children.length; i++) {
            const t = item.children[i]
            if (t.value == val) {
              return t
            }
          }
        }

      }
    },
    changeMultiple (val) {
      // 首先要判断是去除还是添加
      if (val.length > this.secondList.length) {
        // 长度变长，添加了数据
        let data = this.getTagsList([val[val.length - 1]])
        this.secondList.push(data)
        this.list.push(data.value)
      } else {
        // 长度变短，删减了数据
        for (let index in this.secondList) {
          let item = this.secondList[index]
          let state = false
          for (let t of val) {
            if (item.value == t) state = true
          }
          if (!state) {
            this.secondList.splice(index, 1)
            for (let index in this.list) {
              if (this.list[index] == item.value) {
                this.list.splice(index, 1)
                return
              }
            }
          }
        }
      }
    },
    removeTag () {

    },
    tagClose (data, index) {
      this.list.splice(index, 1)
      // 判断是否是当前选项
      for (let index in this.type_two) {
        if (this.type_two[index] == data.value) {
          this.type_two.splice(index, 1)
        }
      }
      for (let index in this.secondList) {
        if (this.secondList[index].value == data.value) {
          this.secondList.splice(index, 1)
        }
      }
    },
    initList (newVal) {
      this.init = true
      let list = newVal
      let data = []
      for (let item of list) {
        data.push(this.getTagsList(item))
      }
      this.list = data
    },
  },
  watch: {
    value (newVal) {
      this.list = newVal
    },
    list: {
      handler (newVal) {
        this.$emit('input', newVal)
      },
    },
    deep: true,
  },
  created () {
    this.list = this.value
  },
}
</script>

<style lang="scss" scoped>
.type {
  .tags {
    .el-tag {
      margin: 0 10px 10px 0;
    }
  }
  .first {
    margin-bottom: 10px;
  }
}
</style>
