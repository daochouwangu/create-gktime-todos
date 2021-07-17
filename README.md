# create-gktime-todos
将极客时间课程转化为todos文本
## 使用方式

1. 拷贝脚本
2. 打开极客时间课程详情页
    ![image](https://user-images.githubusercontent.com/4903149/126030415-9a753df2-4a21-4d35-960a-ded754e6c65c.png)
3. 按F12/ cmd+option+i 呼出控制台
4. 输入脚本 回车运行
5. 这个时候一般的todos文本已经复制到你的剪贴板上了，使用有批量导入（滴答清单/微软todo）的app批量生成todos
## 高级功能
#### 过滤
 链式调用使用过滤功能：
 result.onlyRequired() 过滤非重要文章， 
 result.onlyUnread过滤读完的文章
#### 带上时间的todo
result.withTime(peerDay) 生成带时间的todos（滴答清单支持）需要传入每天阅读几章参数，默认2

#### 使用例子
result.onlyUnread().withTime(3)
![image](https://user-images.githubusercontent.com/4903149/126034347-411c5e71-7697-4f90-bc28-0865b0ffac11.png)

![image](https://user-images.githubusercontent.com/4903149/126030611-80c71f4b-b681-4203-8c40-3ee8cb79abf6.png)
