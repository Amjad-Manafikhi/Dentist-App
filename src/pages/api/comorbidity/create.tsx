import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { Comorbidity } from '@/models/Database'; // Assuming Database.ts contains your types

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  const tableName="comorbidity";
  if (req.method === 'PUT') {
    const newRow: Comorbidity = req.body.newRow;

    // Validate required fields
    if (!newRow || !newRow.name ) {
      return res.status(400).json({ message: 'Missing comorbidity values' });
    }

    try {
      const { name } = newRow;

      // SQL query to insert a new Comorbidity record
      const result = await query(
        'INSERT INTO Comorbidity (name) VALUES (?)',
        [name]
      );

      res.status(200).json({
        message: 'Comorbidity added successfully',
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
