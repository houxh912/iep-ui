<template>
  <div class="visiting">
    <vis-content :message="message"></vis-content>
    <detail-right :meetingMsg="meetingMsg"></detail-right>
  </div>
</template>
<script>
function initContentForm () {
  return {
    title: '',
    orgName: '',
    realName: '',
    userId: 0,
    createTime: '',
    visitingUser: [],
    meetingContent: '',//会议内容
    meetingCon: '',//会议总结
    thoughtsProblem: '',
  }
}
function initMeetingForm () {
  return {
    meetingTime: '',
    meetingLocation: '',
    realName: '',
    host: [],
    attendee: [],
    receiver: [],
  }
}
import VisContent from './Content'
import DetailRight from './DetailRight'
import { getMeeting } from '@/api/mlms/leader_report/'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  components: {
    VisContent,
    DetailRight,
  },
  data () {
    return {
      message: initContentForm(),
      meetingMsg: initMeetingForm(),
    }
  },
  computed: {
    id () {
      return + this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getMeeting(this.id).then(({ data }) => {
        this.message = this.$mergeByFirst(initContentForm(), data.data)
        this.meetingMsg = this.$mergeByFirst(initMeetingForm(), data.data)
      })
    },
  },
}
</script>
<style scoped lang='scss'>
.visiting {
  display: grid;
  grid-template-columns: 6fr 2fr;
  grid-auto-flow: row dense;
}
</style>
