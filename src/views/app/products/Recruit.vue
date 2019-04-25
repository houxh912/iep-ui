<template>
  <div class="recruit">
    <iepAppTabCard :title="title">
      <div class="recruit-list">
        <div v-for="(item,index) in recruitList" :key="index" class="piece">
          {{item}}
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '突击队招募任务',
      recruitList: [
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0',
        '制度|数据基因白皮书V8.0'],
    }
  },
}
</script>
<style lang="scss" scoped>
.recruit-list {
  padding-bottom: 8px;
  .piece {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    position: relative;
    margin-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
}
</style>
