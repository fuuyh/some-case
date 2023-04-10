
  // 设置随机数函数
  function randomF(min, max) {
    if (arguments.length < 2) {
      max = min,
        min = 0;
    } else if (min > max) {
      let v = min;
      min = 0
      max = v
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  // 通过ID获取画布
  let canvas = document.getElementById('canvas')
  // 设置 画布为2d
  let ctx = canvas.getContext('2d')
  // 设置画布宽高等于屏幕宽高
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let stars = []; // 星星数组
  let maxNum = 800; //星星数量

  // 星星画布
  let starCanvas = document.createElement("canvas");
  let starCtx = starCanvas.getContext('2d');
  starCanvas.width = 100;
  starCanvas.height = 100;
  let r = 50;

  // 设置渐变色
  let gradient2 = starCtx.createRadialGradient(r, r, 0, r, r, r);
  gradient2.addColorStop(0.025, '#fff');
  gradient2.addColorStop(0.15, 'hsl(211, 61%, 33%)');
  gradient2.addColorStop(0.45, 'hsl(211, 64%, 6%)');
  gradient2.addColorStop(1, 'transparent');
  starCtx.fillStyle = gradient2;
  starCtx.beginPath();
  starCtx.arc(r, r, r, 0, Math.PI * 2);
  starCtx.fill();


  // 轨迹半径函数
  function maxOrbit(x, y) {
    let max = Math.max(x, y),
      diameter = Math.round(Math.sqrt(max * max + max * max))
    return diameter / 2;
  }

  // 星星
  let Star = function () {
    // 轨道半径
    this.orbitRadius = randomF(maxOrbit(w, h));
    // 星星大小
    this.radius = randomF(60, this.orbitRadius) / 12;
    // 屏幕中心
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    // 移动速度
    this.timePassed = randomF(0, maxNum);
    this.speed = randomF(this.orbitRadius) / 300000;
    // 随机透明度
    this.alpha = randomF(2, 10) / 10;
    stars.push(this)
  }

  // 绘制方法
  Star.prototype.draw = function () {
    // 坐标
    let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
    let y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
    // 是否闪烁
    let twinkle = randomF(10);
    // 修改透明度
    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05
    }
    ctx.globalAlpha = this.alpha;
    // 测试话星星点
    ctx.drawImage(starCanvas, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    // 速度
    this.timePassed += this.speed;
  }

  // 
  for (let i = 0; i < maxNum; i++) {
    new Star();
  }

  // 更新
  function update() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#060f19';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    // 便利绘制星星
    for (let i = 0; i < stars.length; i++) {
      stars[i].draw()
    }
    // 实施更新
    window.requestAnimationFrame(update)
  }
  update();
