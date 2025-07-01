import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { D_S } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'PUT') {
    const newRow: D_S = req.body.newRow;

    // Check if required fields are present
    if (
      !newRow ||
      newRow.diagnosticSource_id === undefined ||
      newRow.diagnosticSource_sourceType_id === undefined ||
      newRow.doctor_id === undefined
    ) {
      return res.status(400).json({ message: 'Missing D_S values' });
    }

    try {
      const { diagnosticSource_id, diagnosticSource_sourceType_id, doctor_id } = newRow;

      // SQL query to insert a new D_S record
      const result = await query(
        'INSERT INTO d_s (diagnosticSource_id, diagnosticSource_sourceType_id, doctor_id) VALUES (?, ?, ?)',
        [diagnosticSource_id, diagnosticSource_sourceType_id, doctor_id]
      );

      res.status(200).json({
        message: 'D_S record added successfully',
        result,
      });
    } catch (error: unknown) {
      console.error('Error creating D_S record:', error);
      res.status(500).json({
        message: 'Error creating D_S record',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
