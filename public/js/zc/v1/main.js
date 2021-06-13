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

// Add app code
script = document.createElement("script");
script.innerHTML = `
  const app = React.createElement(
    "div",
    "Hello World",
  );

  ReactDOM.render(app, document.getElementById("root"));
`;
document.body.append(script);
