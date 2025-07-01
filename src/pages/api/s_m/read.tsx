import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_M } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<S_M[] | { message: string; error: string }>
) {
  if (req.method === 'GET') {
    try {
      // SQL query to fetch all S_M records
      const s_m = await query(
        'SELECT * FROM s_m'
      );

      res.status(200).json(s_m as S_M[]);
    } catch (error: unknown) {
      console.error('Error fetching S_M records:', error);
      res.status(500).json({
        message: 'Error fetching S_M records',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
