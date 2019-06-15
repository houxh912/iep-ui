<template>
  <div class="suggest">
    <IepAppTabCard :title="title">
      <el-button class="btn" type="text" slot="right" @click="handleSubmit">产品有奖建议</el-button>
      <div>
        <div class="suggest-list">
          <div v-for="(item,index) in suggestList" :key="index" class="piece">
            <iep-img :src="item.avatar" class="photo"></iep-img>
            <div class="box">
              <div class="piece-title">
                <span class="name">{{item.name}}</span>
                <span class="time">{{item.sendTime}}</span>
              </div>
              <p class="feed">{{item.proposeContent}}</p>
            </div>
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
import { getProposeList } from '@/api/app/cpms/channel'
export default {
  data () {
    return {
      title: '意见反馈',
      suggestList: [
        { avatar: require('./img/suggest1.jpg'), name: '刘丹', sendTime: '2019-04-08', proposeContent: '版权所有应该改为“2004-2019”' },
        { avatar: require('./img/suggest2.jpg'), name: '陈一萍', sendTime: '2019-04-03', proposeContent: '内网的内部材料库，选择按上传者姓名搜索，搜索结果是空白的；选择按条件搜索，也是不全面的。比如选择人力学习类型，出来的列表是不全面的，有很多都没有，有时搜索结果是从2018年开始的列表。' },
        { avatar: require('./img/suggest3.jpg'), name: '张小燕', sendTime: '2019-04-03', proposeContent: '协作组织内新增内容后，建议在相关位置有提醒，比如可以类似微信又新增内容就相应位置上有个红圈圈表示新增了多少条内容，这样子可以及时提醒到组员能查看，并能准确知道哪个地方新增了多少内容，更能提高工作效率。' },
      ],
    }
  },
  methods: {
    loadList () {
      getProposeList().then(({ data }) => {
        this.suggestList = data.data
      })
    },
    handleSubmit () {
      this.$router.push('/hrms_spa/suggestion_new')
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style lang="scss" scoped>
.suggest-list {
  .piece {
    margin-bottom: 5px;
    overflow: hidden;
    .photo {
      width: 68px;
      height: 68px;
      margin-right: 10px;
      float: left;
      border: 1px solid #eee;
    }
    .box {
      float: left;
      width: 260px;
      height: 68px;
      .piece-title {
        .name {
          font-size: 16px;
          margin-right: 8px;
        }
        .time {
          color: #999;
        }
      }
      .feed {
        line-height: 35px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        &:hover {
          color: #ba1b21;
        }
      }
    }
    &:last-child {
      margin-bottom: 5px;
    }
  }
}
</style>
<style scoped>
.suggest >>> .el-card__body {
  height: 242px;
}
.suggest >>> .btn {
  margin-right: 5px;
  padding: 0;
  height: 22px;
  line-height: 22px;
  color: #cb3737;
}
</style>
