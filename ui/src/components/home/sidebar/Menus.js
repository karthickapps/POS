import React, { Component, Fragment } from "react";
import List from "material-ui/List";
import ListSubheader from "material-ui/List/ListSubheader";
import ViewModule from "material-ui-icons/ViewModule";
import GroupAdd from "material-ui-icons/GroupAdd";
import NoteAdd from "material-ui-icons/NoteAdd";
import LocalGroceryStore from "material-ui-icons/LocalGroceryStore";
import Assessment from "material-ui-icons/Assessment";
import LocalAtm from "material-ui-icons/LocalAtm";
import More from "material-ui-icons/More";
import SidebarMenu from "../../controls/SidebarMenu";

class Menus extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <List>
          <SidebarMenu text="Sale" icon={<ViewModule />} />

          <ListSubheader>MASTER</ListSubheader>
          <SidebarMenu
            isSelected={true}
            onClick={() => console.log("hey")}
            text="Customer"
            icon={<GroupAdd />}
          />
          <SidebarMenu text="Product" icon={<More />} />
          <SidebarMenu text="Expense" icon={<LocalAtm />} />
          <SidebarMenu text="Recievings" icon={<NoteAdd />} />

          <ListSubheader>REPORTS</ListSubheader>
          <SidebarMenu text="Todays Sales" icon={<Assessment />} />
          <SidebarMenu text="Credit Sale" icon={<LocalGroceryStore />} />
          <SidebarMenu text="Expense" icon={<LocalAtm />} />
        </List>
      </Fragment>
    );
  }
}

export default Menus;
