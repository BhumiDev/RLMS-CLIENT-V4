import PropTypes from 'prop-types';

import { Box } from '@mui/material';

const Logo = ({ sx }) => (
    <Box
        component="img"
        src="/static/images/logo.png"
        sx={{ width: 40, height: 40, ...sx }}
    />
);

Logo.propTypes = {
    sx: PropTypes.objectOf(PropTypes.object)
};

Logo.defaultProps = {
    sx: {}
};

export default Logo;
