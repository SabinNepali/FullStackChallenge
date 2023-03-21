import { Router } from 'express';
import { getResults, getResult, createResult, updateResult, deleteResult } from '../controllers/results.controller';

const router = Router();

router.get("/results", getResults);
router.get("/result/:id", getResult);
router.post("/create", createResult);
router.put("/update/:id", updateResult);
router.delete("/delete/:id", deleteResult);

export default router;