import React, { Component } from "react";

const Datarow = ({ title, data }) => (
  <div>
    <h4>{title}</h4>
    <ul>{data.map(data => <li key={data}>{data}</li>)}</ul>
  </div>
);

class Products extends Component {
  state = {
    loginStatus: "Not authenticated",
    row: []
  };

  async componentDidMount() {
    await this.login();
    await this.FetchAndUpdate("Products", "api/Products/All");
    await this.FetchAndUpdate("Protected", "api/Products/ProtectedAll");
  }

  async login() {
    try {
      const response = await this.postData("api/Auth/Login", {
        username: "sfkShan",
        password: "Mozzie@2018"
      });
      const loginStatus = await response.status;

      if (loginStatus !== 200) {
        const data = await response.text();
        this.setState({ loginStatus: data });
        return;
      }

      const data = await response.json();
      this.setState({ loginStatus: data.responseText });
    } catch (error) {
      console.log(error);
      this.setState({ loginStatus: "Falied to singin." });
    }
  }

  async FetchAndUpdate(title, url) {
    try {
      const response = await fetch(url, { credentials: "same-origin" });
      const status = await response.status;

      console.log(title, status);

      if (status !== 200) {
        const row = { title, data: ["Un authorized"] };
        this.setState({ row: this.state.row.concat(row) });
        return;
      }

      const result = await response.json();

      if (result) {
        const row = { title, data: result };
        this.setState({ row: this.state.row.concat(row) });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async postData(url, data) {
    return await fetch(url, {
      body: JSON.stringify(data),
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "user-agent": "Mozilla/4.0 MDN Example",
        "content-type": "application/json"
      },
      method: "POST"
    });
  }

  renderDataset() {
    return (
      <div>{this.state.row.map(r => <Datarow {...r} key={r.title} />)}</div>
    );
  }

  render() {
    return (
      <div>
        <h4>Login Status</h4>
        <p style={{ marginLeft: 20, color: "red" }}>{this.state.loginStatus}</p>
        {this.renderDataset()}
      </div>
    );
  }
}

export default Products;
