document.title = "Zones Controller";

// Delete existing HTML
document
  .querySelectorAll("article > :not(script)")
  .forEach((el) => el.remove());

// Add React root element
const div = document.createElement("div");
div.id = "root";

document.body.append(div);

// Add React
let script = document.createElement("script");
script.src = "https://unpkg.com/react@17.0.2/umd/react.production.min.js";
script.crossOrigin = "anonymous";
document.body.append(script);
// Add ReactDOM
script = document.createElement("script");
script.src =
  "https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js";
script.crossOrigin = "anonymous";
document.body.append(script);
// Add dataformsjs
script = document.createElement("script");
script.src =
  "https://cdn.jsdelivr.net/npm/dataformsjs@5.9.0/js/react/jsxLoader.min.js";
document.body.append(script);

// Add app code
script = document.createElement("script");
script.type = "text/babel";
script.innerHTML = `
  function App() {
    return (
      <h1>Hello World!</h1>
    )
  }

  ReactDOM.render(<App />, document.getElementById("root"));
`;
document.body.append(script);
