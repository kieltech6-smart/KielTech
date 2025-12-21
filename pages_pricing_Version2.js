import Head from 'next/head';

export default function Pricing() {
  async function checkout() {
    const res = await fetch('/api/create-checkout-session', { method: 'POST' });
    const { url } = await res.json();
    window.location = url;
  }

  return (
    <>
      <Head>
        <title>KielTech — Pricing</title>
      </Head>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Pricing</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border p-4 rounded">
            <h3 className="font-semibold">Starter</h3>
            <p className="mt-2">$49 / one-time</p>
            <button onClick={checkout} className="mt-4 px-3 py-2 bg-green-600 text-white rounded">Buy</button>
          </div>
          {/* Add other tiers */}
        </div>
      </section>
    </>
  );
}