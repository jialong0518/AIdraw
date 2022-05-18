<template>
  <div class="result" v-show="state">
    <div class="resultDiv">
      <div class="title">成绩信息<span @click="state = false"></span></div>
      <div class="formDiv">
        <el-form
          :model="form"
          :rules="rulesForm"
          ref="ruleForm"
          label-width="150px"
        >
          <el-form-item label="高考所在省" prop="province">
            <el-select
              v-model="form.province"
              @change="provinceFun"
              style="width: 250px"
              placeholder="请选择省份"
              :disabled="form.province !== ''"
            >
              <el-option
                v-for="item in provinceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div style="color: rgba(255, 101, 101, 1); font-size: 11px">
              注：省份一经选择，不可修改，请慎重选择
            </div>
          </el-form-item>
          <el-form-item :label="firstSubjectText()" prop="choice">
            <div class="subject">
              <div
                @click="firstSubjectFun(item)"
                :class="{ active: form.choice.indexOf(item) !== -1 }"
                :key="item"
                v-for="item in firstSubject"
              >
                {{ item }}
              </div>
            </div>
          </el-form-item>
          <el-form-item
            :label="againSubjectText()"
            prop="choice1"
            v-show="typeSubject === '1'"
          >
            <div class="subject">
              <div
                :class="{ active: form.choice1.indexOf(item) !== -1 }"
                :key="item"
                v-for="item in againSubject"
                @click="againSubjectFun(item)"
              >
                {{ item }}
              </div>
            </div>
          </el-form-item>
          <el-form-item label="高考总分" prop="score">
            <el-input
              v-model="form.score"
              autocomplete="off"
              @change="getRank"
              style="width: 250px"
            ></el-input>
          </el-form-item>
          <el-form-item label="位次" prop="ranking">
            <el-input
              v-model="form.ranking"
              style="width: 250px"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="notes">
          注：高考成绩公布前，成绩可进行修改；<span
            >高考成绩公布起，仅可修改一次；即将预估分数修改为高考成绩。</span
          >
        </div>
        <div @click="submit" class="submit">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getProvinceNo,
  getParagraphByScore,
  submitScoreInfo,
  getScoreInfo,
} from "@/api/userCenterApi";
import { getDictionary } from "@/api/public";

export default {
  name: "result",
  data() {
    let checkscore = (valuerule, value, callback) => {
      if (!/^(\+)?\d+(\.\d+)?$/.test(value)) {
        callback(new Error("请填写分数"));
      } else {
        callback();
      }
    };
    let checkrank = (valuerule, value, callback) => {
      if (!/(^[1-9]\d*$)/.test(value)) {
        callback(new Error("请填写位次"));
      } else {
        callback();
      }
    };
    let checkchoice = (valuerule, value, callback) => {
      let arr = value === "" ? [] : value.split(",");
      console.log(arr, arr.length, this.typeSubject);
      if (this.typeSubject === "3" && arr.length !== 3) {
        callback(new Error("请选择首选科目"));
      } else if (this.typeSubject !== "3" && arr.length !== 1) {
        callback(new Error("请选择首选科目"));
      } else {
        callback();
      }
    };
    let checkchoice1 = (valuerule, value, callback) => {
      let arr = value === "" ? [] : value.split(",");
      console.log(arr, arr.length, this.typeSubject);
      if (this.typeSubject === "1" && arr.length !== 2) {
        callback(new Error("请选择科目"));
      } else {
        callback();
      }
    };
    return {
      state: false,
      rulesForm: {
        province: [{ required: true, message: "请选择省份", trigger: "blur" }],
        choice: [
          {
            required: true,
            validator: checkchoice,
            message: "请选择首选科目",
            trigger: "blur",
          },
        ],
        choice1: [
          {
            required: true,
            validator: checkchoice1,
            message: "请选择科目",
            trigger: "blur",
          },
        ],
        score: [
          {
            required: true,
            validator: checkscore,
            message: "请填写分数",
            trigger: "blur",
          },
        ],
        ranking: [
          {
            required: true,
            validator: checkrank,
            message: "请填写位次",
            trigger: "blur",
          },
        ],
      },
      form: {
        province: "",
        score: "",
        ranking: "",
        choice: "",
        choice1: "",
      },
      provinceList: [],
      againSubject: [],
      firstSubject: [],
      typeSubject: "",
      id: "",
      examineeTypeCode: "",
    };
  },
  props: {
    resultState: {
      type: Number,
      default: 0,
    },
    userInfor: {
      type: Object,
      default: ()=>{},
    },
  },
  watch: {
    resultState: {
      handler: function (val, oldVal) {
        if (val) {
          this.state = true;
        }
      },
      //   immediate: true
    },
    userInfor: {
      handler: function (val, oldVal) {
        if (val.id) {
          let infor = val;
          this.id = infor.id;
          console.log(infor);
          this.form.province = infor.provinceId != null ? infor.provinceId + "" : "";
          this.examineeTypeCode =
            infor.examineeType != null ? infor.examineeType + "" : "";
          this.getProvinceList();
          this.getRule();
          // this.getScoreInfoFun();
          if (infor.examineeType == null) return;
            this.form.score = infor.score;
            this.form.ranking = infor.ranking;
            if (infor.examineeType === 5) {
              this.form.choice = infor.examineeTypeName;
            } else {
              let arr = infor.examineeTypeName.split(",");
              let arr1 = arr.splice(0, 1);
              this.form.choice = arr1.join(",");
              this.form.choice1 = arr.join(",");
            }
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    //判断处理操作是否为忽略，如果是忽略回复内容就是非必填项，也不用校验
    itemChange() {
      return this.typeSubject === "1" ? "choice1" : "";
    },
  },
  components: {},
  mounted: function () {},
  methods: {
    getScoreInfoFun() {
      getScoreInfo({
        stuId: this.id,
      })
        .then((r) => {
          if (r.code === 200) {
            if (r.data.examineeType == null) return;
            this.form.score = r.data.score;
            this.form.ranking = r.data.ranking;
            if (r.data.examineeType === 5) {
              this.form.choice = r.data.examineeTypeName;
            } else {
              let arr = r.data.examineeTypeName.split(",");
              let arr1 = arr.splice(0, 1);
              this.form.choice = arr1.join(",");
              this.form.choice1 = arr.join(",");
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    againSubjectFun(item) {
      let start = true;
      let arrName =
        this.form.choice1 === "" ? [] : this.form.choice1.split(",");
      let arrName_ = [];
      for (let i in arrName) {
        if (arrName[i] === item) {
          start = false;
          continue;
        }
        arrName_.push(arrName[i]);
      }
      if (arrName_.length === 2) return;
      if (start) {
        arrName_.push(item);
      }
      this.form.choice1 = arrName_.join(",");
      this.$refs["ruleForm"].validateField(["choice1"]);
      if (
        this.form.choice1 !== "" &&
        this.form.choice !== "" &&
        this.form.score !== ""
      ) {
        this.getRank();
      }
    },
    firstSubjectFun(item) {
      let start = true;
      if (this.typeSubject !== "3") {
        this.form.choice = item;
      } else {
        let arrName =
          this.form.choice === "" ? [] : this.form.choice.split(",");
        let arrName_ = [];
        for (let i in arrName) {
          if (arrName[i] === item) {
            start = false;
            continue;
          }
          arrName_.push(arrName[i]);
        }
        if (arrName_.length === 3) return;
        if (start) {
          arrName_.push(item);
        }
        this.form.choice = arrName_.join(",");
        this.$refs["ruleForm"].validateField(["choice"]);
      }
      if (
        "12".indexOf(this.typeSubject) === -1 &&
        this.form.choice1 !== "" &&
        this.form.choice !== "" &&
        this.form.score !== ""
      ) {
        this.getRank();
      }
      if (
        "12".indexOf(this.typeSubject) !== -1 &&
        this.form.choice !== "" &&
        this.form.score !== ""
      ) {
        this.getRank();
      }
    },
    firstSubjectText() {
      let text = "";
      let num = this.firstSubject.length;
      text = `首选科目（${num}选${Math.floor(num / 2)}）`;
      if (this.typeSubject === "2") {
        text = "首选科目";
      }
      return text;
    },
    againSubjectText() {
      let text = "";
      let num = this.againSubject.length;
      text = `科目（${num}选${Math.floor(num / 2)}）`;
      if (this.typeSubject === "2") {
        text = "科目";
      }
      return text;
    },
    getProvinceList() {
      getDictionary({
        typeId: 16,
      })
        .then((r) => {
          if (r.code === 200) {
            this.provinceList = r.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    provinceFun(data) {
      console.log(data);
      this.form.choice = "";
      this.form.choice1 = "";
      this.getRule();
    },
    getRule() {
      getProvinceNo({
        provinceNo: this.form.province,
      })
        .then((r) => {
          if (r.code === 200) {
            this.againSubject =
              r.data.againSubject != null ? r.data.againSubject.split(",") : [];
            this.firstSubject =
              r.data.firstSubject != null ? r.data.firstSubject.split(",") : [];
            this.typeSubject = r.data.type;
            // console.log(this.firstSubject);
            // this.provinceList = r.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getRank() {
      let num = 0;
      let examineeTypeCode = 0;
      this.$refs["ruleForm"].validateField(
        ["score", "choice", "province", "choice1"],
        (errorMsg) => {
          if (!errorMsg) {
            num = num + 1;
          }
        }
      );
      if (num < 4 && this.typeSubject === "1") return;
      if (num < 3 && this.typeSubject !== "1") return;
      if (this.typeSubject === "1" && this.form.choice.indexOf("物理"))
        examineeTypeCode = 1;
      if (this.typeSubject === "1" && this.form.choice.indexOf("历史"))
        examineeTypeCode = 2;
      if (this.typeSubject === "2" && this.form.choice.indexOf("文科"))
        examineeTypeCode = 3;
      if (this.typeSubject === "2" && this.form.choice.indexOf("理科"))
        examineeTypeCode = 4;
      if (this.typeSubject === "3") examineeTypeCode = 5;
      this.examineeTypeCode = examineeTypeCode;
      getParagraphByScore({
        provinceNo: this.form.province,
        examineeTypeCode: examineeTypeCode,
        score: this.form.score,
      })
        .then((r) => {
          if (r.code === 200) {
            this.form.ranking = r.data.sumParagraph;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(valid);
          let arr = this.form.choice === "" ? [] : this.form.choice.split(",");
          let arr_ =
            this.form.choice1 === "" ? [] : this.form.choice1.split(",");
          let examineeName = [...arr, ...arr_];
          console.log({
            stuId: this.id,
            examineeType: this.examineeTypeCode,
            score: this.form.score,
            ranking: this.form.ranking,
            examineeName: examineeName.join(","),
          });
          submitScoreInfo({
            stuId: this.id,
            examineeType: this.examineeTypeCode,
            score: this.form.score,
            ranking: this.form.ranking,
            examineeName: examineeName.join(","),
          })
            .then((r) => {
              if (r.code === 200) {
                this.state = false;
                let infor =JSON.parse(sessionStorage.getItem('studentInfor'));
                infor.score = this.form.score;
                infor.ranking = this.form.ranking;
                infor.examineeType = this.examineeTypeCode;
                infor.examineeTypeName = examineeName.join(",");
                sessionStorage.setItem('studentInfor',JSON.stringify(infor));
                this.$emit('upScore', this.form.score);
                // location.reload();
                // this.form.ranking = r.data.sumParagraph;
              }
              if (r.code === 134) {
                this.$alert(r.msg, "提示", {
                  confirmButtonText: "确定",
                  confirmButtonClass: "btnFalses",
                });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.result {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.39);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  .resultDiv {
    width: 600px;
    .title {
      position: relative;
      height: 70px;
      width: 100%;
      background: rgba(28, 178, 120, 1);
      color: #fff;
      font-size: 20px;
      line-height: 70px;
      text-align: center;
      span {
        display: inline-block;
        height: 18px;
        width: 18px;
        background: url("./close1.png") no-repeat;
        position: absolute;
        top: 25px;
        right: 15px;
        cursor: pointer;
      }
    }
    .formDiv {
      background: #fff;
      padding: 28px 62px 38px 62px;
      .subject {
        display: flex;
        width: 200px;
        flex-wrap: wrap;
        div {
          width: 80px;
          height: 42px;
          border: 1px solid #c2c2c2;
          border-radius: 4px;
          font-size: 14px;
          color: #333;
          text-align: center;
          line-height: 42px;
          margin-right: 20px;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .active {
          background: rgba(255, 168, 55, 1);
          border-color: rgba(255, 168, 55, 1);
          color: #fff;
        }
      }
      .notes {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        span {
          color: rgba(28, 178, 120, 1);
        }
      }
      .submit {
        width: 110px;
        height: 40px;
        background: rgba(28, 178, 120);
        opacity: 1;
        border-radius: 20px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        margin: 30px auto 0;
        cursor: pointer;
      }
    }
  }
}
</style>
