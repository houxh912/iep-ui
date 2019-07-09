<template>
  <div class="platform">
    <div class="sub-title">
      <span>{{subTitle}}</span>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="handleEdit" plain>新增</el-button>
    </div>
    <div class="platform-con" v-for="platformCon in platformConList" :key="platformCon.id">
      <div class="img">
        <iep-img :src="platformCon.imgSrc" alt=""></iep-img>
      </div>
      <div class="con">
        <div class="list-title">
          <span class="list-title-con"><span class="listTitle">{{platformCon.listTitle}}</span><span class="web">{{platformCon.web}}</span></span>
          <span class="btn-group">
            <i class="el-icon-edit"></i>
            <i class="el-icon-close" @click="handleClose(index)"></i>
          </span>
        </div>
        <p class="list-con">{{platformCon.con}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { putOrg } from '@/api/goms/org'
export default {
  data () {
    return {
      subTitle: '共3个平台',
      platformConList: [
        {
          imgSrc: '',
          listTitle: '国脉电子政务网',
          web: 'echinagov.com',
          con: '国脉电子政务网（www.echinagov.com）由国脉集团创立于2001年6月，是集资讯、商机、大数据、移动端、O2O政务服务工具（规划、评估、调研、咨询、培训、标准化）于一体的电子政务一站式综合服务平台。现已成为中国电子政务第一门户，关注政府网站建设、传播电子政务观点、服务政府CIO创新发展、践行政府在线2.0理论、推动智慧政府的建设与发展，是了解中国政府网站的首选媒体，被行业人士誉为“中国政府网站建设的民间引擎”和“中国电子政务发展的网络智库”。',
        },
        {
          imgSrc: '',
          listTitle: '国脉物联网',
          web: 'im2m.com.cn',
          con: '国脉物联网（www.im2m.com.cn ）于2009年9月正式开通，是中国第一个物联网行业门户网站，并于2017年8月24日进行全新改版升级，成为名副其实的"中国物联网传媒第一品牌"、"中国物联网企业营销第一阵地"和"中国物联网行业交流第一平台"，提供网络广告、会议营销、年度评奖、数据库营销、课题研究、专家培训、智慧城市规划咨询等系列线上线下服务。国脉物联网上线以来，一直致力于服务广大物联网专业用户与业界厂商，为普及和推动物联网产业及智慧城市理念、技术、方案、案例等在国内的应用与发展做出了重大贡献，得到诸多物联网专家、学者、研究人员及厂商客户的信赖与好评。',
        },
        {
          imgSrc: '',
          listTitle: '国脉智慧城市网',
          web: 'besticity.com',
          con: '国脉互联是中国信息化首席智库，拥有12年电子政务（互联网+政务服务）、6年智慧城市和智慧企业的咨询实战经验，为政府部门、城市园区、大型企业等客户提供科学、规范、专业、创新的一体化解决方案和高品质的专业服务。公司秉承“网络价值构建师”的行为理念，践行“咨询+产品”的发展定位，主要开展智慧城市、智慧政府、智慧企业领域的规划、评估、咨询、项目实施和运营外包服务，并提供系列网络价值赋能产品。',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  methods: {
    handleClose (index) {
      this.platformConList.splice(index, 1)
    },
    handleEdit () {
      this.$emit('onEdit', {
        formRequestFn: putOrg,
        row: this.form,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.platform {
  margin: 15px;
}
.sub-title {
  display: flex;
  margin: 10px 0;
  justify-content: flex-start;
  align-items: center;
  span {
    margin-right: 20px;
  }
}
.platform-con {
  display: flex;
  margin: 30px 0;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: #cb3737;
  }
  .img {
    margin-right: 20px;
    width: 250px;
    height: 150px;
    border: 1px solid #ebeef5;
    overflow: hidden;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  .con {
    flex: 1;
    .list-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      .list-title-con {
        display: flex;
        align-items: center;
      }
      .listTitle {
        margin-right: 10px;
        font-size: 18px;
      }
      .web {
        font-size: 16px;
        color: #999;
      }
      .btn-group {
        i {
          font-size: 20px;
          color: #999;
          cursor: pointer;
          &:first-child {
            margin-right: 10px;
          }
          &:hover {
            color: #cb3737;
          }
        }
      }
    }
    .list-con {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      text-align: justify;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      color: #666;
    }
  }
}
</style>
