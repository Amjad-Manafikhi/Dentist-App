import { query } from '../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
    const tableName="course";

  if (req.method === 'PUT') {
    const newRow = req.body.newRow;
    const { id } = req.body;
    console.log(newRow)
    if (
      !newRow ||
      !newRow.name ||
      !newRow.department_id ||
      !newRow.term||
      !newRow.year 
    ) {
      return res.status(400).json({ message: 'Missing course values' });
    }

    try {
      const { name, department_id, term, year} = newRow;

      const result = await query(
        'INSERT INTO course (name, department_id, term, year ) VALUES (?, ?, ?, ?)',
        [name, department_id, term, year]
      );

      res.status(200).json({
        message: 'course created successfully',
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
