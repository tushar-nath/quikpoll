import { Router } from 'express';
import { Messages } from '../handlers/messageHandler';

const router = Router();

router.get('/', Messages.getMessages);

export default router;
