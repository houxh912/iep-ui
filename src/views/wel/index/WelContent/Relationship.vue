<template>
  <div class="relationship">
    <div class="task-nav">
      <span class="navTitle">{{navList.title}}</span>
      <nav-tab :nav-list="navList" @tab="tab"></nav-tab>
    </div>
    <relationship-content :contentData="contentData"></relationship-content>
  </div>
</template>

<script>
import NavTab from './NavTab'
import RelationshipContent from './RelationshipContent'
export default {
  components: { NavTab, RelationshipContent },
  data () {
    return {
      showClass: 0,
      navName: 'order',
      contentData: [],
      navList: {
        title: '我的关系',
        dataList: [{
          subtitle: '师徒',
          type: 'mentor',
          id: 0,
        }, {
          subtitle: '客户',
          type: 'customer',
          id: 1,
        }, {
          subtitle: '伙伴',
          type: 'partner',
          id: 2,
        }, {
          subtitle: '同事',
          type: 'colleague',
          id: 3,
        }, {
          subtitle: '圈子',
          type: 'circle',
          id: 4,
        }, {
          subtitle: '其他',
          type: 'other',
          id: 5,
        }],
      },
      content: {
        mentor: [{ title: '师傅', data: '(4)', childList: [{ id: '1', name: '黄磊' }, { id: '2', name: '李四' }, { id: '3', name: '张三' }, { id: '4', name: '王五' }] }, { title: '徒弟', data: '(11)', childList: [{ id: '1', name: '黄磊' }, { id: '2', name: '李四' }, { id: '3', name: '张三' }, { id: '4', name: '王五' }, { id: '5', name: '王五' }, { id: '6', name: '王五' }, { id: '7', name: '王五' }, { id: '8', name: '王五' }, { id: '9', name: '王五' }, { id: '10', name: '王五' }, { id: '11', name: '王五' }] }],
        customer: [{ title: '客户', data: '(6)', childList: [{ id: '1', name: '赵六' }, { id: '2', name: '李四' }, { id: '3', name: '张三' }, { id: '4', name: '王五' }, { id: '5', name: '王五' }, { id: '6', name: '王五' }] }],
        partner: [{ title: '伙伴', data: '(7)', childList: [{ id: '1', name: '赵六' }, { id: '2', name: '李四' }, { id: '3', name: '张三' }, { id: '4', name: '王五' }, { id: '5', name: '王五' }, { id: '6', name: '王五' }, { id: '7', name: '王五' }] }],
        colleague: [{ title: '同事', data: '(5)', childList: [{ id: '1', name: '赵六' }, { id: '2', name: '李四' }, { id: '3', name: '张三' }, { id: '4', name: '王五' }, { id: '5', name: '王五' }] }],
        circle: [{ title: '圈子', data: '(5)', childList: [{ id: '1', name: '赵六' }, { id: '2', name: '李四' }, { id: '3', name: '张三' }, { id: '4', name: '王五' }, { id: '5', name: '王五' }] }],
        other: [{ title: '其他', data: '(5)', childList: [{ id: '1', name: '赵六' }, { id: '2', name: '李四' }, { id: '3', name: '张三' }, { id: '4', name: '王五' }, { id: '5', name: '王五' }] }],
      },
    }
  },
  created () {
    this.contentData = this.content.mentor
  },
  methods: {
    tab (val) {
      this.contentData = this.content[val]
    },
  },
}
</script>

<style lang="scss" scoped>
.relationship {
  padding: 15px 30px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  .task-nav {
    display: flex;
    align-items: center;
    .navTitle {
      font-size: 16px;
      padding-right: 20px;
    }
  }
  .title {
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
