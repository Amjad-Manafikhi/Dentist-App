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
      !newRow.sourceTypecol
    ) {
      return res.status(400).json({ message: 'Missing sourceType values' });
    }

    try {
      const { sourceTypecol} = newRow;

      const result = await query(
        'UPDATE sourceType SET sourceTypecol = ? WHERE id = ?',
        [sourceTypecol, id]
      );

      res.status(200).json({
        message: 'sourceType updated successfully',
        result,
      });
    } catch (error: unknown) {
      console.error('Error updating sourceType:', error);
      res.status(500).json({
        message: 'Error updating sourceType',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
