import React, { useState } from "react";
import { Form, Button, Modal } from "semantic-ui-react";
import axios from "axios";
import Navbar from "./Navbar";

type StatusType = "Queued" | "In Progress" | "Success" | "Failure";

interface IProps {}

const SubmitScanResultsForm: React.FC<IProps> = () => {
  const [status, setStatus] = useState<StatusType>("Queued");
  const [repositoryName, setRepositoryName] = useState("");
  const [findings, setFindings] = useState("");
  const [queuedAt, setQueuedAt] = useState<Date>(new Date());
  const [scanningAt, setScanningAt] = useState<Date | null>(null);
  const [finishedAt, setFinishedAt] = useState<Date | null>(null);


  const handleSubmit = async () => {
    try {
      const data = {
        status,
        repositoryName,
        findings: JSON.stringify(findings),
        queuedAt,
        scanningAt,
        finishedAt,
      };
      const response = await axios.post("http://localhost:8000/create", data);
      console.log(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOk = () => {
    setStatus("Queued");
    setRepositoryName("");
    setFindings("{}");
    setQueuedAt(new Date());
    setScanningAt(null);
    setFinishedAt(null);
    setModalOpen(false);
  };

  const handleViewResult = () => {
    window.location.href = `/display`;
  };

  return (
    <div className="SubmitFormDivWrapper">
      <Navbar></Navbar>
      <br />
      <br />
      <h2>Submit Security Scan Results</h2>
      <div className="FormBody">
        <Form onSubmit={handleSubmit} className="BodyForm">
          <Form.Field>
            <label>Status</label>
            <Form.Select
              options={[
                { key: "queued", text: "Queued", value: "Queued" },
                {
                  key: "in-progress",
                  text: "In Progress",
                  value: "In Progress",
                },
                { key: "success", text: "Success", value: "Success" },
                { key: "failure", text: "Failure", value: "Failure" },
              ]}
              value={status}
              onChange={(_, { value }) => setStatus(value as StatusType)}
            />
          </Form.Field>
          <Form.Field>
            <label>Repository Name</label>
            <Form.Input
              placeholder="Repository Name"
              value={repositoryName}
              onChange={(e) => setRepositoryName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Findings</label>
            <Form.TextArea
              placeholder=""
              value={findings}
              onChange={(e) => {
                try {
                  JSON.parse(e.target.value);
                  setFindings(e.target.value);
                } catch (error) {
                  console.error(error);
                }
              }}
            />
          </Form.Field>

          <Form.Field>
            <label>Queued At</label>
            <Form.Input
              type="date"
              value={queuedAt.toISOString().substr(0, 10)}
              onChange={(e) => setQueuedAt(new Date(e.target.value))}
            />
          </Form.Field>

          <Form.Field>
            <label>Scanning At</label>
            <Form.Input
              type="date"
              value={scanningAt?.toISOString().substr(0, 10)}
              onChange={(e) =>
                setScanningAt(e.target.value ? new Date(e.target.value) : null)
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Finished At</label>
            <Form.Input
              type="date"
              value={finishedAt?.toISOString().substr(0, 10)}
              onChange={(e) =>
                setFinishedAt(e.target.value ? new Date(e.target.value) : null)
              }
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
      <Modal open={modalOpen}>
        <Modal.Header>Results Submitted</Modal.Header>
        <Modal.Content>
          <p>Your security scan results have been successfully submitted.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleModalOk}>Ok</Button>
          <Button onClick={handleViewResult}>View Results</Button>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default SubmitScanResultsForm;
