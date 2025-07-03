import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { SourceType } from '@/models/Database'; // Assuming Database.ts contains your types

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  const tableName="source type";
  if (req.method === 'PUT') {
    const newRow: SourceType = req.body.newRow;

    // Validate required fields
    if (!newRow || !newRow.sourceTypecol) {
      return res.status(400).json({ message: 'Missing source type values' });
    }

    try {
      const { sourceTypecol } = newRow;

      // SQL query to insert a new SourceType record
      const result = await query(
        'INSERT INTO SourceType (sourceTypecol) VALUES (?)',
        [sourceTypecol]
      );

      res.status(200).json({
        message: 'SourceType added successfully',
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
