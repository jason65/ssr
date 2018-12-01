<template>
<div style="padding:15px;">
  <el-form :model="search" onsubmit="return false;" ref="search" inline @keyup.enter.prevent.native="init" label-width="90px" v-disabled="'search'">
    <!-- 医院名称 -->
    <el-form-item label="医院名称：">
      <el-select v-model.trim="search.hosId" clearable>
        <el-option v-for="item in selectData.hospital" :key="item.hosId" :label="item.hosName" :value="item.hosId"> </el-option>
      </el-select>
    </el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="init">查询</el-button>
  </el-form>
  <el-row style="margin-bottom:60px;">
    <el-col :span="6">
      <div class="all-per">
        <div class="filed">
          <p class="num">{{ kindo.util.formatNum(diagnosisHos.total) }}</p>
          <span class="circle"></span>
          <span class="label">疾病诊断数量</span>
        </div>
        <div class="prog">
          <svg width="126" height="126" viewbox="0 0 126 126">
            <circle cx="63" cy="63" r="60" stroke-width="5.8" stroke="#ecf0f3" fill="none"></circle>
            <circle cx="63" cy="63" r="60" stroke-width="5.8" stroke="#26b99a" fill="none" :stroke-dasharray="376.8 * (diagnosisHos.ydj_per / 100) + ' 376.8'" transform="matrix(0,-1,1,0,0,126)"></circle>
          </svg>
          <div class="prog-text">
            <span class="num">{{ diagnosisHos.ydj_per }}
              <sup>%</sup>
            </span>
            <span class="label">已对接</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="18">
      <el-row>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">待对接</span>
            <span class="num">{{diagnosisHos.wdjCount}}</span>
            <div class="prog">
              <el-progress :percentage="diagnosisHos.wdj" class="outer" :show-text="false"></el-progress>
              <div class="text">{{ diagnosisHos.wdj_per }} %</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">人工对接</span>
            <span class="num">{{diagnosisHos.elevenCount}}</span>
            <div class="prog">
              <el-progress :percentage="diagnosisHos.eleven" class="outer is-success" :show-text="false"></el-progress>
              <div class="text">{{ diagnosisHos.eleven_per }} %</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">自动匹配</span>
            <span class="num">{{diagnosisHos.autoYdjCount}}</span>
            <div class="prog">
              <el-progress :percentage="diagnosisHos.autoYdj" class="outer is-success" :show-text="false"></el-progress>
              <div class="text">{{ diagnosisHos.autoYdj_per }} %</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="type-list"><i class="arrow-t"></i>
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>编码相同</th>
            <th>扩展编码相同</th>
            <th>编码细目相同</th>
            <th>编码亚目相同</th>
            <th>编码类目相同</th>
            <th>编码不同</th>
          </tr>
          <tr>
            <td>名称相同</td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.one_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.oneCount}}</span>
                  <span class="per">{{diagnosisHos.one_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.twelve_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.twelveCount}}</span>
                  <span class="per">{{diagnosisHos.twelve_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.two_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.twoCount}}</span>
                  <span class="per">{{diagnosisHos.two_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.three_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.threeCount}}</span>
                  <span class="per">{{diagnosisHos.three_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.four_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.fourCount}}</span>
                  <span class="per">{{diagnosisHos.four_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.five_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.fiveCount}}</span>
                  <span class="per">{{diagnosisHos.five_per}}%</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>名称不同</td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.thirteen_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.thirteenCount}}</span>
                  <span class="per">{{diagnosisHos.thirteen_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.six_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.sixCount}}</span>
                  <span class="per">{{diagnosisHos.six_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.senven_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.senvenCount}}</span>
                  <span class="per">{{diagnosisHos.senven_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.eight_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.eightCount}}</span>
                  <span class="per">{{diagnosisHos.eight_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.nine_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.nineCount}}</span>
                  <span class="per">{{diagnosisHos.nine_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.ten_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{diagnosisHos.tenCount}}</span>
                  <span class="per">{{diagnosisHos.ten_per}}%</span>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </el-col>
  </el-row>
  <el-row style="margin-bottom:60px;">
    <el-col :span="6">
      <div class="all-per">
        <div class="filed">
          <p class="num">{{ kindo.util.formatNum(operHos.total) }}</p>
          <span class="circle"></span>
          <span class="label">手术操作数量</span>
        </div>
        <div class="prog">
          <svg width="126" height="126" viewbox="0 0 126 126">
            <circle cx="63" cy="63" r="60" stroke-width="5.8" stroke="#ecf0f3" fill="none"></circle>
            <circle cx="63" cy="63" r="60" stroke-width="5.8" stroke="#26b99a" fill="none" :stroke-dasharray="376.8 * (operHos.ydj_per / 100) + ' 376.8'" transform="matrix(0,-1,1,0,0,126)"></circle>
          </svg>
          <div class="prog-text">
            <span class="num">{{ operHos.ydj_per }}
              <sup>%</sup>
            </span>
            <span class="label">已对接</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="18">
      <el-row>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">待对接</span>
            <span class="num">{{operHos.wdjCount}}</span>
            <div class="prog">
              <el-progress :percentage="operHos.wdj" class="outer" :show-text="false"></el-progress>
              <div class="text">{{ operHos.wdj_per }} %</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">人工对接</span>
            <span class="num">{{operHos.tenCount}}</span>
            <div class="prog">
              <el-progress :percentage="operHos.ten" class="outer is-success" :show-text="false"></el-progress>
              <div class="text">{{ operHos.ten_per }} %</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">自动匹配</span>
            <span class="num">{{operHos.autoYdjCount}}</span>
            <div class="prog">
              <el-progress :percentage="operHos.autoYdj" class="outer is-success" :show-text="false"></el-progress>
              <div class="text">{{ operHos.autoYdj_per }} %</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="type-list"><i class="arrow-t"></i>
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>编码相同</th>
            <th>编码细目相同</th>
            <th>编码亚目相同</th>
            <th>编码类目相同</th>
            <th>编码不同</th>
          </tr>
          <tr>
            <td>名称相同</td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (operHos.one_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{ operHos.oneCount }}</span>
                  <span class="per">{{ operHos.one_per }}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (operHos.two_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{ operHos.twoCount }}</span>
                  <span class="per">{{ operHos.two_per }}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (operHos.three_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{ operHos.threeCount }}</span>
                  <span class="per">{{ operHos.three_per }}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (operHos.four_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{ operHos.fourCount }}</span>
                  <span class="per">{{ operHos.four_per }}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (operHos.five_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{ operHos.fiveCount }}</span>
                  <span class="per">{{ operHos.five_per }}%</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>名称不同</td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (operHos.eleven_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{ operHos.elevenCount }}</span>
                  <span class="per">{{ operHos.eleven_per }}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (operHos.six_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{ operHos.sixCount }}</span>
                  <span class="per">{{ operHos.six_per }}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (operHos.senven_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{ operHos.senvenCount }}</span>
                  <span class="per">{{ operHos.senven_per }}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (operHos.eight_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{ operHos.eightCount }}</span>
                  <span class="per">{{ operHos.eight_per }}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (operHos.ten_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{ operHos.tenCount }}</span>
                  <span class="per">{{ operHos.ten_per }}%</span>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </el-col>
  </el-row>
  <el-row style="margin-bottom:60px;">
    <el-col :span="6">
      <div class="all-per">
        <div class="filed">
          <p class="num">{{ kindo.util.formatNum(injuryPoison.total) }}</p>
          <span class="circle"></span>
          <span class="label">损伤中毒数量</span>
        </div>
        <div class="prog">
          <svg width="126" height="126" viewbox="0 0 126 126">
            <circle cx="63" cy="63" r="60" stroke-width="5.8" stroke="#ecf0f3" fill="none"></circle>
            <circle cx="63" cy="63" r="60" stroke-width="5.8" stroke="#26b99a" fill="none" :stroke-dasharray="376.8 * (injuryPoison.ydj_per / 100) + ' 376.8'" transform="matrix(0,-1,1,0,0,126)"></circle>
          </svg>
          <div class="prog-text">
            <span class="num">{{ injuryPoison.ydj_per }}
              <sup>%</sup>
            </span>
            <span class="label">已对接</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="18">
      <el-row>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">待对接</span>
            <span class="num">{{injuryPoison.wdjCount}}</span>
            <div class="prog">
              <el-progress :percentage="injuryPoison.wdj" class="outer" :show-text="false"></el-progress>
              <div class="text">{{ injuryPoison.wdj_per }} %</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">人工对接</span>
            <span class="num">{{injuryPoison.elevenCount}}</span>
            <div class="prog">
              <el-progress :percentage="injuryPoison.eleven" class="outer is-success" :show-text="false"></el-progress>
              <div class="text">{{ injuryPoison.eleven_per }} %</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">自动匹配</span>
            <span class="num">{{injuryPoison.autoYdjCount}}</span>
            <div class="prog">
              <el-progress :percentage="injuryPoison.autoYdj" class="outer is-success" :show-text="false"></el-progress>
              <div class="text">{{ injuryPoison.autoYdj_per }} %</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="type-list"><i class="arrow-t"></i>
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>编码相同</th>
            <th>扩展编码相同</th>
            <th>编码细目相同</th>
            <th>编码亚目相同</th>
            <th>编码类目相同</th>
            <th>编码不同</th>
          </tr>
          <tr>
            <td>名称相同</td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.one_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.oneCount}}</span>
                  <span class="per">{{injuryPoison.one_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.twelve_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.twelveCount}}</span>
                  <span class="per">{{injuryPoison.twelve_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.two_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.twoCount}}</span>
                  <span class="per">{{injuryPoison.two_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.three_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.threeCount}}</span>
                  <span class="per">{{injuryPoison.three_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.four_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.fourCount}}</span>
                  <span class="per">{{injuryPoison.four_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.five_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.fiveCount}}</span>
                  <span class="per">{{injuryPoison.five_per}}%</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>名称不同</td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.thirteen_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.thirteenCount}}</span>
                  <span class="per">{{injuryPoison.thirteen_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.six_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.sixCount}}</span>
                  <span class="per">{{injuryPoison.six_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.senven_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.senvenCount}}</span>
                  <span class="per">{{injuryPoison.senven_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.eight_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.eightCount}}</span>
                  <span class="per">{{injuryPoison.eight_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (diagnosisHos.nine_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.nineCount}}</span>
                  <span class="per">{{injuryPoison.nine_per}}%</span>
                </div>
              </div>
            </td>
            <td>
              <div class="prog">
                <div class="left">
                  <svg width="50" height="50" viewbox="0 0 50 50">
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#ecf0f3" fill="none"></circle>
                    <circle cx="25" cy="25" r="19" stroke-width="8" stroke="#26b99a" fill="none" :stroke-dasharray="119 * (injuryPoison.ten_per / 100) + ' 119'" transform="matrix(0,-1,1,0,0,50)"></circle>
                  </svg>
                </div>
                <div class="right">
                  <span class="num">{{injuryPoison.tenCount}}</span>
                  <span class="per">{{injuryPoison.ten_per}}%</span>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </el-col>
  </el-row>
  <el-row style="margin-bottom:60px;">
    <el-col :span="6">
      <div class="all-per">
        <div class="filed">
          <p class="num">{{ kindo.util.formatNum(tumorHos.total) }}</p>
          <span class="circle"></span>
          <span class="label">肿瘤形态学数量</span>
        </div>
        <div class="prog">
          <svg width="126" height="126" viewbox="0 0 126 126">
            <circle cx="63" cy="63" r="60" stroke-width="5.8" stroke="#ecf0f3" fill="none"></circle>
            <circle cx="63" cy="63" r="60" stroke-width="5.8" stroke="#26b99a" fill="none" :stroke-dasharray="376.8 * (tumorHos.ydj_per / 100) + ' 376.8'" transform="matrix(0,-1,1,0,0,126)"></circle>
          </svg>
          <div class="prog-text">
            <span class="num">{{ tumorHos.ydj_per }}
              <sup>%</sup>
            </span>
            <span class="label">已对接</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="18">
      <el-row style="margin-top:105px;">
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">待对接</span>
            <span class="num">{{tumorHos.wdjCount}}</span>
            <div class="prog">
              <el-progress :percentage="tumorHos.wdj" class="outer" :show-text="false"></el-progress>
              <div class="text">{{ tumorHos.wdj_per }} %</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">人工对接</span>
            <span class="num">{{tumorHos.elevenCount}}</span>
            <div class="prog">
              <el-progress :percentage="tumorHos.eleven" class="outer is-success" :show-text="false"></el-progress>
              <div class="text">{{ tumorHos.eleven_per }} %</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="dock-type">
            <span class="label">自动匹配</span>
            <span class="num">{{tumorHos.autoYdjCount}}</span>
            <div class="prog">
              <el-progress :percentage="tumorHos.autoYdj" class="outer is-success" :show-text="false"></el-progress>
              <div class="text">{{ tumorHos.autoYdj_per }} %</div>
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
      api: config.api,

      diagnosisHos: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        senven: 0,
        eight: 0,
        nine: 0,
        ten: 0,

        total: 0,
        wdj: 0,
        ydj: 0
      },

      operHos: {
        total: 0,
        ydj: 0,
        wdj: 0,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        senven: 0,
        eight: 0,
        ten: 0
      },
      tumorHos: {
        total: 0,
        ydj_per: 0,
        wdj_per: 0,
        autoYdj_per: 0,
        human_per: 0
      },
      injuryPoison: {},
      selectData: {
        hospital: []
      },

      search: {
        hosId: ''
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.getSelectData()
      this.init()
    })
  },
  methods: {
    init() {
      this.$http.get(this.api.diagnosis, { params: this.search }).then(res => {
        this.diagnosisHos = res.data

        for (const key in this.diagnosisHos) {
          if (this.diagnosisHos.hasOwnProperty(key)) {
            this.diagnosisHos[key] = this.diagnosisHos[key] || 0
            this.diagnosisHos[key + '_per'] = kindo.util.formatNum(this.diagnosisHos[key], 2)
          }
        }
      })

      this.$http.get(this.api.oper, { params: this.search }).then(res => {
        this.operHos = res.data

        for (const key in this.operHos) {
          if (this.operHos.hasOwnProperty(key)) {
            this.operHos[key] = this.operHos[key] || 0
            this.operHos[key + '_per'] = kindo.util.formatNum(this.operHos[key], 2)
          }
        }
      })

      this.$http.get(this.api.injuryPoison, { params: this.search }).then(res => {
        this.injuryPoison = res.data

        for (const key in this.injuryPoison) {
          if (this.injuryPoison.hasOwnProperty(key)) {
            this.injuryPoison[key] = this.injuryPoison[key] || 0
            this.injuryPoison[key + '_per'] = kindo.util.formatNum(this.injuryPoison[key], 2)
          }
        }
      })

      this.$http.get(this.api.tumor, { params: this.search }).then(res => {
        this.tumorHos = res.data

        for (const key in this.tumorHos) {
          if (this.tumorHos.hasOwnProperty(key)) {
            this.tumorHos[key] = this.tumorHos[key] || 0
            this.tumorHos[key + '_per'] = kindo.util.formatNum(this.tumorHos[key], 2)
          }
        }
      })
    },

    getSelectData() {
      // 医院列表
      this.$http.get(config.api.queryHos).then(res => {
        this.selectData.hospital = res.data
      })
    }
    // 跳转对应页面
    // goRouter(url, key, value) {
    //   kindo.cache.set(key, value, 'local')
    //   let el = document.querySelectorAll('.side-scroll .el-menu-item')
    //   // this.$router.push(url)
    //   for (let i in el) {
    //     if (el[i].getAttribute('router') === url) {
    //       el[i].click()
    //       return
    //     }
    //   }
    // }
  }
}
</script>

<style>
.label {
  color: #73879c;
}
/*.compnent {
  background: #fff !important;
}*/
.all-per {
  border-right: 1px solid #e6e9ed;
  margin-right: 30px;
}
.all-per .filed {
  text-align: center;
  margin: 18px 0 36px;
}
.all-per .filed .circle {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #3498db;
  vertical-align: 1px;
  display: inline-block;
  margin-right: 4px;
}
.all-per .filed .num {
  color: #29425d;
  font-size: 30px;
  margin: 0 0 5px 8px;
}
.all-per .prog {
  position: relative;
  text-align: center;
}
.all-per .prog .prog-text {
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
}
.all-per .prog .num {
  display: block;
  color: #26b99a;
  font-size: 26px;
  margin-bottom: 5px;
}
.all-per .prog .num sup {
  color: #73879c;
  font-size: 13px;
}

.type-list {
  position: relative;
  margin: 0 24px 0 24px;
}
.type-list .arrow-t {
  width: 20px;
  height: 20px;
  background-color: #fff;
  position: absolute;
  right: 16%;
  transform: rotate(-45deg);
  top: -10px;
  border-top: 1px solid #bcc2ca;
  border-right: 1px solid #bcc2ca;
}
.type-list table {
  border-collapse: collapse;
  border-top: 1px solid #bcc2ca;
  width: 100%;
}
.type-list tr th {
  text-align: left;
  height: 44px;
  font-weight: normal;
}
.type-list tr th,
.type-list tr td {
  color: #73879c;
  border-bottom: 1px solid #e6e9ed;
  width: 125px;
}
.type-list .prog {
  padding: 10px 0 15px;
}
.type-list .prog .left {
  float: left;
  margin-right: 5px;
}
.type-list .prog .right {
  margin-top: 5px;
}
.type-list .prog .right .num {
  border: 1px solid #bccad9;
  color: #73879c;
  border-radius: 10px;
  padding: 0 5px;
  font-size: 12px;
}
.type-list .prog .right .per {
  display: block;
  color: #26b99a;
  margin-top: 8px;
}

.dock-type {
  margin: 18px 0 24px;
  padding: 0 24px;
}
.dock-type span {
  margin-bottom: 4px;
  display: inline-block;
}
.dock-type .num {
  color: #3498db;
  margin-left: 5px;
  border: 1px solid #3498bd;
  border-radius: 10px;
  padding: 0 5px;
  font-size: 12px;
}
.dock-type .prog {
  display: flex;
}
.dock-type .outer {
  width: 100%;
  margin: 5px 5px 0 0;
}
.dock-type .outer .el-progress-bar__outer {
  color: #ecf0f3;
}
.dock-type .outer .el-progress-bar__inner {
  background-color: #3498db;
}
.dock-type .outer.is-success .el-progress-bar__inner {
  background-color: #26b99a;
}
.dock-type .text {
  color: #29425d;
  width: 80px;
  text-align: right;
}
.dock-type .text sup {
  vertical-align: sub;
}
</style>
