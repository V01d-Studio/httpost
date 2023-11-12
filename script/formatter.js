function toggleDarkMode() {
  const container = document.querySelector(".container");
  container.classList.toggle("dark-mode");
  const jsonOutput = document.getElementById("response");
  jsonOutput.classList.remove("json-highlight");
  highlightJSON(jsonOutput);
}

function highlightJSON(element) {
  try {
    const parsedJSON = JSON.parse(element.textContent);
    element.innerHTML = syntaxHighlight(parsedJSON);
    element.classList.add("json-highlight");
  } catch (error) {
    element.classList.remove("json-highlight");
  }
}

function syntaxHighlight(json) {
  if (typeof json !== "string") {
    json = JSON.stringify(json, undefined, 2);
  }

  json = json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );

  return json;
}
