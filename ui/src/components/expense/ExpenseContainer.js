import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import ExpenseTab from "./ExpenseTab";
import ExpenseTypesTab from "./ExpenseTypesTab";

import "../controls/commonTabs.css";

class ExpenseContainer extends Component {
  state = {};

  render() {
    const panes = [
      {
        menuItem: "Expense",
        render: () => <ExpenseTab />
      },
      {
        menuItem: "Expense Type",
        render: () => <ExpenseTypesTab />
      }
    ];

    return (
      <div>
        <Tab
          menu={{ secondary: true, pointing: true }}
          id="tabContainer"
          panes={panes}
        />
      </div>
    );
  }
}

export default ExpenseContainer;
