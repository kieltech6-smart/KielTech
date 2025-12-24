// components/ApkDownload.js
// Drop this component into any page. It shows the SHA-256, a Download (proxy) button,
// a Direct link to the GitHub Release asset, and a Download & Verify option.

import { useEffect, useState } from 'react';

export default function ApkDownload({
  apiPath = '/api/download-proxy',
  publicPath = 'https://github.com/kieltech6-smart/KielTech/releases/download/v1.0.0/app-release.apk',
  sha256 = '81DE3E8561B2DC21F1DEC156E93567CF220F879D882786581CEF4E221D427690'
}) {
  const [status, setStatus] = useState('');
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch('/api/download-count')
      .then((r) => r.json())
      .then((j) => setCount(j.count))
      .catch(() => { /* ignore */ });
  }, []);

  function startDownloadViaApi() {
    setStatus('Starting download…');
    try {
      // Use location redirect so the browser downloads the file without buffering in memory
      window.location.href = apiPath;
      setTimeout(() => setStatus('Downloading…'), 500);
    } catch (err) {
      console.error(err);
      setStatus('Failed to start download');
    }
  }

  async function downloadAndVerify() {
    setStatus('Downloading into memory for verification (may be slow for large files)…');
    try {
      const res = await fetch(apiPath);
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      setStatus('Computing SHA-256…');

      // compute SHA-256 via Web Crypto
      const ab = await blob.arrayBuffer();
      const hash = await crypto.subtle.digest('SHA-256', ab);
      const hashArray = Array.from(new Uint8Array(hash));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

      if (sha256.replace(/\s/g,'').toUpperCase() === hashHex) {
        setStatus('SHA-256 verified OK. Saving file…');
      } else {
        setStatus('SHA-256 mismatch! Downloaded file may be corrupted.');
      }

      // Save file
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'kieltech-ai.apk';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setStatus('Download or verification failed');
    }
  }

  return (
    <section className="mt-8">
      <h3 className="text-lg font-medium">Download KielTech AI (APK)</h3>
      <p className="text-sm text-gray-600">Signed APK from GitHub Releases. SHA-256 shown for integrity verification.</p>

      <div className="mt-3 flex flex-col sm:flex-row gap-3">
        <button onClick={startDownloadViaApi} className="px-5 py-2 bg-blue-600 text-white rounded">
          Download via site (recommended)
        </button>

        <a href={publicPath} className="px-5 py-2 border rounded" download>
          Direct GitHub Release link
        </a>

        <button onClick={downloadAndVerify} className="px-5 py-2 bg-green-600 text-white rounded">
          Download & Verify (browser)
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-600">
        SHA-256: <code className="break-all">{sha256}</code>
      </p>

      <div className="mt-2 text-sm text-gray-700">{status}</div>
      {count !== null && <div className="mt-1 text-xs text-gray-500">Downloads: {count}</div>}

      <p className="mt-2 text-xs text-gray-500">
        Note: To install on Android, the APK must be signed. Users may need to enable "Install unknown apps".
      </p>
    </section>
  );
}
