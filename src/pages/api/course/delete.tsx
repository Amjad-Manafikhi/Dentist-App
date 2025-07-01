import { query } from '../../../lib/db'; // Adjust path if needed
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; result?: any; error?: string }>
) {
  if (req.method === 'DELETE') {
    const { id } = req.body;
    console.log(id);
    if (!id) {
      return res.status(400).json({ message: 'Missing course ID' });
    }

    try {
      const result = await query('DELETE FROM course WHERE id = ?', [id]);

      res.status(200).json({
        message: 'course deleted successfully',
        result,
      });
    } catch (error: unknown) {
      console.error('Error deleting course:', error);
      res.status(500).json({
        message: 'Error deleting course',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
