import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../requests/apiRequests/UserRequests';

export default function LinkNavbar(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((status) => status.isLoggedIn);

  async function handleLogoutClick() {
    const response = await logoutRequest();
    if (response.data.logged_out) {
      props.handleLogout();
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/links">List of Links</Nav.Link>
          </Nav>
          { isLoggedIn ? (
            <Nav>
              <Nav.Link onClick={() => handleLogoutClick()}>Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/registration">Registration</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
