import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host( {host, selectedHost, selectHost} ) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  return (
    <Card
      className={selectedHost === host? "host selected" : "host"}
      onClick={() => selectHost(host)}
      image={host.imageUrl}
      raised
      link
    />
  );
}

export default Host;
