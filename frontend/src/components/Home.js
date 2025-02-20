import Layout from "./Layout.js"
import { Button, Card, Form } from 'react-bootstrap'

const Home = () => {
    return (
        <Layout>
            <div className="main">
                <h1 className="mb-5">Some Company</h1>
                <Form className="mb-4 d-flex">
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email..."
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter password..."
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">Sign In</Button>
                </Form>
            </div>
        </Layout>
    )
}

export default Home