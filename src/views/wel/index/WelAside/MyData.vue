<template>
  <div class="data">
    <div class="title">{{data.title}}</div>
    <div id="barG2"></div>
  </div>
</template>
<script>
import G2 from '@antv/g2'
export default {
  data () {
    return {
      data: { title: '我的指数' },
      charts: '',
    }
  },
  methods: {
    dataDetail () {
      // console.log(index)
    },
  },
  mounted () {
    const data = [{
      item: 'Design',
      a: 70,
      b: 30,
    }, {
      item: 'Development',
      a: 60,
      b: 70,
    }, {
      item: 'Marketing',
      a: 50,
      b: 60,
    }, {
      item: 'Users',
      a: 40,
      b: 50,
    }, {
      item: 'Test',
      a: 60,
      b: 70,
    }, {
      item: 'Language',
      a: 70,
      b: 50,
    }, {
      item: 'Technology',
      a: 50,
      b: 40,
    }, {
      item: 'Support',
      a: 30,
      b: 40,
    }, {
      item: 'Sales',
      a: 60,
      b: 40,
    }, {
      item: 'UX',
      a: 50,
      b: 60,
    }]
    const dv = new DataView().source(data)
    dv.transform({
      type: 'fold',
      fields: ['a', 'b'], // 展开字段集
      key: 'user', // key字段
      value: 'score', // value字段
    })
    const chart = new G2.Chart({
      container: 'barG2',
      forceFit: true,
      width: 260,
      height: window.innerHeight,
      padding: [20, 20, 95, 20],
    })
    chart.source(dv, {
      score: {
        min: 0,
        max: 80,
      },
    })
    chart.coord('polar', {
      radius: 0.8,
    })
    chart.axis('item', {
      line: null,
      tickLine: null,
      grid: {
        lineStyle: {
          lineDash: null,
        },
        hideFirstLine: false,
      },
    })
    chart.axis('score', {
      line: null,
      tickLine: null,
      grid: {
        type: 'polygon',
        lineStyle: {
          lineDash: null,
        },
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    })
    chart.legend('user', {
      marker: 'circle',
      offset: 30,
    })
    chart.line().position('item*score').color('user').size(2)
    chart.point().position('item*score').color('user').shape('circle').size(4).style({
      stroke: '#fff',
      lineWidth: 1,
      fillOpacity: 1,
    })
    chart.interval()
    chart.render()
  },
  /*  mounted () {
     // @antv/g2
     const data = [
       {
         'name': 'London',
         'month': 'Jan.',
         'number': 18.9,
       }, {
         'name': 'London',
         'month': 'Feb.',
         'number': 28.8,
       }, {
         'name': 'London',
         'month': 'Mar.',
         'number': 39.3,
       }, {
         'name': 'London',
         'month': 'Apr.',
         'number': 81.4,
       }, {
         'name': 'London',
         'month': 'May',
         'number': 47,
       }, {
         'name': 'London',
         'month': 'Jun.',
         'number': 20.3,
       }, {
         'name': 'London',
         'month': 'Jul.',
         'number': 24,
       }, {
         'name': 'London',
         'month': 'Aug.',
         'number': 35.6,
       }, {
         'name': 'Berlin',
         'month': 'Jan.',
         'number': 12.4,
       }, {
         'name': 'Berlin',
         'month': 'Feb.',
         'number': 23.2,
       }, {
         'name': 'Berlin',
         'month': 'Mar.',
         'number': 34.5,
       }, {
         'name': 'Berlin',
         'month': 'Apr.',
         'number': 99.7,
       }, {
         'name': 'Berlin',
         'month': 'May',
         'number': 52.6,
       }, {
         'name': 'Berlin',
         'month': 'Jun.',
         'number': 35.5,
       }, {
         'name': 'Berlin',
         'month': 'Jul.',
         'number': 37.4,
       }, {
         'name': 'Berlin',
         'month': 'Aug.',
         'number': 42.4,
       },
     ]
     const chart = new G2.Chart({
       container: 'barG2',
       width: 260,
       height: 260,
     })
     chart.source(data, {
       month: {
         alias: '月份',// 定义别名
       },
       number: {
         alias: '月均降雨量',
       },
     })
     chart.axis('month', {
       grid: {
         align: 'center',
         type: 'line',
         lineStyle: {
           stroke: '#d9d9d9', // 网格线的颜色
           // lineWidth: 1, // 网格线的粗细
           lineDash: [4, 4], // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
         },
         hideFirstLine: true, // 是否隐藏第一条网格线，默认为 false
         hideLastLine: true,
       },
       title: {
         autoRotate: 'boolean', // 是否需要自动旋转，默认为 true
         offset: 30, // 数值，设置坐标轴标题距离坐标轴线的距离
         // 设置标题的文本样式
         textStyle: {
           textAlign: 'center', // 文本对齐方向，可取值为： start middle end
           fill: '#404040', // 文本的颜色
           fontSize: '12', // 文本大小
           // fontWeight: 'bold', // 文本粗细
           // rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
           textBaseline: 'top', // 文本基准线，可取 top middle bottom，默认为middle
         },
         position: 'center', // 标题的显示位置（相对于坐标轴线），可取值为 start center end
       },
     })
     chart.axis('number', {
       grid: {
         align: 'center',
         type: 'line',
         lineStyle: {
           stroke: '#d9d9d9', // 网格线的颜色
           // lineWidth: 1, // 网格线的粗细
           lineDash: [4, 4], // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
         },
         hideFirstLine: true, // 是否隐藏第一条网格线，默认为 false
         hideLastLine: true,
       },
       title: {
         autoRotate: 'boolean', // 是否需要自动旋转，默认为 true
         offset: 70, // 数值，设置坐标轴标题距离坐标轴线的距离
         // 设置标题的文本样式
         textStyle: {
           textAlign: 'center', // 文本对齐方向，可取值为： start middle end
           fill: '#404040', // 文本的颜色
           fontSize: '12', // 文本大小
           // fontWeight: 'bold', // 文本粗细
           // rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
           textBaseline: 'top', // 文本基准线，可取 top middle bottom，默认为middle
         },
         position: 'center', // 标题的显示位置（相对于坐标轴线），可取值为 start center end
       },
     })
     chart.interval().position('month*number').color('name').adjust([{
       type: 'dodge',
       marginRatio: 1 / 32,
     }])
     chart.render()
   }, */
}
</script>
<style lang="scss" scoped>
.data {
  box-sizing: border-box;
  margin: 10px;
}
.title {
  padding: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
}
.cursor {
  cursor: pointer;
}
#barG2 {
  width: 100%;
  height: 260px;
}
</style>