import React from 'react';
import Container from '../container'
import TextField from '@material-ui/core/TextField';

function PutForSale() {
    return (
        <Container title="Put it for Sale" buttonName="Let's get some money">
            <TextField
                id="txtSaleId"
                label="Token Id"
                margin="normal"
                type="number"
            />
            <TextField
                id="txtSalePrice"
                label="Price"
                margin="normal"
                type="number"
            />

        </Container>
    );
}

export default PutForSale;

