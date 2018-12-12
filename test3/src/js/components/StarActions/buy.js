import React, {Component} from 'react';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Container from '../container'
import { buyStar } from '../../redux/star.actions'

class Buy extends Component {
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
        this.props.buyStar(this.state);
    }

    render () {
        return (
            <Container title="Buy Star" buttonName="Buy it!" onButtonClick={this.makemagic}>
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
                    value={this.state.price}
                    onChange={this.handleChange('price')}
                />
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => { 
    return {
        buyStar: star => dispatch(buyStar(star)) 
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Buy);