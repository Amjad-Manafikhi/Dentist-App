import { query } from '../../../lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: unknown; error?: string }>
) {
  const tableName="material";
  if (req.method === 'POST') {
    const newRow = req.body.newRow;
    const { id } = req.body;

    if (
      !newRow ||
      !newRow.name ||
      !newRow.priceOf10g ||
      !newRow.remainingQuantity
    ) {
      return res.status(400).json({ message: 'Missing material values' });
    }

    try {
      const { name, priceOf10g, remainingQuantity} = newRow;

      const result = await query(
        'UPDATE material SET name = ?, priceOf10g = ?, remainingQuantity = ? WHERE id = ?',
        [name, priceOf10g, remainingQuantity, id]
      );

      res.status(200).json({
        message: 'material updated successfully',
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
