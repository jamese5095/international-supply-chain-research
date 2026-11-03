# 静态部署说明

本文件夹即完整网站：根目录的 `index.html` 是实际首页，直接加载同目录的脚本与数据，不再跳转到 `docs/`。

## 云平台从 GitHub 部署

| 设置 | 值 |
| --- | --- |
| 项目类型 | 静态网站 / Other |
| 项目根目录 | 仓库根目录 |
| 发布 / 输出目录 | `.` |
| 安装命令 | 留空 |
| 构建命令 | 留空 |
| 默认首页 | `index.html` |

GitHub Pages 使用 `main` 分支的 `/ (root)`。云平台应允许公开访问网站文件，并按真实路径提供 HTML、JS、CSS、JSON 和图片。无需服务器程序、数据库或运行时环境变量。

## 手动上传

使用 `python3 scripts/package-static.py /输出路径/国际供应链研究看板_云部署.zip` 生成完整网页包。

将压缩包内容直接解压到网站根目录。解压后应为：

```text
index.html
app.js
research-data.js
style.css
trade-heatmaps.html
enterprises.html
capability-export.html
capability-import.html
downloads/
vendor/
…其他配套文件
```

保持文件名及子目录结构。不能仅上传 `index.html`，也不能将整个网站额外包在未被指定为发布目录的子文件夹中。

## 访问检查

部署完成后，以下地址均应直接可访问：

- `/`：首页两张图表。
- `/downloads/scale-2025.json`：JSON 数据，不能是 HTML 首页或登录页。
- `/trade-heatmaps.html`：区域热力图。
- `/enterprises.html`：企业业务。
- `/capability-export.html`、`/capability-import.html`：出口、进口能力建设。

若部署在 `/项目名/` 子路径，以上地址相应增加该前缀；页面全部使用相对资源路径。

不要启用“所有路径回退到首页”的单页应用规则。首页内部使用 `#home`、`#flows/1` 定位，这些片段不需要服务器重写。

## 本地预览

在项目根目录运行 `python3 -m http.server 8765`，打开 `http://localhost:8765/`。直接双击 HTML 使用 `file://` 打开会被浏览器限制读取 JSON，应通过 HTTP 访问。

启动不依赖外部 API。研究引用链接会在用户点击时访问原网站。
