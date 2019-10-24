<template>
  <el-autocomplete class="top-search" popper-class="my-autocomplete" v-model="value" :fetch-suggestions="querySearch" placeholder="请输入搜索内容" @select="handleSelect" size="small">
    <template slot-scope="{ item }">
      <i :class="[item[iconKey], 'icon']"></i>
      <div class="name">{{ item[labelKey] }}</div>
      <div class="addr">{{ item[pathKey] }}</div>
    </template>
  </el-autocomplete>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    props: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data () {
    return {
      propsDefault: this.$website.menu.props,
      value: '',
      menuList: [],
    }
  },
  created () {
    this.getMenuList()
  },

  watch: {
    menu () {
      this.getMenuList()
    },
  },
  computed: {
    labelKey () {
      return this.props.label || this.propsDefault.label
    },
    pathKey () {
      return this.props.path || this.propsDefault.path
    },
    iconKey () {
      return this.props.icon || this.propsDefault.icon
    },
    childrenKey () {
      return this.props.children || this.propsDefault.children
    },
    ...mapGetters(['menu', 'website']),
  },
  methods: {
    getMenuList () {
      const findMenu = list => {
        for (let i = 0; i < list.length; i++) {
          const ele = Object.assign({}, list[i])
          if (ele[this.childrenKey]) findMenu(ele[this.childrenKey])
          delete ele[this.childrenKey]
          this.menuList.push(ele)
        }
      }
      this.menuList = []
      findMenu(this.menu)
    },
    querySearch (queryString, cb) {
      var restaurants = this.menuList
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return restaurant => {
        return (
          restaurant.label.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    handleSelect (item) {
      this.value = ''
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          name: item[this.labelKey],
          src: item[this.pathKey],
        }),
        query: item.query,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .icon {
      margin-right: 5px;
      display: inline-block;
      vertical-align: middle;
    }
    .name {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      vertical-align: middle;
    }
    .addr {
      padding-top: 5px;
      width: 100%;
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
