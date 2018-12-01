/*
 * updated by zhengtian on 2018/05/24
 * modify by
 * -------------------------------------------------
 */
import debounce from 'lodash/debounce'
export const mixinKPI = {
  data() {
    return {
      timeout: null,
      // 动态数据获取接口
      api: {
        // 查询所有医生的信息的接口
        doctorList: kindo.api.cDrgOGM + 'ssfjglcla/ystj/doctorname/',
        doctorScore: kindo.api.performance + 'ksjxpjcla/yspj/doctorname',
        drgList: kindo.api.cDrgOGM + 'ssfjglcla/sscx/queryDrg/',
        jbdmList: kindo.api.cDrgOGM + 'ssfjglcla/sscx/queryZyzd/',
        cchiList: kindo.api.cDrgOGM + 'ssfjglcla/sscx/queryCchi/'
      }
    }
  },
  methods: {
    /*
     * 远程搜索框的清空下拉list
     * ev          ->   事件对象
     * form        ->   表单
     * filed       ->   表单的字段
     * list        ->   下拉list包含的数组
     */
    blurSel(ev, form, filed, list) {
      setTimeout(() => {
        if (this[form][filed] === '') {
          this.list[list] = []
        }
      }, 500)
    },
    /*
     * select远程模糊搜索
     * query       ->   请求查询字符串
     * loading     ->   是否加载动效字段
     * list        ->   查询将推荐结果返回的数据集
     * extendparams->   查询其他的参数
     *        doctorList:所有医生的查询
     */
    remoteMethod: debounce(function(query, loading, list, extendparams) {
      if (query !== '') {
        this[loading] = true
        let api = ''
        let params = {}
        switch (list) {
          case 'doctorList':
            api = this.api.doctorList
            params = {
              ysValue: query
            }
            break
          case 'doctorScore':
            api = this.api.doctorScore
            params = {
              ysValue: query
            }
            break
          case 'drgList':
            api = this.api.drgList
            params = {
              drgCode: query
            }
            break
          case 'jbdmList':
            api = this.api.jbdmList
            params = {
              zyzdCode: query
            }
            break
          case 'cchiList':
            api = this.api.cchiList
            params = {
              cchiCode: query
            }
            break
          default:
            break
        }
        if (!kindo.validate.isEmpty(extendparams)) {
          Object.assign(params, extendparams)
        }
        this.$http
          .get(api, {
            params: params
          })
          .then(res => {
            this[loading] = false
            if (res.data && res.data.length > 0) {
              let arr = res.data.map(item => {
                let tempObj = {}
                switch (list) {
                  case 'doctorList':
                    tempObj = {
                      label: item.doctorName,
                      value: item.doctorName
                    }
                    break
                  case 'drgList':
                    tempObj = {
                      label: item.DRGName,
                      value: item.DRGCode
                    }
                    break
                  case 'jbdmList':
                    tempObj = {
                      label: item.ICD_NAME,
                      value: item.ICD_CODE
                    }
                    break
                  case 'cchiList':
                    tempObj = {
                      label: item.NAME,
                      value: item.CODE
                    }
                    break
                  case 'doctorScore':
                    tempObj = {
                      label: item.doctorName,
                      value: item.doctorCode
                    }
                    break
                  default:
                    break
                }
                return tempObj
              })
              this.list[list] = arr.filter(item => {
                return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.value.toLowerCase().indexOf(query.toLowerCase()) > -1
              })
            } else {
              this.list[list] = []
            }
          })
      } else {
        this.list[list] = []
      }
    }, 500),
    /*
     * 低风险组死亡人数和中低风险组死亡人数的跳转
     * row       ->   当前表格的数据
     */
    goToStandardPage(row, tag, extend) {
      console.log(this.searchForm, row, this.$route)
      let params = {}
      let photo = {}
      if (tag) {
        let dateType = '1'
        if (this.searchForm.month !== '') {
          dateType = '3'
        } else if (this.searchForm.quarter !== '') {
          dateType = '2'
        }
        params = { year: this.searchForm.year, dateType, month: this.searchForm.month, quarter: this.searchForm.quarter }
      } else {
        if (this.searchForm.month !== '') {
          let year = this.searchForm.month.substr(0, 4)
          let month = this.searchForm.month.substr(4)
          params = { dateType: '3', year: year, quarter: null, month: month }
        } else if (this.searchForm.quarter !== '') {
          let year = this.searchForm.quarter.substr(0, 4)
          let quarter = this.searchForm.quarter.substr(4)
          params = { dateType: '2', year: year, quarter: quarter, month: null }
        } else {
          let year = this.searchForm.year
          params = { dateType: '1', year: year, quarter: null, month: null }
        }
        photo = Object.assign({}, params)
      }
      if (this.$route.path === '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/fe8bca5f-bdb8-4704-82b1-970602c9ec35') {
        // 如果是科室绩效评价页面
        params.cykbbm = row.jbdstddeptcode
        photo.ksCode = this.searchForm.ksCode
      } else if (this.$route.path === '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/b030bc42-6d49-41a7-95c8-7689a19a162b') {
        // 如果是疑难病例统计
        params.cykbbm = this.searchForm.cykbbm
        params.drgCode = row.drgCode
        photo.cykbbm = this.searchForm.cykbbm
      } else {
        params.cykbbm = this.searchForm.ksCode
        if (this.$route.path === '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/66b2453a-54ac-42c6-8efc-2ddf7a431b3f') {
          // 如果是医生绩效评价
          params.zrys = row.jbyysname
          params.ysType = row.jbyselecttype

          photo.ksCode = this.searchForm.ksCode
          photo.ysValue = this.searchForm.ysValue
          photo.ysType = row.jbyselecttype
        } else if (this.$route.path === '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/a27ce7a8-c772-42c9-902e-2e0314e35647') {
          // 如果是ADRG指标分析
          photo.MDCCode = this.searchForm.MDCCode
        } else if (this.$route.path === '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/7a83ade2-bd35-4dd5-8335-a962c67d8021') {
          // DRG指标分析
          photo.MDCCode = this.searchForm.MDCCode
          params.drgCode = row.jbgdrgcode
        } else if (this.$route.path === '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/74388682-622d-42b8-ade2-c907bdc28d2d') {
          // 治疗组绩效评价
          params.zlzxh = row.jbzxh
          params.zrys = row.jbzysflag === '1' ? row.jbzysname : row.jbzzlzname
          params.ysType = row.jbzystype
          params.ysCode = row.jbzysflag === '1' ? row.jbzyscode : ''
          photo.zlzValue = this.searchForm.zlzValue
          photo.ksCode = this.searchForm.ksCode
        } else {
          // MDC指标分析
        }
      }
      kindo.cache.set('goBack', { from: this.$route.path, params: Object.assign(photo, extend) }, 'session')
      setTimeout(() => {
        this.$router.push({
          path: '/1b821029-d89a-4d1f-8fe6-d7592cb5bf3d/51150754-6c3f-4560-8e10-34df9f633273',
          query: Object.assign(params, { lyfs: '5' }, extend)
        })
      })
    },
    returnTime() {
      let nowMonth = new Date().getMonth()
      let year = ''
      let month = ''
      if (nowMonth === 0) {
        // 如果是1月
        year = new Date().getFullYear() - 1
        month = '12'
      } else {
        // 如果不是1月
        year = new Date().getFullYear().toString()
        month = nowMonth < 10 ? '0' + nowMonth : nowMonth
      }
      return ['3', year, null, month]
    },
    setRadar() {
      let obj = {
        title: {
          text: 'DRG指标概览'
        },
        legend: {
          data: [],
          right: 0,
          orient: 'vertical',
          itemWidth: 10,
          itemHeight: 10
        },
        tooltip: {
          formatter: function(obj) {
            if (obj.value.length > 1) {
              return (
                '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">' +
                obj.name +
                '</div>' +
                'DRG组数：' +
                obj.value[0] +
                '<br>' +
                'CMI值：' +
                obj.value[1] +
                '<br>' +
                '时间消耗指数：' +
                obj.value[2] +
                '<br>' +
                '费用消耗指数：' +
                obj.value[3] +
                '<br>' +
                '低风险组死亡率(%)：' +
                obj.value[4] +
                '<br>' +
                '中低风险组死亡率(%)：' +
                obj.value[5]
              )
            } else {
              return obj.name + ' : ' + obj.value
            }
          }
        },
        radar: {
          radius: '60%',
          center: ['30%', '55%'],
          name: {
            textStyle: {
              color: '#444'
            }
          },
          splitNumber: 4,
          indicator: [
            {
              name: 'DRG组数'
            },
            {
              name: 'CMI值'
            },
            {
              name: '时间消耗指数'
            },
            {
              name: '费用消耗指数'
            },
            {
              name: '低风险组死亡率(%)'
            },
            {
              name: '中低风险组死亡率(%)'
            }
          ]
        },
        series: [
          {
            name: '对比值',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: []
          }
        ]
      }
      return obj
    },
    setStackbar() {
      let obj = {
        title: {
          text: '费用构成'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
          },
          formatter:
            '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">{b0}</div>药品类(%)：{c0}<br />综合服务类(%)：{c1}<br />诊断类(%)：{c2}<br />治疗类(%)：{c3}<br />血液和血液制品类(%)：{c4}<br />材料类(%)：{c5}<br />其他(%)：{c6}'
        },
        grid: {
          // top: '10%',
          left: '3%',
          right: '3%',
          bottom: '20%',
          containLabel: true
        },
        legend: {
          data: ['药品类', '综合服务类', '诊断类', '治疗类', '血液和血液制品类', '材料类', '其他'],
          bottom: 0
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        series: [
          {
            name: '药品类',
            type: 'bar',
            stack: '总量',
            barWidth: '40%',
            data: []
          },
          {
            name: '综合服务类',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '诊断类',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '治疗类',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '血液和血液制品类',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '材料类',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: '其他',
            type: 'bar',
            stack: '总量',
            data: []
          }
        ]
      }
      return obj
    },
    // 柱状图
    setBar(xname, yname) {
      let obj = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
          }
        },
        grid: {
          left: '3%',
          bottom: '50',
          containLabel: true
        },
        xAxis: [
          {
            name: xname,
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            name: yname,
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            // name: yname'综合绩效指数',
            type: 'bar',
            barWidth: '60%',
            barMaxWidth: '60',
            data: []
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: false,
            xAxisIndex: [0],
            start: 0,
            end: 100,
            bottom: 0
          }
        ]
      }
      return obj
    },
    // 散点图
    setScatter(xname, yname) {
      let obj = {
        tooltip: {
          formatter: function(obj) {
            if (obj.value.length > 1) {
              if (xname === 'DRG组数') {
                return `<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">${obj.name}</div>${xname}：${obj.value[0].toFixed(
                  0
                )}<br>${yname}：${obj.value[1]}`
              } else {
                return `<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom:5px;margin-bottom: 5px">${obj.name}</div>${xname}：${obj.value[0]}<br>${yname}：${
                  obj.value[1]
                }`
              }
            } else {
              return `${obj.name}:${obj.value}`
            }
          }
        },
        xAxis: {
          type: 'value',
          name: xname,
          nameLocation: 'middle',
          nameGap: 25,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: yname,
          splitLine: {
            show: false
          }
        },
        series: [],
        dataZoom: [
          {
            type: 'slider',
            show: false,
            xAxisIndex: [0],
            start: 0,
            end: 100,
            bottom: 0
          }
        ]
      }
      return obj
    },
    // 安全指标
    setBarH(xname, yname) {
      let obj = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}%'
        },
        grid: {
          // left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        yAxis: {
          name: yname,
          type: 'category',
          axisLabel: {
            // rotate: 45,
            // margin: 50,
            formatter: function(value) {
              if (value !== null) {
                let maxLength = 8
                let str = ''
                for (let i = 0; i < maxLength; i++) {
                  str += value.substring(i, i + 1) // + '\n'
                }
                return str
              }
            }
          },
          data: [],
          splitLine: { show: false }
        },
        xAxis: [
          {
            name: xname,
            nameLocation: 'middle',
            nameGap: 25,
            type: 'value',
            splitLine: { show: false }
          }
        ],
        series: {
          type: 'bar',
          data: [],
          barWidth: '35%',
          itemStyle: {
            normal: {
              color: '#1BB2D8'
            }
          }
        }
      }
      return obj
    },
    // CMI
    setBarline() {
      let obj = {
        tooltip: {
          trigger: 'axis'
          // axisPointer: {
          //   type: 'shadow',
          //   shadowStyle: { color: 'rgba(0, 0, 0, 0)' }
          // }
        },
        grid: {
          left: '5%',
          right: '8%',
          // bottom: '10%',
          containLabel: true
        },
        legend: {
          // right: '100px',
          data: ['CMI', '人次'],
          bottom: 32
        },
        xAxis: {
          type: 'category',
          data: [],
          splitLine: {
            show: false
          },
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: [
          {
            name: 'CMI',
            type: 'value',
            splitLine: {
              show: false
            }
          },
          {
            name: '人次',
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: 'CMI',
            type: 'bar',
            barWidth: '60%',
            barMaxWidth: '60',
            data: []
          },
          {
            name: '人次',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            barWidth: '60%',
            barMaxWidth: '60',
            data: []
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: false,
            xAxisIndex: [0],
            start: 0,
            end: 100,
            bottom: 0
          }
        ]
      }
      return obj
    },
    setDataZoom(length, obj, number) {
      if (length > number) {
        this.view.tab[obj].dataZoom[0].show = true
        this.view.tab[obj].dataZoom[0].end = parseInt((number / length) * 100)
      } else {
        this.view.tab[obj].dataZoom[0].show = false
        this.view.tab[obj].dataZoom[0].end = 100
      }
    },
    // 散点图
    getScatter(echartObj, url, params) {
      this.$http.get(url, { params: params }).then(res => {
        let data = res.data.rows
        if (data.length > 0) {
          this.setDataZoom(data.length, echartObj, 50)
          let valArr = data.map(function(o, i) {
            return {
              name: o.name,
              value: [parseFloat(o.valuex).toFixed(2), parseFloat(o.valuey).toFixed(2)]
            }
          })
          this.view.tab[echartObj].series = [
            {
              data: valArr,
              type: 'scatter',
              markLine: {
                lineStyle: {
                  normal: {
                    type: 'solid',
                    color: '#3fb1e3'
                  }
                },
                data: [{ xAxis: res.data.polex, name: '平均值' }, { yAxis: res.data.poley, name: '平均值' }]
              },
              itemStyle: {
                color: function(series) {
                  return kindo.util.getColor(series.dataIndex)
                }
              }
            }
          ]
        } else {
          this.view.tab[echartObj].series = []
        }
      })
    },
    // 柱状图
    getBar(echartObj, url, params) {
      this.$http.get(url, { params: params }).then(res => {
        this.setDataZoom(res.data.rows.length, echartObj, 25)
        let nameArr = res.data.rows.map(function(o, i) {
          return o.name
        })
        let valArr = res.data.rows.map(function(o, i) {
          return parseFloat(o.value).toFixed(2)
        })
        this.view.tab[echartObj].xAxis[0].data = nameArr
        this.view.tab[echartObj].series[0].data = valArr
      })
    },
    // 柱状图-水平
    getBarH(echartObj, url, params) {
      this.$http.get(url, { params: params }).then(res => {
        let nameArr = res.data.rows.map(function(o, i) {
          return o.name
        })
        let valArr = res.data.rows.map(function(o, i) {
          if (o.value) {
            return o.value
          } else {
            return '-'
          }
        })
        // this.view.tab.安全指标_低风险options.xAxis[0].name = '低风险组死亡率(%)'
        this.view.tab[echartObj].yAxis.data = nameArr
        this.view.tab[echartObj].series.data = valArr
      })
    },
    // 柱线图
    getBarLine(echartObj, url, params) {
      this.$http.get(url, { params: params }).then(res => {
        let data = res.data.rows
        let xAxisData = []
        let barData = []
        let lineData = []
        this.setDataZoom(data.length, echartObj, 25)
        for (let item of data) {
          xAxisData.push(item.name)
          barData.push(parseFloat(item.value).toFixed(2))
          lineData.push(item.rc)
        }
        this.view.tab[echartObj].xAxis.data = xAxisData
        this.view.tab[echartObj].series[0].data = barData
        this.view.tab[echartObj].series[1].data = lineData
      })
    },
    isCompare(row, filed) {
      let obj = this.compare.selection
      if (obj.length > 0) {
        let result = obj.filter(item => {
          return item[filed] === row[filed]
        })
        if (result.length > 0) {
          return true
        } else {
          return false
        }
      }
    },
    compareSel(index, row) {
      this.compare.selectVisi = true
      if (this.compare.selection.length >= 5) {
        this.$message({
          message: '对比最多为5个',
          type: 'warning'
        })
      } else {
        this.compare.selection.push(row)
      }
    },
    compareDate(event, filed) {
      if (this.compare.selection.length > 1) {
        let button = event.target.parentElement
        button.setAttribute('disabled', 'disabled')
        button.classList.add('is-disabled')
        let para = {}
        let Arry = []
        let selection = this.compare.selection
        for (let x in selection) {
          Arry.push(selection[x][filed])
        }
        para = Object.assign({}, this.searchForm, {
          compItems: Arry.join(',')
        })
        this.$http.get(this.compare.url, { params: para }).then(res => {
          button.removeAttribute('disabled')
          button.classList.remove('is-disabled')
          let valArr = res.data.rows.map(function(o, i) {
            return {
              value: [
                o.drgNum,
                kindo.util.formatNum(o.cmmi, 2),
                kindo.util.formatNum(o.timeCostSi, 2),
                kindo.util.formatNum(o.feeCostSi, 2),
                kindo.util.formatNum(o.lowDieRate, 2),
                kindo.util.formatNum(o.midLowDieRate, 2)
              ],
              name: o.itemName
            }
          })
          let nameArr = res.data.rows.map(function(o, i) {
            return o.itemName
          })
          let dataArr = res.data.rows.map(function(o, i) {
            return kindo.util.formatNum(o.ypfyRate, 2)
          })
          let dataArr1 = res.data.rows.map(function(o, i) {
            return kindo.util.formatNum(o.zhfyRate, 2)
          })
          let dataArr2 = res.data.rows.map(function(o, i) {
            return kindo.util.formatNum(o.zdfyRate, 2)
          })
          let dataArr3 = res.data.rows.map(function(o, i) {
            return kindo.util.formatNum(o.zlfyRate, 2)
          })
          let dataArr4 = res.data.rows.map(function(o, i) {
            return kindo.util.formatNum(o.xyfyRate, 2)
          })
          let dataArr5 = res.data.rows.map(function(o, i) {
            return kindo.util.formatNum(o.clfyRate, 2)
          })
          let dataArr6 = res.data.rows.map(function(o, i) {
            return kindo.util.formatNum(o.qtfyRate, 2)
          })
          let legendArr = res.data.rows.map(function(o, i) {
            return o.itemName
          })
          this.source.tabledd = res.data.rows
          this.view.compare.radarChart.legend.data = legendArr
          this.view.compare.radarChart.series[0].data = valArr
          this.view.compare.stackbar.xAxis[0].data = nameArr
          this.view.compare.stackbar.series[0].data = dataArr
          this.view.compare.stackbar.series[1].data = dataArr1
          this.view.compare.stackbar.series[2].data = dataArr2
          this.view.compare.stackbar.series[3].data = dataArr3
          this.view.compare.stackbar.series[4].data = dataArr4
          this.view.compare.stackbar.series[5].data = dataArr5
          this.view.compare.stackbar.series[6].data = dataArr6
          this.compare.visible = true

          this.$nextTick(function() {
            // javascript 触发 window.onresize
            if (Event.prototype.initEvent) {
              const evt = window.document.createEvent('UIEvents')
              evt.initUIEvent('resize', true, false, window, 0)
              window.dispatchEvent(evt)
            } else {
              window.dispatchEvent(new Event('resize'))
            }
          })
        })
      } else {
        this.$message({
          message: '请选择对比项',
          type: 'warning'
        })
      }
    },
    compareRemoveSingle(row, index) {
      this.compare.selection.splice(index, 1)
    },
    compareRemoveAll() {
      this.compare.selection = []
      this.compare.selectVisi = false
    },
    handleClose(done) {
      this.compareRemoveAll()
      done()
    },
    // 导出
    exportTable(url, params) {
      let temp = Object.assign({}, params)
      let paras = ''
      let idx = 0
      for (let o in temp) {
        paras += (idx === 0 ? '?' : '&') + o + '=' + (temp[o] || '')
        if (idx === 0) {
          idx = 1
        }
      }
      window.open(url + paras)
    },
    setDate() {
      let date = this.searchTemp.richDatePicker
      switch (date[0]) {
        case '1':
          this.searchForm.year = date[1]
          this.searchForm.quarter = ''
          this.searchForm.month = ''
          break
        case '2':
          this.searchForm.quarter = date[1] + date[2]
          this.searchForm.month = ''
          this.searchForm.year = ''
          break
        case '3':
          this.searchForm.month = date[1] + date[3]
          this.searchForm.year = ''
          this.searchForm.quarter = ''
          break
      }
    }
  }
}
export default mixinKPI
