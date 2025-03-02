export const addContact = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            res.status(404)
            throw new Error('Could not find user')
        }

        const {
            firstName,
            lastName,
            streetAddressOne,
            streetAddressTwo,
            city,
            state,
            postalCode,
            email,
            mobileNumber,
            workNumber,
            homeNumber,
            policies,
        } = req.body

        if (!firstName || !lastName) {
            res.status(400);
            throw new Error('Please provide all required fields');
        }

        let image = {}

        if (req.file) {
            image = {
                path: req.file.path,
                filename: req.file.filename
            }
        }

        const contact = {
            firstName,
            lastName,
            address: {
              streetAddressOne: streetAddressOne || '',
              streetAddressTwo: streetAddressTwo || '',
              city: city || '',
              state: state || '',
              postalCode: postalCode || '',
            },
            email: email || '',
            phoneNumber: {
              mobile: mobileNumber || '',
              work: workNumber || '',
              home: homeNumber || '',
            },
            policies: policies || [],
            image,
        }

        user.contacts.push(contact)
        await user.save()

        const newContact = user.contacts[user.contacts.length - 1]

        res.status(201).json({
            _id: newContact._id,
            firstName: newContact.firstName,
            lastName: newContact.lastName,
            address: newContact.address,
            email: newContact.email,
            phoneNumber: newContact.phoneNumber,
            policies: newContact.policies,
            image: newContact.image,
        })
    } catch (err) {
        next(err)
    }
}