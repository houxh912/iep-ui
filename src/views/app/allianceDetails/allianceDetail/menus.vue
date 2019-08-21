<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu :default-active="index" class="el-menu-vertical-demo" @select="handleOpen" background-color="#fff" text-color="#333" active-text-color="#BA1B21">
        <el-menu-item v-for="(item, index) in list" :key="index" :index="item.id">
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          name: '集团概况',
          id: '1',
        },
        {
          name: '企业文化',
          id: '2',
        },
        {
          name: '组织架构',
          id: '3',
        },
        {
          name: '专家团队',
          id: '4',
        },
        {
          name: '发展历程',
          id: '5',
        },
        {
          name: '业务领域',
          id: '6',
        },
      ],
      index: '1',
    }
  },
  methods: {
    handleOpen (index) {
      this.$emit('chnage', index)
    },
  },
}
</script>
