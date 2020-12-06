import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary";
import Loading from "./Components/Loading/Loading";
import NavBar from "./Components/navBar";
import useEventSource from "./helpers/eventSourceHook";

const NotFound = lazy(() => import("./Components/NotFound"));
const MainPage = lazy(() => import("./AppPages/mainPage"));
const AlertsPage = lazy(() => import("./AppPages/alertsPage"));

function App() {
  const [notifications, setNotifications] = useState([]);
  const data = useEventSource("http://localhost:8000/notifications");
  useEffect(() => {
    if (data) {
      setNotifications((prev) => [...prev, data]);
    }
  }, [data]);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary>
            <NavBar
              notificationsData={notifications}
              setNotifications={setNotifications}
            />
            <Switch>
              <Route exact path="/alerts">
                <AlertsPage notifications={data} />
              </Route>
              <Route exact path="/">
                <MainPage notifications={data} />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
