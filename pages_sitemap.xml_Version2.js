// pages/sitemap.xml.js
import { getAllPosts } from '../lib/posts';

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const pages = [
    '',
    'about',
    'pricing',
    'blog',
    'search'
  ];

  const posts = getAllPosts();

  const xmlItems = pages.map(p => {
    const url = `${baseUrl}/${p}`.replace(/\/$/, '');
    return `<url><loc>${url}</loc></url>`;
  }).join('');

  const postItems = posts.map(p => {
    const url = `${baseUrl}/blog/${p.slug}`;
    const lastmod = p.frontmatter.date ? new Date(p.frontmatter.date).toISOString() : null;
    return `<url><loc>${url}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xmlItems}
    ${postItems}
  </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  // getServerSideProps will do the heavy lifting
  return null;
}