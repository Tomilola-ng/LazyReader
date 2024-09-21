// app/api/protected/route.ts
import { requireAuth } from '@clerk/nextjs';

export const GET = requireAuth((req, res) => {
  return new Response(JSON.stringify({ message: 'You are authenticated!' }));
});

