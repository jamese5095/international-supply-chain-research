# 单文件部署说明

## 直接上传

部署包内只有一个 `index.html`。将它放在网站发布目录根层即可；不用额外上传脚本、样式、地图、图片或 `downloads` 目录。

| 平台设置 | 值 |
| --- | --- |
| 项目类型 | 静态网站 / Other |
| 默认首页 | `index.html` |
| 发布目录 | `index.html` 所在目录 |
| 安装命令 | 留空 |
| 构建命令 | 留空（仓库已提交构建结果） |

该文件可放在域名根路径，也可放在任意子路径。所有板块共用此入口，通过 `#` 后的地址定位；无需服务器配置页面路由或JSON接口。

## 从GitHub部署

仓库根目录包含已生成的 `index.html`。GitHub Pages 继续选择 `main` 分支 `/ (root)`；其他静态托管平台的发布目录选择 `.`。如希望每次发布自动重建，可将构建命令设为 `python3 build.py`，前提是平台提供Python3。

四个旧入口 `trade-heatmaps.html`、`enterprises.html`、`capability-export.html`、`capability-import.html` 仅作兼容跳转。整仓库部署会保留旧链接；仅上传首页也能使用全部看板功能。

## 打包

在仓库根目录执行：

```sh
python3 build.py
python3 scripts/package-static.py /输出路径/国际供应链研究看板_云部署.zip
```

将ZIP解压后的 `index.html` 直接上传。不要误上传 `src/pages/index.html`，它是供构建程序使用的模板。

## 验证

打开网站后，检查首页两张图表、热力图区域下钻、企业进出口切换与详情、进出口能力卡片。刷新具体区域或企业详情地址，应保持相同内容。浏览器返回、前进应能恢复导航及筛选。

运行所需数据已全部内置，不受独立JSON资源路径和服务器首页回退规则影响。原始引用仍保留在页面中，点击后访问对应公开网站。
