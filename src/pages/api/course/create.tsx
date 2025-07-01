import { query } from '../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'PUT') {
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
        'INSERT INTO course name = ?, department = ?, term = ? WHERE id = ?',
        [name, department, term, id]
      );

      res.status(200).json({
        message: 'course created successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error creating course:', error);
      res.status(500).json({
        message: 'Error creating course',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
