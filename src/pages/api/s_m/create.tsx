import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { S_M } from '@/models/Database'; // Assuming you have a Database.ts in '@/models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="s_m";
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
