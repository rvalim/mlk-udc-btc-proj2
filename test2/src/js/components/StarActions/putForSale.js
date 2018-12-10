import React, { Component } from 'react';
import Container from '../container'
import TextField from '@material-ui/core/TextField';

class PutForSale extends Component {
    constructor() {
        super();

        this.state = {
            tokenId: 0,
            price: 0.0
        };

        this.makemagic = this.makemagic.bind(this)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    makemagic() {
        console.log('teste');
    }

    render() {
        return (
            <Container title="Put it for Sale" buttonName="Let's get some money" onButtonClick={this.makemagic}>
                <TextField
                    id="txtSaleId"
                    label="Token Id"
                    margin="normal"
                    type="number"
                    value={this.state.tokenId}
                    onChange={this.handleChange('tokenId')}
                />
                <TextField
                    id="txtSalePrice"
                    label="Price"
                    margin="normal"
                    type="number"
                    value={this.state.price}
                    onChange={this.handleChange('price')}
                />

            </Container>
        );
    }
}

export default PutForSale;

