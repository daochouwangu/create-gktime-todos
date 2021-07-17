# create-gktime-todos
将极客时间课程转化为todos文本
## 效果预览
<img src="https://user-images.githubusercontent.com/4903149/126030611-80c71f4b-b681-4203-8c40-3ee8cb79abf6.png" width="300px" /> <img src="https://user-images.githubusercontent.com/4903149/126037473-a38dc4e5-3fd8-414d-922b-b47b89c851ce.png" width="300px" />

## 使用方式

1. 拷贝脚本
2. 打开极客时间课程详情页或者阅读界面

    <img src="https://user-images.githubusercontent.com/4903149/126030415-9a753df2-4a21-4d35-960a-ded754e6c65c.png" width="400px" />
    <img src="https://user-images.githubusercontent.com/4903149/126034684-985e0047-ec56-4af8-9d07-0e7f2b866d47.png" width="400px" />
3. 按F12/ cmd+option+i 呼出控制台
4. 输入脚本 回车运行 
5. 这个时候todos文本已经复制到你的剪贴板上了(默认是 createTasks().withLink())
## 高级功能
所有额外功能均支持链式调用
#### 过滤
createTasks().onlyRequired() 过滤非重要文章  
createTasks().onlyUnread()过滤读完的文章
#### 带上计划时间的todo
createTasks().withTime(peerDay) 生成带计划时间的todos（滴答清单支持）需要传入参数: 每天阅读几章，默认2
#### 支持markdown
createTasks().withMarkdown() 生成markdown格式的todo
#### 支持加入链接
createTasks().withLink() 生成带链接的todo
#### 使用例子
createTasks().withLink().withMarkdown() 带链接的markdown语法  
createTasks().onlyUnread().withLink().withTime() 未读完的带链接和计划时间的
