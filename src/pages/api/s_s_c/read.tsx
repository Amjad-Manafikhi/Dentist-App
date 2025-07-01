import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_S_C } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<S_S_C[] | { message: string; error: string }>
) {
  if (req.method === 'GET') {
    try {
      // SQL query to fetch all S_S_C records
      const s_s_c = await query(
        'SELECT * FROM s_s_c'
      );

      res.status(200).json(s_s_c as S_S_C[]);
    } catch (error: any) {
      console.error('Error fetching S_S_C records:', error);
      res.status(500).json({
        message: 'Error fetching S_S_C records',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
