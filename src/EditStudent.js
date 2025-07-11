import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const { studentid } = useParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [Place, setPlace] = useState("");
  const [Phone, setPhone] = useState("");
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentid}`)
      .then((res) => res.json())
      .then((data) => {
        setId(data.id);
        setName(data.name);
        setPlace(data.Place);
        setPhone(data.Phone);
      })
      .catch((err) => console.log(err.message));
  }, []);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const studentData = { id, name, Place, Phone };
    fetch(`http://localhost:8000/students/${studentid}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(studentData),
    })
      .then((res) => {
        alert("Student Data Updated Successfully!!");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="container">
      <h2>Edit Student Details</h2>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {id.length === 0 && validation && (
          <span className="errorMsg">Please Enter ID</span>
        )}

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {name.length === 0 && validation && (
          <span className="errorMsg">Please Enter Name</span>
        )}
        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          required
          value={Place}
          onChange={(e) => {
            setPlace(e.target.value);
          }}
          onMouseDown={() => setValidation(true)}
        />
        {Place.length === 0 && validation && (
          <span className="errorMsg">Please enter Place</span>
        )}
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          required
          value={Phone}
          onChange={(e) => setPhone(e.target.value)}
          onMouseDown={() => setValidation(true)}
        />
        {Phone.length === 0 && validation && (
          <span className="errorMsg">Please enter mobile number </span>
        )}
        <div>
          <button className="btn btn-save">Update</button>
          <Link to="/" className="btn btn-back">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
