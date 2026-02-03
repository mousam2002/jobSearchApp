import express from 'express';

import authenticateToken from '../middleware/isAuthenticated.js';
import { getAdminJob, getAllJobs, getJobById, postJob } from '../controller/jobController.js';

const router = express.Router();

router.route("/post").post(authenticateToken, postJob);
router.route("/get").get(authenticateToken, getAllJobs);
router.route("/getadminjobs").get(authenticateToken, getAdminJob);
router.route("/get/:id").get(authenticateToken, getJobById);

export default router;