import express from 'express'
const router = express.Router()
import asyncHandler from '../../middleware/async.js'
import { authAdmin } from '../../middleware/auth.js'

export default router