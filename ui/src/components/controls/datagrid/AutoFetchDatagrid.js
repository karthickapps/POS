import React, { Component } from "react";
import axios from "axios";
import Datagrid from "./Datagrid";
import { getPaginationInfo } from "../../../utils";

class AutoFetchDatagrid extends Component {
  state = {};

  onFirst = () => {
    this.fetch("first");
  };

  onLast = () => {
    this.fetch("last");
  };

  onNext = async () => {
    this.fetch("next");
  };

  onPrev = () => {
    this.fetch("prev");
  };

  fetch = async action => {
    const url = this.props.data.paginationInfo[action];
    const res = await axios.get(url);
    const paginationInfo = getPaginationInfo(res.headers.link);
    const list = res.data;
    const productType = {
      list,
      paginationInfo
    };
    this.props.afterDataFetch(productType);
  };

  render() {
    const { afterDataFetch, ...rest } = this.props;

    return (
      <Datagrid
        {...rest}
        onNext={this.onNext}
        onPrev={this.onPrev}
        onLast={this.onLast}
        onFirst={this.onFirst}
      />
    );
  }
}

export default AutoFetchDatagrid;
