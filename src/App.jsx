import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { Meta } from "./Meta";
import * as load from "./components/load/Load";
import { Announce } from "./components/announce/Announce";
import { Modal } from "./components/modal/Modal";
import { Menu } from "./components/menu/Menu";

import { Home } from "./Home";
import { Search } from "./Search";
import { Page } from "./Page";

import { Pay } from "./features/pay/Pay";

import { Auth } from "./pages/auth/Auth";
import { List } from "./pages/list/List";
import { Setting } from "./pages/setting/Setting";
import { Terms } from "./pages/terms/Terms";
import { Asct } from "./pages/asct/Asct";
import { HowTo } from "./pages/howTo/HowTo";
import { Success } from "./pages/success/Success";
import { NotFound } from "./pages/notFound/NotFound";
import { Maintenance } from "./pages/maintenance/Maintenance";
import { Contact } from "./pages/contact/Contact";

import { Promotion } from "./promotion/Promotion";

import { useApp } from "./hook/useApp";

const App = () => {
  const [user, access, notFound, browser] = useApp();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Meta />

        {notFound ? (
          <NotFound />
        ) : browser ? (
          <>
            <load.Root />
            <load.Fetch />

            <Announce />
            <Modal />
            <Maintenance />
            <Menu user={user} />

            {!user.uid ? (
              <Switch>
                <Route exact path="/" component={Promotion} />
                <Route exact path="/login" component={Auth} />
                <Route exact path="/signup" component={Auth} />

                <Route exact path="/contact" component={Contact} />
                <Route exact path="/terms" component={Terms} />
                <Route exact path="/asct" component={Asct} />

                {!access && (
                  <>
                    <Redirect path="/home" to="/login" />
                    <Redirect path="/search" to="/login" />
                    <Redirect path="/post" to="/login" />
                    <Redirect path="/user" to="/login" />
                    <Redirect path="/setting" to="/login" />
                    <Redirect path="/plan" to="/login" />
                    <Redirect path="/success" to="/login" />
                    <Redirect path="/howto" to="/login" />
                    <Route component={NotFound} />
                  </>
                )}
              </Switch>
            ) : (
              <Switch>
                <Redirect exact path="/login" to="/" />
                <Redirect exact path="/signup" to="/" />

                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/setting" component={Setting} />

                <Route exact path="/terms" component={Terms} />
                <Route exact path="/asct" component={Asct} />

                <Route exact path="/plan" component={Pay} />
                <Route exact path="/success" component={Success} />

                <Route exact path="/howto" component={HowTo} />

                <Route exact path="/:list" component={List} />

                <Route exact path="/:index/:id" component={Page} />

                <Route component={NotFound} />
              </Switch>
            )}
          </>
        ) : (
          <div className="disable">
            <p>このアプリは Internet Explorer に対応しておりません</p>
          </div>
        )}
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
