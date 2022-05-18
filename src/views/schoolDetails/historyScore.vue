<template>
  <div class="historyScore">
    <div class="moduleTitle">
      <span></span>
      历年录取分数线
    </div>
    <div class="moduleDiv">
      <div class="searchBar">
        <div>
          <el-select
            style="width: 130px"
            @change="regionSelect"
            v-model="regionId"
            placeholder="地区"
          >
            <el-option
              v-for="item in regionList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select
            style="width: 130px"
            @change="yearSelect"
            v-model="yearId"
            placeholder="年份"
          >
            <el-option
              v-for="item in yearList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select
            style="width: 130px"
            @change="courseTypeSelect"
            v-model="courseTypeId"
            placeholder="分类"
          >
            <el-option
              v-for="item in courseTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select
            style="width: 130px"
            @change="educationTypeSelect"
            v-model="educationTypeId"
            placeholder="学历"
          >
            <el-option
              v-for="item in educationTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <el-table
        :data="historyScoreList"
        border
        style="width: 100%; margin-top: 15px"
      >
        <el-table-column prop="year" align="center" label="年份" width="80">
        </el-table-column>
        <el-table-column
          prop="entryBatch"
          align="center"
          label="录取批次"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="examineeType" align="center" label="考生类别">
        </el-table-column>
        <el-table-column align="center" label="最低分/最低位次">
          <template slot-scope="scope">
            <div>{{ scope.row.minScore + "/" + scope.row.minPlace }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="avgScore"
          align="center"
          width="80"
          label="平均分"
        >
        </el-table-column>
        <el-table-column
          prop="provinceScore"
          align="center"
          width="80"
          label="省控线"
        >
        </el-table-column>
        <el-table-column
          prop="majorGroup"
          align="center"
          width="100"
          label="专业组"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="moduleTitle">
      <span></span>
      专业录取分数线
    </div>
    <div class="moduleDiv">
      <div class="searchBar">
        <div>
          <el-select
            style="width: 130px"
            @change="regionSelect_major"
            v-model="regionId_major"
            placeholder="地区"
          >
            <el-option
              v-for="item in regionList_major"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select
            style="width: 130px"
            @change="yearSelect_major"
            v-model="yearId_major"
            placeholder="年份"
          >
            <el-option
              v-for="item in yearList_major"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select
            style="width: 130px"
            @change="courseTypeSelect_major"
            v-model="courseTypeId_major"
            placeholder="分类"
          >
            <el-option
              v-for="item in courseTypeList_major"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select
            style="width: 130px"
            @change="educationTypeSelect_major"
            v-model="educationTypeId_major"
            placeholder="学历"
          >
            <el-option
              v-for="item in educationTypeList_major"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <el-table
        :data="historyScoreList_major"
        border
        style="width: 100%; margin-top: 15px"
      >
        <el-table-column prop="majorName" align="center" label="专业名称">
        </el-table-column>
        <el-table-column
          prop="entryBatch"
          align="center"
          label="录取批次"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="avgScore"
          align="center"
          width="80"
          label="平均分"
        >
        </el-table-column>
        <el-table-column align="center" width="200" label="最低分/最低位次">
          <template slot-scope="scope">
            <div>{{ scope.row.minScore + "/" + scope.row.minPlace }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="selectAsk"
          align="center"
          width="80"
          label="选科要求"
        >
        </el-table-column>
        <div slot="empty">
          <vipTips :code="historyScorecode"/>
        </div>
      </el-table>
      <div class="block" v-show="totalSize > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30]"
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
import { getSchoolTable } from "@/api/schoolApi";
import {
  getRegion,
  getYear,
  getCourseType,
  getEducationType,
  getHistoryScore,
  getMajorScore,
  getRegionMajor,
  getYearMajor,
  getCourseTypeMajor,
  getEducationTypeMajor,
} from "@/api/schoolDetailsApi";
import vipTips from "@/components/vipTips";

export default {
  name: "historyScore",
  props: {
    schoolId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: null,
      regionList: [],
      id: "",
      regionId: "",
      yearList: [],
      yearId: "",
      courseTypeList: [],
      courseTypeId: "",
      educationTypeList: [],
      educationTypeId: "",
      historyScoreList: [],
      pageNum: 1,
      pageSize: 10,
      totalSize: 0,

      regionList_major: [],
      regionId_major: "",
      yearList_major: [],
      yearId_major: "",
      courseTypeList_major: [],
      courseTypeId_major: "",
      educationTypeList_major: [],
      educationTypeId_major: "",
      historyScoreList_major: [],
      historyScorecode: 0,
    };
  },
  watch: {
    schoolId: {
      handler: function (val, oldVal) {
        if (val === "") return;
        this.id = val;
        this.getRegionData();
        this.getRegionData_major();
      },
      immediate: true,
      deep: true,
    },
  },
  components: { vipTips },
  methods: {
    regionSelect(item) {
      this.regionId = item;
      this.getYearData();
    },
    yearSelect(item) {
      this.yearId = item;
      this.getCourseTypeData();
    },
    courseTypeSelect(item) {
      this.courseTypeId = item;
      this.getEducationTypeData();
    },
    educationTypeSelect(item) {
      this.educationTypeId = item;
      this.getHistoryScoreData()
    },
    getRegionData() {
      getRegion({
        collegeId: this.id,
      })
        .then((r) => {
          this.regionList = r.data;
          this.regionId = r.data[0].code;
          this.getYearData();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getYearData() {
      getYear({
        collegeId: this.id,
        areaNo: this.regionId,
      })
        .then((r) => {
          this.yearList = r.data;
          this.yearId = r.data[0].code;
          this.getCourseTypeData();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCourseTypeData() {
      getCourseType({
        collegeId: this.id,
        areaNo: this.regionId,
        year: this.yearId,
      })
        .then((r) => {
          this.courseTypeList = r.data;
          this.courseTypeId = r.data[0].code;
          this.getEducationTypeData();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getEducationTypeData() {
      getEducationType({
        collegeId: this.id,
        areaNo: this.regionId,
        year: this.yearId,
        examineeType: this.courseTypeId,
      })
        .then((r) => {
          this.educationTypeList = r.data;
          this.educationTypeId = r.data[0].code;
          this.getHistoryScoreData();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getHistoryScoreData() {
      getHistoryScore({
        collegeId: this.id,
        areaNo: this.regionId,
        year: this.yearId,
        examineeType: this.courseTypeId,
        entryBatch: this.educationTypeId,
      })
        .then((r) => {
          this.historyScoreList = r.data;
          // this.educationTypeId = r.data[0];
        })
        .catch((e) => {
          console.log(e);
        });
    },
    ////////////////////
    regionSelect_major(item) {
      this.regionId_major = item;
      this.getYearData_major();
    },
    yearSelect_major(item) {
      this.yearId_major = item;
      this.getCourseTypeData_major();
    },
    courseTypeSelect_major(item) {
      this.courseTypeId_major = item;
      this.getEducationTypeData_major();
    },
    educationTypeSelect_major(item) {
      this.educationTypeId_major = item;
      this.getMajorScoreData()
    },
    getRegionData_major() {
      getRegionMajor({
        collegeId: this.id,
      })
        .then((r) => {
          this.regionList_major = r.data;
          this.regionId_major = r.data[0].code;
          this.getYearData_major();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getYearData_major() {
      getYearMajor({
        collegeId: this.id,
        areaNo: this.regionId_major,
      })
        .then((r) => {
          this.yearList_major = r.data;
          this.yearId_major = r.data[0].code;
          this.getCourseTypeData_major();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCourseTypeData_major() {
      getCourseTypeMajor({
        collegeId: this.id,
        areaNo: this.regionId_major,
        year: this.yearId_major,
      })
        .then((r) => {
          this.courseTypeList_major = r.data;
          this.courseTypeId_major = r.data[0].code;
          this.getEducationTypeData_major();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getEducationTypeData_major() {
      getEducationTypeMajor({
        collegeId: this.id,
        areaNo: this.regionId_major,
        year: this.yearId_major,
        examineeType: this.courseTypeId_major,
      })
        .then((r) => {
          this.educationTypeList_major = r.data;
          this.educationTypeId_major = r.data[0].code;
          this.getMajorScoreData();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getMajorScoreData() {
      getMajorScore({
        collegeId: this.id,
        areaNo: this.regionId_major,
        year: this.yearId_major,
        examineeType: this.courseTypeId_major,
        entryBatch: this.educationTypeId_major,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
        .then((r) => {
          this.historyScorecode = r.code
          this.historyScoreList_major = r.data.list;
          this.totalSize = r.data.totalSize;
        })
        .catch((e) => {
          console.log(e);
          this.historyScorecode = 143
        });
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.getMajorScoreData();
    },
    handleCurrentChange(data) {
      this.pageNum = data;
      this.getMajorScoreData();
    },
  },
  beforeDestroy() {},
  mounted: function () {},
};
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
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
  background: #e9fef6;
  color: #666;
}
.historyScore {
  background: #f3f5f7;
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
    // text-indent: 13px;
    margin-bottom: 27px;
    margin-top: 20px;
    span {
      display: inline-block;
      width: 5px;
      height: 20px;
      margin-right: 13px;
      background: #1cb278;
      border-radius: 3px;
    }
  }
  .moduleDiv {
    background: #fff;
    padding: 40px;
    border-radius: 6px;
    margin-bottom: 50px;
    .searchBar {
      display: flex;
      justify-content: flex-end;
      > div {
        margin-left: 12px;
      }
    }
  }
}
</style>
