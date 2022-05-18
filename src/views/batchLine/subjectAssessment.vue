<template>
  <div class="compareSchool">
    <menuBer />

    <div class="batchLineDiv">

      <div class="btnDiv">
        <span @click="seacherClick(0)" :class="!isActive?'check':''" class="spanBtn">按学科查询</span>
        <span @click="seacherClick(1)" :class="isActive?'check':''" class="spanBtn">按大学查询</span>
      </div>

      <div class="contentDiv">

        <div class="gradeDiv" v-show="!isActive">
          <!-- <span v-on:click="gradeBtn(0)" v-bind:class="{ check: gradeId=='' }">全部</span> -->
          <span v-for="(g,index) in gradeList" v-on:click="gradeBtn(g.code)" v-bind:class="{ check: gradeId==g.code }" :key="index">{{ g.name }}</span>
        </div>

        <div class="majorDiv" v-show="!isActive">
          <!-- <span class="majorSpan" v-on:click="majorBtn(0)" v-bind:class="{ check: majorId=='' }">全部</span> -->
          <span class="majorSpan" v-for="(g,index) in majorList" v-on:click="majorBtn(g.code)" v-bind:class="{ check: majorId==g.code }" :key="index">
            <span v-if="index>0" class="line"></span>
            {{ g.name }}
          </span>
        </div>

        <div v-show="isActive">
          <el-input
            style="width:300px;"
            @keyup.enter.native="getTableList(1,10)"
            placeholder="请输入学校名称"
            v-model="schoolName">
            <i slot="suffix" @click="getTableList(1,10)" style="cursor:pointer;" class="el-input__icon el-icon-search"></i>
          </el-input>
          <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
        </div>

        <div class="tableDiv" v-show="!isActive" style="margin-top:20px;">
          <el-table :data="tableData" :highlight-current-row='true' :header-cell-style="{'background':'#F5F5F5','font-weight': '700','color':'#333'}" border style="width: 100%;border-radius: 4px;">
            <!-- <el-table-column type="index" align="center" label="序号" width="160"></el-table-column> -->
            <el-table-column label="序号" type="index" align="center" width="160"></el-table-column>
            <el-table-column prop="schoolCode" align="center" label="学校代码" width="400"></el-table-column>
            <el-table-column prop="schoolName" align="center" label="学校名称" width="400"></el-table-column>
            <el-table-column prop="evaluationResult" align="center" label="评估结果" ></el-table-column>
          </el-table>
        </div>

        <div class="tableDiv" v-show="isActive" style="margin-top:20px;">
          <el-table :data="tableData" :highlight-current-row='true' :header-cell-style="{'background':'#F5F5F5','font-weight': '700','color':'#333'}" border style="width: 100%;border-radius: 4px;">
            <el-table-column label="序号" type="index" align="center" width="160"></el-table-column>
            <el-table-column prop="subCategory" align="center" label="学科门类" width="400"></el-table-column>
            <el-table-column prop="majorCategory" align="center" label="专业类 " width="400"></el-table-column>
            <el-table-column prop="evaluationResult" align="center" label="评估结果" ></el-table-column>
          </el-table>
        </div>

        <div class="block" v-show="tableData.length>0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[10, 20, 30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              popper-class='select_bottom'
              :total="totalSize">
            </el-pagination>
        </div>

      </div>

      

      

    </div>

  </div>
</template>

<script>
import menuBer from "@/components/menuBar";
import { getAssDefault,getAsslist,getListByPage } from "@/api/batchLineApi";


export default {
  name: "subjectAssessment",
  data() {
    return {
      isActive: 0,
      pageNum: 1,
      pageSize: 10,
      totalSize: 0,
      gradeId: '',
      gradeList: [],
      majorId: '',
      majorList: [],
      tableData: [],
      schoolName: ''
  
    };
  },
  watch: {},
  components: { menuBer },
  mounted: function () {
    this.getAssDefaultList();
    
  },
  methods: {
    majorBtn(index){
      this.majorId = index;
      this.getTableList(1,10);
    },
    gradeBtn(index){
      this.gradeId = index;
      this.majorList = [];
      this.gradeList.forEach((item) => {
        if(this.gradeId == item.name){
          let majorList = item.majorCategory.split(',')
          majorList.forEach((m,mIndex)=>{
            if(mIndex == 0){
              this.majorId = m
            }
            this.majorList.push(
              {
                code: m,
                name: m
              }
            )
          })

        }
      });

      this.getTableList(1,10);

    },
    seacherClick(index){
      this.isActive = index;
      this.getTableList(1,10);
    },
    getAssDefaultList() {
      getAssDefault({})
        .then((r) => {
          this.gradeId = r.data.subCategory;
          this.majorId = r.data.majorCategory;
          this.getMajorList();
          this.getTableList(1,10);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getMajorList(){
      getAsslist({})
      .then((r) => {
          let gradeList = r.data;
          this.gradeList = [];
          this.majorList = [];
          gradeList.forEach((item) => {
            this.gradeList.push(
              {
                code: item.subCategory,
                name: item.subCategory,
                majorCategory: item.majorCategory,
              }
            )

            if(this.gradeId == item.subCategory){
              let majorList = item.majorCategory.split(',')
              majorList.forEach((m)=>{
                this.majorList.push(
                  {
                    code: m,
                    name: m
                  }
                )

              })

            }
          });

        })
        .catch((e) => {
          console.log(e);
        });
    },
    getTableList(pageNum,pageSize){
      if(pageNum){
        this.pageNum = pageNum
      }

      if(pageSize){
        this.pageSize = pageSize
      }

      if(this.isActive==1){
        getListByPage({
          subcategory: '',
          majorCategory: '',
          schoolName: this.schoolName,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
        .then((r) => {
          if(this.schoolName){
            this.tableData = r.data.list;
            this.totalSize = r.data.totalSize; 

          }else {
            this.tableData = [];
          }
           
        })
        .catch((e) => {
          console.log(e);
        });

      }else {
        getListByPage({
          subcategory: this.gradeId,
          majorCategory: this.majorId,
          schoolName: '',
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

      }
      
    },
    handleSizeChange(data){
      this.pageSize = data;
      this.getTableList(this.pageNum,this.pageSize)
    },
    handleCurrentChange(data){
      this.pageNum = data;
      this.getTableList(this.pageNum,this.pageSize)
    },

  },
  beforeDestroy() {},
  
};
</script>

<style lang="scss" scoped>

  .batchLineDiv {
    width: 1200px;
    margin: 20px auto;
    border: 1px solid #D1D1D1;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    .btnDiv {
      width: 100%;
      background-color: #F5F5F5;
      text-align: center;
      padding: 20px 0;
      .spanBtn {
        display: inline-block;
        width: 140px;
        height: 30px;
        line-height: 30px;
        background-color: #E5E5E5;
        color: #666666;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
        margin: 0 20px;
      }
      .spanBtn.check {
        background-color: #1CB278;
        color: #fff;
      }
    }
    .contentDiv {
      width: 100%;
      padding: 20px 20px;
      box-sizing: border-box;
      .gradeDiv {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        span {
          display: inline-block;
          width: 100px;
          height: 30px;
          line-height: 30px;
          background-color: #F3F3F3;
          color: #666666;
          font-size: 14px;
          border-radius: 15px;
          cursor: pointer;
          margin-right: 10px;
          text-align: center;
        }
        span:hover {
          background-color: #1CB278;
          color: #fff;
        }
        span.check {
          background-color: #1CB278;
          color: #fff;
        }
      }
      .majorDiv {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        background-color: #F5F5F5;
        padding: 20px 10px;
        margin: 20px auto;
        .majorSpan {
          display: inline-block;
          font-size: 14px;
          color: #666666;
          line-height: 20px;
          cursor: pointer;
          margin-right:10px;
          line-height: 30px;
          span {
            display: inline-block;
            width: 1px;
            height: 14px;
            border-left: 1px solid #cecece;
            margin-right: 10px;
            position: relative;
            top: 2px;
          }
        }
        .majorSpan:hover {
          color: #1CB278;
        }
        .majorSpan.check {
          color: #1CB278;
        }

        

      }
    }
  }

</style>
