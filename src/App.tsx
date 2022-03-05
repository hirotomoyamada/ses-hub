import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { useApp } from "hooks/useApp";

import { Meta } from "Meta";
import * as load from "components/load/Load";

import { Announce } from "components/announce/Announce";
import { Modal } from "components/modal/Modal";
import { Menu } from "components/menu/Menu";

import { Auth } from "pages/auth/Auth";
import { Home } from "pages/home/Home";
import { Search } from "pages/search/Search";
import { List } from "pages/list/List";

import { Page } from "pages/page/Page";

import { Setting } from "pages/setting/Setting";
import { Pay } from "pages/pay/Pay";
import { Account } from "pages/account/Account";
import { HowTo } from "pages/howTo/HowTo";

import { Terms } from "pages/terms/Terms";
import { Asct } from "pages/asct/Asct";

import { NotFound } from "pages/notFound/NotFound";
import { Limit } from "pages/limit/Limit";
import { Success } from "pages/success/Success";
import { Maintenance } from "pages/maintenance/Maintenance";
import { NotSupported } from "pages/notSupported/NotSupported";

import { Promotion } from "pages/promotion/Promotion";
import { Contact } from "pages/contact/Contact";

const App: React.FC = () => {
  const [user, access, support] = useApp();

  switch (support) {
    case true:
      return (
        <HelmetProvider>
          <BrowserRouter>
            <Meta />

            <load.Root />
            <load.Fetch />
            <Announce />
            <NotFound />
            <Limit user={user} />
            <Maintenance />
            <Modal />
            <Menu user={user} />

            {!user?.uid ? (
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
            ) : user?.type !== "individual" &&
              user?.payment?.status === "canceled" ? (
              <Switch>
                <Route exact path="/setting" component={Setting} />

                <Route exact path="/terms" component={Terms} />
                <Route exact path="/asct" component={Asct} />
                <Route exact path="/howto" component={HowTo} />

                <Route exact path="/plan" component={Pay} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/success" component={Success} />

                <Redirect exact path="/" to="/setting" />
                <Redirect exact path="/:others" to="/plan" />

                <Route component={NotFound} />
              </Switch>
            ) : (
              <Switch>
                <Redirect exact path="/login" to="/" />
                <Redirect exact path="/signup" to="/" />

                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/setting" component={Setting} />
                <Route exact path="/account" component={Account} />

                <Route exact path="/terms" component={Terms} />
                <Route exact path="/asct" component={Asct} />
                <Route exact path="/howto" component={HowTo} />

                <Route exact path="/plan" component={Pay} />
                <Route exact path="/success" component={Success} />

                <Route exact path="/:list" component={List} />

                <Route exact path={`/:index/:id`} component={Page} />

                <Route component={NotFound} />
              </Switch>
            )}
          </BrowserRouter>
        </HelmetProvider>
      );
    default:
      return <NotSupported />;
  }
};

export default App;
