function makeRequest() {
  const method = document.getElementById("method").value;
  const url = document.getElementById("url").value;
  const body = document.getElementById("body").value;
  const headersInput = document.getElementById("headers").value;

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
      ...headers,
    },
    body: method === "GET" ? undefined : body,
  })
    .then((response) => response.json())
    .then((data) => {
      const responseElement = document.getElementById("response");
      responseElement.textContent = JSON.stringify(data, null, 2);
      highlightJSON(responseElement);
    })
    .catch((error) => {
      const responseElement = document.getElementById("response");
      responseElement.textContent = "Error: " + error.message;
      responseElement.classList.remove("json-highlight");
    });
}