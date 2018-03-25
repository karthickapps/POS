import React from "react";
import { ListItem } from "material-ui/List";
import ListSubheader from "material-ui/List/ListSubheader";
import InboxIcon from "material-ui-icons/MoveToInbox";
import DraftsIcon from "material-ui-icons/Drafts";
import StarIcon from "material-ui-icons/Star";
import SendIcon from "material-ui-icons/Send";
import MailIcon from "material-ui-icons/Mail";
import DeleteIcon from "material-ui-icons/Delete";
import ReportIcon from "material-ui-icons/Report";
import { CustomListItemIcon, CustomListItemText } from "../../controls/List";

export const mailFolderListItems = (
  <div>
    <ListSubheader>MASTER</ListSubheader>
    <ListItem button dense>
      <CustomListItemIcon>
        <InboxIcon />
      </CustomListItemIcon>
      <CustomListItemText primary="Customers" />
    </ListItem>
    <ListItem button dense>
      <CustomListItemIcon>
        <StarIcon />
      </CustomListItemIcon>
      <CustomListItemText primary="Product Types" />
    </ListItem>
    <ListItem button dense>
      <CustomListItemIcon>
        <SendIcon />
      </CustomListItemIcon>
      <CustomListItemText primary="Products" />
    </ListItem>
    <ListItem button dense>
      <CustomListItemIcon>
        <DraftsIcon />
      </CustomListItemIcon>
      <CustomListItemText primary="Sale" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListSubheader>REPORTS</ListSubheader>
    <ListItem button dense>
      <CustomListItemIcon>
        <MailIcon />
      </CustomListItemIcon>
      <CustomListItemText primary="Todays Sales" />
    </ListItem>
    <ListItem button dense>
      <CustomListItemIcon>
        <DeleteIcon />
      </CustomListItemIcon>
      <CustomListItemText primary="Credit Sale" />
    </ListItem>
    <ListItem button dense>
      <CustomListItemIcon>
        <ReportIcon />
      </CustomListItemIcon>
      <CustomListItemText primary="Expense" />
    </ListItem>
  </div>
);
