<template>
  <div class="homePage">
    <div class="titleDiv"></div>
    <div class="carouselDiv">
      <el-carousel trigger="click"  style="height: 100%;">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="img">{{ item }}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="styleTypeDiv">
      <div class="title">请选择AI作画风格</div>
      <div class="typeList">
        <div @click="typeFun(1)" :class="[styleIndex !== 1 ? 'style1' : 'style1r' ]" class=""></div>
        <div @click="typeFun(2)" :class="[styleIndex !== 2 ? 'style2' : 'style2r' ]"></div>
        <div @click="typeFun(3)" :class="[styleIndex !== 3 ? 'style3' : 'style3r' ]"></div>
        <div @click="typeFun(4)" :class="[styleIndex !== 4 ? 'style4' : 'style4r' ]"></div>
        <div @click="typeFun(5)" :class="[styleIndex !== 5 ? 'style5' : 'style5r' ]"></div>
        <div @click="typeFun(6)" :class="[styleIndex !== 6 ? 'style6' : 'style6r' ]"></div>
        <div @click="typeFun(7)" :class="[styleIndex !== 7 ? 'style7' : 'style7r' ]"></div>
      </div>
    </div>
    <div class="makeDraw"></div>
    <div class="textArea">
      <div class="title">AI艺术图像生成</div>
      <div class="introduce">AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介AI艺术图像生成简介。
      </div>
    </div>
    <div class="footerDiv">
      <div class="footerLogo"></div>
    </div>
   
   
  </div>
</template>

<script>



export default {
  name: 'channel',
  data() {
    return {
      styleIndex: 0
    }
  },
  watch: {},
  components: {},
  methods: {
      typeFun(data) {
        this.styleIndex = data;
      }
  },
  beforeDestroy(){
      
  },
  mounted: function() {
    setTimeout(()=>{
      // document.getElementsByClassName('el-carousel__container')[0].height = 1208 / 336+'px';
    },1000)
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
.el-carousel__container {
    height: 100% !important;
  }
</style>

<style lang="scss" scoped>

.el-carousel__item {
  height: 100%;
}

.homePage{
  height: 100%;
  background: #fff;
  position: relative;
  background: url('./bg.png') no-repeat;
  background-position: 2% 252%;
  background-size: 120% 106%;
  overflow: auto; 
}

.titleDiv {
  width: 62%;
  height: 7.5%;
  background: url('./BT.png') no-repeat;
  background-size: 100% 100%;
  margin: 4% auto 0;
}

.carouselDiv {
  height:27.8%;
  width:88.2%;
  margin: 1.6% auto 0;
  .img {
    height: 100%;
    width: 100%;
    background: url('./frame.png') no-repeat;
    background-size: 100% 100%;
  }
}

.styleTypeDiv {
    height: 16%;
    width: 88%;
    background: #fff;
    margin: 1.6% auto 0;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    // padding: 0 5.3%
    .title {
      color: #757575;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
    .typeList {
      height: 53.5%;
      display: flex;
      justify-content: space-evenly;
    }
    .typeList > div {
      width: 12%;
      background-size: 100% 100%;
      height: 100%
    }
    .style1 {
      background: url('./pic/Frame1.png') no-repeat;
    }
    .style2 {
      background: url('./pic/Frame2.png') no-repeat;
    }
    .style3 {
      background: url('./pic/Frame3.png') no-repeat;
    }
    .style4 {
      background: url('./pic/Frame4.png') no-repeat;
    }
    .style5 {
      background: url('./pic/Frame5.png') no-repeat;
    }
    .style6 {
      background: url('./pic/Frame6.png') no-repeat;
    }
    .style7 {
      background: url('./pic/Frame7.png') no-repeat;
    }

    .style1r {
      background: url('./pic/Frame1r.png') no-repeat;
    }
    .style2r {
      background: url('./pic/Frame2r.png') no-repeat;
    }
    .style3r {
      background: url('./pic/Frame3r.png') no-repeat;
    }
    .style4r {
      background: url('./pic/Frame4r.png') no-repeat;
    }
    .style5r {
      background: url('./pic/Frame5r.png') no-repeat;
    }
    .style6r {
      background: url('./pic/Frame6r.png') no-repeat;
    }
    .style7r {
      background: url('./pic/Frame7r.png') no-repeat;
    }
}
.makeDraw {
  background: url('./pic/Button.png') no-repeat;
  background-size: 100% 100%;
  height: 7.2%;
  width:58.6%;
  margin: 1.6% auto 0;
}
.textArea {
  margin: 3.2% auto 0;
  width: 85.7%;
  .title {
    color: #17181A;
    font-size: 22px;
    font-weight: bolder;
    text-align: center;
  }
  .introduce {
    color: #737373;
    font-size: 16px;
    margin-top: 20px;
    line-height: 22px;
  }
}
.footerDiv {
  background: #D2D3D7;
  height: 6.6%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  .footerLogo {
    height: 40%;
    width: 32.6%;
    background: url('./pic/footerLogo.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>
