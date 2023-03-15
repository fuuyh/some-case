# 生成文字肖像
- 上传名字信息，渲染到html
- 上传图拼信息，渲染到北京图片
- 使用css将文字变成黑白
   ```css
  /* 以区块内的文字作为裁剪区域向外裁剪，文字的背景即为区块的背景，文字之外的区域都将被裁剪掉 */
  -webkit-background-clip: text;
  /* 将文字透明镂空 */
  -webkit-text-fill-color: transparent;
  /* 灰度滤镜（转黑白） */
  filter: grayscale(1);
  ```