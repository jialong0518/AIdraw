<template>
  <div class="compareSchool">
    <menuBer />

    <div class="schoolDiv">

      <div class="schoolLeft">

        <div class="moduleTitle">
            <span></span>
            学校排行榜
        </div>

        <div class="leftTable">

          <div class="tableBtn" @click="tableClick(index)" :class="tIndex==index ? 'check' : '' " v-for="(t,index) in leftTable" :key="index">
            <div class="tableName" v-if="index!=leftTable.length-1">{{ t.name }}</div>
            <div class="tableName" v-if="index==leftTable.length-1" style="border: 0 none;">{{ t.name }}</div>
          </div>

        </div>

      </div>

      <div class="schoolRight">

        <div class="rightHeaderDiv">
          <div class="bigWord">{{ topWord }}</div>
          <div class="smallWord">{{ bottomWord }}</div>
        </div>

        <div class="schoolList">
          <span class="w8">序号</span>
          <span class="w20">学校名称</span>
          <span class="w15">类型</span>
          <span class="w15">所在地</span>
          <span class="w20">学校特色</span>
          <span class="w15">世界排名</span>
        </div>

        <div class="jsonDiv" v-for="(s,index) in schoolList" :key="index">

          <div class="schoolList whiteList" v-if="index==schoolList.length-1" style="border:0 none;">
            <span class="w8">
              <span class="colorWord">{{ index + 1}}</span>
            </span>
            <span class="w20 wordEll" style="color:#1CB278" :title="s.collegeName">{{ s.collegeName }}</span>
            <span class="w15">{{ s.institutionType }}</span>
            <span class="w15">{{ s.province }}</span>
            <span class="w20">
              <span v-if="s.doubleFirst==1">双一流，</span>
              <span v-if="s.nineEightyFive==1">985，</span>
              <span v-if="s.twoEleven==1">211，</span>
              <span v-if="s.strongBasicPlan==1">强基</span>
            </span>
            <span class="w15">{{ s.worldRanking }}</span>
          </div>

          <div class="schoolList whiteList" v-if="index!=schoolList.length-1">
            <span class="w8">
              <span class="colorWord">{{ index + 1}}</span>
            </span>
            <span class="w20 wordEll" style="color:#1CB278" :title="s.collegeName">{{ s.collegeName }}</span>
            <span class="w15">{{ s.institutionType }}</span>
            <span class="w15">{{ s.province }}</span>
            <span class="w20">
              <span v-if="s.doubleFirst==1">双一流，</span>
              <span v-if="s.nineEightyFive==1">985，</span>
              <span v-if="s.twoEleven==1">211，</span>
              <span v-if="s.strongBasicPlan==1">强基</span>
            </span>
            <span class="w15">{{ s.worldRanking }}</span>
          </div>

        </div>

        <div class="block" v-show="schoolList.length>0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[10, 20, 30]"
              :page-size="pageSize"
              popper-class='select_bottom'
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalSize">
            </el-pagination>
        </div>

        

      </div>
      

    </div>

    

  </div>
</template>

<script>
import menuBer from "@/components/menuBar";
import { getRankingList } from "@/api/batchLineApi";

export default {
  name: "collegeExpert",
  data() {
    return {
      tIndex: 0,
      topWord: '',
      bottomWord: '',
      pageNum: 1,
      pageSize: 10,
      totalSize: 0,
      leftTable:[
        {
          name:'中国校友会大学排名榜'
        },
        {
          name:'软科大学排名榜'
        },
        {
          name:'QS内地大学排行榜'
        },
        {
          name:'泰晤士大学排名榜'
        },
        {
          name:'USNews内地大学排行榜'
        },
      ],
      schoolList: [],
      wordList: [
        {
          topWord:'中国校友会大学排名榜',
          bottomWord:'中国校友会大学排行榜从人才培养、科学研究及社会影响三个指标计算所得。是中国较具影响力和公信力的大学排行榜品牌',
        },
        {
          topWord:'软科大学排名榜',
          bottomWord:'软科中国大学排名依托软科自主研发的高等教育评价专利技术和“大学360度数据监测平台”的数据支持，设置十个评价模块，细分30个评价维度，使用百余项评价指标，涉及数百个评价变量。软科中国大学排名的导向是反映当前中国高校的核心使命，回应外部群体对大学的价值期待，高度重视人才培养、突出强调服务国家是软科排名指标体系的两个最重要特点。',
        },
        {
          topWord:'QS内地大学排行榜',
          bottomWord:'QS世界大学综合排名采用学术领域的同行评价、全球雇主评价、单位教职的论文引用数、教师/学生比例、国际学生比例、国际教师比例六项指标计算得出。',
        },
        {
          topWord:'泰晤士大学排名榜',
          bottomWord:'泰晤士大学排名榜，以教学、研究、知识转化、国际视野等多项指标衡量大学综合实力，被认为是最具影响力的世界大学排名之一，颇受全球高教界关注。',
        },
        {
          topWord:'USNews内地大学排行榜',
          bottomWord:'U.S.News，具有一定影响力的全球性大学排名，是公认的四大较为权威的世界大学排名，根据大学的全球和区域口碑、文献指标、师资等数据得出。',
        }
      ],
      subWord: ['校友会','软科','QS','泰晤士','U.S.News']
    };
  },
  watch: {},
  components: { menuBer },
  mounted: function () {
    this.topWord = this.wordList[0].topWord;
    this.bottomWord = this.wordList[0].bottomWord;
    this.getSchoolLeagueList();
  },
  methods: {
    tableClick(index){
      this.tIndex = index;
      this.topWord = this.wordList[index].topWord;
      this.bottomWord = this.wordList[index].bottomWord;
      this.getSchoolLeagueList();
    },
    getSchoolLeagueList() {
      getRankingList({
        type: this.subWord[this.tIndex],
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
        .then((r) => {
          this.schoolList = r.data.list;
          this.totalSize = r.data.totalSize; 
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handleSizeChange(data){
      this.pageSize = data;
      this.getSchoolLeagueList()
    },
    handleCurrentChange(data){
      this.pageNum = data;
      this.getSchoolLeagueList()
    },


  },
  beforeDestroy() {},
  
};
</script>

<style lang="scss" scoped>
  .wordEll{
    text-overflow:ellipsis;
    white-space:nowrap; 
    overflow:hidden; 
  }
  .schoolDiv {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    .schoolLeft {
      width: 200px;
      flex-shrink: 0;
      margin-right: 20px;
      .moduleTitle {
          display: flex;
          font-size: 20px;
          span {
              display: inline-block;
              width: 5px;
              height: 20px;
              background: #1CB278;
              border-radius: 3px;
              margin-right:10px;
          }
      }
      .leftTable {
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #D1D1D1;
        border-radius: 4px;
        margin-top: 20px;
        .tableBtn {
          line-height: 60px;
          font-size: 14px;
          color: #333;
          text-align: center;
          cursor: pointer;
          padding: 0 10px;
          box-sizing: border-box;
          .tableName {
            border-bottom:1px solid #cecece;
          }
        }
        .tableBtn:hover {
          background-color: #1CB278;
          color: #fff;
          .tableName {
            border: 0 none;
          }
        }
        .tableBtn.check {
          background-color: #1CB278;
          color: #fff;
          .tableName {
            border: 0 none;
          }
        }
      }

    }
    .schoolRight {
      width: 100%;
      flex-shrink: 1;
      .rightHeaderDiv {
        width: 100%;
        padding: 30px 20px;
        text-align: center;
        color: #fff;
        background: url('./bjt.png') center no-repeat;
        background-size: 100% 100%;
        margin-bottom: 40px;
        .bigWord {
          font-size: 18px;
          font-weight: 700;
          margin-bottom:20px
        }
        .smallWord {
          font-size: 12px;
          line-height: 20px;
        }

      }
      .schoolList {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        span {
          display: inline-block;
          text-align: center;
          color: #999999;
          font-size: 13px;
          height: 40px;
          line-height: 40px;
          .colorWord {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 4px;
            overflow: hidden;
            background-color: #FF7777;
            color: #fff;
            line-height: 20px;
            position: relative;
            top: 4px;
          }
        }
        .w8 {
          width: 8%;
        }
        .w20 {
          width: 20%;
          text-align: left;
          margin-right:10px;
        }
        .w15 {
          width: 15%;
        }

      }
      .whiteList {
        background-color: #fff;
        border-bottom: 1px dashed #cecece;
        span {
          color: #333;
        }
      }

    }
    
  }




</style>
