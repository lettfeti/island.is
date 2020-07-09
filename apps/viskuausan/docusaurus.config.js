module.exports = {
  title: 'Viskuausan',
  tagline:
    'Hér færð þú yfirlit yfir allar þær vefþjónustur og gögn sem hið opinbera býður uppá.',
  url: 'https://viskuausan.island.is',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'island-is', // Usually your GitHub org/user name.
  projectName: 'viskuausan', // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    defaultDarkMode: false,
    navbar: {
      title: '',
      logo: {
        alt: 'island.is logo',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'api',
          label: 'API Vörulisti',
          position: 'right',
        },
        {
          to: 'gagnamodel',
          label: 'Gagnamódel',
          position: 'right',
        },
        {
          to: 'design-guide',
          activeBasePath: 'designGuide',
          label: 'API Design Guide',
          position: 'right',
        },
        {
          href: 'https://github.com/island-is/island.is',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
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
              to: 'docs/doc1',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Stafrænt Ísland. Powered by Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'designGuide',
          routeBasePath: 'design-guide',
          sidebarPath: require.resolve('./sidebars.js'),
          homePageId: 'introduction',
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
