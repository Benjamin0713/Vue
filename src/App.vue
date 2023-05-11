<template>
  <div class="echarts">
    <div  style="margin-left: 45%;margin-top: 10px">
      <el-select v-model="selectedValue" placeholder="请选择">
        <el-option label="bvSP+bvSG" value=" "></el-option>
        <el-option label="bvSP" value="bvSP"></el-option>
        <el-option label="bvSG" value="bvSG"></el-option>
      </el-select>
      <el-button @click="handleSubmit">提交</el-button>
    </div>
    <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import '../node_modules/echarts/map/js/world.js'

import { Select, Option, Button } from 'element-ui';
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
      default: "100%"
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
      chart: null,
      selectedValue: '' // 用于存储选中的值
    };
  },
  components: {
    'el-select': Select,
    'el-option': Option,
    'el-button': Button
  },
  mounted() {
    // this.$axios.get('http://127.0.0.1:5000/description').then((resp) => {
    //   // console.log(resp.data.data)
    //   var datas = resp.data.data
    //
    //   var data = []
    //   for (var i = 0; i < datas.length; i++) {
    //     var d = {name: '',
    //       value: 0
    //     }
    //     d.name = datas[i].name
    //     d.value = datas[i].positive_rate
    //     data.push(d)
    //   }
    //
    //   this.datalist = data
    //   console.log(this.datalist)
    this.handleSubmit()
    // console.log(this.datalist)
    // this.initChart()
    // }).catch((err) => {
    //   console.log(err)
    //   alert('数据传输失败！')
    // })
  },
  methods: {
    handleSubmit() {
      if (this.selectedValue === ' ') {
        // 选中的值为空
        this.$axios.get('http://127.0.0.1:5000/description').then((resp) => {
          console.log(resp.data.data)
          var datas = resp.data.data

          var data = []
          for (var i = 0; i < datas.length; i++) {
            var d = {name: '',
              value: 0
            }
            d.name = datas[i].name
            d.value = datas[i].positive_rate
            data.push(d)
          }

          this.datalist = data
          // console.log(this.datalist)
          this.initChart()
        })
      }
      else  {
        // 选中的值不为空
        // console.log(this.selectedValue)
        this.$axios.get('http://127.0.0.1:5000/biovar_country_stats/'+this.selectedValue)
            .then((resp) => {
              // 处理响应结果
              console.log(resp.data)
              var datas = resp.data
              var data = []
              for (var i = 0; i < datas.length; i++) {
                var d = {
                  name: '',
                  value: 0
                }
                d.name = datas[i].name
                d.value = datas[i].positive_rate
                data.push(d)
              }
              this.datalist = data
              // console.log(this.datalist)
              this.initChart()
            })
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      window.onresize = echarts.init(this.$refs.myEchart).resize;
      // 把配置和数据放这里
      this.chart.setOption({
        backgroundColor: "#ffffff",
        title: {
          text: '可视化交互地图',
          left: 'center',
          textStyle: {
            color: '#171313',
            opacity: 0.2
          }
        },

        tooltip: {
          formatter: function (data) {
            // console.log(data)
            return (
                "country:" + " " + data.name + "</br>" +"positive_rate:" + " " + data.value
            );
          },
          trigger: 'item'
        },
        visualMap: {
          min: 0,
          max: 30,
          left: "50px",
          top: 'center',
          text: ["High", "low"], //取值范围的文字
          inRange: {
            color: ["rgba(16,233,174,0.97)","rgba(183,142,244,0.98)"], //取值范围的颜色
          },
          show: true,
        },
        // geo: {
        //   map: 'world',
        //   label: {
        //     emphasis: {
        //       show: true
        //     }
        //   },
        //   // roam: true,
        //   // zoom: 1.2,
        //   // itemStyle: {
        //   //   normal: {
        //   //     areaColor: '#78f092', //地图颜色
        //   //     borderColor: '#fff' //地图边线颜色
        //   //   },
        //   //   emphasis: {
        //   //     areaColor: '#B7DFED' //鼠标移入颜色
        //   //   }
        //   // }
        // },
        series: [{
          name: 'value',
          type: 'map',
          mapType: 'world',
          zoom: 1.2,
          roam: true,
          mapLocation: {
            y: 100
          },
          data: this.datalist,
          symbolSize: 12,
          label: {
          normal: {
            show: true, // 是否显示对应地名
            textStyle: {
              color: 'rgba(0,0,0)',
              fontSize: 10
            }
          },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              borderColor: '#a1c2ea',
              borderWidth: 1
            }
          }
        }],
      });
    }
  }
}
</script>

<style>
.echarts{
  width: 100%;
  height: 100%;
}
</style>
