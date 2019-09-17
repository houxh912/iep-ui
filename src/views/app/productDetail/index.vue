<template>
  <iep-app-layout>
    <basic-container class="basic-container">
      <iep-page-header is-advance class="top-box">
        <template slot="custom">
          <el-row>
            <el-col :span="4" class="img">
              <iep-img :src="form.imageUrl" alt=""></iep-img>
            </el-col>
            <el-col :span="12" class="title">
              <div>
                <div class="tags"><span class="weight">{{form.name}}</span>
                </div>
                <div class="tags">
                  <iep-tag-detail :value="form.tagKeywords"></iep-tag-detail>
                </div>
                <div class="tags"><span class="time">创建时间：{{form.onlineTime | parseToDay}}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <el-button size="small" class="join" @click.stop="handleProductClick">加入定制</el-button>
              <el-button size="small" @click.stop="handleGWClick">系统官网</el-button>
              <el-button size="small" @click.stop="handleTestClick">系统考试</el-button>
            </el-col>
          </el-row>
        </template>
      </iep-page-header>
      <iep-tab-scroll :tab-list="tabList" :height="270">
        <div>
          <div class="base" :id="item.value" v-for="item in tabList" :key="item.value">
            <div class="title">{{item.label}}</div>
            <div class="context">
              <component :form="form" :is="item.value"></component>
            </div>
          </div>
        </div>
      </iep-tab-scroll>
    </basic-container>
  </iep-app-layout>
</template>

<script>
import mixins from '@/mixins/mixins'
import BaseInfo from './BaseInfo'
import TeamInfo from './TeamInfo'
import Versions from '@/views/cpms/Components/Versions'
import Modules from '@/views/cpms/Components/Modules'
import Materials from '@/views/cpms/Components/Materials'
import { initForm } from './options'
import { getProductById } from '@/api/cpms/product'
import { putProductById } from '@/api/app/cpms/custom_module'
export default {
  name: 'detail',
  components: { BaseInfo, TeamInfo, Versions, Modules, Materials },
  mixins: [mixins],
  props: ['record'],
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      form: initForm(),
      tabList: [{
        label: '基本信息',
        value: 'BaseInfo',
      }, {
        label: '团队信息',
        value: 'TeamInfo',
      }, {
        label: '全部版本',
        value: 'Versions',
      }, {
        label: '包含产品模块',
        value: 'Modules',
      }, {
        label: '相关材料',
        value: 'Materials',
      }],
    }
  },
  computed: {
    id () {
      return this.$route.params.id || this.record.id
    },
  },
  created () {
    getProductById(this.id).then(({ data }) => {
      this.form = this.$mergeByFirst(initForm(), data.data)
    })
  },
  methods: {
    handleProductClick () {
      putProductById(this.id).then(() => {
        this.$router.push('/app/resource/product_ku')
      })
    },
    handleGWClick () {
      this.$router.push('/cpms_spa/product_edit/0')
    },
    handleTestClick () {
      // this.$router.push('/app/resource/product_ku')
    },
    handleGoBack () {
      this.$router.push('/app/resource/product_ku')
    },
  },
}
</script>

<style lang="scss" scoped>
.basic-container {
  width: 1200px;
  margin: auto;
}
.img {
  width: 240px;
  height: 150px;
  padding: 5px;
  border: 1px solid #eee;
  margin: 5px;
  img {
    width: 100%;
    height: 100%;
  }
}
.join {
  background-color: #ba1b21;
  border: 1px solid #ba1b21;
  color: #fff;
  transition: all 0.5s;
  &:hover {
    background-color: #fff;
    border: 1px solid #ba1b21;
    color: #ba1b21;
  }
}
.title {
  margin-left: 20px;
  display: flex;
  align-items: center;
  .time {
    margin-right: 15px;
  }
  .weight {
    font-size: 22px;
    font-weight: 600;
    margin-right: 10px;
  }
  .tags {
    margin: 10px 0;
  }
}

.base {
  border-bottom: 1px solid #eee;
  .title {
    padding: 20px 20px 0 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .context {
    padding: 20px 40px;
  }
}
.el-form {
  margin: 0;
}
.el-form-item {
  margin-bottom: 10px;
}
.top-box {
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
</style>
