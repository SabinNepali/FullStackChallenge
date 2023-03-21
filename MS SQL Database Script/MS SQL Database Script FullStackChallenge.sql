CREATE DATABASE SecurityScanResult

USE SecurityScanResult
GO

CREATE TABLE ScanResults (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Status VARCHAR(20) NOT NULL CHECK (Status IN ('Queued', 'In Progress', 'Success','Failure')),
    RepositoryName VARCHAR(255) NOT NULL,
    Findings NVARCHAR(MAX),
    QueuedAt DATE NOT NULL,
    ScanningAt DATE,
    FinishedAt DATE
);


INSERT INTO ScanResults (Status, RepositoryName, Findings, QueuedAt, ScanningAt, FinishedAt)
VALUES 
('Success', 'my-repo-1', '{ 
    "findings": [
    {
      "type": "sast",
      "ruleId": "G402",
      "location": {
        "path": "connectors/apigateway.go",
        "positions": {
          "begin": {
            "line": 60
          }
        }
      },
      "metadata": {
        "description": "TLS InsecureSkipVerify set true.",
        "severity": "HIGH"
      }
    },
    {
      "type": "sast",
      "ruleId": "G404",
      "location": {
        "path": "util/util.go",
        "positions": {
          "begin": {
            "line": 32
          }
        }
      },
      "metadata": {
        "description": "Use of weak random number generator (math/rand instead of crypto/rand)",
        "severity": "HIGH"
      }
    }
    ]
  }', '2022-09-01 08:00:00', '2022-09-01 08:10:00', '2022-09-01 09:00:00')







