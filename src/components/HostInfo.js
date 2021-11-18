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

  useEffect(() => {
    setValue(selectedHost.area)
  },[selectedHost])

  function handleOptionChange(e, { value }) {
    const hostsAlreadyInArea = hosts.filter(host => host.area === value)
    const currentArea = areas.filter(area => area.name === value)
    if (hostsAlreadyInArea.length >= currentArea[0].limit) {
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
