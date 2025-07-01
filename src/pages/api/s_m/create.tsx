import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_M } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'PUT') {
    const newRow: S_M = req.body.newRow;

    // Check if required fields are present
    if (
      !newRow ||
      newRow.session_id === undefined ||
      newRow.material_id === undefined ||
      newRow.amount === undefined
    ) {
      return res.status(400).json({ message: 'Missing S_M values' });
    }

    try {
      const { session_id, material_id, amount } = newRow;

      // SQL query to insert a new S_M record
      const result = await query(
        'INSERT INTO s_m (session_id, material_id, amount) VALUES (?, ?, ?)',
        [session_id, material_id, amount]
      );

      res.status(200).json({
        message: 'S_M record added successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error creating S_M record:', error);
      res.status(500).json({
        message: 'Error creating S_M record',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
