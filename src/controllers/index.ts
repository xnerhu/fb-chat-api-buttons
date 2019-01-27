import { Router } from 'express';

import { IButton } from '../interfaces';
import { linkTemplate } from '../views';

const router = Router();

router.get('/link/:id', (req, res) => {
  const { id } = req.params;
  res.send(linkTemplate(req.query as IButton));
});

export default router;
