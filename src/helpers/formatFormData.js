function formatFormData(formData) {
  const labels = {
    description: "Питання:",
  };

  let formattedData = "";

  for (const key in formData) {
    if (formData[key]) {
      formattedData += `${labels[key]} ${formData[key]}\n`;
    }
  }

  return formattedData;
}

export default formatFormData;
