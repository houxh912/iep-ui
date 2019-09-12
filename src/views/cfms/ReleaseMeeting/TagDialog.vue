<template>
  <iep-dialog :dialog-show="dialogShow" title="标签" width="50%" @close="close">
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" class="wrap">
      <el-checkbox v-for="city in cities" :label="city.name" :key="city.tagId" border class="tag">{{city.name}}</el-checkbox>
    </el-checkbox-group>
    <div class="Button">
      <iep-button @click="submit" type="primary">确定</iep-button>
    </div>
  </iep-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogShow: false,
      cities: [
        // { value: 1, label: '标签1' },
        // { value: 2, label: '标签2' },
        // { value: 3, label: '标签3' },
        // { value: 4, label: '标签4' },
        // { value: 5, label: '标签5' },
        // { value: 6, label: '标签6' },
      ],
      checkedCities: [],
      arr: [],
    }
  },
  created () {
    this.load()
  },
  methods: {
    close () {
      this.dialogShow = false
    },
    handleCheckedCitiesChange () {
      this.arr = []
      for (let i = 0; i < this.cities.length; i++) {
        for (let m = 0; m < this.checkedCities.length; m++) {
          if (this.checkedCities[m] == this.cities[i].name) {
            this.arr.push(this.cities[i])
          }
        }
      }
    },
    submit () {
      this.$emit('tag', this.arr)
      this.close()
    },
  },
}
</script>
<style>
.wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.tag {
  margin: 10px 0;
}
.Button {
  display: flex;
  justify-content: flex-end;
}
</style>