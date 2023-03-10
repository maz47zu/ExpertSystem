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
  const [curMalts, setCurMalts] = useState({})
  const [curMaltsPerc, setCurMaltsPerc] = useState({})

  //hook do otwierania DialogBoxa
  const [open, setOpen] = useState(false);
  const [submitButton, setSubmitButton] = useState(true);

  //funkcja tworząca tablicę unikalnych nazw/wartości
  const uniqueNames = (arr) => [...new Set(arr)];

  //definicja zmiennej obiektowej (przechowywuje wybrane zmienne)
  let params = {};

  //definicja wyświetlanego urla
  const [url,setUrl] = useState('url(https://www.monederosmart.com/pl-pl/wp-content/uploads/2021/09/VpO-M3T-xmQ-FmW-malz-header.jpg)')
  useEffect(() => {
    if (color === 'light')
      setUrl('url(https://www.monederosmart.com/pl-pl/wp-content/uploads/2021/09/VpO-M3T-xmQ-FmW-malz-header.jpg)')
    if (color === 'medium')
      setUrl('url(https://i.insider.com/5476423e69beddbb65619d0d?width=910&format=jpeg)')
    if (color === 'dark')
      setUrl('url(https://targipiwne.pl/wp-content/uploads/2019/12/S%C5%82%C3%B3d-j%C4%99czmienny-palony.jpg)')
  }, [color]);

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
    // console.log(params);

    (Object.keys(params).length < 5)
      ? setSubmitButton(true)
      : setSubmitButton(false);

  }, [color, ibu, blg, style, name]);

  //funckja obsługująca dobór słodów
  const handleSubmit = (event) => {
    event.preventDefault();
    setCurMalts(curBeersArr[0].malts[0]);
    setCurMaltsPerc(curBeersArr[0].maltPercent[0]);

    setOpen(true);
  };

  const handleCloseDialog = () => {
    setColor('');
    setIbu('');
    setBlg('');
    setStyle('');
    setName('');
    params = {};
    setCurBeersArr(beers);
    setOpen(false);
  }

  const eraseAll = () => {
    setColor('');
    setIbu('');
    setBlg('');
    setStyle('');
    setName('');
    params = {};
    setCurBeersArr(beers);
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
  //

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
            backgroundImage: url,
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
                disabled={submitButton}
              >
                Dobierz słody!
              </Button>
              <Button
                color='error'
                fullWidth
                variant="contained"
                onClick={eraseAll}
                sx={{ mt: 0, mb: 2 }}
              >
                Wyczyść
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
          sx={{ width: '60%' }}
        >
          <DialogTitle>{"Wybrane piwo: " + curBeersArr[0].Name}</DialogTitle>
          <DialogContent>
            <Typography sx={{fontSize:'1.2rem'}}>{"Użyj poniższych słodów w proporcjach :"}</Typography>
              {(curMaltsPerc.malt1)?<Typography sx={{fontSize:'1.2rem', mt:'10px'}}>{curMaltsPerc.malt1 +'% '+ curMalts.malt1}</Typography>:<></>}
              {(curMaltsPerc.malt2)?<Typography sx={{fontSize:'1.2rem'}}>{curMaltsPerc.malt2 +'% '+curMalts.malt2}</Typography>:<></>}
              {(curMaltsPerc.malt3)?<Typography sx={{fontSize:'1.2rem'}}>{curMaltsPerc.malt3 +'% '+curMalts.malt3}</Typography>:<></>}
              {(curMaltsPerc.malt4)?<Typography sx={{fontSize:'1.2rem'}}>{curMaltsPerc.malt4 +'% '+curMalts.malt4}</Typography>:<></>}
              {(curMaltsPerc.malt5)?<Typography sx={{fontSize:'1.2rem'}}>{curMaltsPerc.malt4 +'% '+curMalts.malt5}</Typography>:<></>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Zamknij</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </ThemeProvider>
  );
}

export default App;