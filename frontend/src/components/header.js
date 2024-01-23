import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const Header = () => {
    return (
        <Navbar className="bg-white shadow-sm mb-3">
            <Container>
                <Navbar.Brand href="/">Quiz Game</Navbar.Brand>
                <Nav>
                    <Nav.Link to="/" as={NavLink}>Game</Nav.Link>
                    <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
                </Nav>
            </Container>

        </Navbar>

    );
}

export default Header;