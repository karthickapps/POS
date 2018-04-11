import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { LinearProgress } from "material-ui/Progress";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
import Button from "material-ui/Button";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import CustomTablePagination from "./CustomTablePagination";
import CustomTableCell from "./CustomTableCell";
import Overlay from "../Overlay";
import Message from "../Message";

// eslint-disable-next-line
const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    flexShrink: 0
  },
  table: {
    minWidth: 700
  },
  head: {
    background: "#e0e0e0"
  },
  wrapper: {
    position: "relative"
  },
  overlay: {
    top: 0,
    position: "absolute",
    background: "#ffffffad",
    height: "100%",
    width: "100%",
    zIndex: 100
  }
});

class Datagrid extends Component {
  state = {};

  renderHeader = () => (
    <TableHead className={this.props.classes.head}>
      <TableRow>
        {this.props.headers.map(h => (
          <CustomTableCell key={h}>{h}</CustomTableCell>
        ))}
        {this.props.actions.length > 0 && (
          <CustomTableCell>Actions</CustomTableCell>
        )}
      </TableRow>
    </TableHead>
  );

  renderRow = row => {
    const keys = Object.keys(row);

    return keys.map((k, idx) => {
      if (this.props.actions.includes("sel") && idx === 0) {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <TableCell key={`${keys[idx]}${idx}`}>
            <Button color="primary" onClick={() => this.props.onSelect(row)}>
              {row[k]}
            </Button>
          </TableCell>
        );
      }

      return (
        // eslint-disable-next-line react/no-array-index-key
        <TableCell key={`${keys[idx]}${idx}`}>{row[k]}</TableCell>
      );
    });
  };

  renderActions = row => {
    if (this.props.actions.length === 0) {
      return null;
    }

    return (
      <TableCell>
        {this.props.actions.includes("edit") && (
          <IconButton>
            <EditIcon onClick={() => this.props.onEdit(row)} />
          </IconButton>
        )}
        {this.props.actions.includes("del") && (
          <IconButton>
            <DeleteIcon onClick={() => this.props.onDelete(row)} />
          </IconButton>
        )}
      </TableCell>
    );
  };

  renderBody = () => (
    <TableBody>
      {this.props.data.list.map((row, idx) => {
        const keys = Object.keys(row);
        return (
          // eslint-disable-next-line react/no-array-index-key
          <TableRow key={`${keys[0]}${idx}`}>
            {this.renderRow(row)}
            {this.renderActions(row)}
          </TableRow>
        );
      })}
    </TableBody>
  );

  renderNoRecordsMessage = () => (
    <Message
      style={{ width: "100%", marginLeft: 0 }}
      title="Info"
      message="No records found"
      show={this.props.data.list.length === 0}
    />
  );

  renderFooter = () => {
    const { data } = this.props;

    const paginationActions = {};
    paginationActions.onFirst = this.props.onFirst;
    paginationActions.onNext = this.props.onNext;
    paginationActions.onPrev = this.props.onPrev;
    paginationActions.onLast = this.props.onLast;

    if (data.list.length === 0 || !data.paginationInfo.count) {
      return null;
    }

    return (
      <TableFooter>
        <TableRow>
          <CustomTablePagination
            colSpan={6}
            count={data.paginationInfo.count}
            rowsPerPage={data.list.length}
            page={data.paginationInfo.current}
            onChangePage={this.handleChangePage}
            paginationActions={paginationActions}
          />
        </TableRow>
      </TableFooter>
    );
  };

  render() {
    const { classes, isLoading } = this.props;

    return (
      <div className={classes.wrapper}>
        {isLoading === true && (
          <LinearProgress size={24} style={{ height: 1.5 }} />
        )}
        {isLoading === true && <Overlay />}

        <Paper className={classes.root}>
          <Table className={classes.table}>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          </Table>
        </Paper>
        {this.renderNoRecordsMessage()}
      </div>
    );
  }
}

Datagrid.defaultProps = {
  actions: []
};

export default withStyles(styles)(Datagrid);
