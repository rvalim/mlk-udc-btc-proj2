import React from 'react';
import Container from '../container'
import TextField from '@material-ui/core/TextField';

function Read() {
    return (
        <Container title="Find Star by ID" buttonName="Show me the result!">
            <TextField
                id="txtTokenId"
                label="Token Id"
                margin="normal"
                type="number"
            />
            <TextField
                disabled
                id="lblName"
                label="Name"
                margin="normal"
                variant="outlined"
            />
            <TextField
                disabled
                id="lblStory"
                label="Story"
                margin="normal"
                variant="outlined"
                multiline
            />
            <TextField
                disabled
                id="lblRa"
                label="RA"
                margin="normal"
                variant="outlined"
            />
            <TextField
                disabled
                id="lblDEC"
                label="DEC"
                margin="normal"
                variant="outlined"
            />
            <TextField
                disabled
                id="lblCENT"
                label="MAG"
                margin="normal"
                variant="outlined"
            />

        </Container>
    );
}

export default Read;

