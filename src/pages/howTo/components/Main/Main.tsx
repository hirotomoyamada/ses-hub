import React from 'react';
// import { Home } from './Home';
import { Search } from './Search';
import { Likes } from './Likes';
import { Outputs } from './Outputs';
import { Entries } from './Entries';
import { Posts } from './Posts';
import { Requests } from './Requests';
import { Account } from './Account';
import { Plan } from './Plan';
import { Activity } from './Activity';
import { Analytics } from './Analytics';
import { Matching } from './Matching';
import { History } from './History';

interface PropType {
  page: string;
  type: string;
}

export const Main: React.FC<PropType> = ({ page, type }) => {
  switch (page) {
    default:
      //   return <Home />;
      return <Search />;
    case 'search':
      return <Search />;
    case 'likes':
      return <Likes />;
    case 'outputs':
      return <Outputs />;
    case 'entries':
      return <Entries />;
    case 'history':
      return <History />;
    case 'posts':
      return <Posts />;
    case 'matching':
      return <Matching />;
    case 'plan':
      return <Plan type={type} />;
    case 'requests':
      return <Requests />;
    case 'activity':
      return <Activity />;
    case 'analytics':
      return <Analytics />;
    case 'account':
      return <Account type={type} />;
  }
};
