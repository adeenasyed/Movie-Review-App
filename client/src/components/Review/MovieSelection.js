import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';;
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const MovieSelection = ({selectedMovie, movies, onMovieSelection, error}) => {

  return (
    <div>
      <FormControl>
        <InputLabel>Movie</InputLabel>
        <Select
          value={selectedMovie}
          label="Movie"
          onChange={onMovieSelection}
          sx={{ width: '200px', height: '50px' }}
        >
          {movies.map((movie) => (<MenuItem value={movie.name}>{movie.name}</MenuItem>))}
        </Select>
        {error 
        ? 
        <FormHelperText style={{ color: 'red' }}>Error: select movie</FormHelperText>
        : 
        <FormHelperText>Select movie</FormHelperText>}
      </FormControl>
    </div>
  );
}

export default MovieSelection;