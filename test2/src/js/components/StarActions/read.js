import React, { Component } from 'react';
import Container from '../container'
import TextField from '@material-ui/core/TextField';

class Read extends Component {
    constructor() {
        super();

        this.state = {
            tokenId: 0,
            name: '',
            story: '',
            ra: 0,
            dec: 0,
            cent: 0
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
            <Container title="Find Star by ID" buttonName="Show me the result!" onButtonClick={this.makemagic}>
                <TextField
                    id="txtTokenId"
                    label="Token Id"
                    margin="normal"
                    type="number"
                    value={this.state.tokenId}
                    onChange={this.handleChange('tokenId')}
                />
                <TextField
                    disabled
                    id="lblName"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    value={this.state.name}
                />
                <TextField
                    disabled
                    id="lblStory"
                    label="Story"
                    margin="normal"
                    variant="outlined"
                    value={this.state.story}
                    multiline
                />
                <TextField
                    disabled
                    id="lblRa"
                    label="RA"
                    margin="normal"
                    variant="outlined"
                    value={this.state.ra}
                />
                <TextField
                    disabled
                    id="lblDEC"
                    label="DEC"
                    margin="normal"
                    variant="outlined"
                    value={this.state.dec}
                />
                <TextField
                    disabled
                    id="lblCENT"
                    label="MAG"
                    margin="normal"
                    variant="outlined"
                    value={this.state.cent}
                />

            </Container>
        );
    }
}

export default Read;

