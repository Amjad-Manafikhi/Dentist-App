import { query } from '../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'POST') {
    const newRow = req.body.newRow;
    const { id } = req.body;

    if (
      !newRow ||
      !newRow.fname
    ) {
      return res.status(400).json({ message: 'Missing supervisor values' });
    }

    try {
      const {fname} = newRow;

      const result = await query(
        'UPDATE supervisor SET fname = ? WHERE id = ?',
        [fname, id]
      );

      res.status(200).json({
        message: 'supervisor updated successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error updating supervisor:', error);
      res.status(500).json({
        message: 'Error updating supervisor',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
