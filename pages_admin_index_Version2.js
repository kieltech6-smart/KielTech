import { getSession } from 'next-auth/react';

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2">This is a protected admin area. Add management UIs (posts, orders, users) here.</p>
      {/* TODO: Add content management, order processing, analytics, user lists */}
    </div>
  );
}

// Server-side protection
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: { destination: '/api/auth/signin', permanent: false }
    };
  }
  // Optionally check session.user.email or role for admin access
  return { props: { session } };
}