<template>
  <div id="InputGameInfo">
    <el-dialog
      title="添加对局"
      width="80%"
      :visible.sync="visible"
      @closed="closed"
    >
      <el-form :model="formInline" class="demo-form-inline">
        <el-form-item :label="players.player1">
          [{{ formInline.player1 }}]
          <div class="block">
            <el-slider
              v-model="formInline.player1"
              max="13"
              :show-tooltip="false"
            ></el-slider>
          </div>
        </el-form-item>
        <el-form-item :label="players.player2">
          [{{ formInline.player2 }}]
          <div class="block">
            <el-slider
              v-model="formInline.player2"
              max="13"
              :show-tooltip="false"
            ></el-slider>
          </div>
        </el-form-item>
        <el-form-item :label="players.player3">
          [{{ formInline.player3 }}]
          <div class="block">
            <el-slider
              v-model="formInline.player3"
              max="13"
              :show-tooltip="false"
            ></el-slider>
          </div>
        </el-form-item>
        <el-form-item :label="players.player4">
          [{{ formInline.player4 }}]
          <div class="block">
            <el-slider
              v-model="formInline.player4"
              max="13"
              :show-tooltip="false"
            ></el-slider>
          </div>
        </el-form-item>
      </el-form>
      <el-button type="danger" @click="addGameInfo">添加对局结果</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["players", "dialogVisible"],
  data() {
    return {
      visible: false,
      formInline: {
        player1: 0,
        player2: 0,
        player3: 0,
        player4: 0
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
      this.visible = false;
    },
    closed() {
      this.$emit("update:dialogVisible", false);
      this.clear();
    },
    clear() {
      for (let key in this.formInline) {
        this.formInline[key] = 0;
      }
    }
  },
  watch: {
    dialogVisible: function(val, oldVal) {
      this.visible = val;
    }
  }
};
</script>

<style lang="scss" scoped>
#InputGameInfo {
  padding-bottom: 20px;
}
.block {
  width: 70%;
  float: left;
}
</style>
