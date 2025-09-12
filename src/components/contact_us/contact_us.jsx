import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import instagramm from "../../assets/icons/instagram.png";
import Whatsapp from "../../assets/icons/Whatsapp.svg";

const COLORS = {
  cardBg: '#F1F3F4',
  textPrimary: '#282828',
  textSecondary: '#8B8B8B'
};

const TYPOGRAPHY_STYLES = {
  title: {
    fontWeight: 700,
    fontSize: { xs: '32px', md: '64px' },
    color: COLORS.textPrimary,
    lineHeight: 1.1
  },
  cardLabel: {
    fontWeight: 500,
    fontSize: '20px',
    color: COLORS.textSecondary,
    lineHeight: 1.3
  },
  cardValue: {
    fontWeight: 600,
    fontSize: { xs: '20px', md: '40px' },
    color: COLORS.textPrimary,
    lineHeight: 1.1
  }
};

const CARD_BASE_STYLES = {
  backgroundColor: COLORS.cardBg,
  borderRadius: '12px',
  boxShadow: 'none',
  height: '100%',
  width: '100%',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)'
  },
};

const CARD_LINK_STYLES = {
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',

  cursor: 'pointer'
};

const getCardStyles = (isLink = false) => ({
  ...CARD_BASE_STYLES,
  ...(isLink && CARD_LINK_STYLES)
});

const ContactCard = ({ label, value, href, gridSize = { xs: 12, md: 6 } }) => (
  <Grid item size={gridSize} sx={{ display: 'flex' }}>
    <Card
      sx={getCardStyles(!!href)}
      component={href ? 'a' : 'div'}
      href={href || undefined}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="body1" sx={{ ...TYPOGRAPHY_STYLES.cardLabel, mb: 2 }}>
          {label}
        </Typography>
        <Typography
          variant="h4"
          sx={TYPOGRAPHY_STYLES.cardValue}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

const SocialIcons = ({ socialLinks }) => (
  <Stack direction="row" spacing={2}>
    {socialLinks.map((social, index) => (
      <Box
        key={index}
        component="a"
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.label}
        sx={{
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          textDecoration: 'none',
          '&:hover': {
            opacity: 0.7
          },
          transition: 'opacity 0.2s ease'
        }}
      >
        <img
          src={social.icon}
          alt={social.label}
          style={{
            width: '38px',
            height: '38px',
            objectFit: 'contain'
          }}
        />
      </Box>
    ))}
  </Stack>
);

const ContactUs = () => {
  const contactData = {
    phone: {
      label: 'Phone',
      value: '+49 30 915-88492',
      href: 'tel:+493091588492'
    },
    address: {
      label: 'Address',
      value: 'Wallstraße 9-13, 10179 Berlin, Deutschland',
      href: 'https://maps.google.com/?q=Wallstraße+9-13,+10179+Berlin'
    },
    workingHours: {
      label: 'Working Hours',
      value: '24 hours a day',
      href: null
    }
  };

  const socialLinks = [
    {
      icon: instagramm,
      href: 'https://instagram.com/petshop',
      label: 'Instagram'
    },
    {
      icon: Whatsapp,
      href: 'https://wa.me/493091588492',
      label: 'WhatsApp'
    }
  ];

  return (
    <Box
      sx={{
        py: { xs: 4, md: 5 }
      }}
    >
      <Typography variant="h2" component="h2" sx={{ ...TYPOGRAPHY_STYLES.title, mb: 5 }}>
        Contact
      </Typography>
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <ContactCard
            label={contactData.phone.label}
            value={contactData.phone.value}
            href={contactData.phone.href}
            gridSize={{ xs: 12, md: 8 }}
          />
          <ContactCard
            label="Socials"
            value={<SocialIcons socialLinks={socialLinks} />}
            href={null}
            gridSize={{ xs: 12, md: 4 }}
          />
        </Grid>

        <Grid container spacing={4}>
          <ContactCard
            label={contactData.address.label}
            value={contactData.address.value}
            href={contactData.address.href}
            gridSize={{ xs: 12, md: 8 }}
          />
          <ContactCard
            label={contactData.workingHours.label}
            value={contactData.workingHours.value}
            href={contactData.workingHours.href}
            gridSize={{ xs: 12, md: 4 }}
          />
        </Grid>
      </Box>

      <Box
        sx={{
          width: '100%',
          height: { xs: '250px', md: '350px' },
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: COLORS.cardBg,
          position: 'relative'
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.2318071251407!2d13.401903676680615!3d52.511143872058874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27db4748a5%3A0x1d538c01013c2c7!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin!5e0!3m2!1sen!2sde!4v1757638424518!5m2!1sen!2sde"
          width="100%"
          height="100%"
          style={{
            border: 0,
            borderRadius: '12px'
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Pet Shop Location"
        />
      </Box>
    </Box>
  );
};

export default ContactUs;
