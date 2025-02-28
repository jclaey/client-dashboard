export const validateEmail =
    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')

export const validatePassword = 
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 12 and 30 characters')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,30}$/)
    // .withMessage('Password must include uppercase, lowercase, number, and special character')

export const validateZipcode =
    body('postalCode')
    .trim()
    .notEmpty()
    .withMessage('Please enter a zipcode')
    .isPostalCode('US')
    .escape()

export const validatePhoneNumber =
    body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Please enter a phone number')
    .custom(value => {
        const phoneNumber = parsePhoneNumber(value, 'US')
        
        if (!phoneNumber) {
            throw new Error('Please enter a valid phone number')
        } else {
            return true
        }
    })

export const validateStreetAddressTwo =
    body('streetAddressTwo')
    .trim()
    .escape()

export const validateStreetAddressOne =
    body('streetAddressOne')
    .trim()
    .notEmpty()
    .withMessage('Please enter a street address')
    .escape()

export const validateCity = 
    body('city')
    .trim()
    .notEmpty()
    .withMessage('Please enter a city')
    .escape()

export const validateState = 
    body('city')
    .trim()
    .notEmpty()
    .withMessage('Please enter a city')
    .escape()

export const validateFirstName =
    body('firstName')
    .trim()
    .notEmpty()
    .withMessage('Please enter a first name')
    .escape()

export const validateLastName =
    body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Please enter a last name')
    .escape()