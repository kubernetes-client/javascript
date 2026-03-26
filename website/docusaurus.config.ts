import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'Kubernetes JavaScript Client',
    tagline: 'JavaScript client for Kubernetes',
    favicon: 'img/favicon.ico',

    future: {
        v4: true,
    },

    url: 'https://kubernetes-client.github.io',
    baseUrl: '/javascript/',

    organizationName: 'kubernetes-client',
    projectName: 'javascript',

    onBrokenLinks: 'throw',
    onBrokenAnchors: 'throw',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    markdown: {
        format: 'detect',
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    editUrl: 'https://github.com/kubernetes-client/javascript/tree/main/website/',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    plugins: [
        [
            'docusaurus-plugin-typedoc',
            {
                id: 'sdk-api',
                entryPoints: [
                    '../src/config.ts',
                    '../src/config_types.ts',
                    '../src/watch.ts',
                    '../src/informer.ts',
                    '../src/cache.ts',
                    '../src/exec.ts',
                    '../src/attach.ts',
                    '../src/portforward.ts',
                    '../src/cp.ts',
                    '../src/log.ts',
                    '../src/metrics.ts',
                    '../src/top.ts',
                    '../src/object.ts',
                    '../src/patch.ts',
                    '../src/health.ts',
                    '../src/middleware.ts',
                    '../src/types.ts',
                    '../src/yaml.ts',
                ],
                entryPointStrategy: 'expand',
                tsconfig: './tsconfig.docs.json',
                out: 'docs/sdk',
                sidebar: { autoConfiguration: true },
                readme: 'none',
                excludeExternals: true,
                excludePrivate: true,
                excludeProtected: true,
                skipErrorChecking: true,
            },
        ],
    ],

    themes: [
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                hashed: true,
                language: ['en'],
                indexDocs: true,
                indexBlog: false,
                indexPages: false,
                highlightSearchTermsOnTargetPage: true,
                searchResultLimits: 10,
                searchResultContextMaxLength: 50,
            },
        ],
    ],

    themeConfig: {
        image: 'img/docusaurus-social-card.jpg',
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: 'Kubernetes JavaScript Client',
            logo: {
                alt: 'Kubernetes Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'docs',
                    position: 'left',
                    label: 'Docs',
                },
                {
                    label: 'API Reference',
                    position: 'left',
                    href: 'https://kubernetes-client.github.io/javascript/api/',
                },
                {
                    type: 'docsVersionDropdown',
                    position: 'right',
                },
                {
                    href: 'https://github.com/kubernetes-client/javascript',
                    label: 'GitHub',
                    position: 'right',
                    className: 'github-icon',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/kubernetes-client/javascript',
                        },
                        {
                            label: 'Issues',
                            href: 'https://github.com/kubernetes-client/javascript/issues',
                        },
                        {
                            label: 'Slack',
                            href: 'https://kubernetes.slack.com',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Kubernetes Community. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
