export default {
  computed: {
    callOutCompanyOption () {
      if (this.form.callOutOrgId && !!this.form.allocationWay) {
        return {
          disabled: false,
          prefixUrl: `fams/company/${this.form.callOutOrgId}`,
        }
      } else {
        return {
          disabled: true,
        }
      }
    },
    callInCompanyOption () {
      if (this.form.callInOrgId && !!this.form.allocationWay) {
        return {
          disabled: false,
          prefixUrl: `fams/company/${this.form.callInOrgId}`,
        }
      } else {
        return {
          disabled: true,
        }
      }
    },
    callOutBankAmountOption () {
      if (this.form.callOutCompanyId) {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.form.callOutCompanyId}`,
        }
      } else {
        return {
          disabled: true,
        }
      }
    },
    callInBankAmountOption () {
      if (this.form.callInCompanyId) {
        return {
          disabled: false,
          prefixUrl: `fams/bank_account/${this.form.callInCompanyId}`,
        }
      } else {
        return {
          disabled: true,
        }
      }
    },
  },
}