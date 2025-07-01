import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { P_C } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<P_C[] | { message: string; error: string }>
) {
  if (req.method === 'GET') {
    try {
      // SQL query to fetch all P_C records
      const p_c = await query(
        'SELECT * FROM p_c'
      );

      res.status(200).json(p_c as P_C[]);
    } catch (error: unknown) {
      console.error('Error fetching P_C records:', error);
      res.status(500).json({
        message: 'Error fetching P_C records',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
