import { query } from '../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  const tableName="diagnostic source";
  if (req.method === 'POST') {
    const newRow = req.body.newRow;
    const { id } = req.body;

    if (
      !newRow ||
      !newRow.sourceType_id ||
      !newRow.name ||
      !newRow.address ||
      !newRow.phoneNumber
    ) {
      return res.status(400).json({ message: 'Missing patient values' });
    }

    try {
      const { sourceType_id, name, address, phoneNumber} = newRow;

      const result = await query(
        'UPDATE diagnosticSource SET sourceType_id = ?, name = ?, address = ?, phoneNumber = ? WHERE id = ?',
        [sourceType_id, name, address, phoneNumber, id]
      );

      res.status(200).json({
        message: 'Patient updated successfully',
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
