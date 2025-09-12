import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dog from '../../assets/images/dog404.png';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          py: 8
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
            position: 'relative'
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '120px', md: '270px' },
              fontWeight: 700,
              color: '#0D50FF',
              lineHeight: 1
            }}
          >
            4
          </Typography>
          
          <Box
            sx={{
              width: { xs: '120px', md: '300px' },
              height: { xs: '120px', md: '270px' },
              backgroundImage: `url(${dog})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mt: { xs: 0, md: '-30px' }
            }}
          />
          
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '120px', md: '270px' },
              fontWeight: 700,
              color: '#0D50FF',
              lineHeight: 1
            }}
          >
            4
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '28px', md: '48px' },
              fontWeight: 700,
              color: '#282828',
              mb: 2
            }}
          >
            Page Not Found
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '16px', md: '18px' },
              color: '#8B8B8B',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            We're sorry, the page you requested could not be found. Please go back to the homepage.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleGoHome}
          sx={{
            backgroundColor: '#0D50FF',
            color: 'white',
            fontSize: '16px',
            fontWeight: 600,
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#0D50FF'
            }
          }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;