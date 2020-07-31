module.exports = {
  title: 'RehabJS',
  tagline: 'Integration testing framework for React and React Native',
  url: 'https://wix-incubator.github.io/rehabjs/',
  baseUrl: '/rehabjs/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'wix-incubator', // Usually your GitHub org/user name.
  projectName: 'rehabjs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'RehabJS',
      logo: {
        alt: 'RehabJS Logo',
        src: 'img/logo-600x600.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {
          href: 'https://discord.gg/rHVnJps',
          label: 'Discord',
          position: 'right'
        },
        {
          href: 'https://github.com/wix-incubator/rehabjs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord Chat',
              href: 'https://discord.gg/rHVnJps',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/rehab_js',
            },
            {
              label: 'Github Issues',
              href: 'https://github.com/wix-incubator/rehabjs/issues/new',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/wix-incubator/rehabjs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RehabJS team and Wix`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
