import { Router } from 'express'
import { Polls } from '../handlers/pollHandler'

const router = Router()

router.post('/', Polls.createPoll)
router.post('/vote', Polls.vote)
router.get('/', Polls.getPolls)

export default router
