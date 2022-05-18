<template>
  <div class="userMeansContent">
    <div class="inforDiv">
      <div class="photoDiv">
        <div class="imgDiv">
          <img :src="photoImg ? photoImg : defaultImg" alt="" />
        </div>
        <!-- <div @click="upImg" class="changeBtn">更换头像</div> -->
      </div>

      <div class="inforRight">
        <div>
          <span style="font-size: 20px; color: #333; font-weight: 700">{{
            userName
          }}</span>
          <span title="修改用户信息" @click="changeBtn" class="changeNameBtn">
            <img src="./edit.png" alt="" />
          </span>
          <span  @click="changeBtn" style="font-size: 14px; color: #666; cursor: pointer;">修改</span>
        </div>

        <div style="margin-top: 20px">
          <span class="sfImg">
            <img src="./userImg.png" alt="" />
          </span>
          <span style="font-size: 14px; color: #666666"> 身份：普通用户 </span>
        </div>
      </div>
    </div>

    <div class="inforContent">
      <div class="provinceDiv">
        <span class="proLeft">所在省份：</span>
        <span class="proRight">{{ province }}</span>
      </div>

      <div class="provinceDiv">
        <span class="proLeft">所在城市：</span>
        <span class="proRight">{{ city }} {{ area }}</span>
      </div>

      <div class="provinceDiv">
        <span class="proLeft">就读中学：</span>
        <span class="proRight">{{ schoolName }}</span>
      </div>

      <div class="provinceDiv">
        <span class="proLeft">年级：</span>
        <span class="proRight">{{ grade }}</span>
      </div>

      <div class="provinceDiv">
        <span class="proLeft">姓名：</span>
        <span class="proRight">{{ userName }}</span>
      </div>

      <div class="provinceDiv">
        <span class="proLeft">性别：</span>
        <span class="proRight">{{ sex }}</span>
      </div>
    </div>

    <div class="zz" v-show="changeshow"></div>
    <div class="zxContent" v-show="changeshow">
      <div class="zxHeader">
        <span class="headerWord">完善信息</span>
        <div class="closeImgBtn" @click="closeBtn">
          <img src="./close.png" alt="">
        </div>
      </div>

      <div class="inputDiv">
        <span>省份：</span>
        <el-select style="width:370px;" disabled clearable v-model="provinceId" @change="provinceChange" placeholder="请选择省份">
          <el-option
            v-for="item in provinceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="color:#ff6666;font-size:13px;padding-left:100px;margin-top:5px;">注：省份一经选择，不可修改</div>

      <div class="inputDiv">
        <span>城市：</span>
        <el-select style="width:370px;" clearable v-model="cityId" placeholder="请选择城市">
          <el-option
            v-for="item in cityList"
            :key="item.areaNo"
            :label="item.areaName"
            :value="item.areaNo">
          </el-option>
        </el-select>
      </div>

      <div class="inputDiv">
        <span>学校：</span>
        <el-input style="width: 370px" maxlength="20" clearable v-model="changeSchoolName" placeholder="请输入学校"></el-input>
      </div>

      <div class="inputDiv">
        <span>年级：</span>
        <el-select style="width:370px;" clearable v-model="changeGradeId" placeholder="请选择年级">
          <el-option
            v-for="item in gradeList"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </div>

      <div class="inputDiv">
        <span>学生姓名：</span>
        <el-input style="width: 370px" maxlength="10" clearable v-model="stuName" placeholder="请输入姓名"></el-input>
      </div>

      <div class="inputDiv">
        <span>性别：</span>
        <el-radio-group v-model="changeSex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </div>



      <div class="submitDiv">
        <span class="btnSpan submitBtn" @click="submitChange">提交</span>
        <span class="btnSpan cancleBtn" @click="closeBtn">取消</span>
      </div>
    </div>


    <input id="imageFile" @change="imgChange" type="file" name="files" style="display:none;"/>


  </div>
</template>

<script>
import { getProvince,upFile,updateStuImgUrl,getCity,perfectStuInfo  } from "@/api/userCenterApi";
import defaultImg from "./photo.png";


export default {
  name: "userMeans",
  data() {
    return {
      defaultImg,
      changeshow: false,
      stuId: "",
      userName: "",
      province: "",
      city: "",
      area: "",
      schoolName: "",
      grade: "",
      sex: "",
      provinceId: '',
      provinceList: [],
      cityId: '',
      cityList: [],
      changeSchoolName: '',
      changeGradeId: '',
      gradeId: '',
      gradeList: [
        {
          name: '高一',
          code: 1
        },
        {
          name: '高二',
          code: 2
        },
        {
          name: '高三',
          code: 3
        }
      ],
      stuName: '',
      changeSex: '',
      photoImg: '',

    };
  },
  watch: {},
  components: {},
  mounted: function () {
    let infor =JSON.parse(sessionStorage.getItem('studentInfor'));
    this.stuId = infor.id;
    this.userName = infor.stuName;
    this.stuName = infor.stuName;
    this.province = infor.province;
    if(infor.provinceId){
      this.provinceId = infor.provinceId.toString();
      this.getCityList();
    }
    this.city = infor.city;
    if(infor.cityId){
      this.cityId = infor.cityId.toString();
    }
    this.schoolName = infor.schoolName;
    this.changeSchoolName = infor.schoolName;
    this.grade = '';
    this.changeGradeId = infor.gradeId;
    if(infor.gradeId==1){
      this.grade = '高一';
    }
    if(infor.gradeId==2){
      this.grade = '高二';
    }
    if(infor.gradeId==3){
      this.grade = '高三';
    }
    if(infor.sex==1){
      this.sex = '男';
    }else if(infor.sex==2){
      this.sex = '女';
    }
    this.changeSex = infor.sex;
    this.photoImg = infor.imgUrl;
    this.getProvinceList();
  },
  methods: {
    provinceChange(){

    },
    changeBtn() {
      this.changeshow = true;
    },
    closeBtn() {
      this.changeshow = false;
    },
    submitChange(){
      if(!this.cityId){
        this.$alert('请先选择城市', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        });
        return false;
      }

      if(!this.changeSchoolName){
        this.$alert('请先输入学校', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        });
        return false;
      }

      if(!this.changeGradeId){
        this.$alert('请先选择年级', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        });
        return false;
      }

      if(!this.stuName){
        this.$alert('请先输入姓名', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        });
        return false;
      }

      let cityName = '';
      this.cityList.forEach((item)=>{
        if(this.cityId == item.areaNo){
          cityName = item.areaName;
        }

      })
      

      perfectStuInfo(
        {
          stuId: this.stuId,
          cityId: this.cityId,
          city: cityName,
          schoolName: this.changeSchoolName,
          sex: this.changeSex,
          gradeId: this.changeGradeId,
          stuName: this.stuName,
        }
      )
      .then((r) => {
        this.changeshow = false;
        this.$alert('提交成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            location.reload();
          }
        });

        let infor =JSON.parse(sessionStorage.getItem('studentInfor'));
        infor.cityId = this.cityId;
        infor.city = cityName;
        infor.gradeId = this.changeGradeId;
        infor.schoolName = this.changeSchoolName;
        infor.sex = this.changeSex;
        infor.stuName = this.stuName;
        sessionStorage.setItem(
          "studentInfor",
          JSON.stringify(infor)
        );

        


      })
      .catch((e) => {
        console.log(e);
      });
      
    },
    getProvinceList(){
      getProvince({
        typeId: 16,
      })
      .then((r) => {
        this.provinceList = r.data;
      })
      .catch((e) => {
        console.log(e);
      });
    },
    getCityList(){
      getCity({
        parentAreaNo: this.provinceId
      })
      .then((r) => {
        this.cityList = r.data;
      })
      .catch((e) => {
        console.log(e);
      });
    },
    upImg(){ //上传图片
      document.getElementById('imageFile').value = '';
      document.getElementById('imageFile').click();
    },
    imgChange(){
      var fileInput = document.getElementById('imageFile');
      let fileSizeList = fileInput.files;
      for(var i=0;i<fileSizeList.length;i++){
      var fileName = fileSizeList[i].name.lastIndexOf(".");//获取到文件名开始到最后一个“.”的长度。
      var fileNameLength = fileSizeList[i].name.length;//获取到文件名长度
      var fileType = fileSizeList[i].name.substring(fileName + 1, fileNameLength);//截取后缀名
      fileType = fileType.toLowerCase();
      if(fileType!="jpeg" && fileType!="png" && fileType!="jpg" && fileType!="gif"){
          this.$refs.childAlert.show("图片格式不正确");
          return false;
        } 
      }
      let files = new FormData();
      files.append("files",fileSizeList[0])
      upFile(files)
      .then((r) => {
        this.photoImg = r.data[0];
        this.confimImg();
      })
      .catch((e) => {
        console.log(e);
      });

    },
    confimImg(){
      updateStuImgUrl({
        stuId: this.stuId,
        imgUrl: this.photoImg
      })
      .then((r) => {

        this.$alert('头像修改成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            
          }
        });

        let infor =JSON.parse(sessionStorage.getItem('studentInfor'));
        infor.imgUrl = this.photoImg;
        sessionStorage.setItem(
          "studentInfor",
          JSON.stringify(infor)
        );

      })
      .catch((e) => {
        console.log(e);
      });

    }


  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.userMeansContent {
  width: 100%;
  padding: 40px 40px;
  .inforDiv {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    .photoDiv {
      width: 100px;
      flex-shrink: 0;
      margin-right: 20px;
      .imgDiv {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
      }
      .changeBtn {
        width: 100%;
        text-align: center;
        margin-top: 10px;
        font-size: 13px;
        color: #666666;
        cursor: pointer;
      }
    }
    .inforRight {
      width: 100%;
      flex-shrink: 1;
      padding-top: 20px;
      .changeNameBtn {
        display: inline-block;
        width: 14px;
        cursor: pointer;
        margin-left: 30px;
        margin-right: 5px;
        img {
          width: 100%;
          vertical-align: middle;
        }
      }
      .sfImg {
        display: inline-block;
        width: 14px;
        img {
          width: 100%;
          vertical-align: middle;
          position: relative;
          top: -2px;
        }
      }
    }
  }
  .inforContent {
    width: 100%;
    margin: 40px auto;
    .provinceDiv {
      width: 100%;
      line-height: 50px;
      border-bottom: 1px solid #cecece;
      .proLeft {
        font-size: 14px;
        color: #999;
        display: inline-block;
        width: 80px;
        text-align: right;
      }
      .proRight {
        font-size: 14px;
        color: #000;
        margin-left: 20px;
      }
    }
  }
}
.zz {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.zxContent {
  border-radius: 8px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // transform: translate(-50%,-50%);
  margin: auto;
  width: 500px;
  height: 520px;
  background-color: #fff;
  .zxHeader {
    position: relative;
    width: 100%;
    height: 60px;
    text-align: center;
    background-color: #1cb278;
    .headerWord {
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      line-height: 60px;
    }
    .closeImgBtn {
      display: inline-block;
      width: 30px;
      height: 30px;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
  .inputDiv {
    padding: 0 20px;
    margin-top: 20px;
    span {
      font-size: 14px;
      color: #666666;
      display: inline-block;
      width: 80px;
      text-align: right;
      line-height: 40px;
    }
  }
  .submitDiv {
    margin-top: 30px;
    text-align: center;
    .btnSpan {
      display: inline-block;
      width: 80px;
      height: 30px;
      border-radius: 15px;
      font-size: 12px;
      overflow: hidden;
      letter-spacing: 1px;
      color: #fff;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
      margin: 0 10px;
      // border: 1px solid #fff;
    }
    .submitBtn {
      background-color: #1cb278;
    }
    .submitBtn:hover {
      background-color: #49dc89;
    }
    .cancleBtn {
      background-color: #cecece;
    }
    .cancleBtn:hover {
      background-color: #e6e3e3;
    }
  }
}
</style>
