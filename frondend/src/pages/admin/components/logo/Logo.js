import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';


// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {

  // OR using local (public folder)
  // -------------------------------------------------------
    const logo = (
      <Box
        component="img"
        src="/assets/1689067571491.png"
        sx={{ width: 70, height: 30, cursor: 'pointer', ...sx }}
      />
    );

 
  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/dashboard/app" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
