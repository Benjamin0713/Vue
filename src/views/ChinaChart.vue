<template>
  <div class="echarts">
    <div :style="{height:'800px',width:'100%'}" ref="Echart"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据

export default {
  name: "echarts",
  props: ["userJson"],
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.chinaConfigure();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    chinaConfigure() {
      let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({ // 进行相关配置
        backgroundColor: "#939b9d",
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true,
          color: ['orangered', 'yellow', 'lightskyblue']
        },
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'geo' // 对应上方配置
        },
          {
            name: 'value', // 浮动框的标题
            type: 'map',
            geoIndex: 0,
            data: [
              {
                name: "北京",
                value: 540
              },
              {
                name: "天津",
                value: 130
              },
              {
                name: "上海",
                value: 400
              },
              {
                name: "重庆",
                value: 750
              },
              {
                name: "河北",
                value: 130
              },
              {
                name: "河南",
                value: 830
              },
              {
                name: "云南",
                value: 110
              },
              {
                name: "辽宁",
                value: 19
              },
              {
                name: "黑龙江",
                value: 150
              },
              {
                name: "湖南",
                value: 690
              },
              {
                name: "安徽",
                value: 60
              },
              {
                name: "山东",
                value: 39
              },
              {
                name: "新疆",
                value: 4
              },
              {
                name: "江苏",
                value: 31
              },
              {
                name: "浙江",
                value: 104
              },
              {
                name: "江西",
                value: 36
              },
              {
                name: "湖北",
                value: 52
              },
              {
                name: "广西",
                value: 33
              },
              {
                name: "甘肃",
                value: 7
              },
              {
                name: "山西",
                value: 5
              },
              {
                name: "内蒙古",
                value: 778
              },
              {
                name: "陕西",
                value: 22
              },
              {
                name: "吉林",
                value: 4
              },
              {
                name: "福建",
                value: 18
              },
              {
                name: "贵州",
                value: 5
              },
              {
                name: "广东",
                value: 98
              },
              {
                name: "青海",
                value: 1
              },
              {
                name: "西藏",
                value: 0
              },
              {
                name: "四川",
                value: 44
              },
              {
                name: "宁夏",
                value: 4
              },
              {
                name: "海南",
                value: 22
              },
              {
                name: "台湾",
                value: 3
              },
              {
                name: "香港",
                value: 5
              },
              {
                name: "澳门",
                value: 555
              }
            ]
          }
        ]
      })
    }
  }
}
</script>
