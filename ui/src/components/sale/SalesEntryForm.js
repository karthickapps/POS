import React from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import { invertShowHide } from "../../utils";

const SalesEntryForm = props => {
  const { error, cartItem } = props;
  let className = "show";

  if (cartItem.pricePerQty) {
    className = " hide";
  }

  return (
    <div className="saleFormContainer">
      <div className={`emptyMessageText ${className}`}>
        <p>* please enter the product id.</p>
      </div>
      <div className={invertShowHide(className)}>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              placeholder="qty"
              value={cartItem.qty}
              onChange={props.onQtyChange}
              error={!!error}
            />

            <div className="priceLabel">
              <span>{`₹ ${cartItem.netPrice}`}</span>
            </div>

            <Button
              icon
              size="mini"
              color="blue"
              onClick={props.onAddToCartClick}
            >
              <Icon name="shopping basket" />
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SalesEntryForm;
