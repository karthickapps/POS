import React from "react";
import { withStyles } from "material-ui/styles";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { TableCell } from "material-ui/Table";
import TablePaginationActions from "./TablePaginationActions";

export const styles = theme => ({
  root: {
    fontSize: theme.typography.pxToRem(12),
    // Increase the specificity to override TableCell.
    "&:last-child": {
      padding: 0
    }
  },
  toolbar: {
    height: 56,
    minHeight: 56,
    paddingRight: 2
  },
  spacer: {
    flex: "1 1 100%"
  },
  caption: {
    flexShrink: 0
  },
  input: {
    fontSize: "inherit",
    flexShrink: 0
  },
  selectRoot: {
    marginRight: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit,
    color: theme.palette.text.secondary
  },
  select: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2
  },
  selectIcon: {
    top: 1
  },
  actions: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class CustomTablePagination extends React.Component {
  // This logic would be better handled on userside.
  // However, we have it just in case.
  componentDidUpdate() {
    const { count, onChangePage, page, rowsPerPage } = this.props;
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    // TODO
    // Index starts zero here and server returns the pages starting from page 1.
    // Needs to make it uniform. Ok as of now.
    if (page - 1 > newLastPage) {
      onChangePage(null, newLastPage);
    }
  }

  render() {
    const {
      Actions,
      backIconButtonProps,
      classes,
      colSpan: colSpanProp,
      component: Component,
      count,
      labelDisplayedRows,
      labelRowsPerPage,
      nextIconButtonProps,
      onChangePage,
      onChangeRowsPerPage,
      page,
      rowsPerPage,
      rowsPerPageOptions,
      SelectProps,
      paginationActions,
      ...other
    } = this.props;

    let colSpan;

    if (Component === TableCell || Component === "td") {
      colSpan = colSpanProp || 1000; // col-span over everything
    }

    return (
      <Component className={classes.root} colSpan={colSpan} {...other}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.spacer} />
          <Typography variant="caption" className={classes.caption}>
            {labelDisplayedRows({
              from: count === 0 ? 0 : (page - 1) * rowsPerPage + 1, // page - 1 is because // TODO indexing difference. See comment on LNO : 57
              to: Math.min(count, (page + 1) * rowsPerPage),
              count,
              page
            })}
          </Typography>
          <TablePaginationActions
            count={count}
            page={page - 1} // TODO indexing difference. See comment on LNO : 57
            rowsPerPage={rowsPerPage}
            {...paginationActions}
          />
        </Toolbar>
      </Component>
    );
  }
}

CustomTablePagination.defaultProps = {
  component: TableCell,
  labelDisplayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
  labelRowsPerPage: "Rows per page:",
  rowsPerPageOptions: [5, 10, 25]
};

export default withStyles(styles)(CustomTablePagination);
