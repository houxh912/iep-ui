<template>
  <div class="content-tpl">
    <div class="content">
      <span v-for="(item, index) in transfSubject(data.content)" :key="index">
        <span v-if="item.type" class="subject">{{item.html}}</span>
        <span v-else>
          <span v-for="(t, i) in transfPerson(item.html)" :key="i">
            <span class="person" v-if="t.type">{{t.html}}</span>
            <span v-else>{{t.html}}</span>
          </span>
        </span>
      </span>
      <!-- <span v-for="(item, index) in transfSubject(data.content)" :key="index" :class="item.type ? 'subject' : ''" v-html="item.html"></span> -->
    </div>
    <slot></slot>
    <div class="image-list" v-if="data.images.length > 0">
      <iep-img :src="item" v-for="(item, index) in data.images" :key="index" class="img"></iep-img>
    </div>
  </div>
</template>

<script>
import { getSubject, getName } from './util'
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    // 查看人物详情
    handlePerson (val) {
      console.log('val: ', val)
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
    }
    .person {
      color: #cb3737;
      cursor: pointer;
    }
  }
  .image-list {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .img {
      width: 30%;
      height: 175px;
    }
  }
}
</style>
