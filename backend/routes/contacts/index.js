import express from 'express'
const router = express.Router()
import multer from 'multer'
import { storage } from '../../cloudinary/index.js'
import asyncHandler from '../../middleware/async.js'
import { imageFileFilter } from '../../utils/fileFilter.js'
import { auth } from '../../middleware/auth.js'
import { handleValidationErrors } from '../../middleware/validationErrors.js'
import { 
    addContact
} from '../../controllers/contacts/index.js'
const upload = multer({ 
    storage,
    imageFileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
})

router.route('/add-contact').post(auth, asyncHandler(addContact))

export default router