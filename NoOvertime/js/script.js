// 获取按钮
const btn = document.getElementById('btn');
// 获取打卡时间
const dksj = document.getElementById('dksj');
// 获取剩余时间
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const card = document.getElementById('card');
// 下班了弹窗
const xbl = document.getElementById('xbl');
const xbxs = document.getElementById('xbxs');
let timer


if (localStorage.getItem('nowTime')) {
  getTime()
  timer = setInterval(getEndTime, 1000);
}

// 点击按钮获取当前时间，添加到打卡时间上面
btn.onclick =  () => {
  let date = new Date()
  localStorage.setItem('nowTime', date)
  getTime()
  // 设置每一秒钟调用一次 倒计时函数setCountdown
  timer = setInterval(getEndTime, 1000);
}

function getTime () {
  let date = new Date(localStorage.getItem('nowTime'));
  let sign2 = ":"
  let n = date.getFullYear();
  let y = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1 ): (date.getMonth() + 1);
  let r = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
  let s = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() ; // 时
  let f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() ; // 分
  let m = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() ; //秒
  let csj = n + "-" + y + "-" + r + " " + s + sign2 + f + sign2 + m
  // 添加到页面中
  dksj.innerHTML = csj;
  // 翻转卡片
  card.style.animation = 'rotate 1.2s cubic-bezier(0.66, -0.47, 0.33, 1.5) forwards'
  // return n + "-" + y + "-" + r + " " + s + sign2 + f + sign2 + m;
}

// 下班时间
// 下班倒计时
function getEndTime () {
  const xbsj = localStorage.getItem('nowTime');
  const xbsjn = new Date(xbsj);
  const addHour = xbsjn.setHours(xbsjn.getHours() + 9);
  // const addHour = xbsjn.setSeconds(xbsjn.getSeconds() + 13);
  const xb = new Date(addHour);
  const now = new Date();
  // 下班时间
  const dateDiff = ( xb - now ) / 1000;
  // 获取剩余天数时间
  const h = Math.floor(dateDiff / 60 / 60) % 24;
  const m = Math.floor(dateDiff / 60) % 60 ;
  const s = Math.floor(dateDiff) % 60 ;
  // 判断剩余时间等于0 停止定时器， 并修改样式
  if (h <= 0 && m <= 0 && s <= 0) {
    // 符合条件后 3秒结束
    clearInterval(timer);
    // 删除本地存储数据
    localStorage.clear()
    setTimeout(() => {
      location.reload()
    }, 3000);
    xbl.style.display = 'none';
    xbxs.style.display = 'block'
  }
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
  
}