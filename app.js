var fs = require("fs");
var jsonfile = require("jsonfile");
var set = require("lodash.set");

var langFlolder = "./lang";

if (!isExist(langFlolder)) {
  console.log("不存在文件夹, 将创建lang");
  fs.mkdirSync(langFlolder);
} else {
  console.log("已存在文件夹, 将删除lang里的文件");
  deleteFolderFile(langFlolder);
}
var fileNames = [];
// 读取 lang.txt，
fs.readFile("lang.txt", async function (err, result) {
  if (err) return;
  var textArr = (data = String(result).split(/\r?\n/gi));
  //已换行分隔的字符串数组
  console.log("=textArr=", textArr);
  var currentObj = {},
    currentKey = "";
  for (var i = 0; i < textArr.length; i++) {
    var lineData = textArr[i];
    // console.log("=lineData=", lineData);
    if (i == 0) {
      fileNames = JSON.parse(lineData);
      console.log("=fileNames=", fileNames);
    } else if (lineData == "") {
      // 遇到空行，去处理已经收集的obj
      if (JSON.stringify(currentObj) != "{}") {
        // currentObj = ['home.createPost' : ['create Post', '发帖', '發帖']]
        currentKey = "";
        await handleObj(currentObj);
      }
      currentObj = {};
    } else {
      // 不是空行，开始收集obj
      // 第开的一行，定义key
      if (!currentKey) {
        currentKey = lineData;
        currentObj[currentKey] = [];
      } else {
        currentObj[currentKey].push(lineData);
      }
    }
  }
});

async function handleObj(obj) {
  if (obj.length === 0) return;
  console.log("=obj=", obj, fileNames);
  var key = Object.keys(obj)[0];
  for (var i = 0; i < fileNames.length; i++) {
    await writeToFile(
      langFlolder + "/" + fileNames[i] + ".json",
      key,
      obj[key][i]
    );
  }
}

function writeToFile(fileUrl, key, value) {
  console.log("=fileUrl, key, value=", fileUrl, key, value);
  return new Promise((resolve, reject) => {
    jsonfile.readFile(fileUrl, (e, obj) => {
      obj = obj || {};
      // set(obj, key, value);
      obj[key] = value;
      console.log("=write=", obj);
      jsonfile.writeFile(fileUrl, obj, { spaces: 2 }, (err, re) => {
        if (err) reject(err);
        console.log("=re=", re);
        resolve();
      });
    });
  });
}

function isExist(url) {
  return fs.existsSync(url);
}

function deleteFolderFile(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
}
