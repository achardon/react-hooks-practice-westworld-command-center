import React from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";

function HostList( {hosts, selectedHost, setSelectedHost} ) {

  function selectHost(host) {
    setSelectedHost(host)
  }

  return (
    <Card.Group itemsPerRow={6}>{/* What do you think, partner? */}
      {hosts.map(host => <Host key={host.id} host={host} selectHost={selectHost} />)}
    
    </Card.Group>
  );
}

export default HostList;
