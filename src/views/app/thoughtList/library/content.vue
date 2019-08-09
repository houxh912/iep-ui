<template>
  <div class="content-tpl">
    <div class="content">
      <span v-for="(item, index) in transfSubject(data.content)" :key="index">
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
      <iep-img :src="item" v-for="(item, index) in data.images" :key="index" class="img" :preview-src-list="dealImage(data.images, index)"></iep-img>
    </div>
  </div>
</template>

<script>
import { getSubject, getName, dealImage } from './util'
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      dealImage,
    }
  },
  methods: {
    // 查看人物详情
    handlePerson (val) {
      // 首先匹配返回的数据中是否存在此人名，即此人名是否为真实人名
      for (let item of this.data.mentionedUsers) {
        if (`@${item.name} ` === val.html) {
          this.$router.push(`/app/personal_style/${item.id}`)
          return
        }
      }
      this.$message.error('抱歉，没有找到此用户')
    },
    handleSubject (val) {
      // 首先匹配返回的数据中是否存在此话题，即是否为历史未关联的话题
      for (let item of this.data.topics) {
        if (`#${item.topic}#` === val.html) {
          this.$router.push({ path: '/app/subject_list', query: { title: item.topic, id: item.topicId } })
          return
        }
      }
      this.$message.error('抱歉，此话题未关联其他说说')
    },
    // 话题转换 - 只存在一个
    transfSubject (val) {
      let obj = getSubject(val)
      if (obj.type) {
        return [
          {
            type: false,
            html: val.slice(0, obj.first),
          }, {
            type: true,
            html: `#${obj.data}#`,
          }, {
            type: false,
            html: val.slice(obj.second),
          },
        ]
      } else {
        return [{
          type: false,
          html: val,
        }]
      }
    },
    // 人名转换 - 可存在多个
    transfPerson (val) {
      if (getName(val).type) {
        let list = []
        let code = 0
        for (let item of getName(val).list) {
          list.push({
            type: false,
            html: val.slice(code, item.first),
          })
          list.push({
            type: true,
            html: val.slice(item.first, item.second),
          })
          code = item.second
        }
        list.push({
          type: false,
          html: val.slice(code),
        })
        return list
      } else {
        return [
          {
            type: false,
            html: val,
          },
        ]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.content-tpl {
  .content {
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
      max-height: 175px;
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
</style>
