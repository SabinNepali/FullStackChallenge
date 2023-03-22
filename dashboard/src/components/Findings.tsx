import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import Navbar from "./Navbar";

interface Finding {
    ruleId: string;
    description: string;
    severity: string;
    path: string;
    line: number;
    location: {
        path: string;
        positions: {
          begin: {
            line: number;
          }
        }
      },
    metadata: {
        description: string;
        severity: string;
      };
  }
 
  const FindingList: React.FC = () => {
    const [findings, setFindings] = useState<Finding[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const scanId = new URLSearchParams(window.location.search).get("id");
  
    useEffect(() => {
      if (scanId) {
        setLoading(true);
        // Make GET API call with scanId and set findings state with response data
        fetch(`http://localhost:8000/result/${scanId}`)
          .then((response) => response.json())
          .then((data) => {
            const parsedData = JSON.parse(JSON.parse(data.findings)); // parse the findings field into an object
            setFindings(parsedData.findings); // access the findings array from the parsed object
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }
    }, [scanId]);
  
  
    return (
      <div className="gridWrapper">
        <Navbar />
        <div className="gridContainer">
          <br />
          <br />
          <h2>Findings List (Id: {scanId})</h2>
          {loading && <p>Loading findings...</p>}
          {!loading && (
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>RuleId</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Severity</Table.HeaderCell>
                  <Table.HeaderCell>Path Name : Line Number</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
  
              <Table.Body>
                {findings.map((finding, id) => (
                  <Table.Row key={id}>
                    <Table.Cell>{finding.ruleId}</Table.Cell>
                    <Table.Cell>{finding.metadata.description}</Table.Cell>
                    <Table.Cell>{finding.metadata.severity}</Table.Cell>
                    <Table.Cell>
                      {finding.location.path} : {finding.location.positions.begin.line}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
    );
  };
  
  export default FindingList;
  
