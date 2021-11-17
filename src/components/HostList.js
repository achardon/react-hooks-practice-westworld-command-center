import React from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";

function HostList( {hosts, selectedHost, setSelectedHost, selectHost} ) {

  const hostsInColdStorage = hosts.filter(host => !host.active)

  return (
    <Card.Group itemsPerRow={6}>{/* What do you think, partner? */}
      {hostsInColdStorage.map(host => <Host key={host.id} host={host} selectedHost={selectedHost} selectHost={selectHost} />)}
    
    </Card.Group>
  );
}

export default HostList;
