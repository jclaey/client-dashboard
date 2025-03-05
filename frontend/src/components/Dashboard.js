import { useEffect, useState, useContext } from "react"
import { Button, Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import api from '../api.js'
import Layout from "./Layout.js"
import AuthContext from "../context/AuthContext.js"

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [contacts, setContacts] = useState([])
    const [error, setError] = useState(null)
    const { isSignedIn, accessToken } = useContext(AuthContext)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/users/user-info', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })

                console.log(response)
        
                setUserInfo(response.data.user)
                setContacts(response.data.user.contacts)
            } catch (err) {
                console.error('Error fetching user details:', err)
                setError('Failed to fetch user details')
            }
        }

        fetchUser()
    }, [accessToken])

    if (!userInfo) {
        return (
          <Layout>
            <div>Loading...</div>
          </Layout>
        )
    }

    const renderContacts = contacts.map((contact, idx) => (
        <Card className="mb-3" key={idx}>
            <Card.Body>
                <Card.Title>
                    <h3>{contact.firstName} {contact.lastName}</h3>
                </Card.Title>
                <div>
                    <div>
                        <strong>Street Address:</strong> {contact.address?.streetAddressOne} {contact.address?.streetAddressTwo}
                    </div>
                    <div>
                        {contact.address?.city}, {contact.address?.state}, {contact.address?.postalCode}
                    </div>
                    <div>
                        <strong>Email:</strong> {contact.email}
                    </div>
                    <div>
                        <strong>Phone Number:</strong>
                        <div>
                            <span>Mobile: {contact.phoneNumber.mobile}</span><br />
                            <span>Work: {contact.phoneNumber.work}</span><br />
                            <span>Home: {contact.phoneNumber.home}</span>
                        </div>
                    </div>
                    {contact.policies && contact.policies.length > 0 && (
                        <div>
                        <strong>Policies:</strong>
                        {contact.policies.map((policy, idx) => (
                            <div key={idx} style={{ marginLeft: '1rem' }}>
                            <div><strong>Company:</strong> {policy.company}</div>
                            <div><strong>Type:</strong> {policy.type}</div>
                            <div><strong>Name:</strong> {policy.name}</div>
                            <div><strong>Active Date:</strong> {new Date(policy.activeDate).toLocaleDateString()}</div>
                            <div><strong>Expiry Date:</strong> {new Date(policy.expiryDate).toLocaleDateString()}</div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    ))

    return (
        <Layout>
            <div className="mb-5">
                <h1>Welcome {userInfo.firstName}!</h1>
            </div>
            <div>
                {error && <p className="text-danger">{error}</p>}
                {renderContacts}
            </div>
        </Layout>
    )
}

export default Dashboard