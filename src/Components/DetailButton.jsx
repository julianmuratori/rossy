import React, { Component } from 'react';
import Checkbox from "material-ui/Checkbox";

class DetailButton extends Component {
  
    state = {
        isChecked: false
    }

    checked = () => {
        const { handleCheckboxChange, detail } = this.props;
        this.setState(({ isChecked }) => ({ isChecked: !isChecked }));
        
        handleCheckboxChange(detail);
    }

  render() {
      const { isChecked } = this.state;
    return (
        <Checkbox onCheck={e => this.checked(e)} checked={isChecked} label={this.props.detail} />
    );
  }
}

export default DetailButton;

