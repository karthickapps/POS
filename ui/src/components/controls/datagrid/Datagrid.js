import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { LinearProgress } from "material-ui/Progress";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
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
        <CustomTableCell>Actions</CustomTableCell>
      </TableRow>
    </TableHead>
  );

  renderRow = row => {
    const keys = Object.keys(row);
    return keys.map((k, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <TableCell key={`${keys[idx]}${idx}`}>{row[k]}</TableCell>
    ));
  };

  renderBody = () => (
    <TableBody>
      {this.props.data.list.map((row, idx) => {
        const keys = Object.keys(row);
        return (
          // eslint-disable-next-line react/no-array-index-key
          <TableRow key={`${keys[0]}${idx}`}>
            {this.renderRow(row)}
            <TableCell>
              <IconButton>
                <DeleteIcon />
              </IconButton>
              <IconButton>
                <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );

  renderFooter = () => {
    const { data } = this.props;

    const actions = {};
    actions.onFirst = this.props.onFirst;
    actions.onNext = this.props.onNext;
    actions.onPrev = this.props.onPrev;
    actions.onLast = this.props.onLast;

    if (data.list.length === 0) {
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
            actions={actions}
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
      </div>
    );
  }
}

export default withStyles(styles)(Datagrid);
