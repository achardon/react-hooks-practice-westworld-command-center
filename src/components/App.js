import React, {useEffect, useState} from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from './WestworldMap';
import Headquarters from "./Headquarters";

function App() {

  const [hosts, setHosts] = useState([])
  const [areas, setAreas] = useState([])

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
      console.log(data)
      setAreas(data)
    })
  }, [])

  console.log(hosts)

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts}/>
      <Headquarters areas={areas} hosts={hosts}/>
    </Segment>
  );
}

export default App;
