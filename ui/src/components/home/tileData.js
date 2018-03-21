import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import ListSubheader from "material-ui/List/ListSubheader";
import InboxIcon from "material-ui-icons/MoveToInbox";
import DraftsIcon from "material-ui-icons/Drafts";
import StarIcon from "material-ui-icons/Star";
import SendIcon from "material-ui-icons/Send";
import MailIcon from "material-ui-icons/Mail";
import DeleteIcon from "material-ui-icons/Delete";
import ReportIcon from "material-ui-icons/Report";

export const mailFolderListItems = (
  <div>
    <ListSubheader>MASTER</ListSubheader>
    <ListItem button dense>
      <ListItemIcon>
        <InboxIcon style={{ fontSize: "20px" }} />
      </ListItemIcon>
      <ListItemText primary="Inbox" style={{ paddingLeft: 10 }} />
    </ListItem>
    <ListItem button dense>
      <ListItemIcon>
        <StarIcon style={{ fontSize: "20px" }} />
      </ListItemIcon>
      <ListItemText primary="Starred" style={{ paddingLeft: 10 }} />
    </ListItem>
    <ListItem button dense>
      <ListItemIcon>
        <SendIcon style={{ fontSize: "20px" }} />
      </ListItemIcon>
      <ListItemText primary="Send mail" style={{ paddingLeft: 10 }} />
    </ListItem>
    <ListItem button dense>
      <ListItemIcon>
        <DraftsIcon style={{ fontSize: "20px" }} />
      </ListItemIcon>
      <ListItemText primary="Drafts" style={{ paddingLeft: 10 }} />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListSubheader>REPORTS</ListSubheader>
    <ListItem button dense>
      <ListItemIcon>
        <MailIcon style={{ fontSize: "20px" }} />
      </ListItemIcon>
      <ListItemText primary="All mail" style={{ paddingLeft: 10 }} />
    </ListItem>
    <ListItem button dense>
      <ListItemIcon>
        <DeleteIcon style={{ fontSize: "20px" }} />
      </ListItemIcon>
      <ListItemText primary="Trash" style={{ paddingLeft: 10 }} />
    </ListItem>
    <ListItem button dense>
      <ListItemIcon>
        <ReportIcon style={{ fontSize: "20px" }} />
      </ListItemIcon>
      <ListItemText primary="Spam" style={{ paddingLeft: 10 }} />
    </ListItem>
  </div>
);
