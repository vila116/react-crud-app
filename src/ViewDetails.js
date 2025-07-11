import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewDetails() {
  const { studentid } = useParams();
  const [studentdata, setStudentData] = useState({});
  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentid}`)
      .then((res) => res.json())
      .then((data) => setStudentData(data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div className="container">
      <h1>Student Details</h1>
      {studentdata && (
        <div className="details">
          <p>
            <strong>ID:</strong>
            {studentdata.id}
          </p>
          <p>
            <strong>Name: </strong>
            {studentdata.name}
          </p>
          <p>
            <strong>Place: </strong>
            {studentdata.Place}
          </p>
          <p>
            <strong>Phone: </strong>
            {studentdata.Phone}
          </p>
        </div>
      )}
      <Link to="/" className="btn btn-back">
        Back
      </Link>
    </div>
  );
}
