<template>
  <div class="im-box-small" @click="handleQuestion">
    <i class="icon-kefu"></i>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'im-ui-small',
  data () {
    return {
      
    }
  },
  methods: {
    ...mapActions(['QuestionAndAnswer']),
    handleQuestion () {
      this.QuestionAndAnswer(true)
    },
  },
}
</script>

<style lang="scss" scoped>
.im-box-small {
  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  right: 40px;
  bottom: 40px;
  height: 55px;
  width: 55px;
  padding: 0 16px;
  background: #938888;
  color: #FFFFFF;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  cursor: pointer;
  opacity: .6;
  text-align: center;
  &:hover {
    opacity: 1;
  }
  i {
    font-size: 24px;
  }
}

</style>