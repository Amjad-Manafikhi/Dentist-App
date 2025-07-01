import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { Cases } from '@/models/Database'; // Assuming Database.ts contains your types

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'PUT') {
    const newRow: Cases = req.body.newRow;

    // Validate required fields
    if (
      !newRow ||
      newRow.student_id === undefined ||
      newRow.patient_id === undefined ||
      newRow.d_s_id === undefined ||
      newRow.toothache_id === undefined ||
      newRow.isTreated === undefined
    ) {
      return res.status(400).json({ message: 'Missing cases values' });
    }

    try {
      const { student_id, patient_id, d_s_id, toothache_id, isTreated } = newRow;

      // SQL query to insert a new Cases record
      const result = await query(
        'INSERT INTO Cases (student_id, patient_id, d_s_id, toothache_id, isTreated) VALUES (?, ?, ?, ?, ?)',
        [student_id, patient_id, d_s_id, toothache_id, isTreated]
      );

      res.status(200).json({
        message: 'Cases added successfully',
        result,
      });
    } catch (error: unknown) {
      console.error('Error creating cases:', error);
      res.status(500).json({
        message: 'Error creating cases',
        error: error.message,
      });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
