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
      !newRow.s_s_id
    ) {
      return res.status(400).json({ message: 'Missing session values' });
    }

    try {
      const { s_s_id} = newRow;

      const result = await query(
        'UPDATE session SET s_s_id = ? WHERE id = ?',
        [s_s_id, id]
      );

      res.status(200).json({
        message: 'Patient session successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error updating session:', error);
      res.status(500).json({
        message: 'Error updating session',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
