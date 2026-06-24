import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound(): React.JSX.Element {
    return (
        <Layout title="Page Not Found">
            <main
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    padding: '2rem',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
                <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
                    This page doesn&apos;t exist, but these might help:
                </p>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        justifyContent: 'center',
                    }}
                >
                    <Link className="button button--primary button--lg" to="/">
                        Quick Start
                    </Link>
                    <Link className="button button--secondary button--lg" to="/examples/basic-operations">
                        Examples
                    </Link>
                    <Link
                        className="button button--secondary button--lg"
                        to="/api-reference/core-resources/CoreV1Api"
                    >
                        API Reference
                    </Link>
                    <Link className="button button--secondary button--lg" to="/sdk/config/classes/KubeConfig">
                        KubeConfig
                    </Link>
                </div>
            </main>
        </Layout>
    );
}
