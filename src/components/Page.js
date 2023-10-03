import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { forwardRef } from 'react';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => (
    <HelmetProvider>
        <Box ref={ref} {...other}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </Box>
    </HelmetProvider>
));

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

Page.defaultProps = {
    title: ''
};

export default Page;
