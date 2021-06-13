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
  const params = new URLSearchParams(window.location.search);
  const query = Object.fromEntries(params.entries());
  console.log("Query:", query);
  ReactDOM.render(
    /*#__PURE__*/ React.createElement(App, {
      query: query,
    }),
    document.getElementById("root")
  );
})();

const STATUS = {
  WAITING_FOR_SIGNAL: "WAITING_FOR_SIGNAL",
  ON: "ON",
  OFF: "OFF",
};

function App({ query }) {
  const [switches, setSwitches] = React.useState(() => {
    const initialState = {};

    for (const key in query) {
      initialState[key] = {
        name: query[key],
        status: STATUS.WAITING_FOR_SIGNAL,
      };
    }

    return initialState;
  });
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
      const data = JSON.parse(event.data);
      const id = data.id.slice(7);

      if (switches[id]) {
        setSwitches((switches) => ({
          ...switches,
          [id]: {
            ...switches[id],
            status: data.value ? STATUS.ON : STATUS.OFF,
          },
        }));
      } else {
        console.log(`${id} is not defined but sending data:`, data);
      }
    }

    eventSource.addEventListener("state", handleStateMessage);
    return () => {
      eventSource.removeEventListener("state", handleStateMessage);
      eventSource.close();
    };
  }, []);
  return /*#__PURE__*/ React.createElement(
    "ul",
    null,
    Object.keys(switches).map((id) =>
      /*#__PURE__*/ React.createElement(
        "li",
        {
          key: id,
        },
        `${switches[id].name} [${
          switches[id].status === STATUS.WAITING_FOR_SIGNAL
            ? "Waiting for signal"
            : switches[id].status === STATUS.ON
            ? "On"
            : switches[id].status === STATUS.OFF
            ? "Off"
            : ""
        }]`
      )
    )
  );
}
