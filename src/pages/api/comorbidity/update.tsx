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
      !newRow.name 
    ) {
      return res.status(400).json({ message: 'Missing comorbidity values' });
    }

    try {
      const {name} = newRow;

      const result = await query(
        'UPDATE comorbidity SET name = ? WHERE id = ?',
          [name, id]
      );

      res.status(200).json({
        message: 'comorbidity updated successfully',
        result,
      });
    } catch (error: unknown) {
      console.error('Error updating comorbidity:', error);
      res.status(500).json({
        message: 'Error updating comorbidity',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
