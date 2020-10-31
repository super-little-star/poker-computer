<template>
  <el-dialog
    title="添加对局"
    :visible.sync="visible"
    width="80%"
    @closed="closed"
    append-to-body
    center
  >
    <el-form
      :model="gameSettingData"
      status-icon
      ref="gameSetting"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <el-form-item label="玩家名称" prop="players">
        <el-input
          v-model="gameSettingData.players.player1"
          style="width:60px"
          size="mini"
          placeholder="玩家1"
        />
        <el-input
          v-model="gameSettingData.players.player2"
          style="width:65px"
          size="mini"
          placeholder="玩家2"
        />
        <el-input
          v-model="gameSettingData.players.player3"
          style="width:65px"
          size="mini"
          placeholder="玩家3"
        />
        <el-input
          v-model="gameSettingData.players.player4"
          style="width:65px"
          size="mini"
          placeholder="玩家4"
        />
      </el-form-item>
      <el-form-item label="基础分" prop="checkPass">
        <el-input-number
          size="mini"
          v-model="gameSettingData.price"
          label="描述文字"
          :step="0.1"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          添加
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      gameSettingData: {
        players: {
          player1: "",
          player2: "",
          player3: "",
          player4: ""
        },
        price: 1,
        date: 0,
        gameInfoList: []
      }
    };
  },
  methods: {
    submitForm() {
      for (let key in this.gameSettingData.players) {
        if (this.gameSettingData.players[key] == "") {
          this.$root.Msg_Error("输入所有玩家信息");
          return;
        }
      }
      let value = JSON.parse(JSON.stringify(this.gameSettingData));
      value.date = Date.now().valueOf();
      this.$store.commit("gameData/AddGameList", value);
      this.visible = false;
    },
    closed() {
      this.$emit("update:dialogVisible", false);
      for (let key in this.gameSettingData.players) {
        this.gameSettingData.players[key] = "";
      }
      this.gameSettingData.price = 1;
    }
  },
  watch: {
    dialogVisible: function(val, oldVal) {
      this.visible = val;
    }
  }
};
</script>
