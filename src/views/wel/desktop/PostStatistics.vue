<template>
  <div class="gird-item">
    <el-card shadow="never" class="box-card" :body-style="bodyStyle">
      <div slot="header" class="clearfix">
        <page-header title="岗位统计" :replaceText="replaceText" :data="statistics"></page-header>
      </div>
      <el-table :data="tableData" style="width: 100%" row-key="id" lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column prop="classify" label="岗位分类">
        </el-table-column>
        <el-table-column prop="name" label="岗位名称">
        </el-table-column>
        <el-table-column prop="person" label="在职人数">
        </el-table-column>
        <el-table-column prop="recruits" label="在招人数">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        organization: '',
        birthday: '',
      },
      statistics: ['--', '--'],
      replaceText: (data) => `（在招岗位${data[0]}个，在招人数${data[1]}人）`,
      bodyStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      tableData: [{
        id: 1,
        classify: '产品技术类',
        name: '专员',
        person: '--',
        recruits: '--',
        children: [{
          id: 31,
          classify: '产品技术类',
          name: 'java后端工程师',
          person: '--',
          recruits: '--',
        }, {
          id: 32,
          classify: '产品技术类',
          name: '前端工程师',
          person: '--',
          recruits: '--',
        }],
      }, {
        id: 2,
        classify: '行政管理类',
        name: '专员',
        person: '--',
        recruits: '--',
        children: [{
          id: 33,
          classify: '产品技术类',
          name: '专员',
          person: '--',
          recruits: '--',
        }, {
          id: 34,
          classify: '产品技术类',
          name: '专员',
          person: '--',
          recruits: '--',
        }],
      }, {
        id: 3,
        classify: '行政管理类',
        name: '专员',
        person: '--',
        recruits: '--',
        children: [{
          id: 35,
          classify: '产品技术类',
          name: '专员',
          person: '--',
          recruits: '--',
        }, {
          id: 36,
          classify: '产品技术类',
          name: '专员',
          person: '--',
          recruits: '--',
        }],
      }],
    }
  },
  methods: {
    load (tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            classify: '产品技术类',
            name: '--',
            person: '--',
            recruits: '--',
          }, {
            id: 32,
            classify: '产品技术类',
            name: '--',
            person: '--',
            recruits: '--',
          },
        ])
      }, 1000)
    },
  },
}
</script>
<style scoped lang='scss'>
.form-detail {
  display: flex;
  justify-content: space-around;
}
.gird-item .el-card {
  padding: 0 20px;
}
</style>
<style scoped>
.gird-item >>> .el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gird-item >>> .el-table th {
  background-color: #f5f7fa;
}
.gird-item >>> .page-title {
  font-size: 16px !important;
}

.gird-item >>> .title-wrapper,
.gird-item >>> .title-col {
  margin-bottom: 0;
}
.gird-item >>> .el-card__header,
.gird-item >>> .el-card__body {
  padding: 18px 0;
}
</style>
