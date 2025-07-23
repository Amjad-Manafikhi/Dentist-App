import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteSession, getSession } from '@/lib/session';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  console.log("a");
  console.log(getSession);
  deleteSession(res);
  console.log("b");
  console.log(getSession);
  res.status(200).json({ message: 'Logged out successfully' });
}
