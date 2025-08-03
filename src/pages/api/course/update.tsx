import { query } from '../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="course";
  if (req.method === 'POST') {
    const newRow = req.body.newRow;
    const { id } = req.body;

    if (
      !newRow ||
      !newRow.name ||
      !newRow.department_id ||
      !newRow.term ||
      !newRow.year
    ) {
      return res.status(400).json({ message: 'Missing course values' });
    }

    try {
      const { name, department_id, term, year} = newRow;

      const result = await query(
        'UPDATE course SET name = ?, department_id = ?, term = ?, year = ? WHERE id = ?',
        [name, department_id, term, year, id]
      );

      res.status(200).json({
        message: 'course updated successfully',
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
