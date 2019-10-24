<template>
  <div class="content-tpl">
    <div class="content">
      <span v-for="(item, index) in transfSubjectList(data.content)" :key="index">
        <span v-if="item.type" class="subject" @click="handleSubject(item)">{{item.html}}</span>
        <span v-else>
          <span v-for="(t, i) in transfPerson(item.html)" :key="i">
            <span class="person" v-if="t.type" @click="handlePerson(t)">{{t.html}}</span>
            <span v-else>{{t.html}}</span>
          </span>
        </span>
      </span>
      <!-- <span v-for="(item, index) in transfSubject(data.content)" :key="index" :class="item.type ? 'subject' : ''" v-html="item.html"></span> -->
    </div>
    <slot></slot>
    <div class="tags">
      <iep-tag-detail v-model="data.tags" v-if="data.tags && data.tags.length > 0"></iep-tag-detail>
    </div>
    <div class="image-list" v-if="data.images.length > 0">
      <iep-img :src="item" v-for="(item, index) in data.images" :key="index" class="img" :preview-src-list="dealImage(data.images, index)" fit="cover"></iep-img>
    </div>
  </div>
</template>

<script>
import website from '@/const/website'
import { transfSubjectList, transfPerson, dealImage } from './util'
export default {
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      ican_host: website.ican_host,
      dealImage,
      transfSubjectList,
      transfPerson,
    }
  },
  methods: {
    // 查看人物详情
    handlePerson (val) {
      // 首先匹配返回的数据中是否存在此人名，即此人名是否为真实人名
      for (let item of this.data.mentionedUsers) {
        if (`@${item.name} ` === val.html) {
          this.$openPage(`${this.ican_host}master/${item.id}.html`, 'bind')
          return
        }
      }
      this.$message.error('抱歉，没有找到此用户')
    },
    handleSubject (val) {
      console.log(val)
      return
      // 首先匹配返回的数据中是否存在此话题，即是否为历史未关联的话题
      // for (let item of this.data.topics) {
      //   if (`#${item.topic}#` === val.html) {
      //     this.$router.push({ path: '/app/subject_list', query: { title: item.topic, id: item.topicId } })
      //     return
      //   }
      // }
      // this.$message.error('抱歉，此话题未关联其他说说')
    },
  },
}
</script>

<style lang="scss" scoped>
.content-tpl {
  .content {
    span {
      white-space: pre-wrap;
    }
    .subject {
      color: #cb3737;
      cursor: pointer;
    }
    .person {
      color: #cb3737;
      cursor: pointer;
    }
  }
  .image-list {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .img {
      width: 30%;
      margin: 10px;
      height: 175px;
    }
  }
  .tags {
    margin: 10px 0 0;
  }
}
</style>
<style scoped>
.image-list >>> img {
  min-height: 175px;
}
.img >>> .el-image-viewer__close {
  color: #fff;
}
</style>
