# 我的精神宇宙 / My Inner Universe

一个私人追星精神时刻收藏网页，使用原生 HTML、CSS 和 JavaScript，无后端、登录、数据库或构建依赖。

## 预览

下载或复制整个项目到电脑，用浏览器打开 `index.html` 即可使用。请保持四个文件与 assets 文件夹的相对位置。

也可以在项目目录运行 `python3 -m http.server 8000`，再在浏览器访问本地 8000 端口。

## 文件

- `index.html`：页面骨架。
- `style.css`：配色、布局和手机适配。
- `data.js`：所有人物、收藏条目、图片路径、视频链接与界面文案。
- `app.js`：导航、渲染、标签与情绪组合筛选、主题切换。
- `assets/`：放置可使用的图片。

## 替换内容

编辑 `data.js`：

- `people` 中的 `cover`：首页卡片和详情封面，例如 `assets/su-cover.jpg`。
- `memories` 中的 `image`：收藏图片，例如 `assets/my-memory.jpg`。
- `memories` 中的 `url`：你确认过的 HTTP 或 HTTPS 视频、物料链接。空链接显示“待补链接”。
- `name`、`english`、`keywords`、`description`、`roomDescription` 和每条记忆的 `title`、`text`：人物与收藏文案。
- `tags`、`emotions`：筛选选项；条目中的标签和情绪要与人物的选项一致。
- `ui`：导航、按钮与提示语。`section` 应与 `ui.sections` 中的栏目名称一致。

所有封面和图片默认为空，用渐变占位；没有真人生成图片或虚构视频链接。当前内容为待填写提示与私人感受，不是官方人物资料。郑雅贤的粉色、天蓝色属于个人房间主题，并非官方应援色。

点击卡片或进入按钮打开房间。标签和情绪同时选中时，显示同时符合两者的条目；清除筛选恢复全部内容。手机上栏目导航可以左右滑动。

内容修改保存在文件里；本版没有网页内编辑或自动保存功能。保持本地使用即可作为私人收藏，不要把私人内容发布到公开网站。

## 明亮图片入口

首页采用暖白、奶油色和浅金、浅粉、浅天蓝渐变。卡片图片区域固定为 4:5，推荐使用 4:5 或 3:4 竖图，`object-fit: cover` 自动裁切。

点击“选择封面图片”可在当前页面预览本地图片，不会上传到网络；切换房间后仍保留，刷新页面即恢复默认。永久替换请将图片放入 `assets/`，修改 `data.js` 对应人物的 `cover` 字段，并提交到仓库。`coverPosition` 可调整裁切位置，例如 `"50% 30%"`。无图片或路径失效时保留柔和渐变占位。

## 爆米花记忆粒子

首页使用前、中、后三层 CSS 爆米花：桌面默认 10 / 32 / 52 粒，手机 8 / 25 / 40 粒。桶首先出现；前景在 0.5–2 秒内展开，中景、背景在 1–5 秒逐步扩散，然后慢速漂浮。前景透明度为 0.75–0.95，中景 0.45–0.7，背景 0.15–0.35。

在 `data.js` 的 `popcorn.layers` 中分别调整每层的 `desktopCount`、`mobileCount`、`sizeRange`、`mobileSizeRange`、`opacityRange`、`animationDurationRange`、`delayRange`、`entranceDuration`、`driftDistance` 和 `spacing`。`spreadArea` 控制整页分布，`exclusionPadding` 控制文字留白。

前景位于空白区域的较高视觉层，中景与背景在内容下方。三层都不响应点击，动态遮罩避开文字与卡片，包括倾倒途中的轨迹。进入详情会清理粒子；改变窗口会重新计算布局。系统开启“减少动态效果”时显示静态粒子。极窄布局优先避让，可能减少实际数量。
