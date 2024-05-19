import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { useApp } from 'hooks/useApp';

import { Meta } from 'Meta';
import * as load from 'components/load/Load';

import { Announce } from 'components/announce/Announce';
import { Modal } from 'components/modal/Modal';
import { Menu } from 'components/menu/Menu';

import { Auth } from 'pages/auth/Auth';
// import { Home } from 'pages/home/Home';
import { Search } from 'pages/search/Search';
import { List } from 'pages/list/List';
import { History } from 'pages/history/History';

import { Setting } from 'pages/setting/Setting';
import { Pay } from 'pages/pay/Pay';
import { Account } from 'pages/account/Account';
import { HowTo } from 'pages/howTo/HowTo';

import { Terms } from 'pages/terms/Terms';
import { Asct } from 'pages/asct/Asct';

import { NotFound } from 'pages/notFound/NotFound';
// import { Limit } from 'pages/limit/Limit';
import { Success } from 'pages/success/Success';
import { Maintenance } from 'pages/maintenance/Maintenance';
import { NotSupported } from 'pages/notSupported/NotSupported';

import { Promotion } from 'pages/promotion/Promotion';
import { Contact } from 'pages/contact/Contact';
import { User } from 'pages/user/User';
import { Post } from 'pages/post/Post';

export const App: React.FC = () => {
  const [user, access, support] = useApp();

  switch (support) {
    case true:
      return (
        <HelmetProvider>
          <BrowserRouter>
            <Meta />

            <load.Root />
            <load.Pending />
            <Announce />
            <NotFound />
            {/* <Limit user={user} /> */}
            <Maintenance />
            <Modal />
            <Menu user={user} />

            {(() => {
              switch (true) {
                case !user?.uid:
                  return (
                    <Routes>
                      <Route index element={<Promotion />} />
                      <Route path='/login' element={<Auth />} />
                      <Route path='/signup' element={<Auth />} />

                      <Route path='/contact' element={<Contact />} />
                      <Route path='/terms' element={<Terms />} />
                      <Route path='/asct' element={<Asct />} />

                      {!access ? (
                        <Route path='*' element={<Navigate to='/login' replace />} />
                      ) : (
                        <Route path='*' element={<></>} />
                      )}
                    </Routes>
                  );

                case user?.type !== 'individual' && user?.payment?.status === 'canceled':
                  return (
                    <Routes>
                      <Route index element={<Navigate to='/setting' replace />} />
                      <Route path='/setting' element={<Setting />} />

                      <Route path='/terms' element={<Terms />} />
                      <Route path='/asct' element={<Asct />} />
                      <Route path='/howto' element={<HowTo />} />

                      <Route path='/plan' element={<Pay />} />
                      <Route path='/account' element={<Account />} />
                      <Route path='/success' element={<Success />} />

                      <Route path='*' element={<Navigate to='/plan' replace />} />
                    </Routes>
                  );

                default:
                  return (
                    <Routes>
                      <Route path='/login' element={<Navigate to='/' replace />} />
                      <Route path='/signup' element={<Navigate to='/' replace />} />

                      <Route index element={<Search />} />
                      {/* <Route path="/home" element={<Home />} />
                      <Route path="/home/:index" element={<Home />} /> */}
                      <Route path='/search' element={<Search />} />
                      <Route path='/search/:index' element={<Search />} />
                      <Route path='/setting' element={<Setting />} />
                      <Route path='/account' element={<Account />} />

                      <Route path='/terms' element={<Terms />} />
                      <Route path='/asct' element={<Asct />} />
                      <Route path='/howto' element={<HowTo />} />

                      <Route path='/plan' element={<Pay />} />
                      <Route path='/success' element={<Success />} />

                      <Route path='/companys/:uid' element={<User index='companys' />} />
                      <Route path='/persons/:uid' element={<User index='persons' />} />
                      <Route path='/matters/:objectID' element={<Post index='matters' />} />
                      <Route path='/resources/:objectID' element={<Post index='resources' />} />

                      <Route path='/:list' element={<List />} />
                      <Route path='/:list/:index' element={<List />} />
                      <Route path='/history/:index' element={<History />} />

                      <Route path='*' element={<NotFound />} />
                    </Routes>
                  );
              }
            })()}
          </BrowserRouter>
        </HelmetProvider>
      );

    default:
      return <NotSupported />;
  }
};
