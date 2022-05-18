<template>
  <div class="homePage">
    <menuBer />
    <div style="margin: 26px 0;">
      <searchBar 
          :placeholder="'搜索你感兴趣的大学'"
          @searchText="searchTextFun"
          @searchFun="searchFun"
          :clearSearchText="clearSearchText"
      />
    </div>
    <div v-show="searchState">
      <schoolCondition 
          :clearState="clearState"
          @schoolCondition="schoolConditionFun"
      />
    </div>
    <div style="margin-top: 40px;">
      <searchTable 
          :tableData="schoolTableData"
          @checkedList="checkedDataFun"
          :delCompareData="delCompareData"
          :total="totalSize"
      />
    </div>
    <div class="block"  v-show="totalSize > 0">
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
    <div v-show="checkedData.length > 0">
        <compareColumn 
            :checkedData="checkedData"
            @delCompareList="delCompareFun"
            :key="compareKey"
        />
    </div>
  </div>
</template>

<script>
import menuBer from '@/components/menuBar'
import searchBar from '@/components/searchBar'
import schoolCondition from '@/components/schoolCondition'
import searchTable from '@/components/searchTable'
import compareColumn from '@/components/compareColumn'

import { getSchoolTable } from "@/api/schoolApi";



export default {
  name: 'channel',
  data() {
    return {
      searchText:'',
      clearState:false,
      clearSearchText: false,
      schoolTableData: {},
      pageNum: 1,
      pageSize: 10,
      totalSize: 0,
      educationCode: '',
      gradeCode: '',
      provinceCode: '',
      typeCode: '',
      checkedData:[],
      delCompareData: [],
      compareKey:Math.random(),
      loginState: false,
      searchState: true
    }
  },
  watch: {},
  components: {menuBer,searchBar,schoolCondition,searchTable,compareColumn},
  methods: {
      delCompareFun(data){
          this.delCompareData = data
      },
      checkedDataFun(data){
          this.checkedData = data;
          if(this.checkedData.length === 0){
            this.compareKey = Math.random()
          }
      },
      searchTextFun(data){
          return
          this.clearState = true;
          this.searchText = data;
          this.educationCode = '';
          this.gradeCode = '';
          this.provinceCode = '';
          this.typeCode = '';
          this.getSchoolTableList()
      },
      searchFun(data){
          this.clearState = true;
          this.searchText = data;
          this.educationCode = '';
          this.gradeCode = '';
          this.provinceCode = '';
          this.typeCode = '';
          this.searchState = false;
          this.getSchoolTableList()
      },
      schoolConditionFun(data){
          this.educationCode = data.educationCode;
          this.gradeCode = data.gradeCode;
          this.provinceCode = data.provinceCode;
          this.typeCode = data.typeCode;
          this.searchText = '';
          this.clearSearchText = true;
          this.getSchoolTableList()
      },
      getSchoolTableList(){
        getSchoolTable({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            collegeName: this.searchText,
            areaNo: this.provinceCode,
            collegeType: this.typeCode,
            collegeFlag: this.gradeCode,
            educationLevel: this.educationCode
        }).then(r => {
            this.schoolTableData = r.data;
            this.totalSize = r.data.totalSize;
        }).catch((e) => {
            console.log(e)
        });
      },
      handleSizeChange(data){
        this.pageSize = data;
        this.getSchoolTableList()
      },
      handleCurrentChange(data){
        this.pageNum = data;
        this.getSchoolTableList()
      }
  },
  beforeDestroy(){
      
  },
  mounted: function() {
        this.getSchoolTableList()
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
.homePage{
  // height: 100%;
  background: #fff;
  position: relative;
}
</style>
