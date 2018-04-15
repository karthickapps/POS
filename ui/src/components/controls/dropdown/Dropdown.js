import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import "react-select/dist/react-select.css";
import CustomTextField from "../CustomTextField";
import SelectWrapped from "./SelectWrapped";
import styles from "./styles";

const suggestions = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

class Dropdown extends React.Component {
  state = {
    selectedValue: null
  };

  handleChange = value => {
    this.setState({
      selectedValue: value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <CustomTextField
        fullWidth
        value={this.state.selectedValue}
        onChange={this.handleChange}
        name="react-select-chip-label"
        label="Product type"
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
          inputComponent: SelectWrapped,
          inputProps: {
            classes,
            instanceId: "react-select-chip-label",
            id: "react-select-chip-label",
            simpleValue: true,
            options: suggestions
          }
        }}
      />
    );
  }
}

Dropdown.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dropdown);
