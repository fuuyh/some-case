// 获取canvas 元素
const cvs = document.getElementById('bg');
// 获取视口尺寸
const width = window.innerWidth * devicePixelRatio;
const height = window.innerHeight * devicePixelRatio;
// 设置canvas尺寸为窗口尺寸
cvs.width = width;
cvs.height = height;
// 获取绘制上下文
const ctx = cvs.getContext('2d');
// 字体大小
const fontSize = 12 * devicePixelRatio;
// 设置列宽
const columnWidth = fontSize;
// 列数量
const columnCount = Math.floor(width / columnWidth);
// 每一列下一个字符是第几个字符
const nextCharts = new Array(columnCount).fill(0);

// 画一排文字
function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // 设置背景颜色
  ctx.fillRect(0, 0, width, height);
  for(let i = 0; i < columnCount; i++){
    // 画第i列的字符
    const char = getRandomText();
    ctx.fillStyle = getRandomColor(); // 获得颜色
    ctx.font = `${fontSize}px "Roboto Mono"`; // 设置字体
    const x = i * columnWidth;
    const index = nextCharts[i];
    const y = (index + 1) * fontSize;
    ctx.fillText(char, x, y);
    // 更新下一个字符的位置
    if (y > height && Math.random() > 0.99) {
      nextCharts[i] = 0;
    } else {
      nextCharts[i]++;
    }
    
  }
}


// 随机颜色
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
// 随机文字
function getRandomText() {
  return String.fromCharCode(Math.floor(Math.random() * 95) + 33);
}

draw();

// 设置定时器
setInterval(draw, 50);