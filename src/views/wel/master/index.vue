<template>
  <div class="master">
    <page-header title="推荐师父">
    </page-header>
    <div class="master-con">
      <el-card shadow="hover" v-for="master in masterList" :key="master.id">
        <div>
          <div class="name">
            <span class="img" @click="getPerson()">
              <iep-img :src="master.img" alt=""></iep-img>
            </span>
            <span class="text">{{master.name}}<span class="num">{{master.num}}</span></span>
          </div>
          <span></span>
        </div>
        <div class="classTag">
          <span class="name">标签：</span>
          <el-tag type="white" v-for="(tag, index) in master.tagsList" :key="index">{{tag.tag}}</el-tag>
        </div>
        <div class="btn-group">
          <el-button size="mini" @click="getMore">个人风采</el-button>
          <el-button type="danger" plain size="mini">拜师</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      masterList: [
        {
          img: '../img/person/p013.jpg',
          name: '杨冰之',
          num: 'GM000001',
          tagsList: [
            {
              tag: '组织管理',
            },
            {
              tag: '智慧经济',
            },
            {
              tag: '规划报告',
            },
          ],
        },
        {
          img: '../img/person/p122.jpg',
          name: '郑爱军',
          num: 'GM000002',
          tagsList: [
            {
              tag: '成本核算',
            },
            {
              tag: '组织管理',
            },
            {
              tag: '活动策划与组织',
            },
          ],
        },
        {
          img: '../img/person/pw1.jpg',
          name: '王玲',
          num: 'GM000101',
          tagsList: [
            {
              tag: '指标体系设计',
            },
            {
              tag: '资源梳理与编目',
            },
            {
              tag: '评估与规划咨询',
            },
          ],
        },
        {
          img: '../img/person/pkk1.jpg',
          name: '李凯',
          num: 'GM000102',
          tagsList: [
            {
              tag: '成本核算',
            },
            {
              tag: '团队协作',
            },
            {
              tag: '客户关系管理',
            },
          ],
        },
        {
          img: '../img/person/p02.jpg',
          name: '符恩祖',
          num: 'GM000103',
          tagsList: [
            {
              tag: '百度推广',
            },
            {
              tag: '404检测',
            },
            {
              tag: '平面设计',
            },
          ],
        },
        {
          img: '../img/person/pzz.jpg',
          name: '赵蕊',
          num: 'GM000104',
          tagsList: [
            {
              tag: '会议服务与支持',
            },
            {
              tag: '财务管理',
            },
            {
              tag: '综合管理',
            },
          ],
        },
        {
          img: '../img/person/pxx.jpg',
          name: '肖香芝',
          num: 'GM000106',
          tagsList: [
            {
              tag: '网站规划',
            },
            {
              tag: '网站评测',
            },
            {
              tag: '信息资源梳理',
            },
          ],
        },
        {
          img: '../img/person/pzx.jpg',
          name: '郑鑫宁',
          num: 'GM000107',
          tagsList: [
            {
              tag: '大数据咨询',
            },
            {
              tag: '政务服务事项标准化',
            },
            {
              tag: '互联网+政务服务',
            },
          ],
        },
        {
          img: '../img/person/pld.jpg',
          name: '刘丹',
          num: 'GM000108',
          tagsList: [
            {
              tag: '平台运营',
            },
            {
              tag: '战略合作',
            },
            {
              tag: '品牌宣传',
            },
          ],
        },
      ],
    }
  },
  methods: {
    getPerson () {
      this.$router.push({
        path: '@/app/personal_style/:id',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.master {
  margin: 20px 20px 40px;
}
.master-con {
  display: grid;
  margin-top: 20px;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(
      100px,
      2fr
    );
  .name {
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-start;
    align-items: center;
    .text {
      display: flex;
      margin-left: 15px;
      justify-content: flex-start;
      font-size: 16px;
      letter-spacing: 3px;
      align-items: flex-end;
    }
    .num {
      margin-left: 6px;
      font-size: 14px;
      color: #999;
      letter-spacing: 0.5px;
    }
  }
  .img {
    display: inline-block;
    width: 45px;
    height: 45px;
    border: 1px solid #ebeef5;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .btn-group {
    margin-top: 20px;
    padding-top: 20px;
    text-align: center;
    border-top: 1px solid #eee;
  }
  .classTag {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
    .name {
      margin-bottom: 8px;
      color: #999;
    }
    .el-tag {
      margin-right: 5px;
      margin-bottom: 5px;
      cursor: pointer;
      &:hover {
        color: #cb3737;
        background: #fef0f0;
        border-color: #cb3737;
      }
    }
  }
  .classTag .el-tag--white {
    border: 1px solid #dcdfe6;
    height: 28px;
    line-height: 26px;
    background: #fff;
    color: #606266;
  }
  .el-button--danger {
    color: #cb3737;
    border-color: #cb3737;
    &:hover,
    &:focus {
      background-color: #cb3737;
      color: #fff;
    }
  }
}
</style>
