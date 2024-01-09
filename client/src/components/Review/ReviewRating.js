import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

const ReviewRating = (props) => {

  return (
    <div>
      <FormControl>
        <FormLabel>Rating</FormLabel>
        <RadioGroup
          row
          name="row-radio-buttons-group"
          value={props.selectedRating} 
          onChange={props.onReviewRating}
        >
          <FormControlLabel value="1" control={<Radio />} label="1" />
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
        </RadioGroup>
        {props.error 
        ? 
        <FormHelperText style={{ color: 'red' }}>Error: select rating</FormHelperText>
        : 
        <FormHelperText>Select rating</FormHelperText>}
    </FormControl>
    </div>
  );
}

export default ReviewRating;