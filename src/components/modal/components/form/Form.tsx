import React from 'react';
import styles from './Form.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';

import { createPost, editPost } from 'features/post/actions';
import * as rootSlice from 'features/root/rootSlice';

import { Header } from './components/header/Header';
import { Main } from './components/main/Main';

import * as functions from 'functions';

import { Matter, Resource } from 'types/post';
import { User } from 'types/user';
import { Oval } from 'react-loader-spinner';

interface PropType {
  index: 'matters' | 'resources' | 'companys' | 'persons';
  user: User;
  post: Matter | Resource;
  handleClose: () => void;
  edit?: boolean;
}

export const Form: React.FC<PropType> = ({
  index,
  user,
  post,
  handleClose,
  edit,
}) => {
  const dispatch = useDispatch();
  const fetch = useSelector(rootSlice.load).fetch;
  const page = useSelector(rootSlice.page);
  const demo = useSelector(rootSlice.verified)?.demo;

  const methods = useForm<
    functions.form.Data['matter'] & functions.form.Data['resource']
  >({
    defaultValues: functions.form.defaultValues(
      index as 'matters' | 'resources',
      post,
      edit,
    ),
  });

  console.log(methods.watch('handles'));

  const handleCreate: SubmitHandler<
    functions.form.Data['matter'] & functions.form.Data['resource']
  > = (data) => {
    if (index !== 'matters' && index !== 'resources') return;

    if (page !== 'home' && page !== 'search' && page !== 'user') return;

    if (demo) {
      handleClose();

      return;
    }

    const create = (() => {
      switch (index) {
        case 'matters':
          return functions.form.matters(
            data as unknown as functions.form.Data['matter'],
          );

        case 'resources':
          return functions.form.resources(
            data as unknown as functions.form.Data['resource'],
          );

        default:
          return;
      }
    })();

    if (create) dispatch(createPost({ index, page, post: create }));
  };

  const handleEdit: SubmitHandler<
    functions.form.Data['matter'] & functions.form.Data['resource']
  > = (data) => {
    if (index !== 'matters' && index !== 'resources') return;

    if (user.uid !== post.uid) {
      handleClose();

      return;
    }

    const edit = (() => {
      switch (index) {
        case 'matters':
          return {
            ...post,
            ...functions.form.matters(
              data as unknown as functions.form.Data['matter'],
            ),
          };

        case 'resources':
          return {
            ...post,
            ...functions.form.resources(
              data as unknown as functions.form.Data['resource'],
            ),
          };

        default:
          return;
      }
    })();

    if (edit) dispatch(editPost({ index, post: edit }));
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        onSubmit={
          edit
            ? methods.handleSubmit(handleEdit)
            : methods.handleSubmit(handleCreate)
        }>
        <Header edit={edit} fetch={fetch} handleClose={handleClose} />
        <Main index={index as 'matters' | 'resources'} />

        {fetch && (
          <div className={styles.form_fetch}>
            <Oval color="#49b757" height={56} width={56} />
          </div>
        )}
      </form>
    </FormProvider>
  );
};
