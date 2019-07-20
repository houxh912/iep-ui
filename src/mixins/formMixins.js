export default {
  data () {
    return {
      submitFormLoading: false,
    }
  },
  methods: {
    mixinsValidate (formRefName = 'form') {
      return new Promise((resolve, reject) => {
        this.$refs[formRefName].validate((v, o) => {
          if (v) {
            resolve(v)
          } else {
            reject(o)
          }
        })
      })
    },
    mixinsMessage (error) {
      let message = ''
      for (const key in error) {
        if (error.hasOwnProperty(key)) {
          const element = error[key]
          message = element[0].message
        }
      }
      this.$message(message)
    },
    async mixinsForm (formRefName = 'form') {
      this.submitFormLoading = true
      try {
        const valid = await this.mixinsValidate(formRefName)
        if (valid) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.log(error)
        this.mixinsMessage(error)
        this.submitFormLoading = false
        return false
      } finally {
        this.submitFormLoading = false
      }
    },
    async * mixinsFormGen (formRefName = 'form') {
      this.submitFormLoading = true
      try {
        const valid = await this.mixinsValidate(formRefName)
        if (valid) {
          yield true
        } else {
          yield false
        }
        this.submitFormLoading = false
      } catch (error) {
        console.log(error)
        this.mixinsMessage(error)
        this.submitFormLoading = false
        yield false
      }
    },
    /**
     * 需要 form 表单 ref ='form', 可自定义
     * 需要 rules 规则
     * 需要 submitForm 方法同步,包括里面的请求函数
     */
    async mixinsSubmitFormGen () {
      const mixinsFormGen = this.mixinsFormGen()
      const valid = (await mixinsFormGen.next()).value
      let mixinsResult = false
      if (valid) {
        mixinsResult = await this.submitForm()
      }
      await mixinsFormGen.next()
      return mixinsResult
    },
  },
}