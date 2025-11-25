import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/boss-copilot/',
  title: "Boss Copilot",
  description: "Boss 直聘高级助手文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '指南', link: '/guide/intro' }
    ],

    sidebar: [
      {
        text: '介绍',
        items: [
          { text: '项目概览', link: '/guide/intro' },
        ]
      },
      {
        text: '使用指南',
        items: [
          { text: '安装与使用', link: '/guide/installation' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bosens-China/boss-copilot' }
    ]
  }
})
