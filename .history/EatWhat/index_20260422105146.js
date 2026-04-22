// 获取DOM元素
const btn = document.getElementById('start');
const what = document.getElementById('what');
const timeEl = document.getElementById('time');
const openSettingBtn = document.getElementById('openSetting');
const closeSettingBtn = document.getElementById('closeSetting');
const saveSettingBtn = document.getElementById('saveSetting');
const modal = document.getElementById('settingModal');

// 输入框元素
const inputBreakfast = document.getElementById('input-breakfast');
const inputLunch = document.getElementById('input-lunch');
const inputSnack = document.getElementById('input-snack');
const inputDinner = document.getElementById('input-dinner');

let timer = null;

// 默认食谱数据
const defaultBook = {
  breakfast: ['面包', '蛋糕', '茶叶蛋', '油条', '馄饨', '小笼包', '包子', '豆浆', '牛奶', '煎饼', '鸡蛋羹', '鸡蛋灌饼', '手抓饼', '食堂'],
  lunch: ['面条', '米饭', '馒头', '外卖', '煎饼', '手抓饼', '凉皮', '麻辣烫', '盖浇饭', '汉堡'],
  snack: ['奶茶', '饮料', '水果', '冰淇淋', '咖啡', '蛋糕', '面包', '巧克力', '绿豆糕'],
  dinner: ['打卤面', '手抓饼', '煎饼', '小笼包', '烩面', '食堂', '沙拉', '轻食', '火锅', '烧烤']
};

// 当前使用的食谱
let currentBook = [];

// 初始化函数
(function init() {
  // 1. 从 LocalStorage 读取用户设置
  const savedData = localStorage.getItem('myFoodMenu');
  let menuData = savedData ? JSON.parse(savedData) : defaultBook;

  // 2. 填充输入框的值
  inputBreakfast.value = menuData.breakfast.join('，');
  inputLunch.value = menuData.lunch.join('，');
  inputSnack.value = menuData.snack.join('，');
  inputDinner.value = menuData.dinner.join('，');

  // 3. 获取时间，确定当前时间段
  let timeNow = new Date();
  let hours = timeNow.getHours();
  let currentMenu = [];

  if (hours >= 0 && hours <= 10) {
    timeEl.innerHTML = '早上';
    currentMenu = menuData.breakfast;
  } else if (hours > 10 && hours <= 14) {
    timeEl.innerHTML = '中午';
    currentMenu = menuData.lunch;
  } else if (hours > 14 && hours <= 16) {
    timeEl.innerHTML = '下午茶';
    currentMenu = menuData.snack;
  } else if (hours > 16 && hours <= 24) {
    timeEl.innerHTML = '晚上';
    currentMenu = menuData.dinner;
  }

  // 4. 更新当前可用食谱
  currentBook = currentMenu;
  
  // 初始显示一个
  what.innerHTML = currentBook[0];

})()

// --- 核心功能逻辑 ---

// 点击按钮 开始/停止/换一个
btn.addEventListener('click', function () {
  if (btn.innerHTML === '开始') {
    btn.innerHTML = '停止';
    btn.classList.add('active'); // 可选：添加样式变化
    timer = setInterval(randomContent, 100);
  } else if (btn.innerHTML === '停止') {
    btn.innerHTML = '不行换一个';
    clearInterval(timer);
    timer = null;
  } else if (btn.innerHTML === '不行换一个') {
    btn.innerHTML = '停止';
    timer = setInterval(randomContent, 100);
  }
});

// 渲染内容
function randomContent() {
  if (!currentBook || currentBook.length === 0) {
    what.innerHTML = "菜单为空";
    return;
  }

  let random_num = Math.floor(Math.random() * currentBook.length);
  what.innerHTML = currentBook[random_num];
  
  // 渲染背景飘字
  createFloatingText(currentBook[random_num]);
}

// 创建背景飘字效果
function createFloatingText(text) {
  let temp = document.body;
  let temps = document.createElement('span');
  
  temps.className = 'temp';
  temps.innerHTML = text;
  
  // 随机位置
  let random_top = mofun(window.innerHeight - 50);
  let random_left = mofun(window.innerWidth - 100);
  
  // 随机大小
  let rSize = mofun(40, 14);
  
  temps.style.top = random_top + 'px';
  temps.style.left = random_left + 'px';
  temps.style.fontSize = rSize + 'px';
  
  // 随机透明度
  temps.style.opacity = Math.random() * 0.3 + 0.1;

  temp.appendChild(temps);

  // 动画结束后移除元素 (配合CSS animation)
  setTimeout(() => {
    if(temps.parentNode) {
      temp.removeChild(temps);
    }
  }, 1000);
}

// 随机数工具函数
function mofun(max, min) {
  max = max || 100;
  min = min || 0;
  return Math.ceil(Math.random() * (max - min) + min);
}

// --- 设置面板逻辑 ---

// 打开设置
openSettingBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  // 暂停当前的滚动，防止后台运行
  if(timer) {
      clearInterval(timer);
      timer = null;
      btn.innerHTML = '开始';
  }
});

// 关闭设置
closeSettingBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});

// 保存设置
saveSettingBtn.addEventListener('click', () => {
  // 获取输入值并分割成数组 (支持中文逗号、英文逗号、空格)
  const parseInput = (val) => val.split(/[,，\s]+/).filter(item => item.trim() !== '');

  const newMenu = {
    breakfast: parseInput(inputBreakfast.value),
    lunch: parseInput(inputLunch.value),
    snack: parseInput(inputSnack.value),
    dinner: parseInput(inputDinner.value)
  };

  // 简单校验，防止空菜单
  if(newMenu.breakfast.length === 0) newMenu.breakfast = defaultBook.breakfast;
  if(newMenu.lunch.length === 0) newMenu.lunch = defaultBook.lunch;
  if(newMenu.snack.length === 0) newMenu.snack = defaultBook.snack;
  if(newMenu.dinner.length === 0) newMenu.dinner = defaultBook.dinner;

  // 保存到 LocalStorage
  localStorage.setItem('myFoodMenu', JSON.stringify(newMenu));

  // 重新初始化以应用更改
  // 这里简单处理：刷新页面或者手动重新运行 init 逻辑
  // 为了体验更好，我们手动更新 currentBook 而不刷新页面
  let hours = new Date().getHours();
  if (hours >= 0 && hours <= 10) currentBook = newMenu.breakfast;
  else if (hours > 10 && hours <= 14) currentBook = newMenu.lunch;
  else if (hours > 14 && hours <= 16) currentBook = newMenu.snack;
  else if (hours > 16 && hours <= 24) currentBook = newMenu.dinner;

  modal.style.display = 'none';
  alert('菜单保存成功！');
});