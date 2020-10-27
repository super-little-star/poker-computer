<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4" class="header-icon">
            <i class="el-icon-s-order" @click="clickMenu"></i>
          </el-col>
          <el-col :span="16" class="title"> 锄大②计算器</el-col>
          <el-col :span="4"></el-col>
        </el-row>
      </el-header>
      <el-main>
        <div v-if="curGame != null">
          <el-button
            icon="el-icon-minus"
            circle
            @click="removeGameInfoList"
            class="removeBtn"
          ></el-button>
          <el-button
            icon="el-icon-plus"
            round
            @click="inputGameInfoVis = true"
            class="removeBtn"
            type="danger"
          >
            添加
          </el-button>
          <inputGameInfo
            @addGameInfo="addGameInfo"
            :players="curGame.players"
            :dialogVisible.sync="inputGameInfoVis"
          />

          <mScorecard
            :players="curGame.players"
            :gameInfoList="curGame.gameInfoList"
            :price="curGame.price"
          />
        </div>
        <div v-else>
          <el-button type="primary" @click="gameInfoListVis = true">
            选择或新建对局
          </el-button>
        </div>
      </el-main>
    </el-container>
    <cgameInfoList
      :dialogVisible.sync="gameInfoListVis"
      :curGame.sync="curGame"
    />
  </div>
</template>

<script>
import mScorecard from "@c/mScorecard";
import inputGameInfo from "@c/InputGameInfo";
import cgameInfoList from "@c/GameInfoList";
import { dataKey, GetData } from "@u/SaveManager";
export default {
  name: "Home",
  components: { mScorecard, inputGameInfo, cgameInfoList },
  data() {
    return {
      curGame: null,
      gameList: [],
      gameInfoListVis: false,
      inputGameInfoVis: false
    };
  },
  mounted() {
    this.gameList = this.$store.getters["gameData/GameList"];
    this.curGame = this.$store.getters["gameData/CurGame"];
  },
  methods: {
    clickMenu: function() {
      this.gameInfoListVis = true;
    },
    addGameInfo: function(info) {
      info["gameNum"] = this.curGame.gameInfoList.length + 1;
      this.curGame.gameInfoList.push(info);
      this.$store.commit("gameData/UpdateData");
      this.$root.Msg_Success("添加成功");
    },
    removeGameInfoList: function() {
      this.curGame.gameInfoList.pop();
      this.$store.commit("gameData/UpdateData");
      this.$root.Msg_Success("移除成功");
    }
  },
  watch: {
    curGame(val, old) {
      this.$store.commit("gameData/SetCurGame", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 18px;
}
.header-icon {
  font-size: 30px;
}
.removeBtn {
  float: right;
  margin-right: 10px;
}
.addBtn {
  float: right;
}
</style>
