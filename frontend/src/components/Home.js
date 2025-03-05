import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import api from '../api.js'
import Layout from './Layout.js'
import AuthContext from '../context/AuthContext.js'
import { setAccessToken } from '../utils/authHelpers.js'

const Home = () => {
    const { setAccessToken: updateContextToken, setIsSignedIn, isSignedIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await api.post("/users/login", {
                email,
                password,
            }, { withCredentials: true })

            console.log("✅ Login Successful, Access Token:", response.data.accessToken)

            setAccessToken(response.data.accessToken)
            updateContextToken(response.data.accessToken)
            setIsSignedIn(true)

            setTimeout(() => {
                navigate('/dashboard')
            }, 100)

        } catch (err) {
            console.error('❌ Login failed:', err.response?.data || err.message)
            setError('Invalid email or password. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="main">
                <h1 style={{ marginBottom: '8rem' }}>Sign In to Your Insurance Dashboard</h1>
                <div className="submission-form">
                    <Form className="mb-4 d-flex horizontal" onSubmit={handleLogin}>
                        {error && <Alert variant="danger">{error}</Alert>}
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
                        <Button type="submit" variant="primary" className='mb-3'>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                        <div className='text-center'>
                            New user? Register <Link to='/register'>here</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default Home