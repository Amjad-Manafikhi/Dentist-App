import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_C } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="s_c";
  if (req.method === 'PUT') {
    const newRow: S_C = req.body.newRow;

    // Check if required fields are present
    if (
      !newRow ||
      newRow.course_id === undefined ||
      newRow.student_id === undefined
    ) {
      return res.status(400).json({ message: 'Missing S_C values' });
    }

    try {
      const { course_id, student_id } = newRow;

      // SQL query to insert a new S_C record
      const result = await query(
        'INSERT INTO s_s (course_id, student_id, mark) VALUES (?, ?, ?)',
        [course_id, student_id]
      );

      res.status(200).json({
        message: 'S_C record added successfully',
        result,
      });
    } catch (error: unknown) {
        console.error(`Error creating ${tableName}:`, error);

        if (error instanceof Error) {
          res.status(500).json({
            message: `Error creating ${tableName}`,
            error: error.message,
          });
        } else {
          res.status(500).json({
            message: `Error creating ${tableName}`,
            error: 'Unknown error occurred',
          });
        }
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
