<template>
  <div class="table-wapper">
    <operation-container>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
    </iep-table>
    <div class="text-center">
      <el-button type="text" @click="add" icon="el-icon-plus">新增发票</el-button>
    </div>
    <div class="total">
      <el-col :span="18">总计：</el-col>
      <el-col :span="6">8000</el-col>
    </div>
    <el-form ref="form" :model="form" size="small">
      <el-row>
        <el-col :span="24">
          <el-form-item class="object-con label-title" label="项目"><span class="span"><i class="el-icon-question"></i></span></el-form-item>
        </el-col>
        <el-col class="add-con" :span="24">
          <el-button class="object" size="small">項目1<i class="iconfont icon-shanchu1"></i></el-button>
          <el-button class="object" size="small">項目二<i class="iconfont icon-shanchu1"></i></el-button>
          <el-input class="input-name" placeholder="请输入项目名称" v-model="input4" size="small">
            <template slot="append">添加</template>
          </el-input>
          <el-button class="add" size="small"><i class="el-icon-plus"></i></el-button>
        </el-col>
        <el-col :span="24">
          <el-form-item class="object-con label-title" label="审批人"><span class="span"><i class="el-icon-question"></i></span></el-form-item>
        </el-col>
        <el-col class="add-con person-con" :span="24">
          <div>
            <span class="img"><img src="" alt=""></span>
            <span>张三</span>
          </div>
          <i class="iconfont icon-youyi">
          </i>
          <div>
            <span class="img"><img src="" alt=""></span>
            <span>李四</span>
          </div>
          <i class="iconfont icon-youyi">
          </i>
          <el-upload class="upload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="24">
          <el-form-item label="">
            <iep-button type="primary" @click="handleSubmit">发布</iep-button>
            <iep-button>取消</iep-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getTalentPoolPage } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
      value: '',
      input4: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    add () {
      this.data.push({})
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    // handleRejected (row) {
    //   console.log(row)
    //   this.$refs['RejectedDialog'].dialogShow = true
    // },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTalentPoolPage)
    },
  },
}
</script>
<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 10px;
}
.table-wapper {
  padding: 0;
  .text-center {
    text-align: center;
  }
  .add-con {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 18px;
  }
  .input-name {
    margin: 0 15px 10px 0;
    max-width: 260px;
  }
  .person-con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    .img {
      display: block;
      margin: 0 auto 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #ebeef5;
    }
    i {
      display: inline-block;
      margin: -30px 20px 0;
    }
    span {
      display: block;
      color: #999;
    }
    .upload {
      display: inline-block;
      margin-top: -30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #ebeef5;
    }
  }
  .object {
    position: relative;
    margin: 0 15px 10px 0;
    height: 32px;
    font-size: 14px;
    i {
      position: relative;
      top: 0;
      right: 0;
      display: inline-block;
      margin-left: 5px;
      padding: 2px;
      font-size: 12px;
      text-align: center;
      background: none;
      border-radius: 50%;
      -webkit-transition: all 0.8s ease-out;
    }
  }
  .add {
    margin: 0 15px 10px 0;
    height: 32px;
    i {
      font-size: 14px;
      line-height: 12px;
    }
  }
  .label-title {
    margin-bottom: 0;
    i {
      color: #bbb;
      cursor: pointer;
    }
  }
}
</style>
<style lang="css" scoped>
.table-wapper >>> .total .el-col {
  padding: 15px 40px;
  background-color: #f2f4f5;
}
.table-wapper >>> .el-form {
  padding: 30px 0;
}
.table-wapper >>> .el-upload--text i {
  margin: 0;
  font-size: 22px;
  line-height: 50px;
  text-align: center;
}
</style>