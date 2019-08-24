<template>
  <div class="introduction-details">
    <div class="tags-detail" v-if="false">
      <span class="details-title">组织标签</span>
      <div class="tags-con">
        <span>我能：</span>
        <span class="tags" v-for="(item, index) in data.abilityTag" :key="index">
          {{item}}
        </span>
      </div>
      <div class="tags-con">
        <span>我要：</span>
        <span class="tags" v-for="(item, index) in data.projectTag" :key="index">
          {{item}}
        </span>
      </div>
      <div class="tags-con">
        <span>我想：</span>
        <span class="tags" v-for="(item, index) in data.learningTag" :key="index">
          {{item}}
        </span>
      </div>
    </div>
    <div class="brief">
      <span class="details-title">组织简介</span>
      <p class="con">{{data.intro}}</p>
    </div>
    <div class="contact">
      <span class="details-title">组织架构</span>
      <iep-html class="con" v-model="data.structure"></iep-html>
    </div>
    <div class="contact">
      <span class="details-title">核心优势</span>
      <iep-html class="con" v-model="data.coreAdvantage"></iep-html>
    </div>
    <business-layout></business-layout>
  </div>
</template>

<script>
// import Framework from './Framework'
import BusinessLayout from './BusinessLayout'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { BusinessLayout },
  data () {
    return {
      opexList: [],
    }
  },
}
</script>
<style lang="scss" scoped>
.tags-detail,
.brief,
.contact,
.framework,
.business-layout,
.opex {
  margin-bottom: 30px;
}
.contact {
  .con {
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
  }
}

.tags-con {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: 30px;
}
.con {
  margin-left: 30px;
}
.tags {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    color: #ba1b21;
  }
  &:nth-child(1) {
    padding-left: 0;
  }
  &::before {
    position: absolute;
    content: "";
    top: 10px;
    right: -7px;
    width: 15px;
    height: 1px;
    background-color: #666;
    transform: rotate(125deg);
    -o-transform: rotate(125deg);
    -moz-transform: rotate(125deg);
    -webkit-transform: rotate(125deg);
  }
  &:last-child::before {
    display: none;
  }
}
.opex {
  .con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .name {
      display: block;
      margin-top: 10px;
      padding: 2px 10px;
      font-size: 12px;
      border-radius: 10px;
      background-color: #eee;
    }
    .opex-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 10px;
      cursor: pointer;
    }
  }
  .img {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #ebeef5;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .bgb {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      line-height: 50px;
      font-size: 12px;
      text-align: center;
      display: block;
      border-radius: 50%;
      color: #fff;
      z-index: 100;
      opacity: 0;
      -webkit-transition: all 0.5s;
      transition: all 0.5s;
    }
    &:hover .bgb {
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
    }
  }
}
</style>
<style scoped>
.introduction-details >>> .details-title {
  display: block;
  margin-top: 35px;
  margin-bottom: 20px;
  font-size: 16px;
}
</style>
