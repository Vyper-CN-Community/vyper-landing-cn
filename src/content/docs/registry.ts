import type { ComponentType } from 'react'
import BuiltInsContent from './built-ins.mdx'
import CompilingContent from './compiling.mdx'
import ContractStructureContent from './contract-structure.mdx'
import ControlStructuresContent from './control-structures.mdx'
import DesignTradeoffsContent from './design-tradeoffs.mdx'
import InstallingVyperContent from './installing-vyper.mdx'
import ModulesContent from './modules.mdx'
import OverviewContent from './overview.mdx'
import QuickstartContent from './quickstart.mdx'
import TypesContent from './types.mdx'

export type DocTocItem = {
  id: string
  label: string
}

export type DocPage = {
  slug: string
  href: string
  title: string
  description: string
  group: string
  order: number
  toc: DocTocItem[]
  Content: ComponentType
}

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
    Content: OverviewContent,
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
    Content: InstallingVyperContent,
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
    Content: QuickstartContent,
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
    Content: ContractStructureContent,
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
    Content: TypesContent,
  },
  {
    slug: 'control-structures',
    href: '/docs/control-structures',
    title: '函数与控制流',
    description: '理解可见性、可变性、构造函数、循环、断言和重入保护。',
    group: '语言基础',
    order: 5,
    toc: [
      { id: 'visibility', label: '函数可见性' },
      { id: 'mutability', label: '函数可变性' },
      { id: 'constructor', label: '构造函数' },
      { id: 'loops-and-guards', label: '循环与保护措施' },
    ],
    Content: ControlStructuresContent,
  },
  {
    slug: 'modules',
    href: '/docs/modules',
    title: '模块与组合',
    description: '使用 import、initializes、uses 和 exports 构建可组合的合约体系。',
    group: '进阶',
    order: 6,
    toc: [
      { id: 'module-basics', label: '模块的基本概念' },
      { id: 'initialize-state', label: '初始化状态' },
      { id: 'uses-and-dependencies', label: 'uses 与依赖' },
      { id: 'exports', label: '导出外部接口' },
    ],
    Content: ModulesContent,
  },
  {
    slug: 'built-ins',
    href: '/docs/built-ins',
    title: '内建函数与底层能力',
    description: '理解 raw_call、raw_create 与 proxy / blueprint 等底层原语的边界。',
    group: '进阶',
    order: 7,
    toc: [
      { id: 'bitwise-and-deprecations', label: '位运算与弃用项' },
      { id: 'contract-creation', label: '合约创建原语' },
      { id: 'low-level-calls', label: '低层调用' },
      { id: 'safety-checklist', label: '使用清单' },
    ],
    Content: BuiltInsContent,
  },
  {
    slug: 'compiling',
    href: '/docs/compiling',
    title: '编译与产物',
    description: '掌握 vyper CLI、JSON 接口、优化模式、EVM 版本和警告控制。',
    group: '工具与规范',
    order: 8,
    toc: [
      { id: 'cli-basics', label: 'CLI 基础' },
      { id: 'output-formats', label: '常见产物' },
      { id: 'json-interface', label: 'JSON 接口' },
      { id: 'compiler-settings', label: '编译设置' },
    ],
    Content: CompilingContent,
  },
  {
    slug: 'design-tradeoffs',
    href: '/docs/design-tradeoffs',
    title: '设计取舍与风格建议',
    description: '理解 Vyper 与 Solidity 的差异，并建立更易审计的编码习惯。',
    group: '工具与规范',
    order: 9,
    toc: [
      { id: 'why-less-is-more', label: '为什么更少即更多' },
      { id: 'solidity-comparison', label: '与 Solidity 的核心差异' },
      { id: 'style-guidelines', label: '风格建议' },
      { id: 'documentation-habits', label: '文档习惯' },
    ],
    Content: DesignTradeoffsContent,
  },
] satisfies DocPage[]

const navigationGroups = ['概览', '入门', '语言基础', '进阶', '工具与规范'] as const

export const docs = docPages.toSorted((left, right) => left.order - right.order)

export const docsNavigation = navigationGroups.map(title => ({
  title,
  items: docs.filter(doc => doc.group === title),
}))

export function getDocBySlug(slug?: string) {
  const normalizedSlug = slug ?? ''
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
