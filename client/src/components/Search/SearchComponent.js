import React from 'react';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = ({ label, searchTerm, onSearch }) => {

    return (
      <TextField
        id="search"
        label={label}
        value={searchTerm}
        onChange={onSearch}
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
                <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    )
};
export default SearchComponent;