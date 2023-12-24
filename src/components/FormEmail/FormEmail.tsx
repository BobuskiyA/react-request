import React, { useState, FormEvent, ChangeEvent } from "react";
import "./FormEmail.css";
import "../../email/sender.php";
function FormEmail() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    text: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="formsent">
      <form action="sender.php" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          className="name"
          name="name"
          placeholder="FirstName"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="surname"
          placeholder="LastName"
          required
          value={formData.surname}
          onChange={handleChange}
        />
        <input
          type="text"
          className="phone"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
        ></textarea>
        <button type="button" className="send-form">
          Sent
        </button>
        <div className="status"></div>
      </form>
    </div>
  );
}

export default FormEmail;
