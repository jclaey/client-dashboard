import { Contact } from "../../models/Contact"

export const getAllContacts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit

        const filter = {};
        if (req.query.author) filter.author = req.query.author
        if (req.query.title) filter.title = new RegExp(req.query.title, 'i')

        const totalContacts = await Contact.countDocuments(filter)

        const contacts = await Contact.find(filter)
            .sort({ '_id': -1 })
            .skip(skip)
            .limit(limit)

        res.status(200).json({
            totalContacts,
            currentPage: page,
            totalPages: Math.ceil(totalContacts / limit),
            contacts
        })
    } catch (err) {
        next(err)
    }
}

export const newContact = async (req, res, next) => {
    try {
        if (!req.body.firstName || !req.body.lastName) {
            res.status(400)
            throw new Error('Please provide all required fields')
        }

        let image = {}

        if (req.file) {
            image = {
                path: req.file.path,
                filename: req.file.filename
            }
        }

        const contact = await Contact.create({
            name: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            address: {
                streetAddressOne: req.body.streetAddressOne ? req.body.streetAddressOne : '',
                streetAddressTwo: req.body.streetAddressTwo ? req.body.streetAddressTwo : '',
                city: req.body.city ? req.body.city : '',
                state: req.body.state ? req.body.state : '',
                postalCode: req.body.postalCode ? req.body.postalCode : ''
            },
            email: req.body.email ? req.body.email : '',
            phoneNumber: {
                mobile: req.body.mobileNumber ? req.body.mobileNumber : '',
                work: req.body.workNumber ? req.body.workNumber : '',
                home: req.body.homeNumber ? req.body.homeNumber : ''
            },
            policies: req.body.policies ? req.body.policies : [],
            image
        })

        res.status(201).json({
            _id: contact._id,
            name: contact.name,
            address: contact.address,
            email: contact.email,
            phoneNumber: contact.phoneNumber,
            policies: contact.policies,
            image
        })
    } catch (err) {
        next(err)
    }
}