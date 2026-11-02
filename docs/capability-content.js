window.CAPABILITY_CONTENT = {
  "schemaVersion": 1,
  "contentVersion": "20261102-capabilities-v1",
  "status": "建设建议",
  "baseCommit": "a244bb6d89ffc13dc2ccc21277efed4e17654daf",
  "tradeSnapshot": {
    "path": "downloads/trade-regions-2025.json",
    "sha256": "665ce2138fa6a2827f8dce6f4a7aa5c570e77302505071db5d9c91e7ef7c35d8",
    "year": 2025,
    "unit": "亿美元"
  },
  "commonNote": "金额为2025年既有商品篮子的贸易背景；能力建设为研究建议，区域与客户项目须按具体服务范围衔接。",
  "pages": {
    "X": {
      "file": "capability-export.html",
      "title": "出口：把海外交付做深，形成可共用的运营节点",
      "subtitle": "先复制国内已具备的作业基础，再补齐当地运营。",
      "theme": "blue",
      "color": "#2171b5",
      "overview": [
        "多级备件",
        "退货恢复销售",
        "齐套供料",
        "精密交付",
        "多温店配"
      ],
      "decision": "优先复用和合作；持续订单形成节点密度后，再扩大自营或评估并购。"
    },
    "M": {
      "file": "capability-import.html",
      "title": "进口：用国内履约网络，向海外货源端延伸",
      "subtitle": "先拿到起运组织和交接能力，再按订单配置专用资源。",
      "theme": "red",
      "color": "#c43c38",
      "overview": [
        "芯片供料",
        "设备交付",
        "药品温控",
        "器械交接",
        "食品履约"
      ],
      "decision": "由国内客户订单反推产地提货、专业操作和国际运输，不按进口总额直接配置资产。"
    }
  },
  "capabilities": [
    {
      "id": "x-spares",
      "flow": "X",
      "rank": 1,
      "title": "多级备件库存与紧急响应",
      "headline": "先连通库存和工单，再扩前置备件点。",
      "where": "欧洲先围绕德荷比客户节点；英国单独组织关务与交付。东南亚、中东随设备保有量和工单扩展。",
      "regionIds": [
        "europe",
        "southeast-asia",
        "middle-east"
      ],
      "relatedSubIds": [
        8,
        11,
        12
      ],
      "what": "区域备件中心＋按服务半径设置前置点，统一库存、调拨和紧急交付。",
      "why": "设备和零部件出口形成海外在用设备基础；真正牵引投入的是装机分布、故障工单与客户响应要求。",
      "domesticReuse": "复用国内多级备件仓规划、库存协同、补货调拨和紧急响应作业。",
      "overseasBuild": "补齐当地提派、关务、前置点运营和客户工单接口；响应承诺按城市与货型签约。",
      "how": [
        "自营库存规则、工单接口和运营质量。",
        "合作接入当地仓位、清关与紧急配送，先跑通客户节点。",
        "相邻客户的备件需求形成密度后，再增设前置点或评估并购属地服务商。"
      ],
      "boundary": "整机吊装、超重作业与普通备件分开；既有独家或深度绑定的服务范围不作为通用网络建设前提。",
      "investmentTrigger": "有可签约客户、可共享节点和持续工单；库存周转、服务成本与响应要求可同时成立。",
      "measures": [
        "承诺时限达成率",
        "缺件等待时间",
        "跨客户节点利用率"
      ],
      "tradeMetrics": [
        {
          "label": "欧洲汽车零部件、机械及电力设备出口",
          "flow": "X",
          "region": "europe",
          "subs": [
            8,
            11,
            12
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 204.9807083,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/europe/all"
        }
      ],
      "customers": [
        {
          "id": "sany",
          "label": "三一重工",
          "reason": "从欧洲备件网络衔接、急送和退换件切入。",
          "status": "建议拓展",
          "href": "./#target/sany",
          "sources": [
            {
              "label": "2025欧洲峰会",
              "url": "https://www.sanyeurope.com/euro-summit25/"
            },
            {
              "label": "欧洲备件服务",
              "url": "https://www.sanyeurope.com/en/ersatzteile/"
            }
          ]
        },
        {
          "id": "byd",
          "label": "比亚迪",
          "reason": "对接新增节点或专项服务包，避开已明确承包的备件范围。",
          "status": "建议拓展",
          "href": "./#target/byd",
          "sources": [
            {
              "label": "BYD西班牙2025业务公告",
              "url": "https://media.byd.com/byd-firma-un-ano-historico-en-espana-y-termina-2025-como-lider-del-mercado-de-vehiculos-enchufables/?lang=spa"
            }
          ]
        }
      ],
      "extensionNotes": [],
      "sourceIds": [
        "dom-industrial",
        "dom-auto",
        "atlas"
      ],
      "recommendationStatus": "建设建议",
      "priorityNote": "展示顺序体现本轮关注重点，不是收益率或投资回报排名",
      "summary": {
        "location": "欧洲优先 · 东南亚/中东随客扩展",
        "entry": "自营库存规则＋当地仓配合作"
      }
    },
    {
      "id": "x-recommerce",
      "flow": "X",
      "rank": 2,
      "title": "品牌共享库存与退货恢复销售",
      "headline": "让退货重新成为可售库存。",
      "where": "欧洲优先围绕品牌现有履约区域；日本按渠道与售后订单建立节点。",
      "regionIds": [
        "europe",
        "east-asia"
      ],
      "relatedSubIds": [
        5,
        19
      ],
      "what": "在同一履约节点连接渠道库存、消费者订单、退货分级、适用轻加工与再次销售。",
      "why": "消费品持续出口带来境外库存和售后需求；价值在于减少退货报废与库存割裂，并缩短恢复销售周期。",
      "domesticReuse": "复用国内退货验收、分级、包装修复、轻加工、批次追踪及再次上架流程。",
      "overseasBuild": "建立当地分级标准、授权维修协作、包装材料和再销售渠道接口。",
      "how": [
        "先在现有正向仓内设置逆向作业区，统一B2B与B2C库存账。",
        "服装与消费品按授权开展轻处理；电子产品检测维修交由合格技术伙伴。",
        "稳定返修量形成后，再评估收购本地检测、维修或再销售服务能力。"
      ],
      "boundary": "国内轻加工经验不等于电子深修资质；整机维修、数据清除和跨境返修各按适用要求组织。",
      "investmentTrigger": "品牌提供分级与处置授权、持续退货量和再销售出口；单件恢复价值覆盖处理成本。",
      "measures": [
        "恢复可售比例",
        "退货至再次上架时间",
        "单件处理成本"
      ],
      "tradeMetrics": [
        {
          "label": "欧洲家电音视频核心与鞋服出口",
          "flow": "X",
          "region": "europe",
          "subs": [
            5,
            19
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 696.74613373,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/europe/all"
        }
      ],
      "customers": [
        {
          "id": "bambu",
          "label": "拓竹",
          "reason": "整机、耗材与配件履约可与退换货衔接。",
          "status": "建议拓展",
          "href": "./#target/bambu",
          "sources": [
            {
              "label": "欧洲配送政策与承运商",
              "url": "https://bambulab-eu.myshopify.com/policies/shipping-policy"
            }
          ]
        },
        {
          "id": "insta",
          "label": "影石",
          "reason": "围绕欧洲订单、配件和售后交付进入。",
          "status": "建议拓展",
          "href": "./#target/insta",
          "sources": [
            {
              "label": "2026-05-12投资者关系记录",
              "url": "https://dataclouds.cninfo.com.cn/shgonggao/investor/2026/20260512/167dda036bc744aaa3e896cfd20db1e2.PDF"
            }
          ]
        },
        {
          "id": "popmart",
          "label": "泡泡玛特",
          "reason": "日本渠道补货与适用退换货服务。",
          "status": "建议拓展",
          "href": "./#target/popmart",
          "sources": [
            {
              "label": "2025半年业绩（第21、24页）",
              "url": "https://prod-out-res.popmart.com/cms/INTERIM_RESULTS_ANNOUNCEMENT_FOR_THE_SIX_MONTHS_ENDED_30_JUNE_2025_c6a7290528.pdf"
            },
            {
              "label": "日本销售与配送说明",
              "url": "https://www.popmart.com/JP/help/corporate-overview"
            }
          ]
        }
      ],
      "extensionNotes": [
        "拓竹、影石、泡泡玛特属于现有项目补充；不能将其产品金额等同于本卡展示的家电、鞋服篮子。"
      ],
      "sourceIds": [
        "dom-consumer",
        "dom-tech",
        "atlas"
      ],
      "recommendationStatus": "建设建议",
      "priorityNote": "展示顺序体现本轮关注重点，不是收益率或投资回报排名",
      "summary": {
        "location": "欧洲优先 · 日本按渠道进入",
        "entry": "正向仓加逆向区＋授权维修协作"
      }
    },
    {
      "id": "x-kitting",
      "flow": "X",
      "rank": 3,
      "title": "原材料集结与KD齐套供料",
      "headline": "从跨境运输延伸到工厂前的齐套交付。",
      "where": "越南电子制造园区；马来西亚汽车项目；泰国按客户工厂需求进入。",
      "regionIds": [
        "southeast-asia"
      ],
      "relatedSubIds": [
        2,
        8
      ],
      "what": "供应商集货、齐套检查、跨境运输、近厂暂存与预约供料，统一缺件和交接信息。",
      "why": "电子与汽车生产布局带来跨境物料组织需求；同一区域工厂可共用干线和系统，但提派按园区半径配置。",
      "domesticReuse": "复用国内原材料集结、入厂运输和汽车零部件仓配；复杂线边与排序能力单独配置。",
      "overseasBuild": "建设当地接驳、近厂仓位、齐套核对、预约交接和异常补料组织。",
      "how": [
        "先以客户供应商清单、物料清单和工厂收货规则定义服务包。",
        "国内团队输出流程与系统，海外合作仓车承接集结、暂存和预约供料。",
        "稳定订单形成后扩大近厂运营；生产线边排序作为后续独立项目。"
      ],
      "boundary": "KD指散件供货模式；本卡贸易金额不是KD专属金额。产线作业与生产节拍责任不能直接套用普通仓运经验。",
      "investmentTrigger": "取得工厂交付规则和物料订单；缺件责任、库存责任及停线责任有清晰约定。",
      "measures": [
        "齐套交付率",
        "预约到货达成率",
        "异常补料时长"
      ],
      "tradeMetrics": [
        {
          "label": "东南亚电子及汽车零部件出口",
          "flow": "X",
          "region": "southeast-asia",
          "subs": [
            2,
            8
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 306.2600597,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/southeast-asia/all"
        }
      ],
      "customers": [
        {
          "id": "luxshare",
          "label": "立讯精密",
          "reason": "越南生产基地的物料集货与工厂补货。",
          "status": "建议拓展",
          "href": "./#target/luxshare",
          "sources": [
            {
              "label": "企业设厂历史",
              "url": "https://www.luxshare-ict.com/en/about/company-profile.html"
            }
          ]
        },
        {
          "id": "goertek",
          "label": "歌尔股份",
          "reason": "越南多园区交接与接驳，按园区分别组织提派。",
          "status": "建议拓展",
          "href": "./#target/goertek",
          "sources": [
            {
              "label": "歌尔越南布局",
              "url": "https://www.goertekvn.com/"
            }
          ]
        }
      ],
      "extensionNotes": [
        "KD为散件供货模式；国内汽车物流方法可用于设计服务，具体生产物流范围按工厂要求配置。"
      ],
      "sourceIds": [
        "dom-tech",
        "dom-auto",
        "atlas"
      ],
      "recommendationStatus": "建设建议",
      "priorityNote": "展示顺序体现本轮关注重点，不是收益率或投资回报排名",
      "summary": {
        "location": "越南电子 · 马来西亚汽车",
        "entry": "国内输出流程＋海外近厂仓运"
      }
    },
    {
      "id": "x-precision",
      "flow": "X",
      "rank": 4,
      "title": "精密设备运包交付与现场服务",
      "headline": "把包装、运输和现场交接做成一个责任链。",
      "where": "亚洲与欧洲已有客户项目节点，选址跟随设备交付地址和专业人员覆盖。",
      "regionIds": [
        "southeast-asia",
        "east-asia",
        "europe"
      ],
      "relatedSubIds": [
        11,
        12
      ],
      "what": "装运前勘查、定制包装、适用减振运输、状态记录、现场搬运与签收交接。",
      "why": "高价值设备对损伤、交接和项目进度敏感；建设重点是工程作业和责任管理，而非单纯增加仓储面积。",
      "domesticReuse": "复用国内精密设备包装运输、服务器运输和项目交付组织经验。",
      "overseasBuild": "补齐当地专业车辆、搬运团队、机场交接及工程项目经理。",
      "how": [
        "自营包装标准、项目管理、监测记录与客户验收界面。",
        "按项目采购属地专业车辆与技术作业，明确各段责任。",
        "同类设备交付形成连续订单后，固定专业团队和作业节点。"
      ],
      "boundary": "设备安装、调试和技术维修由客户授权主体负责；服务器改配与拆解回收不列为当前通用成熟能力。",
      "investmentTrigger": "设备规格、作业场地、许可与验收条件明确，项目毛利能够覆盖专业资源。",
      "measures": [
        "完好交付率",
        "一次验收通过率",
        "关键交接记录完整率"
      ],
      "tradeMetrics": [
        {
          "label": "欧洲机械及电力设备核心出口",
          "flow": "X",
          "region": "europe",
          "subs": [
            11,
            12
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 87.96089684,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/europe/all"
        }
      ],
      "customers": [],
      "extensionNotes": [
        "服务器、数据中心与部分机器人不在当前核心篮子内；本卡金额仅提供设备贸易背景，不作为这些项目的规模。"
      ],
      "sourceIds": [
        "dom-tech",
        "dom-industrial",
        "atlas"
      ],
      "recommendationStatus": "建设建议",
      "priorityNote": "展示顺序体现本轮关注重点，不是收益率或投资回报排名",
      "summary": {
        "location": "亚洲/欧洲 · 跟随设备项目",
        "entry": "自营项目管理＋属地专业作业"
      }
    },
    {
      "id": "x-foodservice",
      "flow": "X",
      "rank": 5,
      "title": "连锁餐饮供需协同与多温店配",
      "headline": "把中国供应与当地采购接到同一门店补货链。",
      "where": "复用新加坡、马来西亚运营基础；泰国、越南按品牌开店网络补齐仓车资源。",
      "regionIds": [
        "southeast-asia"
      ],
      "relatedSubIds": [
        27
      ],
      "what": "进口食材、当地采购与门店物资协同，连接订货、库存、效期管理和多温配送。",
      "why": "食材出口提供跨境供应背景；门店密度、当地采购比例和配送频次决定当地网络的实际价值。",
      "domesticReuse": "复用餐饮仓配、批次效期、温区作业和已有海外店配经验。",
      "overseasBuild": "补齐当地供应商接入、多温仓车、门店预约交接和当地食品业务资质。",
      "how": [
        "先从既有客户及门店订单复制标准作业。",
        "合作补齐当地仓车，按温区与配送时窗整合适用客户。",
        "多品牌线路持续形成密度后，再评估并购具备资质、线路和运营团队的本地企业。"
      ],
      "boundary": "不因食材出口额大就预建全国冷链；温区、品类、食品安全责任与门店频次需匹配。",
      "investmentTrigger": "有连续门店订单，配送线路具备密度，温区与作业条件可兼容。",
      "measures": [
        "门店准时足量交付率",
        "损耗与临期比例",
        "配送线路利用率"
      ],
      "tradeMetrics": [
        {
          "label": "东南亚食材核心出口",
          "flow": "X",
          "region": "southeast-asia",
          "subs": [
            27
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 85.20295138,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/southeast-asia/27"
        }
      ],
      "customers": [],
      "extensionNotes": [
        "海外当地采购与店配不是中国出口统计；不将本卡贸易金额折算门店规模。"
      ],
      "sourceIds": [
        "dom-food",
        "atlas"
      ],
      "recommendationStatus": "建设建议",
      "priorityNote": "展示顺序体现本轮关注重点，不是收益率或投资回报排名",
      "summary": {
        "location": "新马复用 · 泰越补齐",
        "entry": "合作仓车起步＋密度形成后扩展"
      }
    },
    {
      "id": "m-semiconductor",
      "flow": "M",
      "rank": 1,
      "title": "芯片及电子部件保税分拨与供料",
      "headline": "把境外集货接到国内保税库存和工厂供料。",
      "where": "东亚与东南亚实际供应商节点；香港作为集散节点，按实际提货组织使用。",
      "regionIds": [
        "east-asia",
        "southeast-asia"
      ],
      "relatedSubIds": [
        1,
        2
      ],
      "what": "供应商提货、专业集货、国际运输、适用保税分拨及国内工厂交付。",
      "why": "进口芯片来源集中，国内工厂连续供料需要稳定起运组织；先连接供应商与库存节点，再增加专用仓位。",
      "domesticReuse": "复用静电防护、温湿度管理、多货主库存及国内制造供料作业基础。",
      "overseasBuild": "补齐产地提货、集货、国际运输交接和订单信息连接。",
      "how": [
        "围绕国内客户采购清单识别真实供应商、提货地与运输责任。",
        "通过当地合格货代与作业伙伴组织集货，连接顺丰适用运输及国内保税节点。",
        "稳定批次与库存需求形成后，再增加专用作业区和系统自动补货。"
      ],
      "boundary": "统计原产地不等于机场或提货地；适用出口管制与交易许可是业务进入条件，不能以转运规避。",
      "investmentTrigger": "采购方或供应商具有物流选择权，货物许可与作业要求满足，运输和库存需求可持续。",
      "measures": [
        "提货至入库时长",
        "温湿度与静电作业合规率",
        "工厂交付达成率"
      ],
      "tradeMetrics": [
        {
          "label": "东亚芯片核心进口",
          "flow": "M",
          "region": "east-asia",
          "subs": [
            1
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 2747.72347333,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/east-asia/1"
        },
        {
          "label": "东南亚芯片及电子部件进口",
          "flow": "M",
          "region": "southeast-asia",
          "subs": [
            1,
            2
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 587.33885528,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/southeast-asia/all"
        }
      ],
      "customers": [],
      "extensionNotes": [
        "目标对象为具备采购或物流决策权的分销商、制造企业；不把所有芯片贸易视为顺丰可获得订单。"
      ],
      "sourceIds": [
        "dom-tech",
        "atlas"
      ],
      "recommendationStatus": "建设建议",
      "priorityNote": "展示顺序体现本轮关注重点，不是收益率或投资回报排名",
      "summary": {
        "location": "东亚/东南亚 · 实际供应商节点",
        "entry": "产地合作集货＋国内保税供料"
      }
    },
    {
      "id": "m-equipment",
      "flow": "M",
      "rank": 2,
      "title": "半导体及工业精密设备门到工位交付",
      "headline": "海外提货与国内专业交付由同一项目组织。",
      "where": "日本、新加坡及欧洲的实际设备供应商节点，连接国内工厂交付地址。",
      "regionIds": [
        "east-asia",
        "southeast-asia",
        "europe"
      ],
      "relatedSubIds": [
        11
      ],
      "what": "产地勘查、包装、专业提货、适用空海运、国内特种运输及到场交接。",
      "why": "设备采购需要对多段交接与安装窗口负责；国内专业交付基础可向上延伸至原厂提货。",
      "domesticReuse": "复用国内设备包装运输、现场项目管理和适用专业交付经验。",
      "overseasBuild": "补齐海外专业车辆、机场作业、包装技术伙伴和项目经理。",
      "how": [
        "由国内交付团队倒推产地包装、装卸与运输方案。",
        "在实际供应商所在地配置技术伙伴，按设备选择空运或海运。",
        "重复交付形成固定流程后，再建设常驻项目团队；不先建专属整机设施。"
      ],
      "boundary": "ASML等原厂深度嵌入的专业服务不作为通用设施建设锚点；不是对整个客户做绝对排除。设备许可、客户授权和承包边界按具体项目确定。",
      "investmentTrigger": "明确可获得的服务段与采购决策权，技术标准和损伤责任可执行。",
      "measures": [
        "完好交付率",
        "安装窗口交接达成率",
        "异常关闭时长"
      ],
      "tradeMetrics": [],
      "customers": [
        {
          "id": "xcmg",
          "label": "徐工机械",
          "reason": "以欧洲采购集货与对华运输作为工业采购服务入口，具体货型适配后再扩展精密服务。",
          "status": "建议拓展",
          "href": "./#target/xcmg",
          "sources": [
            {
              "label": "徐工欧洲采购中心",
              "url": "https://xcmg-europe.de/xcmg-europe/xcmg-europe-purchasing-centre/"
            }
          ]
        }
      ],
      "extensionNotes": [
        "半导体设备HS8486不在13项核心篮子；本卡展示“客户项目延伸”，金额位置显示“现有篮子不覆盖半导体设备”，不显示0或借用芯片金额。"
      ],
      "sourceIds": [
        "dom-tech",
        "dom-industrial",
        "atlas",
        "dhl-asml"
      ],
      "recommendationStatus": "建设建议",
      "priorityNote": "展示顺序体现本轮关注重点，不是收益率或投资回报排名",
      "summary": {
        "location": "日本/新加坡/欧洲 · 设备供应商",
        "entry": "国内交付倒推产地专业操作"
      }
    },
    {
      "id": "m-pharma",
      "flow": "M",
      "rank": 3,
      "title": "药品温控进口与国内分拨",
      "headline": "先接通欧洲药源与国内温控网络。",
      "where": "欧洲药源优先；北美按实际药品线路进入，连接国内适用进口与分拨节点。",
      "regionIds": [
        "europe",
        "north-america"
      ],
      "relatedSubIds": [
        26
      ],
      "what": "起运地合规收货、温控包装与国际运输，衔接国内分拨和全程质量记录。",
      "why": "欧洲是当前制药核心篮子的重要进口来源；投资重点是起运地质量管理和交接能力。",
      "domesticReuse": "复用国内医药温控运输、仓配组织及质量记录基础。",
      "overseasBuild": "补齐起运地专业货代、温控交接、包装资源与质量责任接口。",
      "how": [
        "先由国内客户和实际产品清单确定温区、时限及进口节点。",
        "合作接入海外专业医药货代，统一质量协议和交接记录。",
        "稳定线路形成后，增加专用作业资源；达到持续规模再评估收购专业团队。"
      ],
      "boundary": "常规药品、临床样本、细胞治疗采用不同能力要求；不把深低温或CAR-T写成通用成熟业务。",
      "investmentTrigger": "真实线路与温区明确，质量责任与适用资质齐备，持续运输需求支持专用配置。",
      "measures": [
        "温度偏差发生率",
        "交接记录完整率",
        "批次交付达成率"
      ],
      "tradeMetrics": [
        {
          "label": "欧洲制药核心进口",
          "flow": "M",
          "region": "europe",
          "subs": [
            26
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 289.8928136,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/europe/26"
        }
      ],
      "customers": [],
      "extensionNotes": [
        "覆盖HS3001—3004；不是全部医药进口，也不是医药冷链市场规模。"
      ],
      "sourceIds": [
        "dom-medical",
        "atlas"
      ],
      "recommendationStatus": "建设建议",
      "priorityNote": "展示顺序体现本轮关注重点，不是收益率或投资回报排名",
      "summary": {
        "location": "欧洲优先 · 北美按线路进入",
        "entry": "专业货代合作＋国内温控衔接"
      }
    },
    {
      "id": "m-medtech",
      "flow": "M",
      "rank": 4,
      "title": "医疗器械进口与医院、售后交接",
      "headline": "把进口运输延伸到医院交接和服务备件。",
      "where": "欧洲、北美器械来源节点，连接国内进口主体、医院与授权售后网络。",
      "regionIds": [
        "europe",
        "north-america"
      ],
      "relatedSubIds": [
        23
      ],
      "what": "序列号追踪、适用精密包装、国际运输、国内库存与医院预约交付，连接售后备件。",
      "why": "器械进口的价值在最终交接与售后连续性；优先找到具有物流决策权的进口商和品牌服务主体。",
      "domesticReuse": "复用国内器械仓配、医院交接与售后物流经验。",
      "overseasBuild": "补齐起运地包装提货、跨境序列追踪及进口到医院的预约接口。",
      "how": [
        "先从国内进口商、授权服务商的设备与备件订单反推境外提货。",
        "合作连接当地专业包装与货代资源，统一序列号和交接记录。",
        "器械逆向质量检验按产品逐项扩展，安装校准由授权技术方执行。"
      ],
      "boundary": "海外已有深度承包的专用服务不直接替代；不把国内医院覆盖等同于所有器械安装和维修资格。",
      "investmentTrigger": "明确进口、交付和售后各段责任；有采购决策权和可重复服务订单。",
      "measures": [
        "序列号追踪完整率",
        "预约交接达成率",
        "售后备件交付时长"
      ],
      "tradeMetrics": [
        {
          "label": "欧洲诊疗器械核心进口",
          "flow": "M",
          "region": "europe",
          "subs": [
            23
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 29.38947573,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/europe/23"
        },
        {
          "label": "北美诊疗器械核心进口",
          "flow": "M",
          "region": "north-america",
          "subs": [
            23
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 51.41790349,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/north-america/23"
        }
      ],
      "customers": [],
      "extensionNotes": [
        "篮子为HS9018，不等于全部医疗器械。目标对象为有物流决策权的进口商、品牌和授权服务商。"
      ],
      "sourceIds": [
        "dom-medical",
        "atlas",
        "siemens-gxo"
      ],
      "recommendationStatus": "建设建议",
      "priorityNote": "展示顺序体现本轮关注重点，不是收益率或投资回报排名",
      "summary": {
        "location": "欧洲/北美 → 国内医院与售后",
        "entry": "进口商订单牵引＋授权技术协作"
      }
    },
    {
      "id": "m-food",
      "flow": "M",
      "rank": 5,
      "title": "食品产地集货、保税加工与全渠道履约",
      "headline": "用国内销售订单组织海外产地供应。",
      "where": "东南亚水果等已研究食材来源；欧洲巧克力、荷兰及新西兰乳品作为客户项目延伸。",
      "regionIds": [
        "southeast-asia",
        "europe",
        "oceania"
      ],
      "relatedSubIds": [
        27
      ],
      "what": "产地集货、适用冷链运输、通关及适用保税加工、批次效期管理和国内渠道履约。",
      "why": "国内消费与门店订单能够反向组织产地采购；避免只因原材料进口规模大就建设冷链设施。",
      "domesticReuse": "复用食品进口履约、标签与包装作业、批次效期和国内渠道服务经验。",
      "overseasBuild": "补齐产地分级集货、当地提货、温区运输和货源计划协同。",
      "how": [
        "从国内已有客户订单和适用产品出发确定产地服务。",
        "合作组织产地集货和海空运资源，国内节点承担适用加工与全渠道履约。",
        "稳定货源与持续订单支持后，再投资产地作业点或评估并购专业冷链团队。"
      ],
      "boundary": "食品篮子不能全部视为冷链；不同货物按温区、检验、加工条件和时效选择服务。",
      "investmentTrigger": "销售订单、产地货源和进口要求匹配，损耗与库存周转支持单项目经济性。",
      "measures": [
        "批次效期追踪完整率",
        "到货损耗率",
        "订单履约与库存周转"
      ],
      "tradeMetrics": [
        {
          "label": "东南亚食材核心进口",
          "flow": "M",
          "region": "southeast-asia",
          "subs": [
            27
          ],
          "kind": "region",
          "unit": "亿美元",
          "year": 2025,
          "expectedValue": 184.84330588,
          "relation": "background",
          "formula": "SUM(records.value WHERE kind=region AND flow=flow AND region=region AND sub IN subs)",
          "scope": "中国报告方，既有核心商品篮子；区域贸易背景，不代表该项服务的可承接金额",
          "href": "trade-heatmaps.html#region/southeast-asia/27"
        }
      ],
      "customers": [],
      "extensionNotes": [
        "当前食材HS02、03、07、08、090111、1507，不含乳品04与巧克力18；后两类属于客户项目延伸。"
      ],
      "sourceIds": [
        "dom-consumer",
        "dom-food",
        "atlas"
      ],
      "recommendationStatus": "建设建议",
      "priorityNote": "展示顺序体现本轮关注重点，不是收益率或投资回报排名",
      "summary": {
        "location": "东南亚食材 · 欧洲/大洋洲项目延伸",
        "entry": "国内订单牵引＋产地合作集货"
      }
    }
  ],
  "sources": {
    "atlas": {
      "type": "public-project",
      "title": "原国际供应链研究：BG区域总结与行业能力研究",
      "url": "https://jamese5095.github.io/Global-supply-chain-atlas/",
      "note": "用于区域与能力方向，不将案例数量视为市场规模。"
    },
    "dhl-asml": {
      "type": "public",
      "title": "DHL：Weert园区投资与ASML服务关系",
      "url": "https://www.dhl.com/nl-en/home/press/press-archive/2022/further-investment-dhl-campus-in-weert.html",
      "note": "支持既有深度服务关系；不能证明全业务独家垄断。"
    },
    "siemens-gxo": {
      "type": "public",
      "title": "Siemens Healthineers：美国备件枢纽",
      "url": "https://www.siemens-healthineers.com/en-us/press-room/press-releases/mega-depots",
      "note": "支持特定市场既有承包配置；不代表其他区域或服务全部不可进入。"
    },
    "dom-consumer": {
      "type": "internal-summary",
      "title": "消费品行业经营联席会材料",
      "note": "用于判断国内作业基础及能力建设方向。"
    },
    "dom-industrial": {
      "type": "internal-summary",
      "title": "工业设备行业联席会材料",
      "note": "用于判断国内作业基础及能力建设方向。"
    },
    "dom-tech": {
      "type": "internal-summary",
      "title": "高科技经营联席会材料",
      "note": "用于判断国内作业基础及能力建设方向。"
    },
    "dom-auto": {
      "type": "internal-summary",
      "title": "汽车行业经营联席会材料",
      "note": "用于判断国内作业基础及能力建设方向。"
    },
    "dom-food": {
      "type": "internal-summary",
      "title": "零售餐饮经营沟通材料",
      "note": "用于判断国内作业基础及能力建设方向。"
    },
    "dom-medical": {
      "type": "internal-summary",
      "title": "生命科学与医药经营联席会材料",
      "note": "用于判断国内作业基础及能力建设方向。"
    }
  },
  "buildModes": [
    {
      "label": "自主建设",
      "content": "掌握客户接口、库存与订单规则、项目管理、作业标准和质量记录。"
    },
    {
      "label": "合作补齐",
      "content": "先获得当地仓车、专业操作、资质与提派能力，按实际订单组合服务。"
    },
    {
      "label": "并购条件",
      "content": "连续订单形成密度，标的具备可承接的团队、客户、资质和线路，且整合价值优于合作。"
    }
  ]
};
