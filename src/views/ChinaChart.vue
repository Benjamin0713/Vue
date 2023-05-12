<template>
  <div class="echarts">
    <div  style="margin-left:40% ;margin-top: 20px">
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
// import '../../node_modules/echarts/map/js/world.js'
import echarts from "echarts";
import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据

import { Select, Option, Button } from 'element-ui';
export default {
  name: "ChinaChart",
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
      default: "700px"
    }
  },
  data() {
    return {
      datalist: [

      ],
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
    this.handleSubmit()
  },
  methods: {
    handleSubmit() {
      if (this.selectedValue === ' ') {
        // 选中的值为空
        this.$axios.get('http://127.0.0.1:5000/description_province').then((resp) => {
          console.log(resp.data)
          var datas = resp.data

          var data = []
          for (var i = 0; i < datas.length; i++) {
            var d = {
              name: '',
              value: [0,0,0]
            }
            d.name = datas[i].name
            d.value[0] = datas[i].Positive_rate
            d.value[1] = datas[i].Total_sample_size
            d.value[2] = datas[i].Positive_sample_size
            data.push(d)
            }

          this.datalist = data
          // console.log(this.datalist)
          this.chinaConfigure()
        })
      }
      else  {
        // 选中的值不为空
        // console.log(this.selectedValue)
        this.$axios.get('http://127.0.0.1:5000/biovar_province_stats/'+this.selectedValue)
            .then((resp) => {
              // 处理响应结果
              console.log(resp.data)
              var datas = resp.data
              var data = []
              for (var i = 0; i < datas.length; i++) {
                var d = {
                  name: '',
                  value: [0,0,0]
                }
                d.name = datas[i].name
                d.value[0] = datas[i].positive_rate
                d.value[1] = datas[i].total_sample_size
                d.value[2] = datas[i].positive_sample_size
                data.push(d)
              }
              this.datalist = data
              // console.log(this.datalist)
              this.chinaConfigure()
            })
      }
    },
    chinaConfigure() {
      let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({ // 进行相关配置
        backgroundColor: "#ffffff",
        tooltip: {
          formatter: function (data) {
            // console.log(data)
            if (typeof (data.data)!="undefined"){
              return (
                  "province:"+" "+ data.name
                  +"</br>" +"positive_rate:" +" "+  data.data.value[0]
                  +"</br>" + "positive_sample_size:"+" "+ data.data.value[2]
                  +"</br>" + "total_sample_size:" +" "+ data.data.value[1]
              )
            }
            else{
              return (
                  "province:"+" "+ data.name
                  +"</br>" +"positive_rate: 0"
                  +"</br>" + "positive_sample_size: 0"
                  +"</br>" + "total_sample_size: 0"
              )
            }
          },
          trigger: 'item'
        },// 鼠标移到图里面的浮动提示框
        visualMap: {
          min: 0,
          max: 30,
          left: "50px",
          top: 'center',
          text: ["High", "low"], //取值范围的文字
          inRange: {
            color: ["rgb(242,244,70)","rgba(248,9,30,0.98)"], //取值范围的颜色
          },
          show: true,
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
            data: this.datalist,
            // data: [
            //   {
            //     name: "北京",
            //     value: 540
            //   },
            //   {
            //     name: "天津",
            //     value: 130
            //   },
            //   {
            //     name: "上海",
            //     value: 400
            //   },
            //   {
            //     name: "重庆",
            //     value: 750
            //   },
            //   {
            //     name: "河北",
            //     value: 130
            //   },
            //   {
            //     name: "河南",
            //     value: 830
            //   },
            //   {
            //     name: "云南",
            //     value: 110
            //   },
            //   {
            //     name: "辽宁",
            //     value: 19
            //   },
            //   {
            //     name: "黑龙江",
            //     value: 150
            //   },
            //   {
            //     name: "湖南",
            //     value: 690
            //   },
            //   {
            //     name: "安徽",
            //     value: 60
            //   },
            //   {
            //     name: "山东",
            //     value: 39
            //   },
            //   {
            //     name: "新疆",
            //     value: 4
            //   },
            //   {
            //     name: "江苏",
            //     value: 31
            //   },
            //   {
            //     name: "浙江",
            //     value: 104
            //   },
            //   {
            //     name: "江西",
            //     value: 36
            //   },
            //   {
            //     name: "湖北",
            //     value: 52
            //   },
            //   {
            //     name: "广西",
            //     value: 33
            //   },
            //   {
            //     name: "甘肃",
            //     value: 7
            //   },
            //   {
            //     name: "山西",
            //     value: 5
            //   },
            //   {
            //     name: "内蒙古",
            //     value: 778
            //   },
            //   {
            //     name: "陕西",
            //     value: 22
            //   },
            //   {
            //     name: "吉林",
            //     value: 4
            //   },
            //   {
            //     name: "福建",
            //     value: 18
            //   },
            //   {
            //     name: "贵州",
            //     value: 5
            //   },
            //   {
            //     name: "广东",
            //     value: 98
            //   },
            //   {
            /*    name: "青海",*/
            /*    value: 1*/
            /*  },*/
            /*  {*/
            /*    name: "西藏",*/
            /*    value: 0*/
            /*  },*/
            /*  {*/
            /*    name: "四川",*/
            /*    value: 44*/
            /*  },*/
            //   {
            //     name: "宁夏",
            //     value: 4
            //   },
            //   {
            //     name: "海南",
            //     value: 22
            //   },
            //   {
            //     name: "台湾",
            //     value: 3
            //   },
            //   {
            //     name: "香港",
            //     value: 5
            //   },
            //   {
            //     name: "澳门",
            //     value: 555
            //   }
            // ]
          }
        ]
      })
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
