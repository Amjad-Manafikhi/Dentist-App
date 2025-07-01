import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    // Check if ID is present
    if (!id) {
      return res.status(400).json({ message: 'Missing S_M ID' });
    }

    try {
      // SQL query to delete a S_M record by ID
      const result = await query('DELETE FROM s_m WHERE id = ?', [id]);

      res.status(200).json({
        message: 'S_M record deleted successfully',
        result,
      });
    } catch (error: unknown) {
      console.error('Error deleting S_M record:', error);
      res.status(500).json({
        message: 'Error deleting S_M record',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
