import { useState, useRef, ChangeEvent, FormEvent } from "react";
import emailjs from "@emailjs/browser";

import "./FormEmail.scss";

interface FormData {
  [key: string]: string;
  user_name: string;
  user_email: string;
  subject: string;
  message: string;
}

const FormEmail = () => {
  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await emailjs.send(
        "service_byqzsee",
        "template_s7ajl0r",
        formData,
        "dqcPHtDQ9mI-hn9yU"
      );

      console.log(result.text);
      if (form.current) {
        form.current.reset();
      }
    } catch (error: any) {
      console.log(error.text);
    }
  };

  return (
    <section className="formsent">
      <h2>Form Sent Emaile</h2>
      <form ref={form} onSubmit={sendEmail}>
        <input
          type="text"
          className="name"
          name="user_name"
          placeholder="FullName"
          value={formData.user_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          value={formData.user_email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="send-form">
          Sent
        </button>
        <div className="status"></div>
      </form>
    </section>
  );
};

export default FormEmail;
