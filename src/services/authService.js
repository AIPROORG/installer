const sendUserInfoToBackend = async (userInfo) => {
  try {
    const response = await fetch(
      "https://django-rest-starter-production-e568.up.railway.app/api/auth/google/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userInfo),
      }
    );

    const data = await response.json();
    console.log("Data from backend", data);
    console.log("Response from backend", response);
    if (response.ok) {
      return data;
    } else {
      console.error("Error from backend", data);
      throw new Error(data.error || "Error sending data to backend");
    }
  } catch (error) {
    console.error("Error in sendUserInfoToBackend", error);
    throw error;
  }
};

export default sendUserInfoToBackend;
