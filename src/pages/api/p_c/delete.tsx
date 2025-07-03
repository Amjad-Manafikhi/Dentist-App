import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="p_c";
  if (req.method === 'DELETE') {
    const { id } = req.body;

    // Check if ID is present
    if (!id) {
      return res.status(400).json({ message: 'Missing P_C ID' });
    }

    try {
      // SQL query to delete a P_C record by ID
      const result = await query('DELETE FROM p_c WHERE id = ?', [id]);

      res.status(200).json({
        message: 'P_C record deleted successfully',
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
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
