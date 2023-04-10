function drawRectangle() {
  // 配置基础参数
  // 声明一个数组，将所有的位置都保存
  let rectangles = []
  // // 设置鼠标按下实践，按下鼠标代表开始画画
  canvas.onmousedown = (e) => {
    // 默认就是 跟随鼠标画线
    // 获取 x y 设置给开始位置
    startPoint.x = e.offsetX;
    startPoint.y = e.offsetY;
    // 把位置推送给数组
    rectangles.push({
      x: startPoint.x,
      y: startPoint.y,
      width: 0,
      height: 0
    })
    // 更改状态 为true 表示 按下
    painting = true
  };
  // 鼠标移动时 的 事件
  canvas.onmousemove = (e) => {
    // 如果painting 为false就直接返回
    if (painting === false) return;
    if (rectangles.length > 0) {
      const currentRect = rectangles[rectangles.length - 1];
      currentRect.width = e.offsetX - currentRect.x;
      currentRect.height = e.offsetY - currentRect.y;
      // 重新绘制
      redraw()
    }

  };

  // 鼠标离开/抬起事件，表示话完了
  canvas.onmouseup = () => {
    painting = false;
    if (rectangles.length > 0) {
      // 取出来最后一个
      const lastRect = rectangles[rectangles.length - 1];
      if (lastRect.width === 0 || lastRect.height === 0) {
        // 如果宽或高为0，删除最后一个
        rectangles.pop();
      }
      // width = e.offsetX - startX;
      // height = e.offsetY - startY;
    }
  };

  // 封装 画线的 方法
  function redraw() {

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 遍历所有 并 绘制
    if (!painting) return
    rectangles.forEach((rect) => {
      if (rect.width > 0 && rect.height > 0) {
        // 颜色，宽度，是否填充，在这里补充
        ctx.beginPath();
        ctx.lineWidth = 5;
        // ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        ctx.closePath();
      }
    })
  };
}