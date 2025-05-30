import { Router } from 'express';
import { getTimeToken, loginMethod, saveUser, updateToken } from '../controllers/auth.controller';

const router = Router();

router.post('/login-user', loginMethod);
router.get('/time/:userId', getTimeToken);
router.put('/update/:userId', updateToken);
router.post('/users', saveUser)

export default router;