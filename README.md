# 国际供应链行业研究看板

在线访问：https://jamese5095.github.io/international-supply-chain-research/

本项目采用与 Global-supply-chain-atlas 相同的自包含交付方式：根目录 `index.html` 内置运行所需的脚本、样式、标识、地图和研究数据。**部署时只需这一个文件**，无需 npm、后端、数据库或独立 JSON 接口。

## 看板内容

- 行业规模：29个子行业的贸易差额、重点方向筛选，以及默认折叠的计算依据和来源。
- 区域流向：13个重点子行业的主研究方向，分别说明整体规模与核心HS篮子的范围。
- 区域热力图：出口、进口上下双图；10个区域可下钻国家排名、品类结构及商品明细。
- 企业业务：出口30家、进口25家代表企业，保留筛选依据、业务事实、披露年份和逐字段来源。
- 能力建设：出口、进口各五项建议，保留现有卡片格式、贸易背景、企业依据和国际操作模式参考。

单文件改造没有调整贸易金额、企业名录、能力建议或卡片样式。行业金额不代表物流市场收入；核心HS篮子不外推为整个子行业；企业公开事实与未来能力建议分别列示。

## 部署

上传根目录 `index.html` 即可。云平台项目类型选“静态网站”，发布目录选择该文件所在目录，安装与构建命令均可留空。所有页面使用首页内的片段路由：

| 内容 | 地址 |
| --- | --- |
| 行业规模 | `#home` |
| 区域流向 | `#flows/1` |
| 区域热力图 | `#heatmaps` |
| 企业业务 | `#enterprises?flow=X` 或 `#enterprises?flow=M` |
| 能力建设 | `#capability-export` 或 `#capability-import` |

根目录的四个旧 `.html` 入口仅用于兼容已分享链接，自动跳转到首页对应内容；它们没有独立业务页面，也不影响只上传 `index.html`。GitHub Pages 发布 `main` 分支根目录。

详细设置见 [DEPLOY.md](DEPLOY.md)，删除依据见 [FILE_AUDIT.md](FILE_AUDIT.md)。

## 维护与构建

`src/` 保存必要源码与原始数据快照；`src/pages/` 是构建模板，不是部署目录。各板块在独立文档作用域中呈现，保留既有样式与交互；统一首页负责导航、浏览器历史和共享内置数据。

```sh
python3 build.py
python3 -m unittest discover -s tests -p 'test_*.py'
node tests/test-routes.cjs
node tests/test-shell.cjs
python3 scripts/package-static.py /输出路径/国际供应链研究看板_云部署.zip
```

构建使用Python标准库；Node仅用于校验，不参与部署。部署ZIP内只有根目录 `index.html`。

构建程序逐项读取模板引用、数据快照和第三方许可；`src/` 出现未引用文件或缺少依赖时会报错，避免历史文件再次混入。第三方许可随HTML内置保留。

本地预览可运行 `python3 -m http.server 8765` 后访问 `http://localhost:8765/`。网页启动及板块切换不访问外部接口；用户点击公开来源和补充看板链接时才访问对应网站。
