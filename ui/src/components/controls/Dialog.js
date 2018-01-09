import React from "react";
import { Button, Modal } from "semantic-ui-react";

const Dialog = props => {
  const { canShow, onClose, headerText, children, onCancel, onSubmit } = props;

  return (
    <Modal open={canShow} onClose={onClose}>
      <Modal.Header>{headerText}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{children}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button.Group>
          <Button onClick={onCancel} size="small">
            Cancel
          </Button>
          <Button color="violet" onClick={onSubmit} size="small">
            Submit
          </Button>
        </Button.Group>
      </Modal.Actions>
    </Modal>
  );
};

export default Dialog;
