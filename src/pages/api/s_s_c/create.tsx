import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_S_C } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'PUT') {
    const newRow: S_S_C = req.body.newRow;
    // Check if required fields are present
    if (
      !newRow ||
      newRow.s_c_id === undefined ||
      newRow.supervisor_id === undefined 
    ) {
      console.log(newRow)
      return res.status(400).json({ message: 'Missing S_S_C values' });
    }

    try {
      const { s_c_id, supervisor_id } = newRow;

      // SQL query to insert a new S_S_C record
      const result = await query(
        'INSERT INTO s_s_c (s_c_id, supervisor_id) VALUES (?, ?)',
        [ s_c_id, supervisor_id]
      );

      res.status(200).json({
        message: 'S_S_C record added successfully',
        result,
      });
    } catch (error: unknown) {
      console.error('Error creating S_S_C record:', error);
      res.status(500).json({
        message: 'Error creating S_S_C record',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
