/*
 * updated by pengzhen on 2017/6/21
 * peng_zhen@outlook.com
 * -------------------------------------------------
 * 工具类:
 * 字典类, 存储键值对
 */

let dictionary = {
  getDictionary: catalog => {
    if (!catalog) {
      console.error('catalog 为空, 无法获取字典值', '提示', 'warning')
    }

    return kindo.globalBus.$http
      .get(kindo.api.upms + 'nologin/dict/get', {
        params: {
          catalog
        }
      })
      .then(res => {
        if (catalog === 'DICT_DYN_KESHI') {
          let result = res.data.map(item => {
            let tempVal = kindo.pinyin(item.label, { style: kindo.pinyin.STYLE_FIRST_LETTER }).toString()
            return {
              value: item.value,
              label: tempVal.substr(0, 1).toUpperCase() + item.label
              // charCode: tempVal
              //   .substr(0, 1)
              //   .toUpperCase()
              //   .charCodeAt()
            }
          })
          // result.sort((itema, itemb) => {
          //   return itema.charCode - itemb.charCode
          // })
          return result
        } else {
          return res.data
        }
      })
  },

  getLabel: (source, value) => {
    if (value === null) {
      return '-'
    } else if (value === '') {
      return ''
    }
    const item = source.filter(item => item.value === value)
    if (item.length > 0) {
      return item[0].label
    }
    if (value === '0' || value === 0) {
      return ''
    }
  },

  getValue: (source, label) => {
    const item = source.filter(item => item.label === label)
    if (item.length > 0) {
      return item[0].value
    }

    return ''
  }
}

export default dictionary
