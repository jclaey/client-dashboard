import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { auth } from '../../middleware/auth.js'

import {
    refreshAccessToken,
    login,
    register,
    getUserInfo
} from '../../controllers/users/index.js'

router.route('/refresh').post(asyncHandler(refreshAccessToken))
router.route('/login').post(asyncHandler(login))
router.route('/register').post(asyncHandler(register))
router.route('/user-info').get(auth, asyncHandler(getUserInfo))

export default router