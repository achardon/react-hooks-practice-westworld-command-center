import React, { useState, useEffect } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";
import { Log } from "../services/Log";


function HostInfo( {selectedHost, setSelectedHost, areas, hosts, setHosts, logs, setLogs} ) {
  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.

  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  // const [options] = useState([
  //   { key: "some_area", text: "Some Area", value: "some_area" },
  //   { key: "another_area", text: "Another Area", value: "another_area" },
  // ]);

  // console.log('this component renders')

  function capitalizeName(name) {
    let finishedName = name.replace('_', ' ')
    let splitName = finishedName.split(' ')
    for (let i = 0; i < splitName.length; i++) {
      splitName[i] = splitName[i][0].toUpperCase() + splitName[i].substring(1);
    }
    finishedName = splitName.join(' ')
    return finishedName
  }
  
  const options = areas.map(area => {
    return { key: area.name, text: capitalizeName(area.name), value: area.name}
  })
  
  const [value, setValue] = useState(selectedHost.area);
  // const [active, setActive] = useState(selectedHost.active);

  // console.log(selectedHost)

  useEffect(() => {
    setValue(selectedHost.area)
  },[selectedHost])

  function handleOptionChange(e, { value }) {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    const hostsAlreadyInArea = hosts.filter(host => host.area === value)
    const currentArea = areas.filter(area => area.name === value)
    if (hostsAlreadyInArea.length >= currentArea[0].limit) {
      // console.log('too many')
      // alert(
      //   `HEY!! You got too many hosts in ${capitalizeName(currentArea[0].name)}. The limit for that area is ${currentArea[0].limit}. You gotta fix that!`
      // );
      setLogs([Log.error(`Too many hosts. Cannot add ${selectedHost.firstName} to ${capitalizeName(currentArea[0].name)}`), ...logs])
    }
    else {
      fetch(`http://localhost:3001/hosts/${selectedHost.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...selectedHost, area: value})
      })
      .then(r => r.json())
      .then(data => {
        const updatedHosts = hosts.map(host => {
          if (host.id === selectedHost.id) {
            return data
          }
          else {
            return host
          }
        })
        setHosts(updatedHosts)
        setSelectedHost(data)
        setLogs([Log.notify(`${selectedHost.firstName} set in area ${capitalizeName(currentArea[0].name)}`), ...logs])
      })
    }
  }

  function handleRadioChange() {
    const updatedActive = !selectedHost.active
    fetch(`http://localhost:3001/hosts/${selectedHost.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...selectedHost, active: updatedActive})
    })
    .then(r => r.json())
    .then(data => {
      const updatedHosts = hosts.map(host => {
        if (host.id === selectedHost.id) {
          return data
        }
        else {
          return host
        }
      })
      setHosts(updatedHosts)
      setSelectedHost(data)
      if (updatedActive) {
        setLogs([Log.warn(`Activated ${selectedHost.firstName}`), ...logs])
      }
      else {
        setLogs([Log.warn(`Decommissioned ${selectedHost.firstName}`), ...logs])
      }
      
    })
  }

  // console.log(selectedHost.active)
  // console.log(value)

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={selectedHost.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {selectedHost.firstName} | {selectedHost.gender === 'Male' ? <Icon name="man" /> : <Icon name="woman" />}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={selectedHost.active? "Active" : "Decommissioned"}
                checked={selectedHost.active? true : false}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={value}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
