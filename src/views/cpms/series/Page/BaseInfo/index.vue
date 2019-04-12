<template>
  <div class="iep-page-form">
    <div class="base">
      <div class="title">基本信息</div>
      <div class="context">
        <el-form size="small" label-width="100px">
          <el-row>
            <el-col :span='8'>
              <el-form-item label="产品编号：">
                <div>{{form.number}}</div>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="产品官网：">
                <div>{{form.website}}</div>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="是否带库：">
                <div>否</div>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="产品估值：">
                <div>{{form.valuation}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="估值说明：">
                <div>{{form.instructions}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="详细介绍：">
                <div>{{form.description}}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="base">
      <div class="title">团队信息</div>
      <div class="context">
        <el-form size="small" label-width="100px">
          <el-row>
            <el-col :span='8'>
              <el-form-item label="负责人：">
                <iep-contact-multiple-user v-model="form.userRelationCharges" disabled></iep-contact-multiple-user>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="需求方：">
                <iep-contact-multiple-user v-model="form.userRelationDemands" disabled></iep-contact-multiple-user>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="技术经理：">
                <iep-contact-multiple-user v-model="form.userRelationTechnologys" disabled></iep-contact-multiple-user>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="产品经理：">
                <iep-contact-multiple-user v-model="form.userRelationProducts" disabled></iep-contact-multiple-user>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="团队成员：">
                <iep-contact-multiple-user v-model="form.userRelationTeams" disabled></iep-contact-multiple-user>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="base">
      <div class="title">全新版本</div>
      <div class="context">
        <iep-table :isLoadTable="false" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" border>
          <el-table-column label="版本号">
            <template slot-scope="scope">
              <div>{{scope.row.version}}</div>
            </template>
          </el-table-column>
          <el-table-column label="上线日期">
            <template slot-scope="scope">
              <div>{{scope.row.time}}</div>
            </template>
          </el-table-column>
          <el-table-column label="更新说明">
            <template slot-scope="scope">
              {{scope.row.explain}}
            </template>
          </el-table-column>
        </iep-table>
      </div>
    </div>
    <div class="base">
      <div class="title">包含模块</div>
      <div class="context">
        <div class="module" v-for="(item,index) in 3" :key="index">
          <div class="img">
            <img :src="logo" alt="">
          </div>
          <div class="module-title">资源配置模块</div>
        </div>
      </div>
    </div>
    <div class="base">
      <div class="title">相关材料</div>
      <div class="context">
        <iep-table :isLoadTable="false" :pagedTable="pagedTable1" @size-change="handleSizeChange" @current-change="handleCurrentChange" border>
          <el-table-column label="标题">
            <template slot-scope="scope">
              <div>{{scope.row.title}}</div>
            </template>
          </el-table-column>
          <el-table-column label="类别">
            <template slot-scope="scope">
              <div>{{scope.row.type}}</div>
            </template>
          </el-table-column>
        </iep-table>
      </div>
    </div>
  </div>
</template>

<script>
const logo = require('../../img2.png')
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      logo,
      pagedTable: [
        {
          id: 1,
          explain: '对数据进行重新审核和校验, 并提供数据一致性.',
          time: '2019-02-14',
          version: 'v5.0',
        },
        {
          id: 2,
          explain: '对数据进行重新审核和校验, 并提供数据一致性.',
          time: '2019-02-14',
          version: 'v5.0',
        },
        {
          id: 3,
          explain: '对数据进行重新审核和校验, 并提供数据一致性.',
          time: '2019-02-14',
          version: 'v5.0',
        },
      ],
      pagedTable1: [
        {
          id: 1,
          title: '关于数据清理的方法及讨论结果',
          type: '产品资料',
        },
        {
          id: 2,
          title: '关于数据清理的方法及讨论结果',
          type: '产品资质',
        },
        {
          id: 3,
          title: '关于数据清理的方法及讨论结果',
          type: '产品资质',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
// .iep-page-form {
//   padding-right: 20%;
// }
.base {
  border-bottom: 1px solid #eee;
  .title {
    padding: 20px 20px 0 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .context {
    padding: 20px 40px;
    .module {
      width: 100px;
      margin-right: 40px;
      display: inline-block;
      .img {
        padding: 5px;
        border: 1px solid #eee;
        img {
          width: 100%;
        }
      }
      .module-title {
        width: 100%;
        padding-top: 10px;
        text-align: center;
      }
    }
  }
}
.el-form {
  margin: 0;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
