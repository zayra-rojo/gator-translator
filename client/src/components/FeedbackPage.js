import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

function FeedbackPage() {
  const [allFeedback, setAllFeedback] = useState();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllFeedback = async () => {
      const result = await axios
        .get("http://localhost:8080/feedback")
        .then((response) => {
          console.log(
            "inside fetchAllData, printing response.data...",
            response.data
          );
          setAllFeedback(response.data);
          setIsLoading(false);
        });
    };
    fetchAllFeedback();
  }, []);
  if (loading) return <span>Loading...</span>;
  if (!allFeedback) return <span>Data not available yet...</span>;

  return (
    <Container fluid>
      <h2>International Student's Feedback</h2>
      <Table striped bordered hover>
        <thread>
          <tr>
            <th>Good transation</th>
          </tr>
        </thread>
        <tbody>
          {allFeedback.internationalStudentFeedback.good.map((elem) => (
            <tr>
              <td>{elem}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Table striped bordered hover>
        <thread>
          <tr>
            <th>Bad transation</th>
          </tr>
        </thread>
        <tbody>
          {allFeedback.internationalStudentFeedback.bad.map((elem) => (
            <tr>
              <td>{elem}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Guide Student's Feedback</h2>
      <Table striped bordered hover>
        <thread>
          <tr>
            <th>Good transation</th>
          </tr>
        </thread>
        <tbody>
          {allFeedback.guideStudentFeedback.good.map((elem) => (
            <tr>
              <td>{elem}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Table striped bordered hover>
        <thread>
          <tr>
            <th>Bad transation</th>
          </tr>
        </thread>
        <tbody>
          {allFeedback.guideStudentFeedback.bad.map((elem) => (
            <tr>
              <td>{elem}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default FeedbackPage;
