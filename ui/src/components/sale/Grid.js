import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#3f50b5",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 13
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    // height: "calc(100% - 100px)",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

function Grid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Dessert (100g serving)</CustomTableCell>
            <CustomTableCell numeric>Calories</CustomTableCell>
            <CustomTableCell numeric>Fat (g)</CustomTableCell>
            <CustomTableCell numeric>Carbs (g)</CustomTableCell>
            <CustomTableCell numeric>Protein (g)</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow className={classes.row} key={n.id}>
                <CustomTableCell>{n.name}</CustomTableCell>
                <CustomTableCell numeric>{n.calories}</CustomTableCell>
                <CustomTableCell numeric>{n.fat}</CustomTableCell>
                <CustomTableCell numeric>{n.carbs}</CustomTableCell>
                <CustomTableCell numeric>{n.protein}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Grid);
