// Example JavaScript code to call the /api/send-email endpoint
export const sendEmail = async (data) => {
  const apiUrl = 'https://portfolio-alaa.onrender.com//api/send-email'; // Replace with your server URL if deployed
  const emailData = {
    name: data.name,
    email: data.email,
    message: data.message
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Email sent successfully:', result);
    } else {
      console.error('Failed to send email:', result);
    }
  } catch (error) {
    console.error('Error calling the API:', error);
  }
};

// Call the function
