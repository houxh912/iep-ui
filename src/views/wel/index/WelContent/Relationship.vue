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
          subtitle: '协作',
          type: 'customer',
          id: 1,
        }, {
          subtitle: '同事',
          type: 'colleague',
          id: 3,
        }, {
          subtitle: '通讯录',
          type: 'circle',
          id: 4,
        }],
      },
      content: {
        mentor: [{ title: '师父', data: '(3)', childList: [{ id: '1', name: '杨冰之' }, { id: '2', name: '郑爱军' }, { id: '3', name: '黄磊' }] }, { title: '徒弟', data: '(6)', childList: [{ id: '1', name: '钟乙乔' }, { id: '2', name: '缪巧巧' }, { id: '3', name: '王俊辉' }, { id: '4', name: '章佩瑜' }, { id: '5', name: '陈飞娜' }, { id: '6', name: '赵之灵' }] }],
        customer: [{ title: '协作', data: '(5)', childList: [{ id: '1', name: '陈辉' }, { id: '2', name: '薛欣元' }, { id: '3', name: '杜照鸿' }, { id: '4', name: '缈巧巧' }, { id: '5', name: '钟乙乔' }] }],
        partner: [{ title: '伙伴', data: '(6)', childList: [{ id: '1', name: '内蒙古纵横云技术有限公司' }, { id: '2', name: '阿里云重大合作部' }, { id: '3', name: '上海市发展和改革委员会' }, { id: '4', name: '中共肇庆市委老干部局' }, { id: '5', name: '杭州证客信息科技有限公司' }, { id: '6', name: '京东云' }] }],
        colleague: [{ title: '同事', data: '(6)', childList: [{ id: '1', name: '钟乙乔' }, { id: '2', name: '缪巧巧' }, { id: '3', name: '王俊辉' }, { id: '4', name: '章佩瑜' }, { id: '5', name: '陈飞娜' }, { id: '6', name: '赵之灵' }] }],
        circle: [{ title: '通讯录', data: '(10)', childList: [{ id: '1', name: '杨斌' }, { id: '2', name: '李东伟' }, { id: '3', name: '黄磊' }, { id: '4', name: '谢海艳' }, { id: '5', name: '罗艳琴' }, { id: '6', name: '张云飞' }, { id: '7', name: '何益挺' }, { id: '8', name: '毛鑫敏' }, { id: '9', name: '姜圣国' }, { id: '10', name: '刘然' }] }],
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
      padding-right: 20px;
      font-size: 16px;
      color: #000;
    }
  }
  .title {
    font-size: 14px;
    cursor: pointer;
    color: #666;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>
