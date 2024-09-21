import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth(); // Wait for auth response

  if (!userId) {
    redirect('/sign-in'); // Redirect if not signed in
  }

  return <div>Welcome to your dashboard!</div>;
}

