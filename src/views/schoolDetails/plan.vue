<template>
  <div class="historyScore">
    <div class="moduleTitle">
        <span></span>
        招生计划
    </div>
    <div class="moduleDiv">
        <div class="searchBar">
            <div>
                <el-select style="width:130px" @change="regionSelect"  v-model="regionId" placeholder="地区">
                    <el-option
                    v-for="item in regionList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-select style="width:130px" @change="yearSelect"  v-model="yearId" placeholder="年份">
                    <el-option
                    v-for="item in yearList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-select style="width:130px" @change="courseTypeSelect"  v-model="courseTypeId" placeholder="分类">
                    <el-option
                    v-for="item in courseTypeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-select style="width:130px" @change="educationTypeSelect"  v-model="educationTypeId" placeholder="学历">
                    <el-option
                    v-for="item in educationTypeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </div>
        </div>
        <el-table
            :data="historyScoreList"
            border
            style="width: 100%;margin-top:15px;">
            <el-table-column
            prop="majorName"
            align="center"
            label="专业名称">
            </el-table-column>
            <el-table-column
            prop="entryType"
            align="center"
            width="100"
            label="招生类型">
            </el-table-column>
            <el-table-column
            prop="subRequire"
            align="center"
            width="100"
            label="科目要求">
            </el-table-column>
            <el-table-column
            prop="studyLongTime"
            align="center"
            width="80"
            label="学制">
            </el-table-column>
            <el-table-column
            prop="entryCount"
            align="center"
            width="80"
            label="招生人数">
            </el-table-column>
            <el-table-column
            prop="tuitionFee"
            align="center"
            width="100"
            label="学费">
            </el-table-column>
        </el-table>
        <div class="block" v-show="totalSize > 0">
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
</template>

<script>

import { getSchoolTable } from "@/api/schoolApi";
import { getRegionPlan, getYearPlan, getCourseTypePlan, getEducationTypePlan, getPlanlist } from "@/api/schoolDetailsApi";


export default {
  name: 'historyScore',
  props: {
    schoolId: {
        type: String,
        default: ''
    }
  },
  data() {
    return {
        value: null,
        regionList: [],
        id:'',
        regionId:'',
        yearList: [],
        yearId:'',
        courseTypeList:[],
        courseTypeId: '',
        educationTypeList:[],
        educationTypeId: '',
        historyScoreList:[],
        pageNum: 1,
        pageSize: 10,
        totalSize: 0,
    }
  },
  watch: {
      schoolId: {
        handler: function (val, oldVal) { 
            if(val === '') return
            this.id = val
            this.getRegionData()
        },
        immediate: true,
        deep: true
      },
  },
  components: {},
  methods: {
    regionSelect(item){
        this.regionId = item
        this.getYearData()
    },
    yearSelect(item){
        this.yearId = item
        this.getCourseTypeData()
    },
    courseTypeSelect(item){
        this.courseTypeId = item
        this.getEducationTypeData()
    },
    educationTypeSelect(item){
        this.educationTypeId = item
        this.getHistoryScoreData()
    },
    getRegionData() {
        getRegionPlan({
            collegeId: this.id,
        }).then(r => {
            this.regionList = r.data;
            this.regionId = r.data[0].code;
            this.getYearData()
        }).catch((e) => {
            console.log(e)
        });    
    },
    getYearData() {
       getYearPlan({
            collegeId: this.id,
            areaNo: this.regionId,
       }).then(r => {
            this.yearList = r.data;
            this.yearId = r.data[0].code;
            this.getCourseTypeData()
       }).catch((e) => {
            console.log(e)
       }); 
    },
    getCourseTypeData() {
       getCourseTypePlan({
            collegeId: this.id,
            areaNo: this.regionId,
            year: this.yearId
       }).then(r => {
            this.courseTypeList = r.data;
            this.courseTypeId = r.data[0].code;
            this.getEducationTypeData()
       }).catch((e) => {
            console.log(e)
       }); 
    },
    getEducationTypeData() {
       getEducationTypePlan({
            collegeId: this.id,
            areaNo: this.regionId,
            year: this.yearId,
            examineeType: this.courseTypeId
       }).then(r => {
            this.educationTypeList = r.data;
            this.educationTypeId = r.data[0].code;
            this.getHistoryScoreData()
       }).catch((e) => {
            console.log(e)
       }); 
    },
    getHistoryScoreData() {
       getPlanlist({
            collegeId: this.id,
            areaNo: this.regionId,
            year: this.yearId,
            entryType: this.courseTypeId,
            entryBatch: this.educationTypeId,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
       }).then(r => {
            this.historyScoreList = r.data.list;
            this.totalSize = r.data.totalSize;
       }).catch((e) => {
            console.log(e)
       }); 
    },
    handleSizeChange(data){
        this.pageSize = data;
        this.getHistoryScoreData()
    },
    handleCurrentChange(data){
        this.pageNum = data;
        this.getHistoryScoreData()
    }
  },
  beforeDestroy(){
      
  },
  mounted: function() {
      
  }
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
::v-deep .el-table__header tr th {
    background: #F5F5F5;
    color: #666;
}
.historyScore{
  background: #F3F5F7;
  .block {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 60px;
      padding-bottom: 60px;
  }
  .moduleTitle {
      display: flex;
      font-size: 20px;
      align-items: center;
    //   text-indent: 13px;
      margin-bottom: 27px;
      margin-top: 20px;
      span {
          display: inline-block;
          width: 5px;
          height: 20px;
          margin-right: 13px;
          background: #1CB278;
          border-radius: 3px;
      }
  }
  .moduleDiv {
      background: #fff;
      padding: 40px;
      border-radius: 6px;
      margin-bottom:50px;
      .searchBar {
          display: flex;
          justify-content: flex-end;
          >div {
              margin-left: 12px;
          }
      }
  }
}
</style>
