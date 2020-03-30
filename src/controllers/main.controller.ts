import { MainService } from '../services/main.service';
import { Router } from 'express';

const router = Router();
const mainService = new MainService();

router.get('/', mainService.getMain);

export const MainController: Router = router;