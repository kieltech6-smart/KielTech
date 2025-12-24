import Head from 'next/head';
import Link from 'next/link';
import ContactForm from '../components/ContactForm';
import ApkDownload from '../components/ApkDownload';

export default function Home() {
  return (
    <>
      <Head>
        <title>KielTech — Home</title>
        <meta name="description" content="KielTech — modern web solutions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <a className="font-bold text-xl">KielTech</a>
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link href="/about"><a>About</a></Link>
              <Link href="/blog"><a>Blog</a></Link>
              <Link href="/pricing"><a>Pricing</a></Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/download">
              <a className="px-3 py-1 rounded bg-blue-600 text-white">Download App</a>
            </Link>
            <Link href="/api/auth/signin">
              <a className="px-3 py-1 rounded border">Sign in</a>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">KielTech</h1>
          <p className="mt-4 text-lg text-gray-700">Modern web solutions: websites, web apps, e-commerce, and AI tooling.</p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/pricing">
              <a className="px-6 py-3 bg-blue-600 text-white rounded">Get started</a>
            </Link>
            <Link href="/blog">
              <a className="px-6 py-3 border rounded">Read our blog</a>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="p-6 border rounded">
            <h3 className="font-semibold">Fast & Accessible</h3>
            <p className="mt-2 text-sm text-gray-600">Built with performance and accessibility in mind — semantic markup and keyboard friendly.</p>
          </article>

          <article className="p-6 border rounded">
            <h3 className="font-semibold">Auth & Admin</h3>
            <p className="mt-2 text-sm text-gray-600">NextAuth skeleton and a protected admin dashboard ready to extend.</p>
          </article>

          <article className="p-6 border rounded">
            <h3 className="font-semibold">Payments & Contact</h3>
            <p className="mt-2 text-sm text-gray-600">Stripe checkout + contact form for lead capture.</p>
          </article>
        </section>

        {/* Pricing teaser */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Starter plan</h2>
          <div className="mt-4 max-w-md border rounded p-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">$49</span>
              <span className="text-sm text-gray-500">one-time</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">Includes a starter site, blog, and basic admin tools.</p>
            <div className="mt-6">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch('/api/create-checkout-session', { method: 'POST' });
                    const { url } = await res.json();
                    if (url) window.location.href = url;
                  } catch (err) {
                    alert('Unable to start checkout. See console for details.');
                    console.error(err);
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Buy Starter
              </button>
            </div>
          </div>
        </section>

        {/* APK Download section (inserted) */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Get the AI App</h2>
          <p className="text-gray-600 mt-1">Download the KielTech AI Android app. SHA-256 checksum is provided for integrity verification.</p>

          <div className="mt-4">
            <ApkDownload
              apiPath="/api/download-proxy"
              publicPath="https://github.com/kieltech6-smart/KielTech/releases/download/v1.0.0/app-release.apk"
              sha256="81DE3E8561B2DC21F1DEC156E93567CF220F879D882786581CEF4E221D427690"
            />
          </div>
        </section>

        {/* Contact Form */}
        <section className="mt-12 bg-gray-50 py-8 rounded">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-semibold">Contact us</h2>
            <p className="text-gray-600 mt-2">Send a message and we'll get back to you.</p>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-6 text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} KielTech — Built with accessibility & SEO in mind.
        </div>
      </footer>
    </>
  );
}
