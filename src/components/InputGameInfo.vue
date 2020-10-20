<template>
  <div id="InputGameInfo">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-position="top"
    >
      <el-form-item :label="players.player1">
        <el-input
          v-model="formInline.player1"
          size="mini"
          placeholder="剩余"
          style="width:60px"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item :label="players.player2">
        <el-input
          v-model="formInline.player2"
          size="mini"
          placeholder="剩余"
          style="width:60px"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item :label="players.player3">
        <el-input
          v-model="formInline.player3"
          size="mini"
          placeholder="剩余"
          style="width:60px"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item :label="players.player4">
        <el-input
          v-model="formInline.player4"
          size="mini"
          placeholder="剩余"
          style="width:60px"
          type="number"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button type="danger" @click="addGameInfo">添加对局结果</el-button>
  </div>
</template>

<script>
export default {
  props: ["players"],
  data() {
    return {
      formInline: {
        player1: "",
        player2: "",
        player3: "",
        player4: ""
      }
    };
  },

  methods: {
    addGameInfo() {
      for (let key in this.formInline) {
        if (this.formInline[key] === "") {
          this.$message.warning("请输入所有玩家对局情况");
          return;
        }
      }
      let info = Object.assign({}, this.formInline);
      this.$emit("addGameInfo", info);
      for (let key in this.formInline) {
        this.formInline[key] = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#InputGameInfo {
  padding-bottom: 20px;
}
</style>
