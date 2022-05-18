<template>
  <div class="compareSchool">
    <menuBer />

    <div class="batchLineDiv">

      <div class="selectDiv">
        
        <el-select style="width:100px;margin-right:20px;" v-model="provinceId" @change="provinceChange" placeholder="省份">
          <el-option
            v-for="item in provinceList"
            :key="item.areaNo"
            :label="item.area"
            :value="item.areaNo">
          </el-option>
        </el-select>

        <el-select style="width:100px;" v-model="yearId" @change="yearSelect" placeholder="年份">
          <el-option
            v-for="item in yearList"
            :key="item.year"
            :label="item.year"
            :value="item.year">
          </el-option>
        </el-select>

      </div>

      <div class="tableDiv" style="margin:20px auto 60px;">
        <el-table :data="tableData" :highlight-current-row='true' :header-cell-style="{'background':'#F5F5F5','font-weight': '700','color':'#333'}" border style="width: 100%;border-radius: 4px;">
          <el-table-column prop="year" align="center" label="年份" width="200"></el-table-column>
          <el-table-column prop="area" align="center" label="省市" width="200"></el-table-column>
          <el-table-column prop="batch" align="center" label="批次/段" width="200"></el-table-column>
          <el-table-column prop="category" align="center" label="科目" width="200"></el-table-column>
          <el-table-column prop="scoreLine" align="center" label="控制分数线" width="200"></el-table-column>
          <el-table-column prop="score" align="center" label="专业分" ></el-table-column>
        </el-table>
      </div>

      

    </div>

  </div>
</template>

<script>
import menuBer from "@/components/menuBar";
import { getProvince,getYear,getDefaultList,getList } from "@/api/batchLineApi";

export default {
  name: "batchLine",
  data() {
    return {
      yearId: '',
      yearList: [],
      provinceId: '',
      provinceList: [],
      tableData: [],
  
    };
  },
  watch: {},
  components: { menuBer },
  async mounted () {
    let infor =JSON.parse(sessionStorage.getItem('studentInfor'));
    if(infor){
      this.provinceId = infor.provinceId;
    }
    
    await this.getProvinceList();
    this.getDefault();
    
  },
  methods: {
    getDefault(){
      getDefaultList(
        {
          'provinceNo': this.provinceId
        }
      ).then(r => {
          this.yearId = r.data.year;
          this.provinceId = r.data.areaNo;

          let proviceList = this.provinceList;
          proviceList.forEach(item => {
            if(this.provinceId == item.areaNo){
              let yearList = item.year.split(',')
              this.yearList = [];
              yearList.forEach((item)=>{
                this.yearList.push(
                  {
                    'year': item
                  }
                )

              })

            }

          });


          this.getbatchList();
      }).catch((e) => {
          console.log(e)
      });

    },
    provinceChange(){
      // this.getYearList();
      this.getDefault();
    },
    async getProvinceList(){
      return new Promise((resolve, reject)=>{
        getProvince().then(r => {
            this.provinceList = r.data;
            resolve()
        }).catch((e) => {
            console.log(e)
        });
      })
    },
    yearSelect(){
      this.getbatchList();
    },
    async getYearList(){
      return new Promise((resolve, reject)=>{
        getYear(
        {
          'provinceNo': 33
        }
        ).then(r => {
            this.yearList = r.data;
            resolve()
        }).catch((e) => {
            console.log(e)
        });
      })
    },
    getbatchList() {
      getList({
        areaNo: this.provinceId,
        year: this.yearId,
        category: ''
      })
        .then((r) => {
          this.tableData = r.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  beforeDestroy() {},
  
};
</script>

<style lang="scss" scoped>

  .batchLineDiv {
    width: 1200px;
    margin: 20px auto;
    // background-color: #fff;
  }

</style>
