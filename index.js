(function createTasks() {
  // 过滤不重要的
  function onlyRequired() {
    const newObj = Object.assign({}, this)
    newObj.articles = this.articles.filter((a) => a.is_required)
    return newObj.copyToClipBoard()
  }
  // 过滤读过的
  function onlyUnread() {
    const newObj = Object.assign({}, this)
    newObj.articles = this.articles.filter((a) => !a.is_finished)
    return newObj.copyToClipBoard()
  }
  /**
   *  markdown todo语法
   */
  function withMarkdown() {
    const newObj = Object.assign({}, this)
    newObj.articles = this.articles.map(a => {
      const na = Object.assign({}, a)
      if (na.is_finished) {
        na.article_title = "- [x] " + na.article_title
      } else {
        na.article_title = "- [ ] " + na.article_title
      }
      return na;
    })
    return newObj.copyToClipBoard()
  }
  /**
   * 带上计划时间参数
   * @param {每天阅读文章数量} peerDay 
   * @returns 
   */
  function withTime(peerDay=2) {
    const count = this.articles.filter(a => !a.is_finished).length
    const timeTextGen = getTimeTextGen(peerDay, count)();
    const newObj = Object.assign({}, this)
    newObj.articles = this.articles.map(a => {
      const na = Object.assign({}, a)
      if (!na.is_finished) {
        na.article_title = na.article_title.replace('|', '｜') + '\t' + timeTextGen.next().value
      }
      return na;
    })
    return newObj.copyToClipBoard()
  }
  function copyToClipBoard() {
    console.log("已经将所有文章标题复制到剪贴板， 可以直接粘贴到带批量生成todo的app中，比如滴答清单、微软todo")
    copy(this.articles.map((a) => a.article_title).join('\n'))
    return this
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

  const $vm = document.querySelector("#app").children[0].__vue__
  const articles = $vm.articleList || $vm.articles
  const result = {
    articles,
    withTime,
    onlyRequired,
    onlyUnread,
    copyToClipBoard,
    withMarkdown
  }
  window.result = result
  result.copyToClipBoard()
  console.log("已经将所有文章标题复制到剪贴板， 可以直接粘贴到带批量生成todo的app中，比如滴答清单、微软todo")
  console.log(`接下来使用进行过滤和增加时间限制的高级功能
    result.onlyRequired 来过滤非重要的，比如答疑结尾语
    result.onlyUnread来过滤已经读过的
    result.withTime 生成带时间限制的todo,要传入一个每天读几章的参数，默认2
    result.withMarkdown 生成支持markdown todo的文本
    支持链式调用，比如
    result.onlyUnread().withTime()`
  )
})()
