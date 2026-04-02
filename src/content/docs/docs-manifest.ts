export type DocTocItem = {
  id: string
  label: string
}

export type DocManifest = {
  slug: string
  href: string
  title: string
  description: string
  group: string
  order: number
  toc: DocTocItem[]
}

export type DocSlug = DocManifest['slug']

const docPages = [
  {
    slug: '',
    href: '/docs',
    title: 'Vyper 文档概览',
    description: '从安装、语法、模块化到编译流程，快速建立一套适合中文阅读的 Vyper 学习路径。',
    group: '概览',
    order: 0,
    toc: [
      { id: 'why-vyper', label: '为什么是 Vyper' },
      { id: 'learning-path', label: '推荐学习路径' },
      { id: 'core-principles', label: '核心设计原则' },
      { id: 'documentation-map', label: '文档地图' },
    ],
  },
  {
    slug: 'installing-vyper',
    href: '/docs/installing-vyper',
    title: '安装 Vyper',
    description: '选择合适的安装方式，并确认本地编译器环境可用。',
    group: '入门',
    order: 1,
    toc: [
      { id: 'choose-path', label: '如何选择安装路径' },
      { id: 'standalone', label: '独立安装' },
      { id: 'python-project', label: 'Python 项目内安装' },
      { id: 'containers', label: 'Docker 与其他选项' },
    ],
  },
  {
    slug: 'quickstart',
    href: '/docs/quickstart',
    title: '5 分钟快速开始',
    description: '使用 Moccasin 初始化、编译和测试第一个 Vyper 项目。',
    group: '入门',
    order: 2,
    toc: [
      { id: 'recommended-stack', label: '推荐工具链' },
      { id: 'project-bootstrap', label: '初始化项目' },
      { id: 'first-contract', label: '第一个合约' },
      { id: 'compile-and-test', label: '编译与测试' },
    ],
  },
  {
    slug: 'contract-structure',
    href: '/docs/contract-structure',
    title: '合约结构',
    description: '理解 pragma、导入、状态变量、函数、事件和接口的组织方式。',
    group: '语言基础',
    order: 3,
    toc: [
      { id: 'pragmas', label: 'Pragma 与编译指令' },
      { id: 'imports', label: '导入与搜索路径' },
      { id: 'state-and-functions', label: '状态与函数' },
      { id: 'events-and-interfaces', label: '事件与接口' },
    ],
  },
  {
    slug: 'types',
    href: '/docs/types',
    title: '类型系统',
    description: '掌握 Vyper 的静态类型、数值类型、数组、映射和显式转换规则。',
    group: '语言基础',
    order: 4,
    toc: [
      { id: 'type-discipline', label: '静态类型约束' },
      { id: 'scalar-types', label: '标量类型' },
      { id: 'collections', label: '集合类型' },
      { id: 'conversion-rules', label: '转换规则' },
    ],
  },
  {
    slug: 'constants-and-vars',
    href: '/docs/constants-and-vars',
    title: '环境变量与常量',
    description: '掌握区块链上下文变量、self 引用，以及全局常量的定义方式。',
    group: '语言基础',
    order: 5,
    toc: [
      { id: 'environment-variables', label: '环境变量' },
      { id: 'self-variable', label: 'self 变量' },
      { id: 'custom-constants', label: '自定义常量' },
      { id: 'practical-guidelines', label: '使用建议' },
    ],
  },
  {
    slug: 'statements',
    href: '/docs/statements',
    title: '语句与异常处理',
    description: '理解 break、continue、return、log、raise 和 assert 的语义边界。',
    group: '语言基础',
    order: 6,
    toc: [
      { id: 'control-flow', label: '控制流语句' },
      { id: 'log-statement', label: 'log 语句' },
      { id: 'exceptions', label: '异常机制' },
      { id: 'assert-and-raise', label: 'assert 与 raise' },
    ],
  },
  {
    slug: 'control-structures',
    href: '/docs/control-structures',
    title: '函数与控制流',
    description: '理解可见性、可变性、构造函数、循环、断言和重入保护。',
    group: '语言基础',
    order: 7,
    toc: [
      { id: 'visibility', label: '函数可见性' },
      { id: 'mutability', label: '函数可变性' },
      { id: 'constructor', label: '重入保护与装饰器' },
      { id: 'loops-and-guards', label: '循环与控制流' },
    ],
  },
  {
    slug: 'scoping-and-declarations',
    href: '/docs/scoping-and-declarations',
    title: '作用域与声明',
    description: '理解变量声明、public 与 immutable、存储布局，以及模块和块级作用域规则。',
    group: '语言基础',
    order: 8,
    toc: [
      { id: 'variable-declaration', label: '变量声明' },
      { id: 'public-and-immutable', label: 'public 与 immutable' },
      { id: 'storage-layout', label: '存储布局' },
      { id: 'scoping-rules', label: '作用域规则' },
    ],
  },
  {
    slug: 'built-ins',
    href: '/docs/built-ins',
    title: '内建函数与底层能力',
    description: '理解 raw_call、raw_create 与 proxy / blueprint 等底层原语的边界。',
    group: '进阶',
    order: 9,
    toc: [
      { id: 'bitwise-and-deprecations', label: '位运算与弃用项' },
      { id: 'contract-creation', label: '合约创建原语' },
      { id: 'low-level-calls', label: '低层调用' },
      { id: 'safety-checklist', label: '使用清单' },
    ],
  },
  {
    slug: 'modules',
    href: '/docs/modules',
    title: '模块与组合',
    description: '使用 import、initializes、uses 和 exports 构建可组合的合约体系。',
    group: '进阶',
    order: 10,
    toc: [
      { id: 'module-basics', label: '模块的基本概念' },
      { id: 'initialize-state', label: '初始化状态' },
      { id: 'uses-and-dependencies', label: 'uses 与依赖' },
      { id: 'exports', label: '导出外部接口' },
    ],
  },
  {
    slug: 'interfaces',
    href: '/docs/interfaces',
    title: '接口',
    description: '学习如何声明、导入、实现和导出 Vyper 接口，并安全地发起外部调用。',
    group: '进阶',
    order: 11,
    toc: [
      { id: 'declaring-and-using', label: '声明与使用接口' },
      { id: 'built-in-interfaces', label: '内建接口' },
      { id: 'implementing-interfaces', label: '实现接口' },
      { id: 'standalone-and-extraction', label: '独立接口与导出' },
    ],
  },
  {
    slug: 'event-logging',
    href: '/docs/event-logging',
    title: '事件日志',
    description: '理解事件的声明、topics 与 data 的划分，以及链下监听的工作方式。',
    group: '进阶',
    order: 12,
    toc: [
      { id: 'example-of-logging', label: '日志记录示例' },
      { id: 'declaring-events', label: '声明事件' },
      { id: 'logging-events', label: '写入事件' },
      { id: 'listening-for-events', label: '监听事件' },
    ],
  },
  {
    slug: 'natspec',
    href: '/docs/natspec',
    title: 'NatSpec 元数据',
    description: '使用标准化 docstring 生成 userdoc 和 devdoc，补齐合约的可读元数据。',
    group: '工具与规范',
    order: 13,
    toc: [
      { id: 'overview', label: 'NatSpec 概览' },
      { id: 'tags', label: '标签说明' },
      { id: 'documentation-output', label: '文档输出' },
    ],
  },
  {
    slug: 'compiling',
    href: '/docs/compiling',
    title: '编译与产物',
    description: '掌握 vyper CLI、JSON 接口、优化模式、EVM 版本和警告控制。',
    group: '工具与规范',
    order: 14,
    toc: [
      { id: 'cli-basics', label: 'CLI 基础' },
      { id: 'output-formats', label: '输出格式全集' },
      { id: 'json-interface', label: 'JSON 接口' },
      { id: 'compiler-settings', label: '编译设置' },
    ],
  },
  {
    slug: 'compiler-exceptions',
    href: '/docs/compiler-exceptions',
    title: '编译器异常',
    description: '快速理解 Vyper 在编译阶段会抛出的主要异常类型，以及常见定位方式。',
    group: '工具与规范',
    order: 15,
    toc: [
      { id: 'common-exceptions', label: '常见编译异常' },
      { id: 'compiler-panic', label: 'CompilerPanic' },
    ],
  },
  {
    slug: 'deploying-contracts',
    href: '/docs/deploying-contracts',
    title: '部署合约',
    description: '了解字节码部署、浏览器工具、Titanoboa 和官方在线环境的部署路径。',
    group: '工具与规范',
    order: 16,
    toc: [
      { id: 'deployment-options', label: '部署方式' },
      { id: 'practical-guidelines', label: '实践建议' },
    ],
  },
  {
    slug: 'testing-contracts',
    href: '/docs/testing-contracts',
    title: '测试合约',
    description: '以 pytest 为基础，选择 Titanoboa 或 Moccasin 构建 Vyper 测试工作流。',
    group: '工具与规范',
    order: 17,
    toc: [
      { id: 'recommended-stack', label: '推荐测试栈' },
      { id: 'titanoboa', label: 'Titanoboa' },
      { id: 'moccasin', label: 'Moccasin' },
      { id: 'selection-guidance', label: '如何选择' },
    ],
  },
  {
    slug: 'design-tradeoffs',
    href: '/docs/design-tradeoffs',
    title: '设计取舍与风格建议',
    description: '理解 Vyper 与 Solidity 的差异，并建立更易审计的编码习惯。',
    group: '工具与规范',
    order: 18,
    toc: [
      { id: 'why-less-is-more', label: '为什么更少即更多' },
      { id: 'solidity-comparison', label: '与 Solidity 的核心差异' },
      { id: 'style-guidelines', label: '语法对照与风格建议' },
      { id: 'documentation-habits', label: '编码风格与文档习惯' },
    ],
  },
  {
    slug: 'resources',
    href: '/docs/resources',
    title: '其他资源',
    description: '汇总课程、示例、工具、安全资料和演讲，补充 Vyper 学习与实践材料。',
    group: '资源',
    order: 19,
    toc: [
      { id: 'general', label: '综合学习资源' },
      { id: 'frameworks-and-tooling', label: '框架与工具' },
      { id: 'security', label: '安全' },
      { id: 'presentations', label: '会议与演讲' },
      { id: 'unmaintained', label: '维护状态较弱的资源' },
    ],
  },
  {
    slug: 'contributing',
    href: '/docs/contributing',
    title: '参与贡献',
    description: '了解 Vyper 上游社区对 issue、VIP、Pull Request 和测试补充的基本要求。',
    group: '资源',
    order: 20,
    toc: [
      { id: 'types-of-contributions', label: '贡献类型' },
      { id: 'suggesting-improvements', label: '提出改进' },
      { id: 'reporting-issues', label: '报告问题' },
      { id: 'pull-request-workflow', label: 'Pull Request 工作流' },
    ],
  },
  {
    slug: 'versioning',
    href: '/docs/versioning',
    title: '版本策略',
    description: '理解 Major、Minor、Patch 和预发布版本分别会影响哪些使用者与升级路径。',
    group: '资源',
    order: 21,
    toc: [
      { id: 'motivation', label: '为什么需要版本指南' },
      { id: 'version-types', label: '版本类型' },
      { id: 'security-and-prereleases', label: '安全与预发布版本' },
      { id: 'communication', label: 'PR 与发布沟通' },
    ],
  },
  {
    slug: 'release-notes',
    href: '/docs/release-notes',
    title: '发布记录',
    description: '查看 Vyper 0.4.x 系列的版本更新、破坏性变更和安全修复。',
    group: '资源',
    order: 22,
    toc: [
      { id: 'v0-4-3', label: 'v0.4.3' },
      { id: 'v0-4-2', label: 'v0.4.2' },
      { id: 'v0-4-1', label: 'v0.4.1' },
      { id: 'v0-4-0', label: 'v0.4.0' },
    ],
  },
  {
    slug: 'examples/simple-auction',
    href: '/docs/examples/simple-auction',
    title: '简单拍卖',
    description: '公开拍卖合约：参与者在限定时间内提交出价，最高出价者胜出。',
    group: '示例',
    order: 23,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/blind-auction',
    href: '/docs/examples/blind-auction',
    title: '盲拍',
    description: '加密出价拍卖：竞价阶段提交哈希，揭示阶段验证真实出价。',
    group: '示例',
    order: 24,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/safe-remote-purchase',
    href: '/docs/examples/safe-remote-purchase',
    title: '安全远程购买',
    description: '通过双方押金机制确保买卖双方在无信任环境下完成交易。',
    group: '示例',
    order: 25,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/crowdfund',
    href: '/docs/examples/crowdfund',
    title: '众筹',
    description: '众筹合约：达到目标则资金发送给受益人，否则参与者可以退款。',
    group: '示例',
    order: 26,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/voting',
    href: '/docs/examples/voting',
    title: '投票',
    description: '带委托功能的投票系统：支持投票权委托和最终统计。',
    group: '示例',
    order: 27,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/company-stock',
    href: '/docs/examples/company-stock',
    title: '公司股票',
    description: '模拟股票发行、买卖、转让和公司付款的简化金融系统。',
    group: '示例',
    order: 28,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/storage',
    href: '/docs/examples/storage',
    title: '简单存储',
    description: '最基础的 Vyper 合约：一个状态变量和一个写入方法。',
    group: '示例',
    order: 29,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/name-registry',
    href: '/docs/examples/name-registry',
    title: '名称注册表',
    description: '将名称映射到地址的简单注册表，先到先得。',
    group: '示例',
    order: 30,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/erc20',
    href: '/docs/examples/erc20',
    title: 'ERC-20 代币',
    description: '标准 ERC-20 代币实现，支持转账、授权、铸造和销毁。',
    group: '示例',
    order: 31,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/erc721',
    href: '/docs/examples/erc721',
    title: 'ERC-721 NFT',
    description: 'ERC-721 非同质化代币实现，支持铸造、安全转账和授权。',
    group: '示例',
    order: 32,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '核心结构' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/erc1155',
    href: '/docs/examples/erc1155',
    title: 'ERC-1155 多代币',
    description: 'ERC-1155 多代币标准实现，支持批量操作和动态 URI。',
    group: '示例',
    order: 33,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '核心结构' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/erc4626',
    href: '/docs/examples/erc4626',
    title: 'ERC-4626 金库',
    description: '代币化金库标准实现，将 ERC-20 资产转化为可组合的份额代币。',
    group: '示例',
    order: 34,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '核心结构' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/market-maker',
    href: '/docs/examples/market-maker',
    title: '链上做市商',
    description: '基于恒定乘积公式的自动做市商，实现 ETH 与代币的去中心化兑换。',
    group: '示例',
    order: 35,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/factory',
    href: '/docs/examples/factory',
    title: '工厂模式',
    description: '通过代码哈希验证注册子合约，实现去中心化交易路由。',
    group: '示例',
    order: 36,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: 'Factory 合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
  {
    slug: 'examples/wallet',
    href: '/docs/examples/wallet',
    title: '多签钱包',
    description: '多签钱包合约：多所有者签名验证、ecrecover 和 raw_call 的实际应用。',
    group: '示例',
    order: 37,
    toc: [
      { id: 'overview', label: '概览' },
      { id: 'contract-code', label: '完整合约代码' },
      { id: 'walkthrough', label: '代码解析' },
    ],
  },
] satisfies DocManifest[]

const navigationGroups = ['概览', '入门', '语言基础', '进阶', '工具与规范', '资源', '示例'] as const

export const docs = docPages.toSorted((left, right) => left.order - right.order)

export const docsNavigation = navigationGroups.map(title => ({
  title,
  items: docs.filter(doc => doc.group === title),
}))

function normalizeDocSlug(slug?: string) {
  return slug ?? ''
}

export function getDocSourcePath(slug?: string) {
  const normalizedSlug = normalizeDocSlug(slug)

  if (normalizedSlug === '') {
    return 'src/content/docs/overview.mdx'
  }

  return `src/content/docs/${normalizedSlug}.mdx`
}

export function getDocEditHref(slug?: string) {
  const sourcePath = getDocSourcePath(slug)
  return `https://github.com/Vyper-CN-Community/vyper-landing-cn/blob/main/${sourcePath}`
}

export function getDocBySlug(slug?: string) {
  const normalizedSlug = normalizeDocSlug(slug)
  return docs.find(doc => doc.slug === normalizedSlug)
}

export function getAdjacentDocs(slug?: string) {
  const currentDoc = getDocBySlug(slug)
  if (!currentDoc) {
    return { previous: undefined, next: undefined }
  }

  const index = docs.findIndex(doc => doc.slug === currentDoc.slug)

  return {
    previous: index > 0 ? docs[index - 1] : undefined,
    next: index < docs.length - 1 ? docs[index + 1] : undefined,
  }
}
