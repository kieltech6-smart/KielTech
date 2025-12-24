import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
          {session ? (
            <>
              <Link href="/admin"><a className="px-3 py-1 rounded bg-gray-100">Admin</a></Link>
              <button onClick={() => signOut()} className="px-3 py-1 rounded">Sign out</button>
            </>
          ) : (
            <button onClick={() => signIn()} className="px-3 py-1 rounded bg-blue-600 text-white">Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
}
