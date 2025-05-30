import { Router } from 'express';
import { getUsers, getUserByUsername, updateUser, deleteUser } from '../controllers/users.controller';

const router = Router();

router.get('/', getUsers);
router.get('/users/:username', getUserByUsername);
router.put('/edit-user/:id', updateUser); 
router.put('/delete-user/:id', deleteUser);

export default router;