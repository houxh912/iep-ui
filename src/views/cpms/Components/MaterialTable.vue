<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增产品资料</iep-button>
        <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增产品资质</iep-button>
      </template>
    </operation-container>
    <iep-no-data v-if="!value.length" message="暂无关联材料"></iep-no-data>
    <el-table v-else :data="value">
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="类别">
        <template slot-scope="scope">
          {{scope.row.type}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button plain @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'IepCpmsMaterialTable',
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleAdd () {

    },
    handleDelete () {

    },
  },
}
</script>
