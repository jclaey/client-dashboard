import { useContext, useState } from "react"
import { Button, Form, Card } from "react-bootstrap"
import api from "../api.js"
import AuthContext from "../context/AuthContext.js"
import Layout from "./Layout.js"

const AddContact = () => {
    const { accessToken } = useContext(AuthContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [streetAddressOne, setStreetAddressOne] = useState('')
    const [streetAddressTwo, setStreetAddressTwo] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [email, setEmail] = useState('')
    const [mobilePhone, setMobilePhone] = useState('')
    const [workPhone, setWorkPhone] = useState('')
    const [homePhone, setHomePhone] = useState('')
    const [policies, setPolicies] = useState([
        {
          policyCompany: "",
          policyType: "",
          policyName: "",
          policyActiveDate: "",
          policyExpiryDate: "",
        },
    ])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const addPolicy = () => {
        setPolicies([
          ...policies,
          {
            policyCompany: "",
            policyType: "",
            policyName: "",
            policyActiveDate: "",
            policyExpiryDate: "",
          },
        ])
    }

    const handlePolicyChange = (index, field, value) => {
        const updatedPolicies = policies.map((policy, idx) => {
          if (idx === index) {
            return { ...policy, [field]: value }
          }
          return policy
        })

        setPolicies(updatedPolicies)
    }

    const handleSubmit = async e => {
        e.preventDefault()

        setError(null)

        try {
            setLoading(true)
            const response = await api.post(
                "/contacts/add-contact",
                {
                    firstName,
                    lastName,
                    streetAddressOne,
                    streetAddressTwo,
                    city,
                    state,
                    postalCode,
                    email,
                    mobileNumber: mobilePhone,
                    workNumber: workPhone,
                    homeNumber: homePhone,
                    policies,
                },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
            console.log("Contact added:", response.data)
            window.location.href = '/dashboard'
        } catch (err) {
            console.error("Error creating post:", err)
            setError("Failed to create post.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <h1 className="mb-5">Add New Contact</h1>
            <div className="submission-form">
                <Form 
                    style={{ marginBottom: '3rem', width: '50%' }}
                    onSubmit={handleSubmit}
                >
                    <h3 className="mb-4">Basic Contact Info</h3>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label><strong>First Name</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter first name..."
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label><strong>Last Name</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter last name..."
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="email">
                        <Form.Label><strong>Email</strong></Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <h3 className="mb-4">Contact Address</h3>
                    <Form.Group className="mb-3" controlId="streetAddressOne">
                        <Form.Label><strong>Street Address One</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter street address..."
                            value={streetAddressOne}
                            onChange={(e) => setStreetAddressOne(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="streetAddressTwo">
                        <Form.Label><strong>Street Address Two</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter street address..."
                            value={streetAddressTwo}
                            onChange={(e) => setStreetAddressTwo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label><strong>City</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter city..."
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Label><strong>State</strong></Form.Label>
                    <Form.Select 
                        aria-label="Select state"
                        className="mb-3"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    >
                        <option>Select Your State</option>
                        <option>Alabama</option>
                        <option>Alaska</option>
                        <option>Arizona</option>
                        <option>Arkansas</option>
                        <option>California</option>
                        <option>Colorado</option>
                        <option>Connecticut</option>
                        <option>Delaware</option>
                        <option>Florida</option>
                        <option>Georgia</option>
                        <option>Hawaii</option>
                        <option>Idaho</option>
                        <option>Illinois</option>
                        <option>Indiana</option>
                        <option>Iowa</option>
                        <option>Kansas</option>
                        <option>Kentucky</option>
                        <option>Louisiana</option>
                        <option>Maine</option>
                        <option>Maryland</option>
                        <option>Massachusetts</option>
                        <option>Michigan</option>
                        <option>Minnesota</option>
                        <option>Mississippi</option>
                        <option>Missouri</option>
                        <option>Montana</option>
                        <option>Nebraska</option>
                        <option>Nevada</option>
                        <option>New Hampshire</option>
                        <option>New Jersey</option>
                        <option>New Mexico</option>
                        <option>New York</option>
                        <option>North Carolina</option>
                        <option>North Dakota</option>
                        <option>Ohio</option>
                        <option>Oklahoma</option>
                        <option>Oregon</option>
                        <option>Pennsylvania</option>
                        <option>Rhode Island</option>
                        <option>South Carolina</option>
                        <option>South Dakota</option>
                        <option>Tennessee</option>
                        <option>Texas</option>
                        <option>Utah</option>
                        <option>Vermont</option>
                        <option>Virginia</option>
                        <option>Washington</option>
                        <option>West Virginia</option>
                        <option>Wisconsin</option>
                        <option>Wyoming</option>
                    </Form.Select>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label><strong>Postal Code</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter postal code..."
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="mobilePhone">
                        <Form.Label><strong>Mobile Phone Number</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter mobile phone number..."
                            value={mobilePhone}
                            onChange={(e) => setMobilePhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="workPhone">
                        <Form.Label><strong>Work Phone Number</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter work phone number..."
                            value={workPhone}
                            onChange={(e) => setWorkPhone(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="homePhone">
                        <Form.Label><strong>Home Phone Number</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter home phone number..."
                            value={homePhone}
                            onChange={(e) => setHomePhone(e.target.value)}
                        />
                    </Form.Group>
                    <h3 className="mb-4">Enter Contact Policies</h3>
                    {policies.map((policy, index) => (
                        <div key={index}>
                            <Form.Group className="mb-3" controlId={`policyCompany-${index}`}>
                                <Form.Label>
                                <strong>Policy Company</strong>
                                </Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter policy company name..."
                                value={policy.policyCompany}
                                onChange={(e) => handlePolicyChange(index, "policyCompany", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`policyType-${index}`}>
                                <Form.Label>
                                <strong>Policy Type</strong>
                                </Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter policy type..."
                                value={policy.policyType}
                                onChange={(e) => handlePolicyChange(index, "policyType", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`policyName-${index}`}>
                                <Form.Label>
                                <strong>Policy Name</strong>
                                </Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="Enter policy name..."
                                value={policy.policyName}
                                onChange={(e) => handlePolicyChange(index, "policyName", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`policyActiveDate-${index}`}>
                                <Form.Label>
                                <strong>Policy Active Date</strong>
                                </Form.Label>
                                <Form.Control
                                type="date"
                                value={policy.policyActiveDate}
                                onChange={(e) => handlePolicyChange(index, "policyActiveDate", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={`policyExpiryDate-${index}`}>
                                <Form.Label>
                                <strong>Policy Expiry Date</strong>
                                </Form.Label>
                                <Form.Control
                                type="date"
                                value={policy.policyExpiryDate}
                                onChange={(e) => handlePolicyChange(index, "policyExpiryDate", e.target.value)}
                                />
                            </Form.Group>
                            <hr />
                        </div>
                    ))}
                    <Button className="mb-5 p-3" variant="light" onClick={addPolicy}>
                        <i className="fa-solid fa-circle-plus"></i> Add Another Policy
                    </Button>
                    <Button size="lg" type="submit" variant="primary" className='mb-3'>Save Contact</Button>
                </Form>
            </div>
        </Layout>
    )
}

export default AddContact