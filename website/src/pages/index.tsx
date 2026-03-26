import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <div className={styles.buttons}>
                    <Link className="button button--secondary button--lg" to="/docs/intro">
                        Get Started
                    </Link>
                    <Link
                        className="button button--outline button--secondary button--lg"
                        to="https://github.com/kubernetes-client/javascript"
                        style={{ marginLeft: '1rem' }}
                    >
                        GitHub
                    </Link>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <code className={styles.installCommand}>npm install @kubernetes/client-node</code>
                </div>
            </div>
        </header>
    );
}

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout title={siteConfig.title} description="Official JavaScript client for Kubernetes">
            <HomepageHeader />
            <main>
                <section className={styles.features}>
                    <div className="container">
                        <div className="row">
                            <div className={clsx('col col--4')}>
                                <div className="text--center">
                                    <Heading as="h3">Type Safe</Heading>
                                    <p>
                                        Written in TypeScript with full support for Kubernetes API objects and
                                        types.
                                    </p>
                                </div>
                            </div>
                            <div className={clsx('col col--4')}>
                                <div className="text--center">
                                    <Heading as="h3">Node.js Optimized</Heading>
                                    <p>
                                        Designed for server-side use with native support for KubeConfig and
                                        Service Accounts.
                                    </p>
                                </div>
                            </div>
                            <div className={clsx('col col--4')}>
                                <div className="text--center">
                                    <Heading as="h3">Official Client</Heading>
                                    <p>
                                        Maintained by the Kubernetes community as the standard JavaScript
                                        implementation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
