// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#ffffff" />
          <link rel="alternate" type="application/rss+xml" title="KielTech RSS" href="/rss.xml" />
          <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;