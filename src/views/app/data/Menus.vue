<template>
  <div class="menus">
    <a-menu @click="handleClick" :openKeys.sync="openKeys">
      <a-menu-item v-for="(item, index) in menus" :key="index">
        <i class="iconfont" :class="item.icon"></i>
        {{item.name}}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [
        {
          name: '总览',
          icon: 'icon-dongtai',
          link: 'overview',
        }, {
          name: '客户资产',
          icon: 'icon-kehu',
        }, {
          name: '项目资产',
          icon: 'icon-renwu',
        }, {
          name: '产品资源',
          icon: 'icon-shoucangjia',
        }, {
          name: '人力资源',
          icon: 'icon-renli',
        }, {
          name: '财富统计',
          icon: 'icon-weath2',
        }, {
          name: '财务报表',
          icon: 'icon-wendang',
        }, {
          name: '投资指数',
          icon: 'icon-yunweiguanli',
        }, {
          name: '投资指数',
          icon: 'icon-share',
        }, {
          name: '我的数据',
          icon: 'icon-tongji',
        }, {
          name: '组织资产',
          icon: 'icon-shangjibaobeixianxing',
          link: 'organizationalAssets',
        },
      ],
      openKeys: [0],
    }
  },
  methods: {
    handleClick (e) {
      let row = this.menus[e.key]
      if (row.link) {
        this.$emit('change-menu', row.link)
      }
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
  },
  watch: {
    openKeys (val) {
      console.log('openKeys', val)
    },
  },
}
</script>
<style lang="scss" scoped>
.menus {
  padding-top: 20px;
  border-right: 1px solid #eee;
  height: 100%;
  .ant-menu-vertical {
    border-right: 0;
  }
  i {
    font-size: 22px;
  }
}
.ant-menu-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  i {
    margin-right: 10px;
  }
  &:hover {
    background-color: #fbedec;
  }
}
</style>


