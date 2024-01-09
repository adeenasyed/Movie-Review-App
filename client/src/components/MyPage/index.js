import React from 'react';
import { useState } from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Navigation from '../Navigation/Navigation';


const MyPage = () => {

    const genres = ['', 'Action', 'Comedy', 'Documentary', 'Drama', 'Fantasy', 'Horror', 'Musical', 'Mystery', 'Romance', 'Science Fiction', 'Sports', 'Thriller']

    const [movie, setMovie] = useState('');
    const [movieError, setMovieError] = useState(null);
    const [director, setDirector] = useState('');
    const [genre, setGenre] = useState('');

    const [genreFilter, setGenreFilter] = useState('');
    const [directorFilter, setDirectorFilter] = useState('');
    const [showList, setShowList] = useState(false);
    const [results, setResults] = useState([]);

    const [directors, setDirectors] = useState([]);

    React.useEffect(() => {
        callApiLoadDirectors().then((res) => {
          setDirectors(JSON.parse(res.express));
        })
      }, []);
    
    const callApiLoadDirectors = async () => {
        const url = "/api/getDirectors";
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    const onChangeMovie = (event) => { 
        setMovie(event.target.value);
        setMovieError(null);
    };

    const onChangeDirector = (event) => { 
        setDirector(event.target.value);
        setMovieError(null);
    };

    const onChangeGenre = (event) => { 
        setGenre(event.target.value);
        setMovieError(null);
    };

    const onChangeGenreFilter = (event) => { 
        setGenreFilter(event.target.value);
        setShowList(false);
    };

    const onChangeDirectorFilter = (event) => { 
        setDirectorFilter(event.target.value);
        setShowList(false);
    };

    const callApiAddEntry = async () => {
        const url = "/api/addEntry";
        const entry = {
          movie_name: movie,
          director_name: director,
          genre: genre
        };
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(entry)
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    const toggleList = () => {
        if (!showList) { 
            setShowList(true);

            callApiToggleList()
            .then(res => {
                var parsed = JSON.parse(res.express);
                setResults(parsed);
            });
        } else { 
            setShowList(false);
            setDirectorFilter('');
            setGenreFilter('');
        }
    };
    
    const callApiToggleList = async () => {
        const url = "/api/toggleList";
    
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            director_name: directorFilter,
            genre: genreFilter
          })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    const handleSubmission = (event) => { 
        if (!movie) {
            setMovieError(true);
        } else {
            setMovieError(false);
            callApiAddEntry();
            setMovie('');
            setDirector('');
            setGenre('');
        }
    };

    return (
        <Grid container spacing={5}>
            <Navigation/>
            <Grid item xs={4} align = "center">
                <Typography
                    variant="h3"
                >
                    Curate a movie watch list
                </Typography>

                <FormControl sx={{ marginTop: '30px'}}>
                    <TextField  
                        label="Movie" 
                        variant="outlined" 
                        sx={{ width: '300px' }}
                        value = {movie}
                        onChange={onChangeMovie}
                        />
                    {movieError
                    ? 
                    <FormHelperText style={{ color: 'red' }}>Error: enter movie name</FormHelperText>
                    : 
                    <FormHelperText>Enter movie name</FormHelperText>}
                </FormControl>

                <FormControl sx={{ marginTop: '30px' }}>
                    <TextField  
                        label="Director" 
                        variant="outlined" 
                        sx={{ width: '300px' }}
                        value = {director}
                        onChange={onChangeDirector}
                    />
                    <FormHelperText>Enter movie director (optional)</FormHelperText>
                </FormControl>

                <FormControl sx={{ marginTop: '30px' }}>
                    <InputLabel>Genre</InputLabel>
                    <Select
                        value={genre}
                        label="Genre"
                        onChange={onChangeGenre}
                        sx={{ width: '300px', height: '50px' }}
                    >
                        {genres.map((gen) => (<MenuItem value={gen}>{gen}</MenuItem>))}
                    </Select>
                    <FormHelperText>Select genre (optional)</FormHelperText>
                </FormControl>

                <Button 
                    variant="contained"
                    onClick={handleSubmission}
                    sx={{backgroundColor: '#388e3c', margin: '30px'}}
                >
                    Submit
                </Button>

                {(movieError === false) &&
                    <Typography
                        variant="body1"
                    >
                        Entry has been added to watch list
                    </Typography>
                }
            </Grid>
            
            <Grid item xs={8}>
                <FormControl sx={{ margin: '10px' }}>
                        <InputLabel>Filter by director</InputLabel>
                        <Select
                            value={directorFilter}
                            label="Filter by director"
                            onChange={onChangeDirectorFilter}
                            sx={{ width: '200px', height: '50px' }}
                            align="left"
                        >
                            {directors.map((dir) => (<MenuItem value={dir.director_name}>{dir.director_name}</MenuItem>))}
                        </Select>
                </FormControl>
                <FormControl sx={{ margin: '10px' }}>
                        <InputLabel>Filter by genre</InputLabel>
                        <Select
                            value={genreFilter}
                            label="Filter by genre"
                            onChange={onChangeGenreFilter}
                            sx={{ width: '200px', height: '50px' }}
                            align="left"
                        >
                            {genres.map((gen) => (<MenuItem value={gen}>{gen}</MenuItem>))}
                        </Select>
                </FormControl>
                {!showList 
                ? 
                    <Button 
                        variant="contained"
                        onClick={toggleList}
                        sx={{backgroundColor: '#388e3c', margin: '15px' }}
                    >
                        Show Watch List
                    </Button>
                :
                    <Button 
                        variant="contained"
                        onClick={toggleList}
                        sx={{backgroundColor: '#9e9e9e', margin: '15px'}}
                        align = "right"
                    >
                        Hide Watch List
                    </Button>
                }

                {showList && 
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                <TableCell>Movie</TableCell>
                                <TableCell>Director</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results.map((result) => (
                                    <TableRow>
                                        <TableCell>{result.movie_name}</TableCell>
                                        <TableCell>{result.director_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }

            </Grid>
        </Grid>
    )
}
export default MyPage;