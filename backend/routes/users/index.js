import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { auth } from '../../middleware/auth.js'

import {
    refreshAccessToken,
    login,
    register
} from '../../controllers/users/index.js'

router.route('/refresh').post(asyncHandler(refreshAccessToken))
router.route('/login').post(asyncHandler(login))
router.route('/register').post(asyncHandler(register))

export default router