export default {
  methods: {
    mixinsValidate () {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((v, o) => {
          if (v) {
            resolve(v)
          } else {
            reject(o)
          }
        })
      })
    },
    mixinsMessage (object) {
      let message = ''
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key]
          message = element[0].message
        }
      }
      this.$message(message)
    },
  },
}