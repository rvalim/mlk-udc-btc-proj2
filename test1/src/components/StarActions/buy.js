import React, {Component} from 'react';
import Container from '../container'
import TextField from '@material-ui/core/TextField';

class Buy extends Component {
    constructor() {
        super();

        this.state = {
            tokenId: 0,
            starPrice: 0.0
        };

        this.buyIt = this.buyIt.bind(this)
    }

    handleChange = name => event => {
        console.log('testando saporra', this.props);
        this.setState({
            [name]: event.target.value,
        });
    };

    buyIt() {
        console.log('teste');
    }

    render () {
        return (
            <Container title="Buy Star" buttonName="Buy it!" onButtonClick={this.buyIt}>
                <TextField
                    id="txtTokenId"
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
                    value={this.state.starPrice}
                    onChange={this.handleChange('starPrice')}
                />
            </Container>
        );
    }
}

export default Buy;