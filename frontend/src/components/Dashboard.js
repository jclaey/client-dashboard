import { useEffect, useState, useContext } from "react"
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap'
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

    const renderPolicies = (policies) =>
        policies.map((policy, idx) => (
            <div key={idx}>
                <Row>
                    <Col><strong>Company:</strong> {policy.company}</Col>
                </Row>
                <Row>
                    <Col><strong>Type:</strong> {policy.type}</Col>
                    <Col><strong>Name:</strong> {policy.name}</Col>
                </Row>
                <Row>
                    <Col><strong>Active Date:</strong> {policy.activeDate}</Col>
                    <Col><strong>Expiry Date:</strong> {policy.expiryDate}</Col>
                </Row>
            </div>
    ))

    const renderContacts = contacts.map((contact, idx) => (
        <Card key={idx} className="mb-3">
            <Card.Body>
                <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
                <Card.Text>
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
                    <strong>Phone Number:</strong> {contact.phoneNumber}
                </div>
                {/* Render policies for this contact */}
                {contact.policies && renderPolicies(contact.policies)}
                </Card.Text>
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