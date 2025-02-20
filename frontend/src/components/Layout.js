import { Container } from "react-bootstrap"
import Footer from "./Footer.js"
import NavigationBar from "./Navbar.js"

const Layout = ({ children }) => {
    return (
        <>
            <header style={{ marginBottom: '2rem' }}>
                <NavigationBar />
            </header>
            <Container>
                <main>
                    {children}
                </main>
            </Container>
            <Footer />
        </>    
    )
}

export default Layout