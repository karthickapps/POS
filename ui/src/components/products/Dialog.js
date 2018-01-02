import React from "react";
import { Button, Modal } from "semantic-ui-react";

import AddOrUpdate from "./AddOrUpdate";

const Dialog = ({ canShow, onClose, headerText }) => {
  const onClick = () => {
    console.log("Dialog");
  };

  return (
    <Modal open={canShow} onClose={onClose}>
      <Modal.Header>{headerText}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <AddOrUpdate />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button.Group>
          <Button onClick={onClick} size="small">
            Cancel
          </Button>
          <Button color="violet" onClick={onClick} size="small">
            Submit
          </Button>
        </Button.Group>
      </Modal.Actions>
    </Modal>
  );
};

export default Dialog;
