import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
// import jsonData from '../../assets/data.json';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="#6439ff" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
//style={{color: '#6439ff'}} 
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Album() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
      getCarList();
    }, []);

    const getCarList = async () => {
      // console.log(localStorage.getItem('Authorization'));
      const url = `http://localhost:8000/contract/get-contract`;
      const json = await (
        await fetch(url, {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
            'Authorization': localStorage.getItem('Authorization'),
          },
            body: JSON.stringify({
              filter: true,
              priceFilter: false,
              mileageFilter: false,
              model: '',
              status: 'SoldOut', //'BuyerRequest',
              assignor: '',
              periodRangeStart: dayjs().subtract(1, "y").format('YYYY-MM-DD'),
              periodRangeEnd: dayjs().format('YYYY-MM-DD'),
              priceRangeStart: '',
              priceRangeEnd: '',
              mileageRangeStart: '',
              mileageRangeEnd: '',
            })
          })
        ).json();
      console.log(json);
      if (json.result == 'SUCCESS') {
        localStorage.getItem('Authorization', 'Bearer '+json.data.accessToken);
        setData(json.data);
        // alert("로그인");
      } else {
        // alert("로그인 실패");
      }
    };

    const nav = (id) => {
        // const id = id;
        console.log(id);
        navigate(`/buy/${id}`);
      };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative" style={{backgroundColor: '#6439ff'}} >
        <Toolbar>
          <DirectionsCarIcon sx={{ mr: 2 }} />
          <CarCrashIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Cloud Chain 중고차 거래 시스템
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {data.map((data) => (
              <Grid item key={data.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.model}
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => nav(data.id)} size="small">View</Button>
                    {/* <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default Album;