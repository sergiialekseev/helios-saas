import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SortIcon from '@mui/icons-material/Sort';

const imgEllipse426 = 'https://www.figma.com/api/mcp/asset/e6699ed4-f527-4731-afa6-aa83763c41ac';
const imgEllipse427 = 'https://www.figma.com/api/mcp/asset/595cc5fd-740f-4998-817f-30b4dd67c2d7';
const imgUnsplashRuJm3DBxCqw = 'https://www.figma.com/api/mcp/asset/be244cd9-ab99-4344-85e3-d9c2ccbff6aa';
const imgUnsplashLki74Jj7HU = 'https://www.figma.com/api/mcp/asset/04bb5d68-6c66-48ab-9cf8-1893bba4af9a';
const imgUnsplashTrYl7Jyath0 = 'https://www.figma.com/api/mcp/asset/8e396511-e27e-4734-9f87-d568e555a316';
const imgUnsplash9XngoIpxcEo = 'https://www.figma.com/api/mcp/asset/35848223-1ac9-4994-91e4-b32ff9a3f621';
const imgUnsplashUd5DrKd4H6W = 'https://www.figma.com/api/mcp/asset/93b995d2-654b-4344-baf3-eec0b3c0adc0';
const imgUnsplashFg7J6NnebBc = 'https://www.figma.com/api/mcp/asset/d7ea6520-9ecc-4f02-9b6d-444a79e4cc8f';
const imgUnsplashWN9Du73B8S = 'https://www.figma.com/api/mcp/asset/c86587fd-54b8-4f60-af59-99b2e8bd7f4a';
const imgUnsplashHoS3DzgpHzw = 'https://www.figma.com/api/mcp/asset/c1e79588-96f1-48a0-b6c0-2f30b6fcfdb1';
const imgUnsplashBU8TeXhsPcY = 'https://www.figma.com/api/mcp/asset/3d96ee7a-c315-4c6e-a08b-7be1749a48b5';
const imgUnsplash7PQszt9KiEy = 'https://www.figma.com/api/mcp/asset/22d6568b-3499-4d6c-9021-832bc9257679';
const imgUnsplashCrs2VlkSe98 = 'https://www.figma.com/api/mcp/asset/d571cb99-b20b-433a-9c3e-0db0b456a30a';
const imgUnsplash9AdeEdYb2Yk = 'https://www.figma.com/api/mcp/asset/5e4e174d-9e37-40c6-a805-606123e52feb';
const imgInstagram = 'https://www.figma.com/api/mcp/asset/78c59a2f-dc1d-4114-8176-40a37c3ea22d';
const imgFacebook = 'https://www.figma.com/api/mcp/asset/125d148f-ab0d-41af-95d2-5617aca8e2d6';
const imgTwitterSquared = 'https://www.figma.com/api/mcp/asset/61cc1330-67f4-47d6-9034-e5584e3d23bc';
const imgUnsplashOg44D93INJk = 'https://www.figma.com/api/mcp/asset/86c1dd17-3ee9-4a52-9044-ac8cff2083f4';
const imgEllipse132 = 'https://www.figma.com/api/mcp/asset/56c52463-e97c-4abc-8add-13c004299ce6';
const imgEllipse133 = 'https://www.figma.com/api/mcp/asset/bff651b2-667e-405e-9582-cd8c5f8333a2';
const imgShield = 'https://www.figma.com/api/mcp/asset/6e5111b1-927c-4557-9b3f-cac44562be84';
const imgArchive = 'https://www.figma.com/api/mcp/asset/9fbd4ab7-8054-4360-948e-6711f078c14c';
const imgMedia = 'https://www.figma.com/api/mcp/asset/d58664d5-5496-49d4-bcc3-6e85e5ccc420';
const imgRocket = 'https://www.figma.com/api/mcp/asset/0b64f4e5-ae38-434f-898b-b95ee289b52c';

const navLinks = ['Explore', 'Artists', 'Community', 'Activity', 'How it works'];

const hotAuctions = [
  {
    title: 'Lorem ipsum',
    price: '1.20 Weth',
    image: imgUnsplashRuJm3DBxCqw,
    endsIn: '01.34.45',
    action: 'Bid'
  },
  {
    title: 'Dolor sit amet',
    price: '0.21 Weth',
    image: imgUnsplash9XngoIpxcEo,
    endsIn: '10.22.45',
    action: 'Buy'
  },
  {
    title: 'Dignissim curabitu..',
    price: '0.01 Weth',
    image: imgUnsplashWN9Du73B8S,
    endsIn: '56.44.45',
    action: 'Bid'
  },
  {
    title: 'Amet pellentesq..',
    price: '0.55 Weth',
    image: imgUnsplash7PQszt9KiEy,
    endsIn: '01.34.45',
    action: 'Bid'
  }
];

const discoverItems = [
  {
    title: 'Lorem ipsum',
    price: '1.20 Weth',
    image: imgUnsplashLki74Jj7HU,
    endsIn: '05.34.45',
    action: 'Bid'
  },
  {
    title: 'Dolor sit amet',
    price: '0.21 Weth',
    image: imgUnsplashUd5DrKd4H6W,
    endsIn: '10.22.45',
    action: 'Buy'
  },
  {
    title: 'Dignissim curabitu..',
    price: '0.01 Weth',
    image: imgUnsplashHoS3DzgpHzw,
    endsIn: '56.44.45',
    action: 'Bid'
  },
  {
    title: 'Amet pellentesq..',
    price: '0.55 Weth',
    image: imgUnsplashCrs2VlkSe98,
    endsIn: '01.34.45',
    action: 'Bid'
  },
  {
    title: 'Lorem ipsum',
    price: '1.20 Weth',
    image: imgUnsplashTrYl7Jyath0,
    endsIn: '05.34.45',
    action: 'Bid'
  },
  {
    title: 'Dolor sit amet',
    price: '0.21 Weth',
    image: imgUnsplashFg7J6NnebBc,
    endsIn: '10.22.45',
    action: 'Buy'
  },
  {
    title: 'Dignissim curabitu..',
    price: '0.01 Weth',
    image: imgUnsplashBU8TeXhsPcY,
    endsIn: '56.44.45',
    action: 'Bid'
  },
  {
    title: 'Amet pellentesq..',
    price: '0.55 Weth',
    image: imgUnsplash9AdeEdYb2Yk,
    endsIn: '01.34.45',
    action: 'Bid'
  }
];

const gettingStarted = [
  {
    title: 'Connect your wallet',
    description: 'Connect your wallet',
    icon: imgShield
  },
  {
    title: 'Share your work',
    description: 'Posuere urna, sit amet molestie leo',
    icon: imgArchive
  },
  {
    title: 'Create a collection',
    description: 'Semper pretium libero sed quam ac integer ut',
    icon: imgMedia
  },
  {
    title: 'Earn rewards',
    description: 'Lectus volutpat magna vitae in arcu',
    icon: imgRocket
  }
];

const GaslurLanding = () => {
  return (
    <Box
      sx={{
        bgcolor: '#1f1d2b',
        color: '#ffffff',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Poppins", "Inter", sans-serif',
        '@keyframes floatSlow': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        '@keyframes fadeUp': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' }
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <Box
          component="img"
          src={imgEllipse132}
          alt=""
          sx={{
            position: 'absolute',
            width: 140,
            height: 140,
            top: 100,
            left: { xs: '60%', md: '55%' },
            opacity: 0.9
          }}
        />
        <Box
          component="img"
          src={imgEllipse133}
          alt=""
          sx={{
            position: 'absolute',
            width: 140,
            height: 140,
            top: 620,
            right: { xs: 40, md: 80 },
            opacity: 0.9
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '70%',
            width: '90%',
            height: 120,
            transform: 'translateX(-50%)',
            filter: 'blur(100px)',
            background:
              'linear-gradient(146deg, rgba(155, 81, 224, 0.7) 0%, rgba(48, 129, 237, 0.7) 100%)'
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, md: 6 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'linear-gradient(110deg, #9b51e0 0%, #3081ed 100%)',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text'
            }}
          >
            Gaslur
          </Typography>
          <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((link) => (
              <Typography
                key={link}
                sx={{
                  fontSize: 12,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#bcbcbc'
                }}
              >
                {link}
              </Typography>
            ))}
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              sx={{
                borderColor: '#d7d7d7',
                color: '#bcbcbc',
                fontSize: 12,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                px: 3,
                borderRadius: 2
              }}
            >
              Create
            </Button>
            <Button
              variant="text"
              sx={{
                color: '#bcbcbc',
                fontSize: 12,
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={{ xs: 6, md: 6 }} alignItems="center" sx={{ mt: { xs: 4, md: 8 } }}>
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Typography
                sx={{
                  fontSize: { xs: 40, md: 72 },
                  lineHeight: 1.1,
                  fontWeight: 600,
                  maxWidth: 640
                }}
              >
                Discover, collect, and charity in extraordinary NFT marketplace
              </Typography>
              <Typography sx={{ fontSize: { xs: 18, md: 24 }, color: '#e2e2e2' }}>
                In aenean posuere lorem risus nec. Tempor tincidunt aenean purus purus vestibulum nibh
                mi venenatis.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: 20,
                    color: '#ffffff',
                    background:
                      'linear-gradient(132deg, rgba(155, 81, 224, 1) 0%, rgba(48, 129, 237, 0.8) 100%)'
                  }}
                >
                  Explore
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: 20,
                    color: '#d7d7d7',
                    borderColor: '#d7d7d7'
                  }}
                >
                  Create
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                background:
                  'linear-gradient(168deg, rgba(58, 129, 191, 0.08) 0%, rgba(65, 48, 90, 0.08) 100%)',
                border: '1px solid rgba(251, 55, 255, 0.7)',
                backdropFilter: 'blur(40px)',
                animation: 'floatSlow 12s ease-in-out infinite'
              }}
            >
              <Box
                component="img"
                src={imgUnsplashOg44D93INJk}
                alt="Featured NFT"
                loading="lazy"
                sx={{ width: '100%', height: { xs: 260, md: 320 }, borderRadius: 3, objectFit: 'cover' }}
              />
              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ position: 'relative', width: 56, height: 56 }}>
                    <Box
                      component="img"
                      src={imgEllipse426}
                      alt=""
                      sx={{ width: '100%', height: '100%' }}
                    />
                    <Box
                      component="img"
                      src={imgEllipse427}
                      alt=""
                      sx={{ position: 'absolute', inset: -4, width: 'calc(100% + 8px)' }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>Laura</Typography>
                    <Typography sx={{ color: '#d7d7d7' }}>0.21 Weth</Typography>
                  </Box>
                </Stack>
                <Stack spacing={0.5} alignItems="flex-end">
                  <Typography sx={{ fontWeight: 600, letterSpacing: 1 }}>WE ARE HERE</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FavoriteBorderIcon sx={{ fontSize: 16, color: '#e0e0e0' }} />
                    <Typography sx={{ color: '#e0e0e0' }}>25</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: { xs: 8, md: 12 }, mb: 3 }}
        >
          <Typography sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 500 }}>
            Hot auctions
          </Typography>
          <Button
            variant="text"
            endIcon={<ArrowForwardIcon />}
            sx={{ color: '#d7d7d7', fontSize: 20 }}
          >
            View all
          </Button>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))'
            },
            gap: 3
          }}
        >
          {hotAuctions.map((item, index) => (
            <Paper
              key={`${item.title}-${index}`}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: '#262433',
                border: '1px solid rgba(255,255,255,0.08)',
                opacity: 0,
                animation: 'fadeUp 0.8s ease forwards',
                animationDelay: `${index * 0.07}s`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.35)'
                }
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                loading="lazy"
                sx={{ width: '100%', height: 180, borderRadius: 2, objectFit: 'cover' }}
              />
              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                <Typography sx={{ color: '#e2e2e2' }}>{item.price}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                <Typography sx={{ color: '#bcbcbc' }}>Ends in {item.endsIn}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: '#e2e2e2', color: '#e2e2e2', borderRadius: 2 }}
                >
                  {item.action}
                </Button>
              </Stack>
            </Paper>
          ))}
        </Box>

        <Stack alignItems="center" textAlign="center" sx={{ mt: { xs: 8, md: 12 } }}>
          <Typography sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 500 }}>
            Getting started
          </Typography>
          <Typography sx={{ color: '#e2e2e2', fontSize: { xs: 18, md: 24 }, mt: 1 }}>
            Eu, molestie commodo, enim pellentesque turpis integer sagittis
          </Typography>
        </Stack>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {gettingStarted.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: 'center',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(30px)'
                }}
              >
                <Box
                  component="img"
                  src={item.icon}
                  alt=""
                  sx={{ width: 32, height: 32, mb: 2, filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.2))' }}
                />
                <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                <Typography sx={{ color: '#e2e2e2', mt: 1 }}>{item.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: { xs: 8, md: 12 } }}>
          <Typography sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 500 }}>
            Discover
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              startIcon={<SortIcon />}
              endIcon={<ExpandMoreIcon />}
              sx={{ color: '#ffffff', fontSize: 20, textTransform: 'none' }}
            >
              Category
            </Button>
            <Button
              endIcon={<ExpandMoreIcon />}
              sx={{ color: '#ffffff', fontSize: 20, textTransform: 'none' }}
            >
              Cheapest
            </Button>
            <Button
              endIcon={<ExpandMoreIcon />}
              sx={{ color: '#ffffff', fontSize: 20, textTransform: 'none' }}
            >
              Newest
            </Button>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                background:
                  'linear-gradient(102deg, rgba(155, 81, 224, 1) 0%, rgba(48, 129, 237, 1) 100%)',
                color: '#ffffff'
              }}
            >
              Filter
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))'
            },
            gap: 3,
            mt: 2
          }}
        >
          {discoverItems.map((item, index) => (
            <Paper
              key={`${item.title}-${item.image}`}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: '#262433',
                border: '1px solid rgba(255,255,255,0.08)',
                opacity: 0,
                animation: 'fadeUp 0.8s ease forwards',
                animationDelay: `${index * 0.06}s`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.35)'
                }
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                loading="lazy"
                sx={{ width: '100%', height: 200, borderRadius: 2, objectFit: 'cover' }}
              />
              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                <Typography sx={{ color: '#e2e2e2' }}>{item.price}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                <Typography sx={{ color: '#bcbcbc' }}>Ends in {item.endsIn}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: '#e2e2e2', color: '#e2e2e2', borderRadius: 2 }}
                >
                  {item.action}
                </Button>
              </Stack>
            </Paper>
          ))}
        </Box>

        <Stack alignItems="center" sx={{ mt: 5 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#d7d7d7',
              color: '#bcbcbc',
              px: 5,
              borderRadius: 2,
              fontSize: 14,
              letterSpacing: '0.15em'
            }}
          >
            Load more
          </Button>
        </Stack>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mt: 10 }} />

        <Grid container spacing={4} sx={{ py: 6 }}>
          <Grid item xs={12} md={4}>
            <Typography sx={{ fontSize: 32, fontWeight: 500, mb: 2 }}>
              Etiam et id tincidunt faucibus mollis a sociis pretium fermentum quis magna faucibus lacus.
            </Typography>
            <Stack direction="row" spacing={2} mt={3}>
              <Box component="img" src={imgInstagram} alt="Instagram" sx={{ width: 32, height: 32 }} />
              <Box component="img" src={imgFacebook} alt="Facebook" sx={{ width: 32, height: 32 }} />
              <Box component="img" src={imgTwitterSquared} alt="Twitter" sx={{ width: 32, height: 32 }} />
            </Stack>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography sx={{ fontSize: 24, fontWeight: 500, mb: 2 }}>Marketplace</Typography>
            <Stack spacing={1} sx={{ color: '#d7d7d7' }}>
              <Typography>Home</Typography>
              <Typography>Activity</Typography>
              <Typography>Discover</Typography>
              <Typography>Learn more</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography sx={{ fontSize: 24, fontWeight: 500, mb: 2 }}>Company</Typography>
            <Stack spacing={1} sx={{ color: '#d7d7d7' }}>
              <Typography>About us</Typography>
              <Typography>Services</Typography>
              <Typography>Portfolio</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography sx={{ fontSize: 24, fontWeight: 500, mb: 2 }}>Contact</Typography>
            <Stack spacing={1} sx={{ color: '#d7d7d7' }}>
              <Typography>Facebook</Typography>
              <Typography>Instagram</Typography>
              <Typography>Twitter</Typography>
              <Typography>Email</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2} textAlign={{ xs: 'left', md: 'right' }}>
            <Typography sx={{ color: '#828282' }}>Copyright 2021 Gaslur</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GaslurLanding;
