<template>
  <div class="compareSchool">
    <menuBer />

    <div class="batchLineDiv">
      <div class="moduleTitle">
        <span></span>
        我的成绩
      </div>

      <div class="userDetail">
        <div class="detailDiv">
          省份：<span>{{ province }}</span>
        </div>

        <div class="detailDiv">
          科类：<span>{{ subject }}</span>
        </div>

        <div class="detailDiv">
          分数：<span>{{ score }}</span>
        </div>

        <div class="detailDiv">
          排名：<span>{{ rank }}</span>
        </div>
      </div>

      <div class="warnDiv">
        <img src="./warning.png" alt="" />
        <span
          >位次信息根据往年高考数据计算得出，可能与当前年度数据存在差异，查询结果仅供参考。</span
        >
      </div>

      <div class="btnDiv">
        <span
          @click="seacherClick(0)"
          :class="!isActive ? 'check' : ''"
          class="spanBtn"
          >历年同分位次</span
        >
        <span
          @click="seacherClick(1)"
          :class="isActive ? 'check' : ''"
          class="spanBtn"
          >历年同位分</span
        >
      </div>

      <div class="chartDiv">
        <div id="myChart" :style="{ 'min-height': '400px' }"></div>
      </div>

      <div class="moduleTitle" style="margin: 20px auto">
        <span></span> 分段表
      </div>

      <div class="selectDiv">
        <el-select
          style="width: 100px; margin-right: 20px"
          v-model="provinceId"
          @change="provinceChange"
          placeholder="省份"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select
          style="width: 100px; margin-right: 20px"
          v-model="yearId"
          @change="yearSelect"
          placeholder="年份"
        >
          <el-option
            v-for="item in yearList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select
          style="width: 150px"
          v-model="subjectId"
          @change="subjectSelect"
          placeholder="学科类"
        >
          <el-option
            v-for="item in subjectList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="tableDiv" style="margin-top: 20px">
        <el-table
          :data="tableData"
          :highlight-current-row="true"
          :header-cell-style="{
            background: '#F5F5F5',
            'font-weight': '700',
            color: '#333',
          }"
          style="width: 100%; border-radius: 4px"
        >
          <el-table-column
            prop="scoreParagraph"
            align="center"
            label="总分"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="countParagraph"
            align="center"
            label="人数"
            width="500"
          ></el-table-column>
          <el-table-column
            prop="sumParagraph"
            align="center"
            label="累计人数（排位）"
          ></el-table-column>
        </el-table>
      </div>

      <div class="block" v-show="tableData.length > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="pageSize"
          popper-class="select_bottom"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import menuBer from "@/components/menuBar";
import { MessageBox } from "element-ui";
import {
  getAllList,
  getScoreDefault,
  getStatisticsList,
  getlistByPage,
} from "@/api/batchLineApi";

export default {
  name: "batchLine",
  data() {
    return {
      stuId: "",
      provinceNo: "",
      examineeType: "",
      province: "",
      subject: "",
      score: "",
      rank: "",
      isActive: 0,
      myChart: null,
      myChartData: [],
      examineeTypeCode: "",
      yearId: "",
      yearList: [],
      provinceId: "",
      provinceList: [],
      subjectId: "",
      subjectList: [],
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalSize: 0,
    };
  },
  watch: {},
  components: { menuBer },
  mounted: function () {
    let infor = JSON.parse(sessionStorage.getItem("studentInfor"));
    if (!infor) {
      //通过MessageBox.close(); 关闭   在销毁生命周期里
      MessageBox.alert("请先登录", "提示", {
        confirmButtonText: "确定",
        callback: () => {
          this.$router.push("/");
        },
      });
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    } else {
      this.provinceNo = infor.provinceId;
      this.examineeType = infor.examineeType;

      this.province = infor.province;
      if(infor.examineeType==1){
        this.subject = '物理';
      }
      if(infor.examineeType==2){
        this.subject = '历史';
      }
      if(infor.examineeType==3){
        this.subject = '文科';
      }
      if(infor.examineeType==4){
        this.subject = '理科';
      }
      if(infor.examineeType==5){
        this.subject = '综合';
      }

      this.score = infor.score;
      this.rank = infor.ranking;


      if (!this.score || !this.rank) {
        //通过MessageBox.close(); 关闭   在销毁生命周期里
        MessageBox.alert("请先完善信息", "提示", {
          confirmButtonText: "确定",
          callback: () => {},
        });
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      }else {
        this.getScoreChart();
        this.getDefault();

      }

      
    }
  },
  methods: {
    seacherClick(index) {
      this.isActive = index;
      if (index) {
        this.getRankChart();
      } else {
        this.getScoreChart();
      }
    },
    getScoreChart() {
      getStatisticsList({
        provinceNo: this.provinceNo,
        examineeTypeCode: this.examineeType,
        score: this.score,
      })
        .then((r) => {
          if(r.code !=200){
            MessageBox.alert("网络异常", "提示", {
              confirmButtonText: "确定",
              callback: () => {},
            });

            let sumList = [];
            let yearList = [];
            this.myChart = this.$echarts.init(document.getElementById("myChart"));
            this.myChart.setOption({
              tooltip: {
                trigger: "axis",
              },
              grid: {
                top: "30",
                left: "3%",
                right: "4%",
                bottom: "0",
                containLabel: true,
              },
              xAxis: {
                type: "category",
                splitLine: {
                  show: false,
                  lineStyle: {
                    type: "dashed",
                  },
                },
                data: yearList,
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#5EBB49",
                    width: "1",
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: "#666666", //坐标值得具体的颜色
                  },
                },
              },
              yAxis: {
                type: "value",
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: "dashed",
                  },
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#fff",
                    width: "1",
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: "#666666",
                  },
                },
              },
              label: {
                show: true,
                position: "top",
              },
              series: [
                {
                  data: sumList,
                  type: "line",
                  color: "#5EBB49",
                  showSymbol: true,
                  symbolSize: 10, //设定实心点的大小
                  animation: true,
                },
              ],
            });



          }


          let batchData = r.data;
          if (batchData.length == 0) {
            return false;
          }

          let sumList = [];
          let yearList = [];

          batchData.forEach((item) => {
            sumList.push(item.sumParagraph);
            yearList.push(item.year);
          });

          this.myChart = this.$echarts.init(document.getElementById("myChart"));
          this.myChart.setOption({
            tooltip: {
              trigger: "axis",
            },
            grid: {
              top: "30",
              left: "3%",
              right: "4%",
              bottom: "0",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              splitLine: {
                show: false,
                lineStyle: {
                  type: "dashed",
                },
              },
              data: yearList,
              axisLine: {
                lineStyle: {
                  type: "solid",
                  color: "#5EBB49",
                  width: "1",
                },
              },
              axisLabel: {
                textStyle: {
                  color: "#666666", //坐标值得具体的颜色
                },
              },
            },
            yAxis: {
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
              axisLine: {
                lineStyle: {
                  type: "solid",
                  color: "#fff",
                  width: "1",
                },
              },
              axisLabel: {
                textStyle: {
                  color: "#666666",
                },
              },
            },
            label: {
              show: true,
              position: "top",
            },
            series: [
              {
                data: sumList,
                type: "line",
                color: "#5EBB49",
                showSymbol: true,
                // symbol: "circle", //设定为实心点
                symbolSize: 10, //设定实心点的大小
                animation: true,
                // markPoint: {
                //   data: [
                //     { type: "max", name: "Max" },
                //     { type: "min", name: "Min" },
                //   ],
                // },
              },
            ],
          });


        })
        .catch((e) => {
          console.log(e);
        });
    },
    getRankChart() {
      getStatisticsList({
        provinceNo: this.provinceNo,
        examineeTypeCode: this.examineeType,
        ranking: this.rank,
      })
        .then((r) => {
          if(r.code !=200){
            MessageBox.alert("网络异常", "提示", {
              confirmButtonText: "确定",
              callback: () => {},
            });

            let scoreList = [];
            let yearList = [];

            this.myChart = this.$echarts.init(document.getElementById("myChart"));
            this.myChart.setOption({
              tooltip: {
                trigger: "axis",
              },
              grid: {
                top: "30",
                left: "3%",
                right: "4%",
                bottom: "0",
                containLabel: true,
              },
              xAxis: {
                type: "category",
                splitLine: {
                  show: false,
                  lineStyle: {
                    type: "dashed",
                  },
                },
                data: yearList,
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#5EBB49",
                    width: "1",
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: "#666666", //坐标值得具体的颜色
                  },
                },
              },
              yAxis: {
                type: "value",
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: "dashed",
                  },
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#fff",
                    width: "1",
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: "#666666",
                  },
                },
              },
              label: {
                show: true,
                position: "top",
              },
              series: [
                {
                  data: scoreList,
                  type: "line",
                  color: "#5EBB49",
                  showSymbol: true,
                  // symbol: "circle", //设定为实心点
                  symbolSize: 10, //设定实心点的大小
                  animation: true,
                  // markPoint: {
                  //   data: [
                  //     { type: "max", name: "Max" },
                  //     { type: "min", name: "Min" },
                  //   ],
                  // },
                },
              ],
            });




          }      
          
          
          let batchData = r.data;
          if (batchData.length == 0) {
            return false;
          }

          let scoreList = [];
          let yearList = [];

          batchData.forEach((item) => {
            scoreList.push(item.scoreParagraph);
            yearList.push(item.year);
          });

          this.myChart = this.$echarts.init(document.getElementById("myChart"));
          this.myChart.setOption({
            tooltip: {
              trigger: "axis",
            },
            grid: {
              top: "30",
              left: "3%",
              right: "4%",
              bottom: "0",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              splitLine: {
                show: false,
                lineStyle: {
                  type: "dashed",
                },
              },
              data: yearList,
              axisLine: {
                lineStyle: {
                  type: "solid",
                  color: "#5EBB49",
                  width: "1",
                },
              },
              axisLabel: {
                textStyle: {
                  color: "#666666", //坐标值得具体的颜色
                },
              },
            },
            yAxis: {
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
              axisLine: {
                lineStyle: {
                  type: "solid",
                  color: "#fff",
                  width: "1",
                },
              },
              axisLabel: {
                textStyle: {
                  color: "#666666",
                },
              },
            },
            label: {
              show: true,
              position: "top",
            },
            series: [
              {
                data: scoreList,
                type: "line",
                color: "#5EBB49",
                showSymbol: true,
                // symbol: "circle", //设定为实心点
                symbolSize: 10, //设定实心点的大小
                animation: true,
                // markPoint: {
                //   data: [
                //     { type: "max", name: "Max" },
                //     { type: "min", name: "Min" },
                //   ],
                // },
              },
            ],
          });


        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDefault() {
      getScoreDefault({
        provinceNo: this.provinceNo,
        examineeTypeCode: this.examineeType,
      })
        .then((r) => {
          this.provinceId = r.data.provinceNo;
          this.yearId = r.data.year;
          this.subjectId = r.data.examineeTypeCode;
          this.getProvinceList();
          this.getFdList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getProvinceList() {
      getAllList()
        .then((r) => {
          let provinceList = r.data;
          provinceList.forEach((item) => {
            this.provinceList.push({
              label: item.province,
              value: item.provinceNo,
              childrensList: item.childrensList,
            });

            if (this.provinceId == item.provinceNo) {
              let yearList = item.childrensList;
              yearList.forEach((yItem) => {
                this.yearList.push({
                  label: yItem.year,
                  value: yItem.year,
                  childrensList: yItem.childrensList,
                });

                if (this.yearId == yItem.year) {
                  let examineeList = yItem.childrensList;
                  examineeList.forEach((eItem) => {
                    this.subjectList.push({
                      label: eItem.examineeType,
                      value: eItem.examineeTypeCode,
                    });
                  });
                }
              });
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    provinceChange() {
      this.yearId = "";
      this.subjectId = "";
      this.yearList = [];
      this.subjectList = [];
      this.provinceList.forEach((item) => {
        if (this.provinceId == item.value) {
          let yearList = item.childrensList;
          this.yearId = yearList[0].year;
          yearList.forEach((yItem) => {
            this.yearList.push({
              label: yItem.year,
              value: yItem.year,
            });

            if (this.yearId == yItem.year) {
              let examineeList = yItem.childrensList;
              this.subjectId = examineeList[0].examineeTypeCode;
              examineeList.forEach((eItem) => {
                this.subjectList.push({
                  label: eItem.examineeType,
                  value: eItem.examineeTypeCode,
                });
              });
            }
          });
        }
      });

      this.getFdList(1,10);
    },
    yearSelect() {
      this.subjectId = "";
      this.subjectList = [];
      this.provinceList.forEach((item) => {
        if (this.provinceId == item.value) {
          let yearList = item.childrensList;
          yearList.forEach((yItem) => {
            if (this.yearId == yItem.year) {
              let examineeList = yItem.childrensList;
              this.subjectId = examineeList[0].examineeTypeCode;
              examineeList.forEach((eItem) => {
                this.subjectList.push({
                  label: eItem.examineeType,
                  value: eItem.examineeTypeCode,
                });
              });
            }
          });
        }
      });

      this.getFdList(1,10);
    },
    subjectSelect() {
      this.getFdList(1,10);
    },
    getFdList(pageNum,pageSize) {
      if(pageNum){
        this.pageNum = pageNum
      }

      if(pageSize){
        this.pageSize = pageSize
      }

      getlistByPage({
        provinceNo: this.provinceId,
        examineeTypeCode: this.subjectId,
        year: this.yearId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
        .then((r) => {
          this.tableData = r.data.list;
          this.totalSize = r.data.totalSize;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.getFdList(this.pageNum,this.pageSize);
    },
    handleCurrentChange(data) {
      this.pageNum = data;
      this.getFdList(this.pageNum,this.pageSize);
    },
  },
  beforeDestroy() {
    MessageBox.close();
  },
};
</script>

<style lang="scss" scoped>
.batchLineDiv {
  width: 1200px;
  margin: 20px auto;
  padding: 20px 20px;
  background-color: #fff;
  .userDetail {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #f5f5f5;
    padding: 10px 20px;
    .detailDiv {
      line-height: 40px;
      font-size: 14px;
      color: #666;
      margin-right: 30px;
      span {
        font-size: 16px;
        color: #333;
        font-weight: 700;
      }
    }
  }
  .warnDiv {
    width: 100%;
    color: #999;
    font-size: 12px;
    line-height: 22px;
    img {
      width: 12px;
      vertical-align: middle;
      margin-right: 5px;
      position: relative;
      top: -1px;
    }
  }
  .btnDiv {
    width: 100%;
    background-color: #f5f5f5;
    text-align: center;
    margin: 20px auto;
    padding: 20px 0;
    .spanBtn {
      display: inline-block;
      width: 140px;
      height: 30px;
      line-height: 30px;
      background-color: #e5e5e5;
      color: #666666;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      margin: 0 20px;
    }
    .spanBtn.check {
      background-color: #1cb278;
      color: #fff;
    }
  }
  // background-color: #fff;
  .seacherBtn {
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #ff7777;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .moduleTitle {
    display: flex;
    font-size: 20px;
    span {
      display: inline-block;
      width: 5px;
      height: 20px;
      background: #1cb278;
      border-radius: 3px;
      margin-right: 10px;
    }
  }
}
.chartDiv {
  background-color: #fff;
  margin: 20px auto;
}
</style>
