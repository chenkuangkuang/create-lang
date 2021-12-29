# create-lang

批量生成前端语言包（zh-CN.json、en-US.json……）

###使用步骤

1.编写 lang.txt; 
2.命令行执行 node app； 
3.等待 lang 文件夹中的语言包文件生成；

###lang.txt 编写格式

第一行数组为语言包类型数量:
["en-US", "zh-CN", "zh-TW"]
注意双引号
数组内数目与 下文的换行语言数目保持一致

第三行开始编写语言翻译，格式为
key
"en-US"语言中 key 对应的语言文本
"zh-CN"语言中 key 对应的语言文本
"zh-TW"语言中 key 对应的语言文本
结束则留一个空行
再开始新 key……

*本项目参考了 https://github.com/Ghostliming/local-lang
