import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_S } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="s_s";
  if (req.method === 'PUT') {
    const newRow: S_S = req.body.newRow;

    // Check if required fields are present
    if (
      !newRow ||
      newRow.supervisor_id === undefined ||
      newRow.case_id === undefined 
    ) {
      return res.status(400).json({ message: 'Missing S_S values' });
    }

    try {
      const { supervisor_id, case_id } = newRow;

      // SQL query to insert a new S_S record
      const result = await query(
        'INSERT INTO s_s (supervisor_id, case_id) VALUES (?, ?)',
        [supervisor_id, case_id]
      );

      res.status(200).json({
        message: 'S_S record added successfully',
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
