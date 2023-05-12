<template>
  <div style="height: 50px;line-height: 50px;border-bottom: 1px solid #ccc; display: flex">
    <div style="width: 200px; padding-left: 30px; font-weight: bold; color: dodgerblue">交互地图可视化</div>
    <div style="flex: 1;">
      <el-button type="primary" style="margin-right:10px; float:right;" @click="World">世界地图</el-button>
      <el-button type="primary" style="margin-right:10px; float:right;" @click="China">中国地图</el-button>
    </div>
    <div style="width: 100px"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components:{

  },
  methods:{
    // checkIn(){
    //   this.$router.push('/user')
    // }
    China(){
      this.$router.push("/ChinaChart");
    },
    World(){
      this.$router.push("/WorldChart");
    }
  }
}
</script>

<style scoped>

</style>
