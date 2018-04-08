import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
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

// eslint-disable-next-line
const styles = theme => ({
  root: {
    width: "100%",
    // [theme.breakpoints.up("xs")]: {
    //   marginTop: theme.spacing.unit * 8
    // },
    // [theme.breakpoints.up("md")]: {
    //   marginTop: theme.spacing.unit * 3
    // },
    overflowX: "auto",
    flexShrink: 0
  },
  table: {
    minWidth: 700
  },
  head: {
    background: "#e0e0e0"
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

  renderHeader = () =>
    this.props.headers.map(h => <CustomTableCell key={h}>{h}</CustomTableCell>);

  render() {
    const { classes, data } = this.props;
    const { rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              {this.renderHeader()}
              <CustomTableCell>Actions</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(n => (
                <TableRow key={n.id}>
                  <TableCell>{n.name}</TableCell>
                  <TableCell>{n.calories}</TableCell>
                  <TableCell>{n.fat}</TableCell>
                  <TableCell>{n.carbs}</TableCell>
                  <TableCell>{n.protein}</TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
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
    );
  }
}

export default withStyles(styles)(Datagrid);
