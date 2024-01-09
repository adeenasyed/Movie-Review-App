import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

const ReviewBody = (props) => {

  return (
    <div>
      <TextField
          label="Review"
          multiline
          rows={6}
          sx={{ width: '600px'}}
          inputProps={{ maxLength: 200 }}
          value = {props.enteredReview}
          onChange={props.onReviewBody}
        />  
        {props.error 
        ? 
        <FormHelperText style={{ color: 'red' }}>Error: enter review</FormHelperText>
        : 
        <FormHelperText>Enter review</FormHelperText>}
    </div>
  );
}

export default ReviewBody;