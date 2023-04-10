// 设置一个常量 记录鼠标按下的状态
let painting = false;
// 记录一下 dock栏 的按钮类型
let type;

// 画板基础配置
// 存储位置
let startPoint = {
    x: undefined, 
    y: undefined,
    width: '600',
    height: '450',
    // 定义一个默认的线的颜色
    lineColor: '#000',
    // 定义一个默认的填充的颜色,默认无填充
    lineBjColor: undefined,
    // 线条粗细
    // lineWidth: undefined
};
// 获取画布并设置2d
const canvas = document.getElementById('canvas');
//获得 2d 上下文对象
const ctx = canvas.getContext('2d');
// 先给canvas设置一个默认的高度和宽度
canvas.width = startPoint.width;
canvas.height = startPoint.height;

// 操作按钮设置
// 点击按钮后记录一个全局的值
const functionButton = document.getElementById('functionButton');
functionButton.addEventListener('click', (e) => {
    // 通过给元素设置的 data——type属性可以获取到点击的是什么按钮，在根据type去执行不同的方法
    type = e.target.dataset.type;
    switch (type) {
        case 'straight-line':
            // 直线
            break;
        case 'circular':
            // 圆
            break;
        case 'oval':
            // 椭圆
            break;
        case 'rectangle':
            // 矩形
            drawRectangle()
            break;
        case 'arrowhead':
            // 箭头
            break;
        case 'mobile':
            // 移动画像
            break;      
        case 'add-text':
            // 添加文字
            break; 
        case 'eraser':
            // 橡皮擦
            break;
        case 'pencil':
            // 铅笔
            break;
        case 'crayon':
            // 蜡笔
            console.log('1')
            break;
        case 'moren-line':
            // 默认
            defaultLine()
            break;
        
    }
})


// 这个是 默认的 跟随鼠标画线的方法

function defaultLine() {
    // // 设置鼠标按下实践，按下鼠标代表开始画画
    canvas.onmousedown = (e) => {
        // 默认就是 跟随鼠标画线
        // 获取 x y 设置给开始位置
        let x = e.offsetX;
        let y = e.offsetY;
        startPoint = { x, y};
        // 更改状态 为true 表示 按下
        painting = true
    };
    // 鼠标移动时 的 事件
    canvas.onmousemove = (e) => {
        // 获取位置
        let x = e.offsetX;
        let y = e.offsetY;
        // 把 x y 赋值给新的 位置
        let newPoint = { x: x, y: y }
        // 如果painting 为false就直接返回
        if (!painting) return
        // 为true 就调用画画的方法
        // 后面这里可以判断是 什么按钮，从而得知 用的是线段还是其他形状
        // 设置一个常量用来判断按的是什么按钮，从而执行什么方法
        drawLine(startPoint.x, startPoint.y, newPoint.x, newPoint.y);
        startPoint = newPoint;
    };

    // 鼠标离开/抬起事件，表示话完了
    canvas.onmouseup = () => {
        painting = false;
    };

    // 封装 画线的 方法
    function drawLine(xStart, yStart, xEnd, yEnd) {
        ctx.beginPath();
        // 线宽，改颜色，颜色可以设置一个全局变量，分为线条颜色和填充颜色
        ctx.lineWidth = 5;
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke()
        ctx.closePath
    };
}
// 没有按钮的时候默认执行
defaultLine()


// 线段，矩形，圆形，椭圆， 添加文字， 箭头 ， 三角形

// 清空方法
// 获取清空按钮
const clear = document.getElementById('clear');
// 点击红色按钮也要清空
const close = document.getElementById('close')
// 设置点击清空画布方法
close.onclick = () => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height)  
}
clear.onclick = () => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height)  
};

// 保存功能
// 获取按钮
const save = document.getElementById('save');
// 设置方法
save.onclick = () => {
    const url = canvas.toDataURL('image/jpg');
    const a = document.createElement('a');
    a.href = url;
    a.download = '画板';
    a.target = '_blank';
    a.click();
};

// 最大化， 最小化
const windowBox = document.getElementById('windowBox');
const buttonBox = document.getElementById('buttonBox');
// 最大化的方法
buttonBox.addEventListener('click', (e) => {
    if (e.target.id == 'maximize') {
        windowBox.style.width = '100%';
        // 最大化在调整一下高度就行了
        windowBox.style.margin = '0';
        // canvas.width = '1280'
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - 94

    } else if (e.target.id === 'minimize') {
        windowBox.style.width = '600px';
        windowBox.style.margin = 'auto';
        windowBox.style.marginTop = '10px';
        canvas.width = '600'
        canvas.height = '450'
    } else {
        return;
    }
});
