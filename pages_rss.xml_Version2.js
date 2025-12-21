// pages/rss.xml.js
import { getAllPosts } from '../lib/posts';

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const posts = getAllPosts();

  const items = posts.map(p => {
    const url = `${baseUrl}/blog/${p.slug}`;
    const title = p.frontmatter.title || p.slug;
    const date = p.frontmatter.date ? new Date(p.frontmatter.date).toUTCString() : new Date().toUTCString();
    const description = p.frontmatter.description || p.excerpt || '';
    return `
      <item>
        <title><![CDATA[${title}]]></title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${date}</pubDate>
        <description><![CDATA[${description}]]></description>
      </item>`;
  }).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>KielTech</title>
      <link>${baseUrl}</link>
      <description>KielTech blog</description>
      ${items}
    </channel>
  </rss>`;

  res.setHeader('Content-Type', 'application/rss+xml');
  res.write(rss);
  res.end();

  return { props: {} };
}

export default function Rss() {
  return null;
}