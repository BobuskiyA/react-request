import React, { useState, FormEvent, ChangeEvent } from "react";
import "./FormSent";

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
      setError("Будь ласка, введіть щось перед відправкою.");
      return;
    }

    // Отримання об'єкта даних для відправки
    const formattedData = formatFormData(formData);

    try {
      // Відправка даних на сервер
      await sendMessage(formattedData);

      // Логування в консоль успішної відправки
      console.log("Відправлено успішно:", formattedData);

      // Очищення полів вводу та скидання помилок
      setFormData((prevFormData) => ({
        ...prevFormData,
        description: "",
      }));
      setError(null);
    } catch (error) {
      // Виведення помилки в консоль у разі невдачі
      console.error("Помилка під час відправки:", error);
      setError("Виникла помилка під час відправки. Спробуйте ще раз.");
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Введіть щось:
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Відправити</button>
      </form>
    </div>
  );
}

export default FormSent;
