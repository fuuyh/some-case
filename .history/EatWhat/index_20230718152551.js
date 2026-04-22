// 获取按钮元素
const btn = document.getElementById('start');
// 获取 吃什么 元素
const what = document.getElementById('what');
// 获取时间
const time = document.getElementById('time');
let timer = null;
// 食谱
let book = [];
// 获取时间，添加对应菜谱
(function () {
// 获取当前时间
let timeNow = new Date();
// 获取当前小时
let hours = timeNow.getHours();
// 判断当前时间段
if (hours >= 0 && hours <= 10) {
  time.innerHTML = '早上'
  book.push('面包', '蛋糕', '茶叶蛋', '油条', '馄饨', '小笼包', '包子', '豆浆', '牛奶', '煎饼', '鸡蛋羹', '鸡蛋灌饼', '手抓饼', '食堂')
} else if (hours > 10 && hours <= 14) {
  time.innerHTML = '中午'
  book.push('面条', '米饭', '馒头', '外卖', '煎饼', '手抓饼', '凉皮')
} else if (hours > 14 && hours <= 16) {
  time.innerHTML = '下午茶'
  book.push('奶茶', '饮料', '水果', '冰淇淋', '咖啡', '蛋糕', '面包', '巧克力', '绿豆糕')
} else if (hours > 16 && hours <= 24) {
  time.innerHTML = '晚上'
  book.push('打卤面', '手抓饼', '煎饼', '小笼包', '烩面', '食堂')
}
}())

// 点击按钮 开始
btn.addEventListener('click', function () {
  if (btn.innerHTML === '开始') {
    btn.innerHTML = '停止'
    timer = setInterval(randomContent, 100);
  } else if (btn.innerHTML === '停止') {
    btn.innerHTML = '不行换一个'
    clearInterval(timer); //取消定时器
    timer = null;
  } else if (btn.innerHTML === '不行换一个') {
    // 执行和 开始一样的函数就行
    btn.innerHTML = '停止'
    timer = setInterval(randomContent, 100)
  }
});
// 渲染内容
function randomContent() {
  let random_num = Math.floor(Math.random() * ((book.length - 1) + 1));
  what.innerHTML = book[random_num];
  // 渲染背景
  let random_top = mofun(window.screen.height);
  let random_left = mofun(window.screen.width - 50);
  let rSize = mofun(32, 12);
  let temp = document.body;
  let temps = document.createElement('span')
  // 添加样式
  temps.className = 'temp'
  temps.innerHTML = book[random_num];
  temps.style.display = 'block';
  temps.style.top = random_top + 'px';
  temps.style.left = random_left + 'px';
  temps.style.fontSize = rSize + 'px';
  temps.style.color = `rgba(0, 0, 0, '.' + ${Math.floor(Math.random()*8)})`
  temp.appendChild(temps)
  // 定时清除
  setTimeout(() => {
    temp.removeChild(temps)
  }, 1000)
}
// 随机数设置
function mofun (max, min) {
  max = max || 100;
  min = min || 0;
  return Math.ceil(Math.random() * (max - min) + min);
}