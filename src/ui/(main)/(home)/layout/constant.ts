export const routes: { name: string; href: string; pattern: RegExp; external: boolean }[] = [
  {
    name: '博客',
    href: 'https://blog.vyperlang.org/',
    pattern: /^\/blog($|\/)/,
    external: true,
  },
  {
    name: '文档',
    href: 'https://docs.vyperlang.org/en/latest/',
    pattern: /^\/docs($|\/)/,
    external: true,
  },
  {
    name: '贡献',
    href: 'https://github.com/vyperlang/vyper/issues',
    pattern: /^\/contribute($|\/)/,
    external: true,
  },
]
