import { Matter, Resource } from 'types/post';

export type Data = {
  matter: {
    display: 'public' | 'private';
    status: string;
    industry: string;
    position: string;
    body: string;
    period: { year: number; month: number };
    costs: {
      display: 'public' | 'private';
      type: string;
      min: number | null;
      max: number | null;
      contract?: number | null;
    };
    handles: { handle: string }[];
    tools: { tool: string }[];
    note: string;
    memo: string;

    title: string;
    location: { area: string; place: string };
    requires: { require: string }[];
    prefers: { prefer: string }[];
    adjustment: string;
    interviews: { type: string; count: string; setting: string };
    times: { start: string; end: string };
    remote: string;
    distribution: string;
    span: string;
    approval: string;
  };

  resource: {
    display: 'public' | 'private';
    status: string;
    position: string;
    body: string;
    period: { year: number; month: number };
    costs: {
      display: 'public' | 'private';
      type: string;
      min: number | null;
      max: number | null;
      contract?: number | null;
    };
    handles: { handle: string }[];
    tools: { tool: string }[];
    note: string;
    memo: { name: string; tel: string; address: string };

    roman: { firstName: string; lastName: string };
    sex: string;
    age: number;
    station: string;
    belong: string;
    skills: { skill: string }[];
    parallel: string;
  };
};

export const defaultValues = (
  index: 'matters' | 'resources',
  post: Matter | Resource,
  edit: boolean | undefined,
):
  | {
      display: 'public' | 'private' | undefined;
      status: string | undefined;
      title: string | undefined;
      industry: string | undefined;
      position: string | undefined;
      body: string | undefined;
      location: { area: string | undefined; place: string | undefined };
      period: { year: number | undefined; month: number | undefined };
      costs: {
        min: number | undefined;
        max: number | undefined;
        contract: number | undefined;
        display: 'public' | 'private' | undefined;
        type: string | undefined;
      };
      handles: { handle: string | undefined }[];
      tools: { tool: string | undefined }[];
      requires: { require: string | undefined }[];
      prefers: { prefer: string | undefined }[];
      adjustment: string | undefined;
      times: {
        start: string | undefined;
        end: string | undefined;
      };
      interviews: {
        type: string | undefined;
        count: string | undefined;
        setting: string | undefined;
      };
      remote: string | undefined;
      distribution: string | undefined;
      span: string | undefined;
      approval?: string | undefined;
      note: string | undefined;
      memo:
        | string
        | {
            name: string;
            tel: string;
            address: string;
          }
        | undefined;
    }
  | {
      display: 'public' | 'private';
      status: string | undefined;
      roman: {
        firstName: string | undefined;
        lastName: string | undefined;
      };
      position: string | undefined;
      sex: string | undefined;
      age: number | undefined;
      body: string | undefined;
      belong: string | undefined;
      station: string | undefined;
      period: {
        year: number | undefined;
        month: number | undefined;
      };
      costs: {
        display: 'public' | 'private';
        type: string | undefined;
        min: number | undefined;
        max: number | undefined;
        contract: number | undefined;
      };
      handles: { handle: string | undefined }[];
      tools: { tool: string | undefined }[];
      skills: { skill: string | undefined }[];
      parallel: string | undefined;
      note: string | undefined;
      memo:
        | string
        | {
            name: string;
            tel: string;
            address: string;
          }
        | undefined;
    } => {
  switch (index) {
    case 'matters':
      return {
        display: edit ? (post.display as 'public' | 'private') : 'public',
        status: edit ? post.status : '新規',
        position: edit ? post.position : undefined,
        body: edit ? post.body : undefined,
        period: edit ? post.period : { year: undefined, month: undefined },
        costs: {
          min: edit && post.costs.min ? post.costs.min : undefined,
          max: edit && post.costs.max ? post.costs.max : undefined,
          contract:
            edit && post.costs.contract ? post.costs.contract : undefined,
          display: edit ? post.costs.display : 'public',
          type: edit ? post.costs.type : 'スキル見合',
        },
        handles:
          edit && post.handles?.[0]
            ? post.handles.map((value) => ({
                handle: value,
              }))
            : [
                { handle: undefined },
                { handle: undefined },
                { handle: undefined },
              ],
        tools:
          edit && post.tools?.[0]
            ? post.tools.map((value) => ({
                tool: value,
              }))
            : [{ tool: undefined }, { tool: undefined }, { tool: undefined }],
        note: edit ? post.note : undefined,
        memo: edit ? post.memo : undefined,

        // matters
        industry: edit ? (post as Matter).industry : undefined,
        title: edit ? (post as Matter).title : undefined,
        location: edit
          ? (post as Matter).location
          : { area: undefined, place: undefined },
        requires:
          edit && (post as Matter).requires?.[0]
            ? (post as Matter).requires.map((value) => ({
                require: value,
              }))
            : [
                { require: undefined },
                { require: undefined },
                { require: undefined },
              ],
        prefers:
          edit && (post as Matter).prefers?.[0]
            ? (post as Matter).prefers.map((value) => ({
                prefer: value,
              }))
            : [
                { prefer: undefined },
                { prefer: undefined },
                { prefer: undefined },
              ],
        adjustment: edit ? (post as Matter).adjustment : '140h 〜 180h',
        interviews: edit
          ? (post as Matter).interviews
          : { type: undefined, count: undefined, setting: undefined },
        times: edit ? (post as Matter).times : { start: '10:00', end: '19:00' },
        remote: edit ? (post as Matter).remote : 'あり',
        distribution: edit ? (post as Matter).distribution : 'プライム',
        span: edit ? (post as Matter).span : '30',
        approval: edit
          ? (post as Matter).approval
            ? (post as Matter).approval
            : '不明'
          : '不明',
      };
    case 'resources':
      return {
        display: edit ? (post.display as 'public' | 'private') : 'public',
        status: edit ? post.status : '新規',
        position: edit ? post.position : undefined,
        body: edit ? post.body : undefined,
        period: edit ? post.period : { year: undefined, month: undefined },
        costs: {
          min: edit && post.costs.min ? post.costs.min : undefined,
          max: edit && post.costs.max ? post.costs.max : undefined,
          contract:
            edit && post.costs.contract ? post.costs.contract : undefined,
          display: edit ? post.costs.display : 'public',
          type: edit ? post.costs.type : '応談',
        },
        handles:
          edit && post.handles?.[0]
            ? post.handles.map((value) => ({
                handle: value,
              }))
            : [
                { handle: undefined },
                { handle: undefined },
                { handle: undefined },
              ],
        tools:
          edit && post.tools?.[0]
            ? post.tools.map((value) => ({
                tool: value,
              }))
            : [{ tool: undefined }, { tool: undefined }, { tool: undefined }],
        note: edit ? post.note : undefined,
        memo: edit ? post.memo : undefined,

        roman: edit
          ? (post as Resource).roman
          : { firstName: undefined, lastName: undefined },
        sex: edit ? (post as Resource).sex : '男性',
        age: edit ? (post as Resource).age : 18,
        belong: edit ? (post as Resource).belong : undefined,
        station: edit ? (post as Resource).station : undefined,
        skills:
          edit && (post as Resource).skills?.[0]
            ? (post as Resource).skills.map((value) => ({
                skill: value,
              }))
            : [
                { skill: undefined },
                { skill: undefined },
                { skill: undefined },
              ],
        parallel: edit ? (post as Resource).parallel : 'なし',
      };
  }
};

export const matters = (
  data: Data['matter'],
): {
  display: 'public' | 'private';
  title: string;
  industry: string;
  position: string;
  body: string;
  location: {
    area: string;
    place: string;
  };
  period: {
    year: number;
    month: number;
  };
  costs: {
    display: 'public' | 'private';
    type: string;
    min?: number | null;
    max?: number | null;
    contract?: number | null;
  };
  adjustment: string;
  times: { start: string; end: string };
  handles: string[];
  tools: string[];
  requires: string[];
  prefers: string[];
  interviews: { type: string; count: string; setting: string };
  remote: string;
  distribution: string;
  span: string;
  approval: string;
  note: string;
  status: string;
  memo: string;
} => {
  return {
    display: data.display,
    title: data.title,
    industry: data.industry,
    position: data.position,
    body: data.body,
    location: data.location,
    period: {
      year: Number(data.period.year),
      month: Number(data.period.month),
    },
    costs: {
      min: data.costs.min ? Number(data.costs.min) : null,
      max: data.costs.max ? Number(data.costs.max) : null,
      contract: data.costs.contract ? Number(data.costs.contract) : null,
      display: data.costs.display,
      type: data.costs.type,
    },
    adjustment: data.adjustment,
    times: data.times,
    handles: data.handles
      .filter((array) => array.handle)
      .map((array) => array.handle),
    tools: data.tools.filter((array) => array.tool).map((array) => array.tool),
    requires: data.requires
      .filter((array) => array.require)
      .map((array) => array.require),
    prefers: data.prefers
      .filter((array) => array.prefer)
      .map((array) => array.prefer),
    interviews: data.interviews,
    remote: data.remote,
    distribution: data.distribution,
    span: data.span,
    approval: data.approval,
    note: data.note,
    status: data.status,
    memo: data.memo,
  };
};

export const resources = (
  data: Data['resource'],
): {
  display: 'public' | 'private';
  roman: {
    firstName: string;
    lastName: string;
  };
  sex: string;
  age: number;
  body: string;
  belong: string;
  station: string;
  period: {
    year: number;
    month: number;
  };
  costs: {
    display: 'public' | 'private';
    type: string;
    min?: number | null;
    max?: number | null;
    contract?: number | null;
  };
  position: string;
  handles: string[];
  tools: string[];
  skills: string[];
  parallel: string;
  note: string;
  status: string;
  memo: { name: string; tel: string; address: string };
} => {
  return {
    display: data.display,
    roman: data.roman,
    sex: data.sex,
    age: Number(data.age),
    body: data.body,
    belong: data.belong,
    station: data.station,
    period: {
      year: Number(data.period.year),
      month: Number(data.period.month),
    },
    costs: {
      min: data.costs.min ? Number(data.costs.min) : null,
      max: data.costs.max ? Number(data.costs.max) : null,
      contract: data.costs.contract ? Number(data.costs.contract) : null,
      display: data.costs.display,
      type: data.costs.type,
    },
    position: data.position,
    handles: data.handles
      .filter((array) => array.handle)
      .map((array) => array.handle),
    tools: data.tools.filter((array) => array.tool).map((array) => array.tool),
    skills: data.skills
      .filter((array) => array.skill)
      .map((array) => array.skill),
    parallel: data.parallel,
    note: data.note,
    status: data.status,
    memo: data.memo,
  };
};
