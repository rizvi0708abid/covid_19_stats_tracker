import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Grid } from "@material-ui/core";
import Styles from "./Social.module.css";

export default function Social() {
  return (
    <div className={Styles.social}>
      <Grid>
        <a href="#">
          <Grid item component={TwitterIcon} />
        </a>
        <a href="https://www.linkedin.com/in/abid72rizvi">
          <Grid item component={LinkedInIcon} />
        </a>
        <a href="https://github.com/rizvi0708abid">
          <Grid item component={GitHubIcon} />
        </a>
      </Grid>
    </div>
  );
}
