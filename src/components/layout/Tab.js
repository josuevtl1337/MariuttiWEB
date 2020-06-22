import React from 'react'
import { withTheme } from '@material-ui/core';

class Tab extends React.Component {

    render(){
        if (this.props.isActive === true) {
            return(
                <div className="tab active" onClick={this.props.click}>{this.props.titulo}</div>
                // <i className="material-icons arrow">{this.props.icon}</i>
            )
        } else {
            if (this.props.dropActive === true) {
                return(
                    <div className="tab dropclick" onClick={this.props.click}>{this.props.titulo}</div>
                )
            } else {
                return(
                    <div className="tab" onClick={this.props.click}>{this.props.titulo}</div>
                )
            }
        }
    }
}

export default Tab