import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _executeAction: undefined
        };

        console.log('props', this);

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        console.log('onClick');

        if (this.state._executeAction)
            this.state._executeAction();
    }

    // onButtonClick(func) {
    //     this.state._executeAction = func;
    // }

    render() {
        if (this.props.onButtonClick)
            this.state._executeAction = this.props.onButtonClick;

        return (
            <div>
                <form>
                    <div>
                        <h1>{this.props.title}</h1>
                    </div>
                    <div>
                        {this.props.children}
                    </div>
                    <div>
                        <div>
                            <label>Processing, wait!</label>
                        </div>
                    </div>
                    <div>
                        <Button variant="outlined" color="primary" onClick={(e) => this.handleClick(e)}>
                            {this.props.buttonName}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}


export default Container;