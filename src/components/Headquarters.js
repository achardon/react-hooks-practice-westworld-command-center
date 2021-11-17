import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from './ColdStorage';
import LogPanel from './LogPanel';

function Headquarters( {hosts, areas} ) {

  const [selectedHost, setSelectedHost] = useState('')

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost}/>
      </Grid.Column>
      <Grid.Column width={5}>
        <Details selectedHost={selectedHost} areas={areas}/>
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
