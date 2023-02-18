const buttonContainer = document.querySelector('.buttons');
const prevElement = document.querySelector('.prev');
const currentElement = document.querySelector('.current');
let currentNumber = '', prevNumber = '', sign = '';
// 时间委托
buttonContainer.addEventListener('click', e => {
  // 通过 datatype 值判断点击的是数字 还是 运算符
  const type = e.target.dataset.type;
  const text = e.target.textContent;
  // 如果点击的是 等于号 
  if (type === 'equal') {
    // 执行 求等 的方法 
    calculate()
  } else if (type === 'operate') {
    // 点击的 是 加减乘除
    operate(text)
  } else if (type === 'delete') {
    // 删除
    deleteFn()
  } else if (type === 'clear') {
    // 清除
    clear()
  } else {
    // 剩下的是数字
    pushNumber(text)
  }
  updateScreen()
});

function pushNumber(num) {
  currentNumber += num;
};

function clear() {
  currentNumber = '';
  prevNumber = '';
  sign = '';
}

function deleteFn() {
  if (!currentNumber.toString().length) return;
  currentNumber = currentNumber.toString().slice(0, -1);
}

function operate(text) {
  if (!currentNumber.toString().length) return;
  sign = text;
  prevNumber = currentNumber;
  currentNumber = ''
}

function calculate() {
  let res = 0;
  const prev = Number(prevNumber);
  const current = Number(currentNumber);
  switch(sign) {
    case '+':
      res = prev + current;
      break;
    case '-':
      res = prev - current;
      break;
    case '*':
      res = prev * current;
      break;
    case '/':
      res = (prev / current).toFixed(2);
      break;
    default:
      return;
  }
  currentNumber = res;
  sign = '';
  prevNumber = '';
};

function updateScreen() {
  currentElement.textContent = currentNumber;
  if (sign) {
    prevElement.textContent = `${prevNumber} ${sign}`;
  } else {
    prevElement.textContent = '';
  }
}