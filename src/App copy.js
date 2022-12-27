import { useState, useEffect } from 'react';
import './App.css';
import { Box, Typography, Paper, CssBaseline, Select, MenuItem, FormControl, TextField, InputLabel} from '@mui/material';
import Image from './assets/beer.jpg';
import createMirage from './mirageServer/createServer';

const styles1 = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    minHeight: '100vh',
    backgroundSize: 'cover'
  },
  box: {
  }
};

const styles = theme => ({
    select: {
        '&:before': {
            borderColor: '#c28d13',
        },
        '&:after': {
            borderColor: '#c28d13',
        }
    },
    icon: {
        fill: '#c28d13',
    },
});
createMirage();

function App() {
  const [beerStyles, setBeerStyles] = useState([]);
  const [malts, setMalts] = useState([]);
  const [color, setColor] = useState('Nie wybrano koloru');
  const [ibu, setIbu] = useState('Wybierz IBU');

  useEffect(function () {
    fetch("/api/beers", {
      method: 'GET'
    })
      .then(res => res.json())
      .then(response => {
        setBeerStyles(response);
      });

  }, []);

  useEffect(function () {
    fetch("/api/malts", {
      method: 'GET'
    })
      .then(res => res.json())
      .then(response => {
        setMalts(response);
      });

  }, []);

  useEffect(() => {
    console.log(beerStyles)
    console.log(malts)
  }, [beerStyles, malts])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data)
  };
  const handleChange = (event) => {
    setColor(event.target.value);
  };
  const handleChangeIbu = (event) => {
    setIbu(event.target.value);
  };
  const handleChangeBbitterness = (event) => {
    setIbu(event.target.value);
  }

  useEffect(() => {
    console.log(color)
  }, [color])

  return (
    // <Paper style={styles1.paperContainer}>
    <Paper>
      <CssBaseline />
      <Box style={styles1.box}
        display="flex"
        justifyContent="center"
      >
        <Typography color={"#c28d13"} sx={{ marginY: '20px', fontSize: '1.4rem', textTransform: 'uppercase', fontWeight: 700 }}>
          Aplikacja doboru słodów do wybranego gatunku piwa
        </Typography>

      </Box>
      <Box
        display="flex"
        justifyContent="left"
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ marginLeft: '20px', maxWidth: '300px', marginTop: '100px' }}

      >
        <FormControl fullWidth>
          <Select
            value={color}
            label="test-select-label"
            onChange={handleChange}
            sx={{ fontSize: '1.3rem', textTransform: 'uppercase', textAlign: 'center'}}
          >
            <MenuItem value={"light"}>Jasne</MenuItem>
            <MenuItem value={"medium"}>Bursztynowe</MenuItem>
            <MenuItem value={"dark"}>Ciemne</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Select
            value={ibu}
            label="test-select-label1"
            onChange={handleChangeIbu}
            sx={{ fontSize: '1.3rem', textTransform: 'uppercase', textAlign: 'center', marginTop: '15px' }}
          >
            <MenuItem value={"light"}>10</MenuItem>
            <MenuItem value={"medium"}>20</MenuItem>
            <MenuItem value={"dark"}>30</MenuItem>
          </Select>
          </FormControl>
          <FormControl fullWidth>
          <Select
            value={ibu}
            label="test-select-label1"
            onChange={handleChangeBbitterness}
            sx={{ fontSize: '1.3rem', textTransform: 'uppercase', textAlign: 'center', marginTop: '15px' }}
          >
            <MenuItem value={"light"}>40</MenuItem>
            <MenuItem value={"medium"}>60</MenuItem>
            <MenuItem value={"dark"}>0</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default App;
