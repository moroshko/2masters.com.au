// Add <meta name="viewport" content="width=device-width">
const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width";
document.head.append(meta);

// Update document title
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

const ZONE_KEY_REGEX = /^zone_[1-8]$/;

function validateQuery(query) {
  const keys = Object.keys(query);
  const zones = keys.reduce((acc, key) => {
    if (ZONE_KEY_REGEX.test(key)) {
      acc[key] = query[key];
    }

    return acc;
  }, {});

  if (Object.keys(zones).length === 0) {
    return {
      error: "Zones are missing.",
    };
  }

  return {
    zones,
  };
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
  const queryInfo = validateQuery(query);
  console.log({
    queryInfo,
  });
  ReactDOM.render(
    /*#__PURE__*/ React.createElement(App, {
      queryInfo: queryInfo,
    }),
    document.getElementById("root")
  );
})();

function cx(...args) {
  return args
    .reduce((acc, arg) => {
      if (typeof arg === "string") {
        acc.push(arg);
      } else if (typeof arg === "object") {
        for (const key in arg) {
          if (arg[key] === true) {
            acc.push(key);
          }
        }
      }

      return acc;
    }, [])
    .join(" ");
}

const STATUS = {
  WAITING_FOR_SIGNAL: "WAITING_FOR_SIGNAL",
  ON: "ON",
  OFF: "OFF",
};

function Switches({ zones }) {
  const [eventSourceState, setEventSourceState] = React.useState(
    EventSource.CLOSED
  );
  const [switches, setSwitches] = React.useState(() => {
    const initialState = {};

    for (const key in zones) {
      initialState[key] = {
        name: zones[key],
        status: STATUS.WAITING_FOR_SIGNAL,
      };
    }

    return initialState;
  });
  console.log(
    JSON.stringify(
      {
        eventSourceState,
        switches,
      },
      null,
      2
    )
  );
  React.useEffect(() => {
    const eventSource = new EventSource("/events");

    eventSource.onopen = () => {
      setEventSourceState(eventSource.readyState);
      console.log(
        `Connected successfully, readyState = ${eventSource.readyState}`
      );
    };

    eventSource.onerror = () => {
      setEventSourceState(eventSource.readyState);
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

  if (eventSourceState === EventSource.CLOSED) {
    return /*#__PURE__*/ React.createElement(
      "p",
      {
        className: "error",
      },
      "Disconnected"
    );
  }

  return /*#__PURE__*/ React.createElement(
    "ul",
    {
      className: "switches-container",
    },
    Object.keys(switches).map((id) =>
      /*#__PURE__*/ React.createElement(
        "li",
        {
          key: id,
        },
        /*#__PURE__*/ React.createElement(
          "button",
          {
            className: cx("switch-button", {
              "switch-button-on": switches[id].status === STATUS.ON,
              "switch-button-off": switches[id].status === STATUS.OFF,
            }),
            type: "button",
            disabled: switches[id].status === STATUS.WAITING_FOR_SIGNAL,
            onClick: () => {
              fetch(`/switch/${id}/toggle`, {
                method: "POST",
              });
            },
          },
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "switch-name",
            },
            switches[id].name
          ),
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: cx("switch-status", {
                "switch-status-on": switches[id].status === STATUS.ON,
                "switch-status-off": switches[id].status === STATUS.OFF,
              }),
            },
            switches[id].status === STATUS.WAITING_FOR_SIGNAL
              ? "Waiting for signal"
              : switches[id].status === STATUS.ON
              ? "On"
              : switches[id].status === STATUS.OFF
              ? "Off"
              : ""
          )
        )
      )
    )
  );
}

function App({ queryInfo }) {
  if (queryInfo.error) {
    return /*#__PURE__*/ React.createElement(
      "p",
      {
        className: "error",
      },
      queryInfo.error
    );
  }

  return /*#__PURE__*/ React.createElement(Switches, {
    zones: queryInfo.zones,
  });
}
