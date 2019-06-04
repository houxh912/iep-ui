<template>
  <div class="gird-item">
    <el-card shadow="never" class="box-card" :body-style="bodyStyle">
      <div slot="header" class="clearfix">
        <h2>岗位统计</h2>
      </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="岗位分类">
        <template slot-scope="scope">
            <i class="el-icon-arrow-right"></i>
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="岗位名称"></el-table-column>
      <el-table-column prop="person" label="在职人数"></el-table-column>
      <el-table-column prop="recruits" label="在招人数"></el-table-column>      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        organization:'',
        birthday:'',
      },
      bodyStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      tableData: [{
        type: '产品技术类',
        name: 'xxxx组织',
        person: '赵22',
        recruits: '2344',
      }, {
        type: '2016-05-04',
        name: '复仇者联盟',
        person: '李12',
        recruits: '2344',
      }, {
        type: '2016-05-01',
        name: 'yyyy联盟',
        person: '王33',
        recruits: '2344',
      }],
    }
  },
}
</script>
<style scoped lang='scss'>
.form-detail{
    display: flex;
    justify-content: space-around;
}
</style>
