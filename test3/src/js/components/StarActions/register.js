import React, { Component } from 'react';
import Container from '../container'
import TextField from '@material-ui/core/TextField';

class Register extends Component {
    constructor() {
        super();

        this.state = {
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
            <Container title="Register a Star" buttonName="That's mine!" onButtonClick={this.makemagic}>
                <TextField
                    id="txtName"
                    label="Star Name"
                    margin="normal"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                />
                <TextField
                    id="txtStory"
                    label="Star Story"
                    multiline
                    margin="normal"
                    value={this.state.story}
                    onChange={this.handleChange('story')}
                />
                <TextField
                    id="txtRA"
                    label="RA"
                    margin="normal"
                    type="number"
                    value={this.state.ra}
                    onChange={this.handleChange('ra')}
                />
                <TextField
                    id="txtDEC"
                    label="DEC"
                    margin="normal"
                    type="number"
                    value={this.state.dec}
                    onChange={this.handleChange('dec')}
                />
                <TextField
                    id="txtCENT"
                    label="CENT"
                    margin="normal"
                    type="number"
                    value={this.state.cent}
                    onChange={this.handleChange('cent')}
                />
            </Container>
        );
    }
}

export default Register;