<template>
  <iep-dialog :dialog-show="dialogShow" title="标签" wvalueth="50%" @close="close">
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" class="wrap">
      <el-checkbox v-for="city in cities" :label="city.label" :key="city.value+city.label" border class="tag">{{city.label}}</el-checkbox>
    </el-checkbox-group>

    <div class="Button">
      <iep-button @click="submit" type="primary">确定</iep-button>
    </div>
  </iep-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialogShow: false,
      cities: [],
      checkedCities: [],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
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
          if (this.checkedCities[m] == this.cities[i].label) {
            this.arr.push(this.cities[i])
          }
        }
      }
    },
    submit () {
      this.$emit('tag', this.arr)
      this.checkedCities = []
      this.close()
    },
    load () {
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