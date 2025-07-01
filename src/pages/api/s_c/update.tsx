import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_C } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'POST') {
    const newRow: S_C = req.body.newRow;
    const { id } = req.body; // Assuming the ID is passed separately in the body

    // Check if ID and required fields are present
    if (
      !id ||
      !newRow ||
      newRow.course_id === undefined ||
      newRow.student_id === undefined ||
      newRow.mark === undefined 
    ) {
      return res.status(400).json({ message: 'Missing S_C ID or values' });
    }

    try {
      const { course_id, student_id, mark } = newRow;

      // SQL query to update an S_C record by ID
      const result = await query(
        'UPDATE s_s SET course_id = ?, student_id = ?, mark = ? = ? WHERE id = ?',
        [course_id, student_id, mark, id]
      );

      res.status(200).json({
        message: 'S_C record updated successfully',
        result,
      });
    } catch (error: unknown) {
      console.error('Error updating S_C record:', error);
      res.status(500).json({
        message: 'Error updating S_C record',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
