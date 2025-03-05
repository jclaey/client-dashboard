import User from "../../models/User.js"

export const addContact = async (req, res, next) => {
  try {
    console.log("Request payload:", req.body)
    console.log("Type of policies:", typeof req.body.policies)

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

    let policiesData = policies
    if (typeof policiesData === 'string') {
      try {
        policiesData = JSON.parse(policiesData)
      } catch (err) {
        res.status(400)
        throw new Error('Invalid policies format')
      }
    }

    const transformedPolicies = Array.isArray(policiesData)
      ? policiesData.map(policy => ({
          company: policy.policyCompany,
          type: policy.policyType,
          name: policy.policyName,
          activeDate: policy.policyActiveDate,
          expiryDate: policy.policyExpiryDate,
        }))
      : []

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
      policies: transformedPolicies,
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