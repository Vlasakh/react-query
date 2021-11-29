import { Request, Response } from 'express';

import db from '../db-func';

// export function options(req: Request, res: Response) {
//   try {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', '*');
//     res.append('Access-Control-Allow-Headers', '*');
//     return res.status(200).json({});
//   } catch (e) {}
// }

export async function get(req: Request, res: Response): Promise<Response> {
  try {
    const treatments = await db.getTreatments();

    // res.append('Access-Control-Allow-Origin', ['*']);
    // res.append('Access-Control-Allow-Methods', '*');
    // res.append('Access-Control-Allow-Headers', '*');
    return res.status(200).json(treatments);
  } catch (e) {
    // res.append('Access-Control-Allow-Origin', ['*']);
    // res.append('Access-Control-Allow-Methods', '*');
    // res.append('Access-Control-Allow-Headers', '*');
    return res.status(500).json({ message: `could not get treatments: ${e}` });
  }
}

export default {
  // options,
  get,
};
