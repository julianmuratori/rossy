import React, { Component } from 'react';
import { Checkbox } from 'bloomer';

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
        <Checkbox onChange={e => this.checked(e)} checked={isChecked}>
          {this.props.detail}
        </Checkbox>
    );
  }
}

export default DetailButton;

