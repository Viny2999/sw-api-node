import { MainService } from '../services/main.service';
import { Router } from 'express';

const router = Router();

router.get('/', MainService.prototype.getMain);

export const MainController: Router = router;