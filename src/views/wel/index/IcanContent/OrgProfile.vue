<template>
  <div class="org-profile-wrapper">
    <div class="logo-wrapper">
      <iep-img class="logo" src="http://183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg"></iep-img>
    </div>
    <div class="info-wrapper">
      <div class="desc-wrapper">
        <div class="title-wrapper">
          <div class="title">
            <span class="name">国脉集团研发中心</span>
            <span class="label">虚拟</span>
          </div>
          <div class="style">SO风采</div>
        </div>
        <div class="detail-wrapper">
          <div>创建人：黄永梅</div>
          <div>成立时间：2019年04月01日</div>
          <div>行业：数据服务</div>
        </div>
      </div>
      <div class="data-wrapper">
        <div>
          <div class="number">670</div>
          <div>信用值</div>
        </div>
        <div>
          <div class="number">670</div>
          <div>活跃度</div>
        </div>
        <div>
          <div class="number">670</div>
          <div>关注量</div>
        </div>
        <div>
          <div class="number">670</div>
          <div>数据资产</div>
        </div>
        <div>
          <div class="number">670</div>
          <div>组织成员</div>
        </div>
        <div>
          <div class="number">670</div>
          <div>组织财富</div>
        </div>
        <div>
          <div class="number">670</div>
          <div>资料完善</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.data-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 100%;
    text-align: center;
    border-right: 1px solid #eee;
    color: #999;
    &:last-child {
      border: none;
    }
  }
  .number {
    font-size: 18px;
    color: #333;
  }
}
.desc-wrapper {
  justify-content: space-around;
}
.data-wrapper,
.desc-wrapper {
  flex: 1;
}
.detail-wrapper {
  > div {
    margin-right: 20px;
  }
}
.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .style {
    color: $--color-primary;
    border: 1px solid;
    border-radius: 20px;
    padding: 0 10px;
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    .name {
      font-size: 20px;
      margin-right: 20px;
      font-weight: 600;
    }
    .label {
      font-size: 14px;
      padding: 0px 5px;
      border: 1px solid #eee;
      color: $--color-primary;
      border-radius: 4px;
    }
  }
}
.title-wrapper,
.detail-wrapper {
  display: flex;
}
.info-wrapper,
.desc-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.org-profile-wrapper {
  margin: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 12px;
  display: flex;
}
.logo-wrapper {
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 5px;
  width: 142px;
  height: 142px;
  margin-right: 20px;
}
.logo {
  width: 130px;
  height: 130px;
}
</style>
