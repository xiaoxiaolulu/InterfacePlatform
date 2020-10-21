const filters = {
  dateFormat: function (msg, pat) {
    //addZero函数 封装了填充0的操作
    //padStart 是ES5中 填充字符串  str.padStart(填充后的长度,填充的内容)
    function addZero(msg) {
      return msg.toString().padStart(2, '0')
    }
    //处理时间戳,如果传入的是时间戳转成标准时间
    msg = new Date(msg)
    let y = msg.getFullYear()
    let m = addZero(msg.getMonth() + 1)
    let da = addZero(msg.getDate())
    let h = addZero(msg.getHours())
    let s = addZero(msg.getSeconds())
    let mi = addZero(msg.getMinutes())
    //处理传的时间格式大小写混乱
    if (pat && pat.toLowerCase('yyyy-mm-dd')) {
      return `${y}-${m}-${da}`
    } else {
      //处理 : 没有传参 
      return `${y}-${m}-${da} ${h}:${s}:${mi}`
    }
  }
}

export default filters;