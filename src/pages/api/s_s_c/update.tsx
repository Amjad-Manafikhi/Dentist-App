import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_S_C } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="s_s_c";
  if (req.method === 'POST') {
    const newRow: S_S_C = req.body.newRow;
    const { id } = req.body; // Assuming the ID is passed separately in the body

    // Check if ID and required fields are present
    if (
      !id ||
      !newRow ||
      newRow.s_c_id === undefined ||
      newRow.supervisor_id === undefined 
    ) {
      return res.status(400).json({ message: 'Missing S_S_C ID or values' });
    }

    try {
      const { s_c_id, supervisor_id } = newRow;

      // SQL query to update an S_S_C record by ID
      const result = await query(
        'UPDATE s_s_c SET s_c_id = ?, supervisor_id = ? WHERE id = ?',
        [s_c_id, supervisor_id, id]
      );

      res.status(200).json({
        message: 'S_S_C record updated successfully',
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
