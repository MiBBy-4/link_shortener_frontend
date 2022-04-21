import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="bg-dark">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Links
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
