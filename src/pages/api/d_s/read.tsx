import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { D_S } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<D_S[] | { message: string; error: string }>
) {
  if (req.method === 'GET') {
    try {
      // SQL query to fetch all D_S records
      const d_s_records = await query(
        'SELECT * FROM d_s'
      );

      res.status(200).json(d_s_records as D_S[]);
    } catch (error: any) {
      console.error('Error fetching D_S records:', error);
      res.status(500).json({
        message: 'Error fetching D_S records',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
