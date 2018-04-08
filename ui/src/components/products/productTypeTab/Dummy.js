import React from "react";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableRow
} from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
import Paper from "material-ui/Paper";
import TablePaginationActions from "./TablePaginationActions";
import CustomTablePagination from "./CustomTablePagination";

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class Dummy extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: [
        createData("Cupcake", 305, 3.7),
        createData("Donut", 452, 25.0),
        createData("Eclair", 262, 16.0),
        createData("Frozen yoghurt", 159, 6.0),
        createData("Gingerbread", 356, 16.0),
        createData("Honeycomb", 408, 3.2),
        createData("Ice cream sandwich", 237, 9.0),
        createData("Jelly Bean", 375, 0.0),
        createData("KitKat", 518, 26.0),
        createData("Lollipop", 392, 0.2),
        createData("Marshmallow", 318, 0),
        createData("Nougat", 360, 19.0),
        createData("Oreo", 437, 18.0)
      ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 5
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => (
                  <TableRow key={n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell numeric>{n.calories}</TableCell>
                    <TableCell numeric>{n.fat}</TableCell>
                    <TableCell numeric>
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
                  colSpan={4}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[]}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  Actions={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Dummy);
