import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from './ColdStorage';
import LogPanel from './LogPanel';

function Headquarters( {hosts, setHosts, areas, selectHost, selectedHost, setSelectedHost} ) {

  const [logs, setLogs] = useState([])

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage hosts={hosts} selectedHost={selectedHost} setSelectedHost={setSelectedHost} selectHost={selectHost}/>
      </Grid.Column>
      <Grid.Column width={5}>
        <Details selectedHost={selectedHost} setSelectedHost={setSelectedHost} areas={areas} hosts={hosts} setHosts={setHosts} logs={logs} setLogs={setLogs}/>
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel hosts={hosts} setHosts={setHosts} logs={logs} setLogs={setLogs}/>
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
