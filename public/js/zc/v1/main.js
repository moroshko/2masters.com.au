document.title = "Zones Controller";

// Delete existing HTML
document
  .querySelectorAll("article > :not(script)")
  .forEach((el) => el.remove());

// Add React root element
const div = document.createElement("div");
div.id = "root";
document.body.append(div);

// Add code below
//
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    script.crossOrigin = "anonymous";
    document.body.append(script);
  });
}

(async () => {
  await Promise.all([
    loadScript("https://unpkg.com/react@17.0.2/umd/react.production.min.js"),
    loadScript(
      "https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"
    ),
  ]);
  ReactDOM.render(
    /*#__PURE__*/ React.createElement(App, null),
    document.getElementById("root")
  );
})();

function App() {
  React.useEffect(() => {
    const eventSource = new EventSource("/events");

    eventSource.onopen = () => {
      console.log(
        `Connected successfully, readyState = ${eventSource.readyState}`
      );
    };

    eventSource.onerror = () => {
      console.log(`Failed to connect, readyState = ${eventSource.readyState}`);
    };

    function handleStateMessage(event) {
      console.log(event, event.data);
    }

    eventSource.addEventListener("state", handleStateMessage);
    return () => {
      eventSource.removeEventListener("state", handleStateMessage);
      eventSource.close();
    };
  }, []);
  return /*#__PURE__*/ React.createElement("p", null, "Hello world");
}
