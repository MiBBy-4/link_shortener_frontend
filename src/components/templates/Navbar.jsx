import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Typography,
  Link,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { logoutRequest } from '../../requests/apiRequests/UserRequests';

export default function LinkNavbar(props) {
  const isLoggedIn = useSelector((status) => status.isLoggedIn);

  function handleLogoutClick() {
    logoutRequest(props.handleLogout());
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="bg-dark">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" underline="none" color="inherit">Links</Link>
            <Link href="/links" className="mx-4" underline="none" color="inherit">List of links</Link>
          </Typography>
          { isLoggedIn ? (
            <Button onClick={() => handleLogoutClick()} color="inherit">
              Logout
            </Button>
          ) : (
            <Box>
              <Link href="/login" underline="hover" color="inherit" className="mx-2">
                Login
              </Link>
              <Link href="/registration" underline="hover" color="inherit">
                Registration
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
