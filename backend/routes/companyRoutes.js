import express from 'express';
import { getAllCompanies, getCompanyById, registerCompany, updateCompany } from '../controller/companyController.js';
import authenticateToken from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route("/register").post(authenticateToken, registerCompany);
router.route("/get").get(authenticateToken, getAllCompanies);
router.route("/get/:id").get(authenticateToken, getCompanyById);
router.route("/update/:id").put(authenticateToken, updateCompany);

export default router;