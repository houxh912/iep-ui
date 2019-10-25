<template>
  <basic-container class="library">
    <iep-page-header title="咨询详情页" :backOption="backOption"></iep-page-header>
    
    <div class="frame">
      <div class="item question">
        <div class="talking">
          <p>{{form.content}}</p>
        </div>
        <div class="avatar">
          <iep-img :src="form.avatar"></iep-img>
        </div>
      </div>
      <div class="item answer">
        <div class="avatar">
          <iep-img :src="form.avatar"></iep-img>
        </div>
        <div class="talking">
          <div class="options" v-if="form.result.options.length > 0">
            <p>为您找到“{{form.content}}”相关内容：</p>
            <div class="option" v-for="(option, i) in form.result.options" :key="i">{{option}}</div>
            <p>都不是？请一句话完整描述您的问题？</p>
          </div>
          <div class="options" v-else-if="form.result.answer.length > 0">{{form.result.answer}}</div>
          <div class="options" v-else>对不起，没能找到您想问的问题，如需人工帮助，请联系客服小能。</div>
        </div>
      </div>
    </div>

  </basic-container>
</template>

<script>

export default {
  components: {  },
  props: ['form'],
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('backPage', false)
        },
      },
    }
  },
  methods: {
    
  },
  created () {
    
  },
}
</script>

<style lang="scss" scoped>
.frame {
  .item {
    margin: 20px 0 25px;
    display: flex;
    position: relative;
    .talking {
      flex: 1;
    }
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .question {
    padding-left: 100px;
    .talking {
      margin-right: 20px;
      text-align: right;
      color: #d56368;
      p {
        padding: 15px;
        border-radius: 8px;
        background-color: #fdf6f5;
        display: inline-block;
      }
    }
    .talking:before {
      content: "";
      position: absolute;
      right: 67px;
      top: 20px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 15px solid #fdf6f5;
    }
  }
  .answer {
    padding-right: 100px;
    .talking {
      margin-left: 20px;
      text-align: left;
      border-radius: 8px;
      background-color: #fafafa;
      padding: 15px;
      .options {
        .option {
          color: #e25054;
          margin-bottom: 10px;
        }
        p {
          margin-bottom: 10px;
        }
      }
    }
    .talking:before {
      content: "";
      position: absolute;
      left: 67px;
      top: 20px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 15px solid #fafafa;
    }
  }
}
</style>