import React, { Component } from "react";

import { Cards, Chart, CountryPicker, Social } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/covid.jpg";
import { Typography } from "@material-ui/core";

export default class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    console.log(fetchedData);
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    //console.log(country);
    const fetchedData = await fetchData(country);
    //fetch the data
    this.setState({
      data: fetchedData,
      country: country,
    });
    console.log(fetchedData);
    //set the state
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID_19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <Typography color="textSecondary" className={styles.createdBy}>
          {`Created By :`}{" "}
          <strong className={styles.author}>Syed Abid Rizvi</strong>
        </Typography>
        <Social />
      </div>
    );
  }
}
