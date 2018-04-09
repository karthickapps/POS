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
import TablePaginationActions from "./TablePaginationActions";
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
  state = {
    page: 0,
    rowsPerPage: 5
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

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
    return keys.map(k => <TableCell>{row[k]}</TableCell>);
  };

  renderBody = () => (
    <TableBody>
      {this.props.data.map((row, idx) => {
        const keys = Object.keys(row);
        return (
          // eslint-disable-next-line react/no-array-index-key
          <TableRow key={`${keys[0]}${idx}`}>
            {this.renderRow()}
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

  render() {
    const { classes, data, isLoading } = this.props;
    const { rowsPerPage, page } = this.state;

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
            <TableFooter>
              <TableRow>
                <CustomTablePagination
                  colSpan={6}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={() => {}}
                  Actions={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Datagrid);
