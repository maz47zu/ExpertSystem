import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Select, MenuItem, FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function App() {
  const [color, setColor] = useState('');
  const [ibu, setIbu] = useState('');
  const [blg, setBlg] = useState('');
  const [style, setStyle] = useState('');
  const [name, setName] = useState('');
  const beers = require('./json/beers.json');
  const malts = require('./json/malts.json');
  
  const uniqueNames = (arr) => [...new Set(arr)];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleCreateSelects = (sel) => {
    let arr = [];
    for(const beer in beers){
      arr.push(beers[beer][sel]);
      // console.log(beers[beer][sel])
    }
    return (uniqueNames(arr))
  };

  const handleFindCriterium = (object, crt) => {
    return object.filter(function(obj){
      return Object.keys(crt).every(function(c){
        return obj[c] === crt[c];
      });
    });
    // console.log(handleFindCriterium(beers,{color:'dark',blg:'17'}));
  };

  useEffect(()=>{
    console.log(beers, malts);
    console.log(handleFindCriterium(beers,{color:'medium',blg:'17'}));
    // eslint-disable-next-line
  },[]);

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
              <FormControl fullWidth sx={{ marginTop: '10px',marginBottom:'10px', minWidth:'300px' }}>
                <Select
                  value={color}
                  label="test-select-label"
                  onChange={handleChangeColor}
                  sx={{ fontSize: '1.2rem', textAlign: 'center' }}
                  variant={'standard'}
                >
                  {handleCreateSelects("color").map(a=><MenuItem value={a} key={a}>{a}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>Goryczka:</Typography>
              <FormControl fullWidth sx={{ marginTop: '10px',marginBottom:'10px', minWidth:'300px' }}>
                <Select
                  value={ibu}
                  label="test-select-label1"
                  onChange={handleChangeIbu}
                  sx={{ fontSize: '1.2rem', textAlign: 'center'}}
                  variant={'standard'}
                >
                  {handleCreateSelects("bitterness").map(a=><MenuItem value={a} key={a}>{a}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>BLG:</Typography>
              <FormControl fullWidth sx={{ marginTop: '10px',marginBottom:'10px', minWidth:'300px' }}>
                <Select
                  value={blg}
                  label="test-select-label1"
                  onChange={handleChangeBlg}
                  sx={{ fontSize: '1.2rem', textAlign: 'center',}}
                  variant={'standard'}
                  disabled={false}
                >
                  {handleCreateSelects("blg").map(a=><MenuItem value={a} key={a}>{a}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>Styl:</Typography>
              <FormControl fullWidth sx={{ marginTop: '10px',marginBottom:'10px', minWidth:'300px' }}>
                <Select
                  value={style}
                  label="test-select-label1"
                  onChange={handleChangeStyle}
                  sx={{ fontSize: '1.2rem', textAlign: 'center',}}
                  variant={'standard'}
                >
                  {handleCreateSelects("style").map(a=><MenuItem value={a} key={a}>{a}</MenuItem>)}
                </Select>
              </FormControl>
              <Typography>Nazwa:</Typography>
              <FormControl fullWidth sx={{ marginTop: '10px',marginBottom:'10px', minWidth:'300px' }}>
                <Select
                  value={name}
                  label="test-select-label1"
                  onChange={handleChangeName}
                  sx={{ fontSize: '1.2rem', textAlign: 'center',}}
                  variant={'standard'}
                >
                  {handleCreateSelects("Name").map(a=><MenuItem value={a} key={a}>{a}</MenuItem>)}
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
      </Grid>
    </ThemeProvider>
  );
}

export default App;