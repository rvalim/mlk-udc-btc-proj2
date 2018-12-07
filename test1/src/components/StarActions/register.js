import React from 'react';
import Container from '../container'
import TextField from '@material-ui/core/TextField';

function Register() {
    return (
        <Container title="Register a Star" buttonName="That's mine!">
            <TextField
                id="txtName"
                label="Star Name"
                margin="normal" 
            />
            <TextField
                id="txtStory"
                label="Star Story"
                multiline
                margin="normal"
            />
            <TextField
                id="txtRA"
                label="RA"
                margin="normal"
                type="number"
            />
            <TextField
                id="txtDEC"
                label="DEC"
                margin="normal"
                type="number"
            />
            <TextField
                id="txtCENT"
                label="CENT"
                margin="normal"
                type="number"
            />
        </Container>
    );
}

export default Register;