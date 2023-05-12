<template>
  <div>
    <el-menu style="width: 200px; min-height: calc(100vh - 50px)"
        default-active="1"
        class="el-menu-vertical-demo">

      <el-menu-item index="1">
        <i class="el-icon-notebook-1"></i>
        <span slot="title" @click="World">世界地图</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-notebook-1"></i>
        <span slot="title" @click="China">中国地图</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  components:{},
  methods:{
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
