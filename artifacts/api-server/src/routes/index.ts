import { Router, type IRouter } from "express";
import healthRouter from "./health";
import propertiesRouter from "./properties";
import servicesRouter from "./services";
import aboutRouter from "./about";

const router: IRouter = Router();

router.use(healthRouter);
router.use(propertiesRouter);
router.use(servicesRouter);
router.use(aboutRouter);

export default router;
