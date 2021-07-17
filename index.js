function createTasks() {
  // 过滤不重要的
  function onlyRequired() {
    this.articles = this.articles.filter((a) => a.is_required)
    return this.copyToClipBoard()
  }
  // 过滤读过的
  function onlyUnread() {
    this.articles = this.articles.filter((a) => !a.is_finished)
    return this.copyToClipBoard()
  }
  /**
   *  markdown todo语法
   */
  function withMarkdown() {
    if (this.isMarkdown) return this
    this.isMarkdown = true
    this.articles = this.articles.map(a => {
      if (a.is_finished) {
        a.prefix = "- [x] "
      } else {
        a.prefix = "- [ ] "
      }
      return a;
    })
    return this.copyToClipBoard()
  }
  /**
   * 带上计划时间参数
   * @param {每天阅读文章数量} peerDay 
   * @returns 
   */
  function withTime(peerDay=2) {
    if (this.isWithTime) return this
    this.isWithTime = true
    const count = this.articles.filter(a => !a.is_finished).length
    const timeTextGen = getTimeTextGen(peerDay, count)();
    this.articles = this.articles.map(a => {
      if (!a.is_finished) {
        a.article_title = a.article_title.replace('|', '｜')
        a.suffix = '\t'+timeTextGen.next().value
      } else {
        a.suffix = ''
      }
      return a;
    })
    return this.copyToClipBoard()
  }
  function withLink() {
    if (this.isWithLink) return this
    this.isWithLink = true
    const prefix = 'https://time.geekbang.org/column/article/';
    this.articles = this.articles.map(a => {
      a.article_title = `[${a.article_title}](${prefix+a.id})`
      return a
    })
    return this.copyToClipBoard()
  }
  function copyToClipBoard() {
    console.log("已经将所有文章标题复制到剪贴板， 可以直接粘贴到带批量生成todo的app中，比如滴答清单、微软todo")
    copy(this.articles.map((a) => a.prefix + a.article_title + a.suffix +'  ').join('\n'))
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
  let articles = $vm.articleList || $vm.articles
  articles = articles.map(a => {
    let na = Object.assign({}, a)
    na.prefix = ''
    na.suffix = ''
    return na
  })
  const result = {
    articles,
    withTime,
    onlyRequired,
    onlyUnread,
    copyToClipBoard,
    withMarkdown,
    withLink
  }
  result.copyToClipBoard()
  console.log("已经将所有文章标题复制到剪贴板， 可以直接粘贴到带批量生成todo的app中，比如滴答清单、微软todo")
  console.log(`接下来使用进行过滤和增加时间限制的高级功能
    result.onlyRequired 来过滤非重要的，比如答疑结尾语
    result.onlyUnread来过滤已经读过的
    result.withTime 生成带时间限制的todo,要传入一个每天读几章的参数，默认2
    result.withMarkdown 生成支持markdown todo的文本
    result.withLink  生成带链接的todo
    支持链式调用，比如
    result.onlyUnread().withTime()`
  )
  return result
}
