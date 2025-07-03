import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { DiagnosticSource } from '@/models/Database'; // Assuming Database.ts contains your types

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  const tableName="diagnostic source";
  if (req.method === 'PUT') {
    const newRow: DiagnosticSource = req.body.newRow;

    // Validate required fields
    if (
      !newRow ||
      newRow.sourceType_id === undefined ||
      !newRow.name ||
      !newRow.address ||
      !newRow.phoneNumber
    ) {
      return res.status(400).json({ message: 'Missing diagnostic source values' });
    }

    try {
      const { sourceType_id, name, address, phoneNumber } = newRow;

      // SQL query to insert a new DiagnosticSource record
      const result = await query(
        'INSERT INTO DiagnosticSource (sourceType_id, name, address, phoneNumber) VALUES (?, ?, ?, ?)',
        [sourceType_id, name, address, phoneNumber]
      );

      res.status(200).json({
        message: 'DiagnosticSource added successfully',
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
