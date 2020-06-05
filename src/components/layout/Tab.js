import React from 'react'
import { withTheme } from '@material-ui/core';

class Tab extends React.Component { 

    constructor(props) {
		super(props);
        this.state = {
            classes: "tab"
        };
    }

    render(){
        if (this.props.isActive === true) {
            return(
                <div className="tab active" onClick={this.props.click}>{this.props.titulo}</div>
            )
        } else {
            return(
                <div className="tab" onClick={this.props.click}>{this.props.titulo}</div>
            )
        }
    }
}

export default Tab