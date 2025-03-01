import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import api from '../api.js'
import Layout from './Layout.js'
import AuthContext from '../context/AuthContext.js'
import { setAccessToken } from '../utils/authHelpers.js'

const Register = () => {
    const { setAccessToken: updateContextToken, setIsSignedIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await api.post("/users/register", {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            }, { withCredentials: true })

            console.log("✅ Registration Successful, Access Token:", response.data.accessToken)

            setAccessToken(response.data.accessToken)
            updateContextToken(response.data.accessToken)
            setIsSignedIn(true)

            setTimeout(() => {
                // Once dashboard route is created, navigate there instead of home
                navigate('/')
            }, 100)

        } catch (err) {
            console.error('❌ Login failed:', err.response?.data || err.message)
            setError('Registration failed. Please try again at a later time.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="main">
                <div style={{ marginBottom: '4rem' }}>
                    <h1>Register</h1>
                </div>
                <div className='submission-form' style={{ marginBottom: '4rem' }}>
                    <Form 
                        style={{ marginBottom: '3rem', width: '50%' }}
                        onSubmit={handleRegister}
                    >
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter first name..."
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter last name..."
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm password..."
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button 
                            type="submit" 
                            variant="primary"
                            disabled={loading}
                            id="form-btn"
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default Register