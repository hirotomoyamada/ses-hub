import * as functions from "firebase-functions";
import * as Algolia from "../../types/algolia";
import { NestedPartial } from "../../types/utils";

export const matter = ({
  post,
  context,
  edit,
}: {
  post: NestedPartial<Algolia.Matter>;
  context: functions.https.CallableContext;
  edit?: boolean;
}): NestedPartial<Algolia.Matter> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = Date.now();

  if (!edit) {
    return {
      display: post.display,
      title: post.title,
      position: post.position,
      body: post.body,
      location: post.location,
      period: {
        year: Number(post.period?.year),
        month: Number(post.period?.month),
      },
      costs: {
        min: post.costs?.min ? Number(post.costs?.min) : null,
        max: post.costs?.max ? Number(post.costs?.max) : null,
        contract: post.costs?.contract ? Number(post.costs?.contract) : null,
        display: post.costs?.display,
        type: post.costs?.type,
      },
      adjustment: post.adjustment,
      times: post.times,
      handles: post.handles,
      tools: post.tools,
      requires: post.requires,
      prefers: post.prefers,
      interviews: post.interviews,
      remote: post.remote,
      distribution: post.distribution,
      span: post.span,
      approval: post.approval,
      note: post.note,
      status: post.status,
      memo: post.memo,
      uid: context.auth.uid,
      createAt: timestamp,
    };
  } else {
    return {
      display: post.display,
      title: post.title,
      position: post.position,
      body: post.body,
      location: post.location,
      period: {
        year: Number(post.period?.year),
        month: Number(post.period?.month),
      },
      costs: {
        min: post.costs?.min ? Number(post.costs?.min) : null,
        max: post.costs?.max ? Number(post.costs?.max) : null,
        contract: post.costs?.contract ? Number(post.costs?.contract) : null,
        display: post.costs?.display,
        type: post.costs?.type,
      },
      adjustment: post.adjustment,
      times: post.times,
      handles: post.handles,
      tools: post.tools,
      requires: post.requires,
      prefers: post.prefers,
      interviews: post.interviews,
      remote: post.remote,
      distribution: post.distribution,
      span: post.span,
      approval: post.approval,
      note: post.note,
      status: post.status,
      memo: post.memo,
      uid: context.auth.uid,
      objectID: post.objectID,
      updateAt: timestamp,
    };
  }
};

export const resource = ({
  post,
  context,
  edit,
}: {
  post: NestedPartial<Algolia.Resource>;
  context: functions.https.CallableContext;
  edit?: boolean;
}): NestedPartial<Algolia.Resource> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = Date.now();

  if (!edit) {
    return {
      display: post.display,
      roman: post.roman,
      position: post.position,
      sex: post.sex,
      age: Number(post.age),
      body: post.body,
      belong: post.belong,
      station: post.station,
      period: {
        year: Number(post.period?.year),
        month: Number(post.period?.month),
      },
      costs: {
        min: post.costs?.min ? Number(post.costs?.min) : null,
        max: post.costs?.max ? Number(post.costs?.max) : null,
        contract: post.costs?.contract ? Number(post.costs?.contract) : null,
        display: post.costs?.display,
        type: post.costs?.type,
      },
      handles: post.handles,
      tools: post.tools,
      skills: post.skills,
      parallel: post.parallel,
      note: post.note,
      status: post.status,
      memo: post.memo,
      uid: context.auth.uid,
      createAt: timestamp,
    };
  } else {
    return {
      display: post.display,
      roman: post.roman,
      position: post.position,
      sex: post.sex,
      age: Number(post.age),
      body: post.body,
      belong: post.belong,
      station: post.station,
      period: {
        year: Number(post.period?.year),
        month: Number(post.period?.month),
      },
      costs: {
        min: post.costs?.min ? Number(post.costs?.min) : null,
        max: post.costs?.max ? Number(post.costs?.max) : null,
        contract: post.costs?.contract ? Number(post.costs?.contract) : null,
        display: post.costs?.display,
        type: post.costs?.type,
      },
      handles: post.handles,
      tools: post.tools,
      skills: post.skills,
      parallel: post.parallel,
      note: post.note,
      status: post.status,
      memo: post.memo,
      uid: context.auth.uid,
      objectID: post.objectID,
      updateAt: timestamp,
    };
  }
};
