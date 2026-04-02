import type { ComponentType } from 'react'
import type { DocSlug } from './docs-manifest'

type DocContentComponent = ComponentType<Record<string, unknown>>
type DocContentModule = {
  default: DocContentComponent
}
type DocContentLoader = () => Promise<DocContentModule>

const docContentLoaders: Record<DocSlug, DocContentLoader> = {
  '': () => import('./overview.mdx'),
  'installing-vyper': () => import('./installing-vyper.mdx'),
  quickstart: () => import('./quickstart.mdx'),
  'contract-structure': () => import('./contract-structure.mdx'),
  types: () => import('./types.mdx'),
  'constants-and-vars': () => import('./constants-and-vars.mdx'),
  statements: () => import('./statements.mdx'),
  'control-structures': () => import('./control-structures.mdx'),
  'scoping-and-declarations': () => import('./scoping-and-declarations.mdx'),
  'built-ins': () => import('./built-ins.mdx'),
  modules: () => import('./modules.mdx'),
  interfaces: () => import('./interfaces.mdx'),
  'event-logging': () => import('./event-logging.mdx'),
  natspec: () => import('./natspec.mdx'),
  compiling: () => import('./compiling.mdx'),
  'compiler-exceptions': () => import('./compiler-exceptions.mdx'),
  'deploying-contracts': () => import('./deploying-contracts.mdx'),
  'testing-contracts': () => import('./testing-contracts.mdx'),
  'design-tradeoffs': () => import('./design-tradeoffs.mdx'),
  resources: () => import('./resources.mdx'),
  contributing: () => import('./contributing.mdx'),
  versioning: () => import('./versioning.mdx'),
  'release-notes': () => import('./release-notes.mdx'),
  'examples/simple-auction': () => import('./examples/simple-auction.mdx'),
  'examples/blind-auction': () => import('./examples/blind-auction.mdx'),
  'examples/safe-remote-purchase': () => import('./examples/safe-remote-purchase.mdx'),
  'examples/crowdfund': () => import('./examples/crowdfund.mdx'),
  'examples/voting': () => import('./examples/voting.mdx'),
  'examples/company-stock': () => import('./examples/company-stock.mdx'),
  'examples/storage': () => import('./examples/storage.mdx'),
  'examples/name-registry': () => import('./examples/name-registry.mdx'),
  'examples/erc20': () => import('./examples/erc20.mdx'),
  'examples/erc721': () => import('./examples/erc721.mdx'),
  'examples/erc1155': () => import('./examples/erc1155.mdx'),
  'examples/erc4626': () => import('./examples/erc4626.mdx'),
  'examples/market-maker': () => import('./examples/market-maker.mdx'),
  'examples/factory': () => import('./examples/factory.mdx'),
  'examples/wallet': () => import('./examples/wallet.mdx'),
}

function normalizeDocSlug(slug?: string) {
  return slug ?? ''
}

export async function getDocContentBySlug(slug?: string) {
  const normalizedSlug = normalizeDocSlug(slug)

  if (!(normalizedSlug in docContentLoaders)) {
    return undefined
  }

  const loader = docContentLoaders[normalizedSlug as DocSlug]

  if (!loader) {
    return undefined
  }

  const module = await loader()
  return module.default
}
