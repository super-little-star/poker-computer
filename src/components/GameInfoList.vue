<template>
  <div>
    <el-dialog
      title="历史记录"
      :visible.sync="visible"
      width="80%"
      @closed="closed"
      center
    >
      <gameSetting :dialogVisible.sync="gameSettingVis" />

      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="gameSettingVis = true"
        >添加
      </el-button>

      <el-table
        :data="gameListData"
        height="192px"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="date" label="日期" :formatter="dateFormatter" />
        <el-table-column
          prop="players"
          label="玩家"
          :formatter="playerFormatter"
        />
      </el-table>
      <el-button type="primary" @click="selected">选择 </el-button>
    </el-dialog>
  </div>
</template>

<script>
import gameSetting from "@c/GameSetting";
import { dateFormat } from "@u/dateTool";
export default {
  components: { gameSetting },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      gameSettingVis: false,
      gameListData: [],
      curGame: null
    };
  },
  mounted() {
    this.gameListData = this.$store.getters["gameData/GameList"];
  },
  methods: {
    handleCurrentChange(val) {
      this.curGame = val;
    },
    selected() {
      if (this.curGame == null) {
        this.$root.Msg_Error("请选择对局");
        return;
      }
      this.$emit("update:curGame", this.curGame);
      this.visible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closed() {
      this.$emit("update:dialogVisible", false);
    },
    playerFormatter(row, column, cellValue, index) {
      let str =
        row[column.property].player1 +
        "," +
        row[column.property].player2 +
        "," +
        row[column.property].player3 +
        "," +
        row[column.property].player4;

      return str;
    },
    dateFormatter(row, column, cellValue, index) {
      return dateFormat(row[column.property]);
    }
  },
  watch: {
    dialogVisible: function(val, oldVal) {
      this.visible = val;
    }
  }
};
</script>
