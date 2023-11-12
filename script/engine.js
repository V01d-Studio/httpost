function makeRequest() {
  const method = document.getElementById("method").value;
  const url = document.getElementById("url").value;
  const body = document.getElementById("body").value;
  const headersInput = document.getElementById("headers").value;

  // Parse headers input into key-value pairs
  const headers = {};
  headersInput.split(",").forEach((header) => {
    const [key, value] = header.split(":");
    if (key && value) {
      headers[key.trim()] = value.trim();
    }
  });

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...headers, // Include custom headers
    },
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("response").textContent = JSON.stringify(
        data,
        null,
        2
      );
    })
    .catch((error) => {
      document.getElementById("response").textContent =
        "Error: " + error.message;
    });
}
