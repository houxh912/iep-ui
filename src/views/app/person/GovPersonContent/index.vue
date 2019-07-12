<template>
  <div class="gov-person-content">
    <div class="top-content">
      <gov-person-img></gov-person-img>
      <gov-person-notice></gov-person-notice>
      <!-- <glow-person></glow-person>
      <talent-advantage></talent-advantage> -->
    </div>
    <div class="first-img">
      <!-- <img src="./img/first.png" alt=""> -->
    </div>
    <div class="top-content">
      <shortage-posts></shortage-posts>
      <gov-tags></gov-tags>
    </div>
    <div class="block">
      <carousel></carousel>
    </div>
    <div class="copies">
      <training-notice></training-notice>
      <hot-course></hot-course>
      <excellent-lecturer></excellent-lecturer>
    </div>
    <div class="second-img">
      <img src="./img/second.png" alt="">
    </div>
    <div class="copies">
      <gov-learn></gov-learn>
      <gov-document></gov-document>
      <thoughts></thoughts>
    </div>
    <div class="copies">
      <!-- <interactive-zone></interactive-zone>
      <reward></reward>
      <feedback></feedback> -->
    </div>
  </div>
</template>
<script>
import GovPersonImg from './GovPersonImg'
import GovPersonNotice from './GovPersonNotice'
// import GlowPerson from './GlowPerson'
import Thoughts from './Thoughts'
import ShortagePosts from './ShortagePosts'
import GovTags from './GovTags'
import Carousel from './Carousel/'
import TrainingNotice from './TrainingNotice'
import HotCourse from './HotCourse'
import ExcellentLecturer from './ExcellentLecturer'
// import InteractiveZone from './InteractiveZone'
// import Reward from './Reward'
// import Feedback from './Feedback'
import GovLearn from './GovLearn/'
import GovDocument from './GovDocument/'
// import TalentAdvantage from './TalentAdvantage'

export default {
  components: {
    GovPersonImg,
    GovPersonNotice,
    Thoughts,
    ShortagePosts,
    GovTags,
    Carousel,
    TrainingNotice,
    HotCourse,
    ExcellentLecturer,
    // InteractiveZone, 
    // Reward, 
    // Feedback, 
    GovLearn,
    GovDocument,
    // TalentAdvantage,
  },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.gov-person-content {
  margin: 0 auto;
  padding-top: 25px;
  width: 1200px;
  .top-content {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 875px) minmax(100px, 300px);
  }
  .first-img,
  .second-img {
    margin: 20px 0;
  }
  .block {
    margin-top: 25px;
    width: 100%;
  }
  .copies {
    display: grid;
    margin-top: 25px;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(100px,2fr);
  }
}
</style>

