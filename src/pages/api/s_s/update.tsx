import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_S } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="s_s";
  if (req.method === 'POST') {
    const newRow: S_S = req.body.newRow;
    const { id } = req.body; // Assuming the ID is passed separately in the body

    // Check if ID and required fields are present
    if (
      !id ||
      !newRow ||
      newRow.supervisor_id === undefined ||
      newRow.case_id === undefined 
    ) {
      return res.status(400).json({ message: 'Missing S_S ID or values' });
    }

    try {
      const { supervisor_id, case_id } = newRow;

      // SQL query to update an S_S record by ID
      const result = await query(
        'UPDATE s_s SET supervisor_id = ?, case_id = ? WHERE id = ?',
        [supervisor_id, case_id, id]
      );

      res.status(200).json({
        message: 'S_S record updated successfully',
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
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
