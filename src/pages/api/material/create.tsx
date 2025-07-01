import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';
import { Material } from '@/models/Database'; // Assuming Database.ts contains your types

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'PUT') {
    const newRow: Material = req.body.newRow;

    // Validate required fields
    if (
      !newRow ||
      !newRow.name ||
      newRow.priceOf10g === undefined ||
      newRow.remainingQuantity === undefined
    ) {
      return res.status(400).json({ message: 'Missing material values' });
    }

    try {
      const { name, priceOf10g, remainingQuantity } = newRow;
      // SQL query to insert a new Material record
      const result = await query(
        'INSERT INTO Material (name, priceOf10g, remainingQuantity) VALUES (?, ?, ?)',
        [name, priceOf10g, remainingQuantity]
      );

      res.status(200).json({
        message: 'Material added successfully',
        result,
      });
    } catch (error: any) {
      console.error('Error creating material:', error);
      res.status(500).json({
        message: 'Error creating material',
        error: error.message,
      });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
