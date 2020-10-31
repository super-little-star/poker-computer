<template>
  <div class="scorecard">
    <div class="my-swithc">
      <el-switch
        v-model="lengthen"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="550px"
        inactive-value="350px"
        change="lengthenChange"
      />
    </div>
    <el-button
      :disabled="gameInfoList.length <= 0"
      type="primary"
      @click="checkOut"
      class="result-btn"
    >
      结算
    </el-button>

    <el-table
      ref="scorecard"
      :data="gameInfoList"
      border
      size="mini"
      :max-height="lengthen"
      :cell-style="cellstyle"
      :summary-method="getSummaries"
      show-summary
    >
      <el-table-column prop="gameNum" label="局" width="40px">
      </el-table-column>
      <el-table-column prop="player1" :label="players.player1">
        <template slot-scope="scope">
          {{ scope.row.player1 }}
          <el-tag
            v-if="getMultiple(scope.row.player1) > 1"
            :type="getTagColor(scope.row.player1)"
            size="mini"
          >
            x{{ getMultiple(scope.row.player1) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="player2" :label="players.player2">
        <template slot-scope="scope">
          {{ scope.row.player2 }}
          <el-tag
            v-if="getMultiple(scope.row.player2) > 1"
            :type="getTagColor(scope.row.player2)"
            size="mini"
          >
            x{{ getMultiple(scope.row.player2) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="player3" :label="players.player3">
        <template slot-scope="scope">
          {{ scope.row.player3 }}
          <el-tag
            v-if="getMultiple(scope.row.player3) > 1"
            :type="getTagColor(scope.row.player3)"
            size="mini"
          >
            x{{ getMultiple(scope.row.player3) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="player4" :label="players.player4">
        <template slot-scope="scope">
          {{ scope.row.player4 }}
          <el-tag
            v-if="getMultiple(scope.row.player4) > 1"
            :type="getTagColor(scope.row.player4)"
            size="mini"
          >
            x{{ getMultiple(scope.row.player4) }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="checkOutVis" width="100%">
      <span>{{ resultStr }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkOutVis = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    gameInfoList: {
      type: Array,
      default: () => []
    },
    players: {},
    price: { type: Number, default: 1 }
  },
  data() {
    return {
      result: [],
      resultStr: "",
      checkOutVis: false,
      lengthen: false
    };
  },
  beforeMount() {
    this.lengthen = this.$root.$store.getters["gameData/Lengthen"];
  },
  updated() {
    this.goBottom();
  },
  methods: {
    goBottom: function() {
      let wrapper = this.$refs.scorecard.bodyWrapper;
      let height = wrapper.scrollHeight;
      wrapper.scrollTop = wrapper.scrollHeight;
    },
    cellstyle: function({ row, column, rowIndex, columnIndex }) {
      if (column.property === "gameNum") return "background-color: #E4E7ED;";
      let cell = row[column.property];

      if (cell <= 0) return "background-color: #6dd13b98;";
      else return "background-color: #f56c6c8e;";
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总数";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + this.getMultiple(curr) * curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "N/A";
        }
      });
      this.result = sums;
      return sums;
    },
    getTagColor(num) {
      let m = this.getMultiple(num);
      if (m == 2) return "warning";
      if (m == 3) return "danger";
      if (m == 4) return "info";

      return "";
    },
    getMultiple(num) {
      if (num < 8) return 1;
      else if (num >= 8 && num < 10) return 2;
      else if (num >= 10 && num < 13) return 3;
      else if (num >= 13) return 4;
    },
    checkOut() {
      let r = [];

      for (let x = 1; x < this.result.length; x++) {
        r[x] = 0;
        for (let y = 1; y < this.result.length; y++) {
          r[x] += this.result[y] - this.result[x];
        }
      }

      let str = "";
      let i = 1;
      for (let key in this.players) {
        str += "[" + this.players[key] + ":" + r[i] * this.price + "]";
        i++;
      }
      this.checkOutVis = true;
      this.resultStr = str;
    },
    lengthenChange() {
      this.$root.$store.commit("gameData/SetLengthen", this.lengthen);
    }
  }
};
</script>

<style lang="scss">
.scorecard {
  padding: 10px 0px;
}
.my-swithc {
  display: flex;
  float: left;
  padding-top: 20px;
  flex-direction: column;
  padding-left: 5px;
}
.result-btn {
  float: right;
  margin-right: 5px !important;
  margin-bottom: 5px !important;
}
</style>
