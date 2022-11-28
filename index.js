function setIntervalPrecision(callback, delay) {
    // 生成并记录定时器ID
    let obj = window.interValPrecisionObj || (window.interValPrecisionObj = { num: 0 })
    obj.num++
    obj['n' + obj.num] = true
    var intervalId = obj.num
    // 开始时间
    var startTime = +new Date()
    // 已执行次数
    var count = 0
    // 延迟时间
    delay = delay || 0
  
  
    ;(function loop() {
      // 定时器被清除，则终止
      if (!obj['n' + intervalId]) return
  
      // 满足条件执行回调
      if (+new Date() > startTime + delay * (count + 1)) {
        count++
        callback(count)
      }
  
      requestAnimationFrame(loop)
    })()
  
    return intervalId
  }
  