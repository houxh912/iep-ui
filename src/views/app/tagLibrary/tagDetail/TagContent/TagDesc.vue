<template>
  <div class="tag-desc">
    <div class="tag-main">
      <div class="title-con">
        <div class="left">
          <p class="title">{{form.name}}</p>
          <span class="sign" v-for="typeName in form.typeNames" :key="typeName">{{typeName}}</span>
          <div class="edit" @click="handleEdit"><i class="icon-bianji"></i> 添加介绍</div>
        </div>
        <span class="explain">
          <i class="icon-wenhao"></i>
          <span>标签规范说明</span>
        </span>
      </div>
      <p class="content">
        <iep-no-data v-if="!form.description.length"></iep-no-data>
        {{form.description}}
      </p>
      <div class="introduce">
        <div class="introduce-item" v-for="(item, index) in introduceList" :key="index">
          {{item.description}} —— {{item.creatorRealName}}
        </div>
      </div>
      <!-- <span class="more fr">
        <span>查看更多</span>
        <i class="icon-jiantouxiangyou"></i>
      </span> -->
    </div>
    <describe ref="describe" @load-page="getIntroduce"></describe>
  </div>
</template>

<script>
import describe from './describe/index'
import { getTagDesc } from '@/api/tms/description'

export default {
  components: { describe },
  props: ['form'],
  data () {
    return {
      introduceList: [],
    }
  },
  methods: {
    handleEdit () {
      this.$refs['describe'].open({
        tagId: this.form.tagId,
        name: this.form.name,
      })
    },
    getIntroduce (row) {
      getTagDesc({
        id: row.tagId ? row.tagId : this.form.tagId,
        size: 999,
      }).then(({ data }) => {
        this.introduceList = data.records
      })
    },
  },
  watch: {
    form: {
      handler (val) {
        this.introduceList = []
        this.getIntroduce(val)
      },
      deep: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.tag-desc {
  margin-bottom: 30px;
}
.tag-main {
  overflow: hidden;
}
.title-con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .edit {
      font-size: 12px;
      cursor: pointer;
    }
  }
}
.title {
  display: inline-block;
  margin-bottom: 0;
  font-size: 22px;
  color: #333;
  margin-right: 10px;
}
.sign {
  padding: 0 5px;
  margin-right: 5px;
  border: 1px solid #c73e3e;
  color: #c73e3e;
  font-size: 12px;
  border-radius: 3px;
  background-color: rgba(231, 168, 168, 0.1);
  cursor: pointer;
  &:hover {
    background-color: rgba(184, 105, 105, 0.1);
  }
}
.fr {
  float: right;
}
.explain {
  display: flex;
  align-items: center;
  color: #999;
  line-height: 30px;
  i {
    margin-right: 5px;
    font-size: 14px;
    vertical-align: -2px;
  }
}
.content {
  font-size: 14px;
  color: #666;
  line-height: 28px;
}
.introduce {
  .introduce-item {
    margin-bottom: 5px;
    display: flex;
  }
}
.more {
  padding: 0 5px;
  border: 1px solid #eee;
  font-size: 14px;
  color: #c73e3e;
  border-radius: 3px;
  cursor: pointer;
  span {
    margin-right: 5px;
  }
  i {
    display: inline-block;
    transform: rotate(90deg);
    vertical-align: -2px;
  }
}
</style>
