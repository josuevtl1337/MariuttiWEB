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
                <div className="tab active">{this.props.titulo}</div>
            )
        } else {
            return(
                <div className="tab">{this.props.titulo}</div>
            )
        }
    }
}

export default Tab