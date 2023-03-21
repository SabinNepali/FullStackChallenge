import React, { useEffect, useState } from "react";
import { Table, Button, Icon, Label } from "semantic-ui-react";
import Navbar from "./Navbar";

interface ScanResult {
  id: number;
  status: "Queued" | "In Progress" | "Success" | "Failure";
  repositoryName: string;
  findings: string | null;
  queuedAt: string;
  scanningAt: string | null;
  finishedAt: string | null;
}

const GridView: React.FC = () => {
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Make GET API call and set scanResults state with response data
    fetch("http://localhost:8000/results")
      .then((response) => response.json())
      .then((data) =>
        setScanResults(
          data.map((result: ScanResult) => ({
            ...result,
            findings: result.findings
              ? JSON.stringify(JSON.parse(JSON.parse(result.findings)), null, 2)
              : null,
          }))
        )
      );
  }, []);

  const handleInfo = (id: number) => {
    window.location.href = `/findings?id=${id.toString()}`;
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this scan result?"
    );
    if (confirmDelete) {
      setLoading(true);
      fetch(`http://localhost:8000/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          // Filter out the deleted scan result from the list
          const updatedResults = scanResults.filter(
            (result) => result.id !== id
          );
          setScanResults(updatedResults);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  return (
    <div className="gridWrapper">
      <Navbar />
      <div className="gridContainer">
        <br />
        <br />
        <h2>Scan Results</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Repository Name</Table.HeaderCell>
              <Table.HeaderCell>Findings</Table.HeaderCell>
              <Table.HeaderCell>Timestamp</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {scanResults.map((result) => (
              <Table.Row key={result.id}>
                <Table.Cell>{result.id}</Table.Cell>
                <Table.Cell>
                  {result.status === "Queued" && (
                    <Label color="yellow">Queued</Label>
                  )}
                  {result.status === "In Progress" && (
                    <Label color="blue">In Progress</Label>
                  )}
                  {result.status === "Success" && (
                    <Label color="green">Success</Label>
                  )}
                  {result.status === "Failure" && (
                    <Label color="red">Failure</Label>
                  )}
                </Table.Cell>
                <Table.Cell>{result.repositoryName}</Table.Cell>
                <Table.Cell>
                  {result.findings ? (
                    <Label color="red">
                      {JSON.parse(result.findings).findings.length}
                    </Label>
                  ) : (
                    <Label color="green">0</Label>
                  )}
                </Table.Cell>

                <Table.Cell>
                  {result.status === "Queued"
                    ? result.queuedAt
                    : result.status === "In Progress"
                    ? result.scanningAt ?? "N/A"
                    : result.finishedAt ?? "N/A"}
                </Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      icon
                      color="blue"
                      onClick={() => handleInfo(result.id)}
                    >
                      <Icon name="info circle" />
                    </Button>
                    <Button
                      icon
                      color="red"
                      onClick={() => handleDelete(result.id)}
                    >
                      <Icon name="delete" />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default GridView;
