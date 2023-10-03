import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
// material
import { Box } from '@mui/material';
//
import { varWrapEnter } from './variants';

// ----------------------------------------------------------------------

const MotionContainer = ({ open, children, ...other }) => (
    <Box
        component={motion.div}
        initial={false}
        animate={open ? 'animate' : 'exit'}
        variants={varWrapEnter}
        {...other}
    >
        {children}
    </Box>
);

MotionContainer.propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.node
};

MotionContainer.defaultProps = {
    children: {}
};

export default MotionContainer;
