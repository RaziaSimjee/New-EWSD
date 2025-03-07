import express from 'express';
import { protect, roleAccess } from '../middleware/authMiddleware.js';
import { createIdea } from '../controllers/ideaController.js';
const router = express.Router();
router
  .route('/create')
  .post(protect, createIdea);

router.route('/test').get((req, res) => {
  console.log(req.user._id);
  res.send('Idea routes are working');
});

export default router;
