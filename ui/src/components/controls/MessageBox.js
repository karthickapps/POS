import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";

class MessageBox extends Component {
  state = { open: false };

  close = () => {
    this.props.onClose();
  };

  render() {
    return (
      <Modal size="tiny" open={this.props.open} onClose={this.close}>
        <Modal.Header>Message box.</Modal.Header>
        <Modal.Content>
          <p>{this.props.message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.close}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default MessageBox;
