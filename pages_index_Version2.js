import Head from 'next/head';
import ContactForm from '../components/ContactForm';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>KielTech — Home</title>
        <meta name="description" content="KielTech — modern web solutions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold">KielTech</h1>
        <p className="mt-4 text-lg text-gray-700">Modern web solutions: sites, apps, e-commerce, and more.</p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/pricing"><a className="px-6 py-3 bg-blue-600 text-white rounded">Get started</a></Link>
          <Link href="/blog"><a className="px-6 py-3 border rounded">Read our blog</a></Link>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold">Contact us</h2>
          <p className="text-gray-600">Send a message and we'll get back to you.</p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}