import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import TextField  from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

const ReviewTitle = (props) => {

  return (
    <div>
      <TextField  
        label="Title" 
        variant="outlined" 
        sx={{ width: '600px' }}
        value = {props.enteredTitle}
        onChange={props.onReviewTitle}
        />
        {props.error 
        ? 
        <FormHelperText style={{ color: 'red' }}>Error: enter title</FormHelperText>
        : 
        <FormHelperText>Enter title</FormHelperText>}
    </div>
  );
}

export default ReviewTitle;