import { Router } from 'express';

const router = new Router();

const notFoundPageRoute = router.get('*', (req, res) => {
  res.status(404).render('error', {
    status: '404',
    error: `Page ${req.url} not found`,
  });
});

export { notFoundPageRoute };
