import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { Toothache } from '@/models/Database'; // Assuming Database.ts contains your types

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="toothache";
  if (req.method === 'PUT') {
    const newRow: Toothache = req.body.newRow;

    // Validate required fields
    if (
      !newRow ||
      !newRow.name ||
      newRow.course_id === undefined
    ) {
      return res.status(400).json({ message: 'Missing toothache values' });
    }

    try {
      const { name, course_id } = newRow;

      // SQL query to insert a new Toothache record
      const result = await query(
        'INSERT INTO Toothache (name, course_id) VALUES (?, ?)',
        [name, course_id]
      );

      res.status(200).json({
        message: 'Toothache added successfully',
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
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
