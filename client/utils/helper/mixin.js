/*
 * updated by zhengtian on 2018/04/19
 * modify by
 * -------------------------------------------------
 * 常用方法处理
 * -------------------------------------------------
 * getDictionary       : 获取静态数据字典
 * dateCombChange      : 年，季度，月份组合框显示
 * setSearchDate       : 设置年，季度，月份传给服务端的值
 * setDataZoom         : echarts区域缩放dataZoom
 * getTable            : 加载kindo-table数据
 * blurSel             : 当模糊查询取消焦点时，清空list列表
 * remoteMethod        : 模糊查询表格
 */
import debounce from 'lodash/debounce'
export const mixin = {
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
        cchiList: kindo.api.cDrgOGM + 'ssfjglcla/sscx/queryCchi/',
        // 编码标准化的诊断名称的模糊查询
        bzzdList: kindo.api.codeStandard + 'bmbz/getStand',
        // 编码标准化的操作名称的模糊查询
        bzczList: kindo.api.codeStandard + 'cchiCompare/getCchi'
      }
    }
  },
  methods: {
    /*
     * 获取静态数据字典
     * @obj   object  : 静态字典对象
     */
    getDictionary(obj) {
      for (let k in this[obj]) {
        if (this[obj].hasOwnProperty(k)) {
          kindo.dictionary.getDictionary(k).then(res => {
            this[obj][k] = res || []
          })
        }
      }
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
    initTime() {
      let nowMonth = new Date().getMonth()
      if (nowMonth === 0) {
        // 如果是1月
        this.dateComb.year = new Date().getFullYear() - 1
        this.dateComb.month = '12'
      } else {
        // 如果不是1月
        this.dateComb.year = new Date().getFullYear().toString()
        this.dateComb.month = nowMonth < 10 ? '0' + nowMonth : nowMonth
      }
    },
    /*
     * 年，季度，月份组合框显示
     * @val      string  : el-select选中的值
     */
    dateCombChange(val) {
      switch (val) {
        case '1':
          this.dateComb.visibleQuarter = false
          this.dateComb.visibleMonth = false
          break
        case '2':
          this.dateComb.quarter = '1'
          this.dateComb.visibleQuarter = true
          this.dateComb.visibleMonth = false
          break
        case '3':
          this.dateComb.month = '01'
          this.dateComb.visibleQuarter = false
          this.dateComb.visibleMonth = true
          break
      }
    },
    /*
     * 获取某一年某一个月的最后一天返回格式： '2018-2-28’
     * @year      string  : 某一年
     * @month     string  : 某一月
     */
    getLastDay(year, month) {
      let newYear = year // 取当前的年份
      // 取下一个月的第一天，方便计算（最后一天不固定）
      let newMonth = month
      if (month > 12) {
        newMonth = 0
        newYear++
      }
      var newDate = new Date(newYear, newMonth, 1) // 取当年当月中的第一天
      return new Date(newDate.getTime() - 1000 * 60 * 60 * 24).toLocaleDateString().replace(/\//g, '-') // 获取当月最后一天日期
    },
    /*
     * 设置年，季度，月份传给服务端的值
     */
    setSearchDate() {
      let val = this.dateComb.dateType
      switch (val) {
        case '1':
          this.search.year = kindo.util.formatDate(this.dateComb.year, 'yyyy')
          this.search.quarter = ''
          this.search.month = ''
          break
        case '2':
          this.search.quarter = kindo.util.formatDate(this.dateComb.year, 'yyyy') + this.dateComb.quarter
          this.search.month = ''
          this.search.year = ''
          break
        case '3':
          this.search.month = kindo.util.formatDate(this.dateComb.year, 'yyyy') + this.dateComb.month
          this.search.year = ''
          this.search.quarter = ''
          break
      }
    },
    /*
     * echarts区域缩放dataZoom
     * @length   number  : dataZoom数据总长度
     * @obj      object  : echarts的options对象
     */
    setDataZoom(length, obj) {
      if (length > 25) {
        this[obj].dataZoom[0].show = true
        this[obj].dataZoom[0].end = parseInt((25 / length) * 100)
      } else {
        this[obj].dataZoom[0].show = false
        this[obj].dataZoom[0].end = 100
      }
    },
    /*
     * 加载kindo-table数据
     * @table   string  : kindo-table的ref
     */
    getTable(table) {
      this.$refs[table].loadData()
    },
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
          case 'bzzdList':
            api = this.api.bzzdList
            params = {
              sa: query
            }
            break
          case 'bzczList':
            api = this.api.bzczList
            params = {
              cchi: query
            }
            break
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
            if (res.data && (res.data.length > 0 || res.data.rows.length > 0)) {
              let tempData = res.data.rows || res.data
              let arr = tempData.map(item => {
                let tempObj = {}
                switch (list) {
                  case 'bzzdList':
                    tempObj = {
                      label: item.saName,
                      value: item.saCode,
                      id: item.sid
                    }
                    break
                  case 'bzczList':
                    tempObj = {
                      label: item.cchiName,
                      value: item.cchiCode,
                      id: item.sid
                    }
                    break
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
    }, 500)
  }
}
export default mixin
