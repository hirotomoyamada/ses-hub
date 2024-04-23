import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Matter, Resource } from 'types/post';

interface PropType {
  index: 'matters' | 'resources';
  post: Matter | Resource;
}

export const Meta: React.FC<PropType> = ({ index, post }) => {
  return (
    <Helmet>
      {index === 'matters' ? (
        <title>
          {(post as Matter)?.title ? `${(post as Matter).title}｜SES_HUB` : 'SES_HUB｜営業支援App'}
        </title>
      ) : index === 'resources' ? (
        <title>
          {(post as Resource)?.roman?.firstName && (post as Resource)?.roman?.lastName
            ? `${(post as Resource).roman.firstName.slice(0, 1)} . ${(
                post as Resource
              ).roman.lastName.slice(0, 1)}｜SES_HUB`
            : 'SES_HUB｜営業支援App'}
        </title>
      ) : (
        <title>{'SES_HUB｜営業支援App'}</title>
      )}
    </Helmet>
  );
};
