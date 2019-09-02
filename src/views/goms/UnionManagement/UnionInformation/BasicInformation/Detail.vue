<template>
  <div>
    <basic-container>
      <div class="org-detail-wrapper">
        <div class="content">
          <div class="top">
            <div class="img-wrapper">
              <iep-img :src="form.logo" slot="cover"></iep-img>
            </div>
            <div class="info-wrapper">
              <div class="title">{{form.name}}{{form.subName}}</div>
              <div class="col">
                <div class="form-item-wrapper">
                  <label for="">创建人：</label>
                  <span class="value">{{form.creator.name}}</span>
                </div>
                <div class="form-item-wrapper">
                  <label for="">成立时间：</label>
                  <span class="value">{{form.establishTime | parseToDay}}</span>
                </div>
                <div class="form-item-wrapper">
                  <label for="">人员规模：</label>
                  <span class="value">{{form.memberNum}}</span>
                </div>
              </div>
              <div class="labs-con">
                <div class="data-lab" v-for="lab in labList" :key="lab.id">
                  <div class="count">{{lab.data}}</div>
                  <div class="labTitle"><span>{{lab.labTitle}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <iep-button @click="handleEdit">编辑</iep-button>
        </div>
        <div class="introduction-details">
          <div class="tags-detail">
            <span class="details-title">联盟标签</span>
            <div class="tag-wrapper">
              <iep-goms-tags title="卓越" :tags="form.abilityTag"></iep-goms-tags>
              <iep-goms-tags title="专业" :tags="form.projectTag"></iep-goms-tags>
              <iep-goms-tags title="进步" :tags="form.learningTag"></iep-goms-tags>
            </div>
          </div>
          <div class="brief">
            <span class="details-title">联盟简介</span>
            <p class="con">{{form.intro}}</p>
          </div>
          <div class="contact">
            <span class="details-title">联系方式</span>
            <span class="con"><span>官网地址 ：www.govmade.com</span>
              <span>官方新浪微博：@国脉集团</span></span>
          </div>
          <div class="framework">
            <span class="details-title">联盟架构</span>
            <div class="con">
              <iep-html v-model="form.structure"></iep-html>
            </div>
          </div>
          <div class="culture">
            <span class="details-title">联盟文化</span>
            <div class="con">
              <iep-html v-model="form.unionCulture"></iep-html>
            </div>
          </div>
          <business-layout></business-layout>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUnionBySelf, putUnion } from '@/api/goms/union'
import { initForm } from './options'
import BusinessLayout from './BusinessLayout'
import IepGomsTags from '@/views/goms/Components/tags.vue'
export default {
  components: { BusinessLayout, IepGomsTags },
  data () {
    return {
      form: initForm(),
      labList: [
        {
          data: '670',
          labTitle: '信用值',
        },
        {
          data: '1455',
          labTitle: '贡献',
        },
        {
          data: '1',
          labTitle: '综合排名',
        },
        {
          data: '1',
          labTitle: '业绩排名',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleEdit () {
      this.$emit('onEdit', {
        formRequestFn: putUnion,
        row: this.form,
      })
    },
    loadPage () {
      getUnionBySelf().then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.tag-wrapper {
  margin-left: 30px;
  .tag-item {
    margin-bottom: 10px;
  }
}
.org-detail-wrapper {
  .labs-con {
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
    .count {
      font-size: 18px;
    }
    .data-lab {
      padding: 0 20px;
      border-right: 1px solid #eee;
      text-align: center;
      &:nth-child(1) {
        padding-left: 0;
      }
      &:last-child {
        border: 0;
      }
    }
  }
  .content {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .top {
      display: flex;
      .img-wrapper {
        width: 220px;
        height: 150px;
        border: 1px solid #eee;
        padding: 5px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .info-wrapper {
        margin-left: 20px;
        padding: 5px;
        .title {
          margin-bottom: 10px;
          font-size: 18px;
        }
        .col {
          display: flex;
          font-size: 16px;
          .form-item-wrapper {
            padding: 5px 0;
            margin-right: 10px;
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
    .bottom {
      padding: 20px;
      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }
    }
  }
}
.tags-detail,
.brief,
.contact,
.framework,
.culture,
.business-layout,
.opex {
  margin-bottom: 30px;
}
.contact {
  .con {
    display: flex;
    margin-left: 30px;
    width: 50%;
    justify-content: space-between;
    align-items: center;
  }
}
.opex {
  .con {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 30px;
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
.labTitle {
  span {
    color: #666;
  }
}
.con {
  margin-left: 30px;
}
</style>
<style scoped>
.introduction-details >>> .details-title {
  display: block;
  margin-top: 35px;
  margin-bottom: 20px;
  font-size: 16px;
}
.img-wrapper >>> .el-image {
  display: flex;
  align-items: center;
}
.img-wrapper >>> .el-image__inner {
  height: auto;
}
</style>