import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class YesNo extends Component {
  render() {
    return (
      <Modal size="tiny" open={true}>
        <Modal.Header>Confirm dialog.</Modal.Header>
        <Modal.Content>
          <p>{this.props.message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.props.onNo}>
            No
          </Button>
          <Button
            onClick={this.props.onYes}
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default YesNo;
