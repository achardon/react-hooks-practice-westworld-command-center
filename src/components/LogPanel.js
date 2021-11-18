import React, {useState} from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel( {hosts, setHosts} ) {
  
  const [activateAll, setActivateAll] = useState(false)

  function handleClick() {
    
    if (activateAll) {
      const decomHosts = hosts.map(host => {
        host.active = false
        return host;
      })
      decomHosts.map(host => {
        fetch(`http://localhost:3001/hosts/${host.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(host)
      })
      .then(r => r.json())
      .then(data => {
          console.log(data)
        }) 
      })
    setHosts(decomHosts)
    }

    if (!activateAll) {
      const activatedHosts = hosts.map(host => {
        host.active = true;
        return host;
      })
      activatedHosts.map(host => {
        fetch(`http://localhost:3001/hosts/${host.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(host)
      })
      .then(r => r.json())
      .then(data => {
          console.log(data)
        }) 
      })
      setHosts(activatedHosts)
    }
    setActivateAll(!activateAll)
  }

  console.log(activateAll)
  
  function dummyLogs() {
    // This is just to show you how this should work. But where should the log data actually get stored?
    // And where should we be creating logs in the first place?
    // Use the Log Service class (located in: 'src/services/Log') we've created anywhere you like.
    // Just remember to import it

    let logs = [];

    logs.unshift(Log.warn("This is an example of a warn log"));
    logs.unshift(Log.notify("This is an example of a notify log"));
    logs.unshift(Log.error("This is an example of an error log"));

    return logs;
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {dummyLogs().map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      {/* Button below is the Activate All/Decommisssion All button */}
      {/* This isn't always going to be the same color...*/}
      {/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
      <Button fluid color={activateAll? "green" : "red"} content={activateAll? "DECOMMISSION ALL" : "ACTIVATE ALL"} onClick={handleClick} />
    </Segment>
  );
}

export default LogPanel;
