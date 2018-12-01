<template>
  <div>
    <el-row>
      <el-col :xs="24" :md="12" style="border-right:1px solid #ddd;padding-bottom: 100px">
        <div class="hz">
          <span class="circle"></span>
          <span class="label">医院诊断</span>
          <span class="num">{{kindo.util.formatNum(diagnosisHos.total)}}</span>
        </div>
        <el-row>
          <el-col :span="12">
            <div class="prog-c">
              <el-progress type="circle" :percentage="diagnosisHos.wdj" status="" :show-text="false"></el-progress>
              <div class="text">
                <span class="num blue">{{diagnosisHos.wdj}}
                  <sup>%</sup>
                </span>
                <span class="label">未对接</span>
              </div>
            </div>
            <div class="prog-l">
              <span>待对接</span>
              <div class="k-prog">
                <el-progress :percentage="diagnosisHos.ddj" class="outer" :show-text="false"></el-progress>
                <div class="text">{{diagnosisHos.ddj}}
                  <sup>%</sup>
                </div>
              </div>

            </div>
            <div class="prog-l">
              <span>被驳回</span>
              <div class="k-prog">
                <el-progress :percentage="diagnosisHos.bbh" class="is-yellow outer" :show-text="false"></el-progress>
                <div class="text">{{diagnosisHos.bbh}}
                  <sup>%</sup>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="prog-c">
              <el-progress type="circle" :percentage="diagnosisHos.ydj" status="success" :show-text="false"></el-progress>
              <div class="text">
                <span class="num green">{{diagnosisHos.ydj}}
                  <sup>%</sup>
                </span>
                <span class="label">已对接</span>
              </div>
            </div>
            <div class="prog-l">
              <span>一级对接</span>
              <div class="k-prog">
                <el-progress :percentage="diagnosisHos.one" class="is-success outer" :show-text="false"></el-progress>
                <div class="text">{{diagnosisHos.one}}
                  <sup>%</sup>
                </div>
              </div>

            </div>
            <div class="prog-l">
              <span>二级对接</span>
              <div class="k-prog">
                <el-progress :percentage="diagnosisHos.two" class="is-success outer" :show-text="false"></el-progress>
                <div class="text">{{diagnosisHos.two}}
                  <sup>%</sup>
                </div>
              </div>

            </div>
            <div class="prog-l">
              <span>三级对接</span>
              <div class="k-prog">
                <el-progress :percentage="diagnosisHos.three" class="is-success outer" :show-text="false"></el-progress>
                <div class="text">{{diagnosisHos.three}}
                  <sup>%</sup>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :md="12">
        <div class="hz">
          <span class="circle"></span>
          <span class="label">医院操作</span>
          <span class="num">{{kindo.util.formatNum(operHos.total)}}</span>
        </div>
        <el-row>
          <el-col :span="12">
            <div class="prog-c">
              <el-progress type="circle" :percentage="operHos.wdj" status="" :show-text="false"></el-progress>
              <div class="text">
                <span class="num blue">{{operHos.wdj}}
                  <sup>%</sup>
                </span>
                <span class="label">未对接</span>
              </div>
            </div>
            <div class="prog-l">
              <span>待对接</span>
              <div class="k-prog">
                <el-progress :percentage="operHos.ddj" class="outer" :show-text="false"></el-progress>
                <div class="text">{{operHos.ddj}}
                  <sup>%</sup>
                </div>
              </div>

            </div>
            <div class="prog-l">
              <span>被驳回</span>
              <div class="k-prog">
                <el-progress :percentage="operHos.bbh" class="is-yellow outer" :show-text="false"></el-progress>
                <div class="text">{{operHos.bbh}}
                  <sup>%</sup>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="prog-c">
              <el-progress type="circle" :percentage="operHos.ydj" status="success" :show-text="false"></el-progress>
              <div class="text">
                <span class="num green">{{operHos.ydj}}
                  <sup>%</sup>
                </span>
                <span class="label">已对接</span>
              </div>
            </div>
            <div class="prog-l">
              <span>一级对接</span>
              <div class="k-prog">
                <el-progress :percentage="operHos.one" class="is-success outer" :show-text="false"></el-progress>
                <div class="text">{{operHos.one}}
                  <sup>%</sup>
                </div>
              </div>
            </div>
            <div class="prog-l">
              <span>二级对接</span>
              <div class="k-prog">
                <el-progress :percentage="operHos.two" class="is-success outer" :show-text="false"></el-progress>
                <div class="text">{{operHos.two}}
                  <sup>%</sup>
                </div>
              </div>

            </div>
            <div class="prog-l">
              <span>三级对接</span>
              <div class="k-prog">
                <el-progress :percentage="operHos.three" class="is-success outer" :show-text="false"></el-progress>
                <div class="text">{{operHos.three}}
                  <sup>%</sup>
                </div>
              </div>

            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import config from './config'
export default {
  data() {
    return {
      a: false,
      diagnosisHos: {
        total: 0,
        ddj: 0,
        ydj: 0,
        wdj: 0,
        bbh: 0,
        one: 0,
        two: 0,
        three: 0
      },
      operHos: {
        total: 0,
        ddj: 0,
        ydj: 0,
        wdj: 0,
        bbh: 0,
        one: 0,
        two: 0,
        three: 0
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  methods: {
    init() {
      this.$http.get(config.api.diagnosis).then((res) => {
        this.diagnosisHos = res.data
      })
      this.$http.get(config.api.oper).then((res) => {
        this.operHos = res.data
      })
    }
  }
}
</script>

<style>
.hz {
  text-align: center;
  margin: 18px 0 36px;
}
.hz .circle {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #20a0ff;
  vertical-align: middle;
  display: inline-block;
  margin-right: 4px;
}
.hz .num {
  color: #666;
  font-size: 30px;
  vertical-align: -5px;
  margin-left: 8px;
}
.prog-c {
  text-align: center;
  position: relative;
  margin-bottom: 36px;
}
.prog-c .text {
  position: absolute;
  bottom: 35px;
  width: 100%;
  left: 0;
}
.prog-c .num {
  font-size: 26px;
  display: block;
  margin-bottom: 8px;
}
.prog-c .num sup {
  color: #999;
  font-size: 12px;
  vertical-align: super;
}
.prog-c .num i {
  font-size: 14px;
  color: #999;
  vertical-align: super;
  font-style: normal;
  margin-left: 2px;
}
.prog-l {
  margin-bottom: 24px;
  padding: 0 24px;
}
.prog-l span {
  margin-bottom: 4px;
  display: inline-block;
}
.blue {
  color: rgb(32, 160, 255);
}
.green {
  color: rgb(19, 206, 102);
}
.k-prog-text {
  color: rgb(72, 87, 106);
}
.k-prog {
  display: flex;
}
.k-prog .outer {
  width: 100%;
  margin-right: 5px;
  margin-top: 5px;
}
.k-prog .text {
  color: rgb(72, 87, 106);
  width: 60px;
}
.k-prog .text sup {
  color: #999;
  vertical-align: sub;
}
.el-progress.is-yellow .el-progress-bar__inner {
  background-color: #eded48;
}
</style>
