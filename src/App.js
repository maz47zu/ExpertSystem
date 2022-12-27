import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Select, MenuItem, FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const theme = createTheme();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function App() {
  //hooki definiujące kryterium wyborów
  const [color, setColor] = useState('');
  const [ibu, setIbu] = useState('');
  const [blg, setBlg] = useState('');
  const [style, setStyle] = useState('');
  const [name, setName] = useState('');

  //zaczytywanie danych z plików json
  const beers = require('./json/beers.json');
  const malts = require('./json/malts.json');

  //hook do ustalania aktualnej listy piw
  const [curBeersArr, setCurBeersArr] = useState(beers);

  //hook do otwierania DialogBoxa
  const [open, setOpen] = useState(false);

  //funkcja tworząca tablicę unikalnych nazw/wartości
  const uniqueNames = (arr) => [...new Set(arr)];

  //definicja zmiennej obiektowej (przechowywuje wybrane zmienne)
  let params = {};

  //za każdym razem gdy zmieni się któryś z parametrów -> zmienia się zmienna `params`
  useEffect(() => {
    if (color !== '')
      params.color = color;
    if (ibu !== '')
      params.bitterness = ibu;
    if (blg !== '')
      params.blg = blg;
    if (style !== '')
      params.style = style;
    if (name !== '')
      params.Name = name;
    setCurBeersArr(handleFindCriterium(curBeersArr, params));
    console.log(curBeersArr);
    console.log(params);
    // eslint-disable-next-line
  }, [color, ibu, blg, style, name]);


  //funckja obsługująca dobór słodów
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleCloseDialog = ()=>{
    setColor('');
    setIbu('');
    setBlg('');
    setStyle('');
    setName('');
    params = {};
    setCurBeersArr(beers);
    setOpen(false);
  }

  //funkcja tworzenia wartości wyboru
  const handleCreateSelects = (sel) => {
    let arr = [];
    for (const beer in curBeersArr) {
      arr.push(curBeersArr[beer][sel]);
    }
    return (uniqueNames(arr))
  };

  //funkcja filtrująca z danym kryterium
  const handleFindCriterium = (object, crt) => {
    return object.filter(function (obj) {
      return Object.keys(crt).every(function (c) {
        return obj[c] === crt[c];
      });
    });
    // console.log(handleFindCriterium(beers,{color:'dark',blg:'17'}));
  };

  // funckje obsługujące zmiane selectów
  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };
  const handleChangeIbu = (event) => {
    setIbu(event.target.value);
  };
  const handleChangeBlg = (event) => {
    setBlg(event.target.value);
  };
  const handleChangeStyle = (event) => {
    setStyle(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  // end of funckje obsługujące zmiane selectów

  //jsx renderowanie:
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Wybierz parametry piwa:
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Typography>Kolor:</Typography>
              <FormControl fullWidth sx={{ marginTop: '10px', marginBottom: '10px', minWidth: '300px' }}>
                <Select
                  value={color}
                  label="test-select-label"
                  onChange={handleChangeColor}
                  sx={{ fontSize: '1.2rem', textAlign: 'center' }}
                  variant={'standard'}
                  defaultValue={color}
                >
                  {handleCreateSelects("color").map((a, index) => <MenuItem value={a} key={index}>{a}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>Goryczka:</Typography>
              <FormControl fullWidth sx={{ marginTop: '10px', marginBottom: '10px', minWidth: '300px' }}>
                <Select
                  value={ibu}
                  label="test-select-label1"
                  onChange={handleChangeIbu}
                  sx={{ fontSize: '1.2rem', textAlign: 'center' }}
                  variant={'standard'}
                >
                  {handleCreateSelects("bitterness").map((a, index) => <MenuItem value={a} key={index}>{a}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>BLG:</Typography>
              <FormControl fullWidth sx={{ marginTop: '10px', marginBottom: '10px', minWidth: '300px' }}>
                <Select
                  value={blg}
                  label="test-select-label1"
                  onChange={handleChangeBlg}
                  sx={{ fontSize: '1.2rem', textAlign: 'center', }}
                  variant={'standard'}
                >
                  {handleCreateSelects("blg").map((a, index) => <MenuItem value={a} key={index}>{a}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>Styl:</Typography>
              <FormControl fullWidth sx={{ marginTop: '10px', marginBottom: '10px', minWidth: '300px' }}>
                <Select
                  value={style}
                  label="test-select-label1"
                  onChange={handleChangeStyle}
                  sx={{ fontSize: '1.2rem', textAlign: 'center', }}
                  variant={'standard'}
                >
                  {handleCreateSelects("style").map((a, index) => <MenuItem value={a} key={index}>{a}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>Nazwa:</Typography>
              <FormControl fullWidth sx={{ marginTop: '10px', marginBottom: '10px', minWidth: '300px' }}>
                <Select
                  value={name}
                  label="test-select-label1"
                  onChange={handleChangeName}
                  sx={{ fontSize: '1.2rem', textAlign: 'center', }}
                  variant={'standard'}
                >
                  {handleCreateSelects("Name").map((a, index) => <MenuItem value={a} key={index}>{a}</MenuItem>)}
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Dobierz słody!
              </Button>
            </Box>
          </Box>
        </Grid>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Disagree</Button>
            <Button onClick={handleCloseDialog}>Agree</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </ThemeProvider>
  );
}

export default App;