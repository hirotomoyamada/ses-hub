import styles from './Profile.module.scss';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import { Header } from './components/header/Header';
import { Cover } from './components/cover/Cover';
import { Icon } from './components/icon/Icon';
import { Form } from './components/form/Form';
import { Line } from './components/line/Line';

import { Company as SelectUser } from 'types/post';
import { User } from 'types/user';
import { editProfile } from 'features/user/actions';
import { Oval } from 'react-loader-spinner';
import * as rootSlice from 'features/root/rootSlice';

interface PropType {
  user: User | SelectUser;
  handleClose: () => void;
}

export type Data = {
  name: string;
  person: string;
  icon: string;
  cover: string;
  body: string | null;
  invoice: { type: string; no: string };
  more: string[];
  region: string[];
  postal: string | null;
  address: string | null;
  tel: string | null;
  url: string | null;
  social: {
    line: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedIn: string | null;
  };
  uid?: string;
};

export const Profile: React.FC<PropType> = ({ user, handleClose }) => {
  const dispatch = useDispatch();
  const fetch = useSelector(rootSlice.load).fetch;
  const [cover, setCover] = useState(false);
  const [icon, setIcon] = useState(false);
  const [line, setLine] = useState(false);

  const methods = useForm<Data>({
    defaultValues: {
      name: user?.profile?.name,
      person:
        user?.profile?.person !== '名無しさん' && user?.profile?.person
          ? user.profile.person
          : undefined,
      icon: user?.icon,
      cover: user?.cover,
      body: user?.profile?.body,
      invoice: user?.profile?.invoice ?? { type: undefined, no: undefined },
      more: user?.profile?.more,
      region: user?.profile?.region,
      postal: user?.profile?.postal,
      address: user?.profile?.address,
      tel: user?.profile?.tel,
      url: user?.profile?.url,
      social: user?.profile?.social,
    },
  });

  const handleBack = () => {
    setCover(false);
    setIcon(false);
    setLine(false);
  };

  const handleEdit: SubmitHandler<Data> = (data) => {
    data.uid = user.uid;

    if (!data.invoice.type) {
      methods.setError('invoice.type', {
        type: 'required',
        message: '適格請求書発行事業者を選択してください',
      });

      return;
    }

    if (data.invoice.type === '登録済み' && !data.invoice.no) {
      methods.setError('invoice.no', {
        type: 'required',
        message: '適格請求書発行事業者の登録番号を入力してください',
      });

      return;
    }

    dispatch(editProfile(data));
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.profile}
        onSubmit={methods.handleSubmit(handleEdit)}>
        <Header
          user={user}
          fetch={fetch}
          handleClose={handleClose}
          handleBack={handleBack}
          cover={cover}
          icon={icon}
          line={line}
        />
        {(() => {
          switch (true) {
            case line:
              return <Line />;

            case cover:
              return <Cover />;

            case icon:
              return <Icon />;

            default:
              return (
                <Form
                  cover={cover}
                  icon={icon}
                  setCover={setCover}
                  setIcon={setIcon}
                  setLine={setLine}
                />
              );
          }
        })()}

        {fetch && (
          <div className={styles.profile_fetch}>
            <Oval color="#49b757" height={56} width={56} />
          </div>
        )}
      </form>
    </FormProvider>
  );
};
