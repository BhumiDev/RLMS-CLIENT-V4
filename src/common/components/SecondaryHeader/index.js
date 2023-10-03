import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const SecondaryHeader = ({ title, endText, hideEnd }) => {
    return (
        <Box
            className="secondary-header"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            px={2}
            sx={{
                bgcolor: 'primary.light',
                width: '100%',
                height: '45px',
                borderRadius: '8px 8px 0px 0px',
                color: 'primary.contrastText'
            }}
        >
            <Typography variant="h4">{title}</Typography>
            <Typography variant="h4" sx={hideEnd && { display: 'none' }}>
                {endText}
            </Typography>
        </Box>
    );
};

SecondaryHeader.propTypes = {
    title: PropTypes.string.isRequired,
    endText: PropTypes.string.isRequired,
    hideEnd: PropTypes.bool.isRequired
};

export default SecondaryHeader;
