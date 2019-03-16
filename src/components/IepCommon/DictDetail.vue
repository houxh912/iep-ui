<template>
  <label>
    <span>
      <template v-for="(label, index) in currentLabels">
        {{ label }}
        <span v-if="index < currentLabels.length - 1" :key="index"> / </span>
      </template>
    </span>
  </label>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'IepDictDetail',
  props: {
    currentValue: {
      type: [Array, Number, String],
      required: true,
    },
    dictName: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      valueKey: 'value',
      labelKey: 'label',
      childrenKey: 'children',
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
    itemTypes () {
      return this.dictGroup[this.dictName]
    },
    currentLabels () {
      let options = this.itemTypes
      let labels = []
      let inputValue = []
      if (!this.currentValue.length) {
        inputValue = [this.currentValue]
      } else {
        inputValue = this.currentValue
      }
      inputValue.forEach(value => {
        const targetOption = options && options.filter(option => option[this.valueKey] === value)[0]
        if (targetOption) {
          labels.push(targetOption[this.labelKey])
          options = targetOption[this.childrenKey]
        }
      })
      return labels
    },
  },
}
</script>
