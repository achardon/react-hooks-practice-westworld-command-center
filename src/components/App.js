import React, {useEffect, useState} from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from './WestworldMap';
import Headquarters from "./Headquarters";

function App() {

  const [hosts, setHosts] = useState([])
  const [areas, setAreas] = useState([])
  const [selectedHost, setSelectedHost] = useState('')
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3001/hosts`)
    .then(r => r.json())
    .then(data => {
      setHosts(data)
    })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3001/areas`)
    .then(r => r.json())
    .then(data => {
      setAreas(data)
    })
  }, [])

  function selectHost(host) {
    setSelectedHost(host)
  }

  // console.log(hosts)

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts} selectHost={selectHost} logs={logs} />
      <Headquarters areas={areas} hosts={hosts} setHosts={setHosts} selectHost={selectHost} selectedHost={selectedHost} setSelectedHost={setSelectedHost} logs={logs} setLogs={setLogs}/>
    </Segment>
  );
}

export default App;
