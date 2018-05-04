import { Router } from 'express'

import users from './users'
import vocabularies from './vocabularies'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(vocabularies)

export default router
