import { Router } from 'express';

const router = Router();

router.get('/callback/:id', (req, res) => {
  const { id } = req.params;
  res.send('aha');
});

export default router;
