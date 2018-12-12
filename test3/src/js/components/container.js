import React, { Component } from 'react';

class Container extends Component {
    handleSubmit = e => {
        e.preventDefault();

        if (this.props.onButtonClick)
            this.props.onButtonClick()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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
                        <button>
                            {this.props.buttonName}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}


export default Container;