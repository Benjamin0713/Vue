<template>
  <div class="echarts">
    <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import '../node_modules/echarts/map/js/world.js'

export default {
  name: "echarts",
  props: {
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "820px"
    }
  },
  data() {
    return {
      datalist: [
        {
          name: 'China',
          value: 20
        }
      ],
      title: "图表",
      placeholder: "用户名/电话",
      find: "2", //1显示新增按钮，2显示导入按钮，若不显示这两个按钮可以写0或者不写值
      chart: null
    };
  },
  components: {},
  mounted() {
    this.$axios.get('http://127.0.0.1:5000/description').then((resp) => {
      console.log(resp.data.data)
      var datas = resp.data.data

      var data = []
      for (var i = 0; i < datas.length; i++) {
        var d = {name: '', value: 0}
        d.name = datas[i].name
        d.value = datas[i].value
        data.push(d)
      }

      this.datalist = data

      this.initChart()
    }).catch((err) => {
      console.log(err)
      alert('数据传输失败！')
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    //搜索回调
    searchItem(val) {
      console.log(val)
    },
    //新增回调
    addNew(val) {
      console.log(val)
    },
    //导入
    leadingItem(val) {
      console.log(val)
    },
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      window.onresize = echarts.init(this.$refs.myEchart).resize;
      // 把配置和数据放这里
      this.chart.setOption({
        backgroundColor: "#d1d7d8",
        title: {
          // text: '可视化交互地图',
          left: '50%',
          top: '0px',
          textStyle: {
            color: '#171313',
            opacity: 0.
          }
        },

        tooltip: {
          formatter: function (data) {
            // console.log(data)
              return (
                  "country:" + " " + data.name + "</br>" +"value:" + " " + data.value
              );
          },
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: 100,
          left: "100px",
          top: '500px',
          text: ["High", "low"], //取值范围的文字
          inRange: {
            color: ["#b0eeee", "blue"], //取值范围的颜色
          },
          show: true,
        },
        geo: {
          map: 'world',
          label: {
            emphasis: {
              show: true
            }
          },
          // roam: true,
          // zoom: 1,
          silent: true,
          itemStyle: {
            normal: {
              areaColor: '#37376e',
              borderColor: '#000'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [{
          name: 'value',
          type: 'map',
          mapType: 'world',
          // zoom: 1.2,
          mapLocation: {
            y: 100
          },
          data: this.datalist,
          symbolSize: 12,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        }],
      });
    }
  }
}
</script>
