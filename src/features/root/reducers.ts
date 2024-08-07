import { PayloadAction } from '@reduxjs/toolkit';
import { functions } from 'libs/firebase';
import { httpsCallable, HttpsCallable } from 'firebase/functions';

import { State, Search, Sort, Announce, Modal, Load } from 'features/root/initialState';
import { Login } from 'features/user/actions';
import { Setting, User } from 'types/user';

export const index = (
  state: State,
  action: PayloadAction<'matters' | 'resources' | 'companys' | 'persons'>,
): void => {
  state.index = action.payload;

  if (state.page !== 'post') {
    state.search.value = '';
    state.search.target = '';
    state.search.type = '';
    state.search.control = false;
  }
};

export const page = (state: State, action: PayloadAction<string>): void => {
  state.page = action.payload;
};

export const verified = (state: State, action?: PayloadAction<Login['data']>): void => {
  if (action?.payload) {
    if (action.payload.user) {
      state.verified.status = 'enable';
      state.verified.payment = action.payload.user.payment.status;

      if (!action.payload.user.profile?.person) {
        state.modal.type = 'profile';
        state.modal.open = true;
      }

      // if (
      //   action.payload.user.type === 'individual' &&
      //   action.payload.user.payment.status === 'canceled' &&
      //   action.payload.user.payment.notice
      // ) {
      //   state.modal.type = 'advertise';
      //   state.modal.meta = { type: 'active' };
      //   state.modal.open = true;
      // }

      if (action.payload.user.remind === 'enable') {
        state.verified.remind = true;
        state.modal.type = 'remind';
        state.modal.open = true;
      }

      if (action.payload.user.agree === 'disable') {
        state.verified.agree = true;
        state.modal.type = 'agree';
        state.modal.open = true;
      }

      if (action.payload.demo) {
        state.verified.demo = action.payload.demo;
        state.modal.type = 'demo';
        state.modal.open = true;
      }
    }

    state.data = action.payload.data;
    state.setting = action.payload.user.setting;
  } else {
    state.verified = {
      index: false,
      email: false,
      profile: false,
      agree: false,
      remind: false,
      status: 'promo',
      access: false,
      demo: false,
      error: undefined,
      payment: undefined,
    };
  }

  state.load.root = false;
};

export const agree = (state: State, action: PayloadAction<User>): void => {
  state.verified.agree = false;

  if (action.payload.profile?.person) {
    state.modal.open = false;
  } else {
    state.modal.type = 'profile';
  }

  const enableAgree: HttpsCallable = httpsCallable(functions, 'sh-enableAgree');

  void enableAgree().then(() => {
    window.location.reload();
  });
};

export const remind = (state: State): void => {
  state.verified.remind = false;
  state.modal.open = false;

  const disableRemind: HttpsCallable = httpsCallable(functions, 'sh-disableRemind');

  void disableRemind();
};

export const announce = (state: State, action: PayloadAction<Announce | undefined>): void => {
  if (action.payload?.success || action.payload?.error) {
    state.announce.success = action.payload.success;
    state.announce.error = action.payload.error;
  } else {
    state.announce = {
      success: undefined,
      error: undefined,
    };
  }
};

export const search = (state: State, action?: PayloadAction<Search | undefined>): void => {
  if (!action?.payload) {
    state.search.value = undefined;
    state.search.control = false;
  }

  if (action?.payload?.target) {
    state.search.target = action.payload.target;
    state.search.control = false;
  }

  if (action?.payload?.type) {
    state.search.type = action.payload.type;
    state.search.control = false;
  }

  if (action?.payload?.value) {
    state.search.value = action.payload.value;
    state.search.control = false;
  }

  if (action?.payload?.control) {
    state.search.control = action.payload.control;
  }
};

export const sort = (
  state: State,
  action: PayloadAction<Pick<Sort, 'display' | 'status'>>,
): void => {
  state.sort.status = action.payload.status
    ? action.payload.status !== 'reset'
      ? action.payload.status
      : ''
    : state.sort.status;

  state.sort.display = action.payload.display
    ? action.payload.display !== 'reset'
      ? action.payload.display
      : ''
    : state.sort.display;

  state.sort.control = true;
};

export const notFound = (state: State, action: PayloadAction<boolean>): void => {
  state.notFound = action.payload;
  state.load.root = false;
};

// export const limit = (state: State, action: PayloadAction<boolean>): void => {
//   state.limit = action.payload;
//   state.load.root = false;
// };

export const modal = (state: State, action?: PayloadAction<Modal | undefined>): void => {
  if (action?.payload) {
    state.modal.type = action.payload.type;
    state.modal.text = action.payload.text;
    state.modal.meta = action.payload.meta;
    state.modal.close = action.payload.close;
    state.modal.delete = action.payload.delete;
    state.modal.next = action.payload.next;
    state.modal.open = true;
  } else {
    state.modal.type = undefined;
    state.modal.text = undefined;
    state.modal.meta = undefined;
    state.modal.close = undefined;
    state.modal.delete = undefined;
    state.modal.next = undefined;
    state.modal.open = false;
  }
};

export const load = (state: State, action?: PayloadAction<Partial<Load> | undefined>): void => {
  if (action?.payload) {
    state.load = Object.assign(
      {
        root: false,
        pend: false,
        fetch: false,
        create: false,
      },
      action.payload,
    );
  } else {
    state.load = {
      root: false,
      pend: false,
      fetch: false,
      create: false,
    };
  }
};

export const setting = (
  state: State,
  action: PayloadAction<(Setting['analytics'] & { type: 'analytics' }) | undefined>,
): void => {
  if (action.payload) {
    const { type, ...payload } = action.payload;

    if (state.setting) {
      Object.assign(state.setting, { [type]: payload });
    } else {
      state.setting = { [type]: payload };
    }

    const updateSetting: HttpsCallable<
      {
        type: string;
        setting: Setting['analytics'];
      },
      unknown
    > = httpsCallable(functions, 'sh-updateSetting');

    void updateSetting({ type: type, setting: payload });
  } else {
    state.setting = undefined;
  }
};
