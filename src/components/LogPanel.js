import React, {useState} from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel( {hosts, setHosts, logs, setLogs} ) {
  
  const [activateAll, setActivateAll] = useState(false)

  // const exampleLog = Log.error('oops!')
  // console.log('all logs', logs)

  function handleClick() {
    
    if (activateAll) {
      const decomHosts = hosts.map(host => {
        host.active = false
        return host;
      })
      console.log(decomHosts)
      
        fetch(`http://localhost:3001/hosts`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(decomHosts)
      })
      .then(r => r.json())
      .then(data => {
          console.log(data)
        }) 
  
    setHosts(decomHosts)
    setLogs([Log.warn('Decommissiong all hosts.'), ...logs])
    }

    if (!activateAll) {
      const activatedHosts = hosts.map(host => {
        host.active = true;
        return host;
      })
      console.log(activatedHosts)
      console.log('inside if statement')
      //HOW DOES THIS PART WORK? I tried doing a fetch with activatedHosts.map, but it kept throwing an error (even though it appeared to be working at first)... too many fetch requests at once??
        fetch(`http://localhost:3001/hosts`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activatedHosts)
      })
      .then(r => r.json())
      .then(data => {
          console.log(data)
        }) 
      
      setHosts(activatedHosts)
      setLogs([Log.warn('Activating all hosts!'), ...logs])

    }
    setActivateAll(!activateAll)
  }

  // console.log(activateAll)
  
  // function dummyLogs() {
  //   // This is just to show you how this should work. But where should the log data actually get stored?
  //   // And where should we be creating logs in the first place?
  //   // Use the Log Service class (located in: 'src/services/Log') we've created anywhere you like.
  //   // Just remember to import it

  //   let logs = [];

  //   logs.unshift(Log.warn("This is an example of a warn log"));
  //   logs.unshift(Log.notify("This is an example of a notify log"));
  //   logs.unshift(Log.error("This is an example of an error log"));

  //   return logs;
  // }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
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
