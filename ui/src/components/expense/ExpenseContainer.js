import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import ExpenseTab from "./ExpenseTab";
import ExpenseTypesTab from "./ExpenseTypesTab";
import api from "../../api";

import "../controls/commonTabs.css";

class ExpenseContainer extends Component {
  state = { expenseTypes: [], expenseTypeForDropDown: [] };

  componentWillMount = async () => {
    const expenseTypes = await api.expenseTypes.fetchAll();
    const expenseTypeForDropDown = expenseTypes.map((item, idx) => {
      const temp = Object.assign({}, item);
      temp.key = idx;
      temp.text = temp.id;
      temp.value = idx;
      return temp;
    });
    this.setState({ expenseTypes, expenseTypeForDropDown });
  };

  render() {
    const panes = [
      {
        menuItem: "Expense",
        render: () => (
          <ExpenseTab expenseTypes={this.state.expenseTypeForDropDown} />
        )
      },
      {
        menuItem: "Expense Type",
        render: () => <ExpenseTypesTab expenseTypes={this.state.expenseTypes} />
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
