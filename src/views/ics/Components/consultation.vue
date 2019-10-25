<template>
  <iep-dialog :dialog-show="dialogShow" title="智能客服" width="600px" @close="close">
    
    <div class="content" id="consultation_content">
      <div class="frame" v-for="(item, index) in list" :key="index">
        <div class="item question" v-if="item.type === 'question'">
          <div class="talking">
            <p>{{item.content}}</p>
          </div>
          <div class="avatar">
            <iep-img :src="item.avatar"></iep-img>
          </div>
        </div>
        <div class="item answer" v-else>
          <div class="avatar">
            <iep-img :src="item.avatar"></iep-img>
          </div>
          <div class="talking">
            <div class="options" v-if="item.options.length > 0">
              <p v-if="item.isDefault">HI~亲爱的用户，智能客服随时为您服务，请问有什么可以为您效劳的呢？人工服务为工作日8:30-17:30</p>
              <p v-else>为您找到“{{item.question}}”相关内容：</p>
              <div class="option" v-for="(option, i) in item.options" :key="i" @click="handleSubmit('select', option)">{{option}}</div>
              <p>都不是？请一句话完整描述您的问题？</p>
            </div>
            <div class="options" v-else-if="item.answer.length > 0">{{item.answer}}</div>
            <div class="options" v-else>对不起，没能找到您想问的问题，如需人工帮助，请联系客服小能。</div>
          </div>
        </div>
      </div>
    </div>
    <template slot="footer">
      <div class="form">
        <el-input v-model="question" @keyup.enter.native="handleSubmit('submit')">
          <el-button slot="append" icon="el-icon-search" @click="handleSubmit('submit')"></el-button>
        </el-input>
      </div>
    </template>
  </iep-dialog>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { getQuery } from '@/api/ics/serve'

export default {
  name: 'RewardDialog',
  data () {
    return {
      list: [],
      question: '',
    }
  },
  computed: {
    ...mapState({
      dialogShow: state => state.ics.questionDialogShow,
    }),
    ...mapGetters(['userInfo']),
  },
  methods: {
    ...mapMutations({
      setQuestionDialogShow: 'SET_QUESTION_DIALOG_SHOW',
    }),
    handleSubmit (state, question) {
      let val = state === 'submit' ? this.question : question
      if (val !== '') {
        this.list.push({
          avatar: this.userInfo.avatar,
          type: 'question',
          content: val,
        })
        this.scrollBottom()
        getQuery(val).then(({ data }) => {
          let row = JSON.parse(data.data)
          row.type = 'answer'
          row.question = val
          this.list.push(row)
          this.question = ''
          this.scrollBottom()
        })
      }
    },
    close () {
      this.setQuestionDialogShow(false)
    },
    scrollBottom () {
      this.$nextTick(() => {
        var content = document.getElementById('consultation_content')
        content.scrollTop = content.scrollHeight
      })
    },
  },
  watch: {
    dialogShow (val) {
      if (val) {
        const options = {
          isDefault: true,
          answer: '',
          options: [
            '如何加入我能？',
            '如何邀请用户加入组织？',
            '如何创建联盟？',
          ],
        }
        this.list.push(options)
        this.scrollBottom()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  border-top: 1px solid #ddd;
  height: 400px;
  overflow-y: scroll;
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
          cursor: pointer;
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
::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  display: none;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
:hover ::-webkit-scrollbar-thumb {
  display: block;
}
</style>
