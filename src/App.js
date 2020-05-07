import React, { Component } from "react";

import { Cards, Chart, CountryPicker, Social, IndiaCases } from "./components";
import styles from "./App.module.css";
import { fetchData, fetchDailyDataStateWiseIndia } from "./api";

import coronaImage from "./images/covid.jpg";
import { Typography, Button } from "@material-ui/core";

export default class App extends Component {
  state = {
    data: {},
    country: "",
    statewise: [],
    showStateWise: false,
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({
      ...this.state,
      data: fetchedData,
    });

    const fetchDataStateWise = await fetchDailyDataStateWiseIndia();
    this.setState({
      ...this.state,
      statewise: fetchDataStateWise,
    });
    console.log("App data statewise", this.state.statewise);
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({
      ...this.state,
      data: fetchedData,
      country: country,
    });
    console.log(fetchedData);
  };

  setShowTable = (val) => {
    this.setState({
      ...this.state,
      showStateWise: val,
    });
  };

  render() {
    const { data, country, statewise, showStateWise } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID_19" />
        {!showStateWise ? (
          <div className={styles.container}>
            <Button
              onClick={() =>
                this.setState({
                  ...this.state,
                  showStateWise: true,
                })
              }
            >
              Click for India.
            </Button>
            <Cards data={data} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Chart data={data} country={country} />
          </div>
        ) : null}
        {showStateWise ? (
          <IndiaCases statewise={statewise} setShowTable={this.setShowTable} />
        ) : null}
        <Typography color="textSecondary" className={styles.createdBy}>
          {`Created By :`}{" "}
          <strong className={styles.author}>Syed Abid Rizvi</strong>
        </Typography>
        <Social />
      </div>
    );
  }
}
