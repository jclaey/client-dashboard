import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import StyledLink from './StyledLink.js'

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg" style={{ height: '100px' }}>
            <Navbar.Brand as={Link} to="/" style={{ marginLeft: '2rem', fontSize: '28px' }}>
                My Dashboard
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <StyledLink to="/" fontSize={20}>Home</StyledLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar