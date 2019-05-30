<template>
  <div class="master">
    <page-header title="推荐师父">
    </page-header>
    <div class="master-con">
      <el-card shadow="hover" v-for="master in masterList" :key="master.id">
        <div>
          <div class="name">
            <span class="img"><img :src="master.img" alt=""></span>
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
          img: '../img/person/p2.jpg',
          name: '王昉',
          num: 'GM100356',
          tagsList: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
        },
        {
          img: '../img/person/p09.jpg',
          name: '王昉',
          num: 'GM100356',
          tagsList: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
        },
        {
          img: '../img/person/p07.jpg',
          name: '王昉',
          num: 'GM100356',
          tagsList: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
        },
        {
          img: '../img/person/p09.jpg',
          name: '王昉',
          num: 'GM100356',
          tagsList: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
        },
        {
          img: '../img/person/p01.jpg',
          name: '王昉',
          num: 'GM100356',
          tagsList: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
        },
        {
          img: '../img/person/p01.jpg',
          name: '王昉',
          num: 'GM100356',
          tagsList: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
        },
        {
          img: '../img/person/p01.jpg',
          name: '王昉',
          num: 'GM100356',
          tagsList: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
        },
        {
          img: '../img/person/p01.jpg',
          name: '王昉',
          num: 'GM100356',
          tagsList: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
        },
        {
          img: '../img/person/p01.jpg',
          name: '王昉',
          num: 'GM100356',
          tagsList: [
            {
              tag: '产品设计',
            },
            {
              tag: '项目管理',
            },
            {
              tag: '原型设计',
            },
          ],
        },
      ],
    }
  },
  methods: {
    getMore () {
      this.$openPage('/app/personal_style')
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
