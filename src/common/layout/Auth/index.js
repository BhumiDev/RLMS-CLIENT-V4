import { Outlet } from 'react-router-dom';
import { Grid, Box, Typography } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';
import logo from '../../../assets/Logo.svg';
import './index.css';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const LoginLayout = () => {
    const theme = useTheme();
    return (
        <Grid
            container
            className="authLayout-wrapper"
            sx={{ flexDirection: { xs: 'column', md: 'row' } }}
        >
            {console.log('Auth theme fetched', theme)}
            <Grid item xs={12} md={6} className="static-container">
                <Box
                    className="auth-left"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pl={10}
                    height="100vh"
                    sx={{ backgroundColor: 'primary.main' }}
                >
                    <img src={logo} alt="logo" width="70%" />
                    <Typography
                        sx={{
                            color: 'white',
                            marginLeft: '8px'
                        }}
                    >
                        Proficiency X-leration Platform
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} md={6} className="dynamic-container">
                <Box
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Outlet />
                </Box>
            </Grid>
        </Grid>
    );
};

// LoginLayout.defaultProps = {
//     theme: {}
// };
// LoginLayout.propTypes = {
//     theme: PropTypes.objectOf(PropTypes.object)
// };

export default LoginLayout;
