import { Breadcrumbs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Seperator from '../../../assets/images/bc-sep.svg';

const BreadCrumb = ({ breadItems }) => (
    <Breadcrumbs
        aria-label="breadcrumb"
        color="primary"
        separator={<img src={Seperator} alt="seperator" />}
        sx={{ mb: 1 }}
    >
        {breadItems?.map((obj) =>
            obj.link ? (
                <Link to={obj.link} color="primary" key={obj.id}>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {' '}
                        {obj.breadItem}
                    </Typography>
                </Link>
            ) : (
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {obj.breadItem}
                </Typography>
            )
        )}
    </Breadcrumbs>
);

BreadCrumb.propTypes = {
    breadItems: PropTypes.arrayOf(PropTypes.array).isRequired
};
export default BreadCrumb;
