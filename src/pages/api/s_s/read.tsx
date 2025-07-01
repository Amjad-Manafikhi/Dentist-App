import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_S } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<S_S[] | { message: string; error: string }>
) {
  if (req.method === 'GET') {
    try {
      // SQL query to fetch all S_S records
      const s_s_records = await query(
        'SELECT * FROM s_s'
      );

      res.status(200).json(s_s_records as S_S[]);
    } catch (error: unknown) {
      console.error('Error fetching S_S records:', error);
      res.status(500).json({
        message: 'Error fetching S_S records',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
