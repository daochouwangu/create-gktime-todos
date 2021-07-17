(function createTasks() {
  /**
   * 
   * @param {每天阅读文章数量} peerDay 
   * @param {已经阅读的文章数量} startOffset 
   * @returns 
   */
  function start(peerDay=2, startOffset = 0) {
    if (startOffset < 0) {
      throw Error('已学数量不能为负数')
    }
    if (startOffset >= result.length) {
      throw Error(`已学数量过长, 范围：[0-${result.length-1}]`)
    }
    const left = result.length - startOffset
    const timeTextGen = getTimeTextGen(peerDay, left)();
    const tasks = result.slice(0, startOffset).join('\n')
                + (startOffset > 0 ? '\n' : '')
                + result.slice(startOffset).map((article, i) => article + '\t' + timeTextGen.next().value).join('\n')
    copy(tasks)
    console.log('已经复制到粘贴板')
  }
  function getTimeTextGen(peerDay, count) {
    const today = Date.now();
    let left = count;
    let curTime = today;
    let dayCount = 0;
    const DAY = 24 * 60 * 60 * 1000
    return function* gen() {
      while (left) {
        yield createTimeText(curTime);
        dayCount = (dayCount + 1) % peerDay;
        if (dayCount === 0) {
          curTime += DAY
        }
        left --;
      }

    }
  }
  function createTimeText(time) {
    const date = new Date(time)
    return `${date.getMonth()+1}-${date.getDate()}`
  }
  const result = []
  document.querySelectorAll("a[data-seo]").forEach((article) => {
    result.push(article.innerText.replace('|', ''))
  })
  const text = result.join('\n')
  copy(text)
  console.log("已经将文章列表复制到剪贴板")
  console.log("接下来可以通过调用start(peerDay=2, startOffset=0)方法传入每天学习文章数量(>=1,整数)和已经学过的文章数量，自动生成带时间的任务列表")
  window.start = start
})()

