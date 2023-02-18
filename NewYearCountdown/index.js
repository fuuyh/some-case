// 获取所有元素
const year = document.getElementById('year');
const countdown = document.getElementById('countdown');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const loading = document.getElementById('loading');

// 通过获取今天的日期截取今年年份 
const currentYear = new Date().getFullYear();
// 获取 新年 的时间 January 01 2023 00:00:00 （2023年1月1日）
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
// 背景显示的年份渲染到页面内容
year.innerText = currentYear + 1;
// 设置倒计时

function setCountdown () {
  // 获取现在的时间
  const currentTime = new Date();
  // 用新年的时间减去现在的时间 
  const dateDiff = ( newYearTime - currentTime ) / 1000;
  // 获取剩余天数时间
  const d = Math.floor(dateDiff / 60 / 60 / 24);
  const h = Math.floor(dateDiff / 60 / 60) % 24;
  const m = Math.floor(dateDiff / 60) % 60;
  const s = Math.floor(dateDiff) % 60;
  // 给时间渲染到页面中
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}

// 一秒钟后删除 加载图标 并给倒计时添加 flex 让他显示出来
setTimeout(() => {
  loading.remove();
  countdown.className = 'current-down';
}, 1000);
// 设置每一秒钟调用一次 倒计时函数setCountdown
setInterval(setCountdown, 1000);
