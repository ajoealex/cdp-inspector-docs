import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  trailingSlash: 'always',
  vite: {
    experimental: {
      renderBuiltUrl() { return { relative: true } },
    },
  },
  integrations: [
    starlight({
      title: 'CDP Inspector',
      description: 'The product guide for inspecting and controlling Chrome through the DevTools Protocol.',
      logo: { src: './images/icon128.png', alt: 'CDP Inspector' },
      favicon: '/images/icon128.png',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ajoealex/CDP-Inspector-chrome-plugin' }],
      customCss: ['./src/styles/custom.css'],
      components: { Search: './src/components/Search.astro' },
      head: [{ tag: 'script', attrs: { src: '/legacy-routes.js', 'data-docs-root': '', defer: true } }],
      sidebar: [
        { label: 'Start here', items: [{ label: 'Overview', link: '/' }, { slug: 'installation' }, { slug: 'quick-start' }] },
        { label: 'The popup', items: [{ slug: 'popup/launch-command' }, { slug: 'popup/binary-path' }, { slug: 'popup/connect' }, { slug: 'popup/new-tab' }, { slug: 'popup/tab-actions' }] },
        { label: 'The inspector', items: [{ slug: 'inspector/overview' }, { slug: 'inspector/screencast' }, { slug: 'inspector/message-tab' }, { slug: 'inspector/presets' }, { slug: 'inspector/device-profiles' }, { slug: 'inspector/network' }, { slug: 'inspector/dialogs' }, { slug: 'inspector/reliability' }] },
        { label: 'Workflows', items: [{ slug: 'workflows/ai-and-automation' }] },
        { label: 'Reference', items: [{ slug: 'reference/keyboard-shortcuts' }, { slug: 'reference/command-line-flags' }, { slug: 'reference/saved-settings' }, { slug: 'reference/troubleshooting' }] },
        { slug: 'release-notes' },
      ],
    }),
  ],
})
