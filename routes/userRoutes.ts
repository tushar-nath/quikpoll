import { Router } from 'express'
import { Users } from '../handlers/userHandler'

const router = Router()

router.post('/signup', Users.signup)
router.post('/login', Users.login)
router.put('/:id', Users.updateUser)
router.delete('/:id', Users.deleteUser)
router.get('/', Users.listUsers)
router.get('/search', Users.searchUser)

export default router
