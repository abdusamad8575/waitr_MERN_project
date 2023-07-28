import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function Orders() {


  return (
    <>
      <Helmet>
        <title> orders| dashboard </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
          </Stack>
      </Container>
    </>
  );
}
