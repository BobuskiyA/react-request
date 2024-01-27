import React, { useState, FormEvent, ChangeEvent } from "react";
import "./FormSent.scss";
import sendMessage from "../../requests/sendMessage";
import formatFormData from "../../helpers/formatFormData";

function FormSent() {
  const [formData, setFormData] = useState({
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Зміна значення у formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Проста валідація: перевірка, чи введено значення
    if (!formData.description.trim()) {
      setError("Please enter something before submitting");
      return;
    }

    // Отримання об'єкта даних для відправки
    const formattedData = formatFormData(formData);

    try {
      // Відправка даних на сервер
      await sendMessage(formattedData);

      // Логування в консоль успішної відправки
      console.log("Sent successfully:", formattedData);

      // Очищення полів вводу та скидання помилок
      setFormData((prevFormData) => ({
        ...prevFormData,
        description: "",
      }));
      setError(null);
    } catch (error) {
      // Виведення помилки в консоль у разі невдачі
      console.error("Error sending:", error);
      setError("An error occurred while sending. Try again.");
    }
  };

  return (
    <div className="formsent">
      <form onSubmit={handleSubmit}>
        <label className="form-text">
          Enter something:
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button className="form-button" type="submit">
          Sent
        </button>
      </form>
    </div>
  );
}

export default FormSent;
