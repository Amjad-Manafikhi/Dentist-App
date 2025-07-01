import { query } from '../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'POST') {
    const newRow = req.body.newRow;
    const { id } = req.body;
    console.log(newRow)
    if (
      !newRow ||
      !newRow.name ||
      !newRow.department ||
      !newRow.term 
    ) {
      return res.status(400).json({ message: 'Missing course values' });
    }

    try {
      const { name, department, term} = newRow;

      const result = await query(
        'UPDATE course SET name = ?, department = ?, term = ? WHERE id = ?',
        [name, department, term, id]
      );

      res.status(200).json({
        message: 'course updated successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error updating course:', error);
      res.status(500).json({
        message: 'Error updating course',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
