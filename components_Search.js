import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Search({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const { data, error } = useSWR(() => `/api/search?q=${encodeURIComponent(query)}`, fetcher, { revalidateOnFocus: false });

  const results = data || [];

  return (
    <div className="max-w-3xl">
      <label className="block">
        <span className="sr-only">Search</span>
        <input
          placeholder="Search posts, e.g. 'launch', 'pricing'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded border px-3 py-2"
          aria-label="Search posts"
        />
      </label>

      <div className="mt-4">
        {error && <div className="text-red-600">Search failed</div>}
        {!data && <div className="text-gray-500">Loading…</div>}
        {data && results.length === 0 && <div className="text-gray-600">No results</div>}

        <ul className="mt-2 space-y-3">
          {results.map((r) => (
            <li key={r.slug} className="border rounded p-3">
              <Link href={`/blog/${r.slug}`}>
                <a className="block">
                  <div className="font-semibold">{r.title}</div>
                  {r.date && <div className="text-xs text-gray-500">{new Date(r.date).toLocaleDateString()}</div>}
                  <p className="text-sm text-gray-700 mt-1">{r.excerpt}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
