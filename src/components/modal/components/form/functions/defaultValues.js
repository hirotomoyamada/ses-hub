export const defaultValues = (index, post, edit) => {
  return index === "matters"
    ? {
        display: edit ? post.display : "public",
        title: edit ? post.title : "",
        body: edit ? post.body : "",
        position: edit ? post.position : "フロントエンドエンジニア",
        location: edit ? post.location : "",
        period: edit ? post.period : "",
        costs: {
          min: edit ? post.costs.min : "",
          max: edit ? post.costs.max : "",
          contract: edit ? post.costs.contract : "",
          display: edit ? post.costs.display : "public",
          type: edit ? post.costs.type : "スキル見合",
        },
        handles:
          edit && post.handles?.[0]
            ? post.handles.map((value) => ({
                handle: value,
              }))
            : [{ handle: "" }, { handle: "" }, { handle: "" }],
        tools:
          edit && post.tools?.[0]
            ? post.tools.map((value) => ({
                tool: value,
              }))
            : [{ tool: "" }, { tool: "" }, { tool: "" }],
        requires:
          edit && post.requires?.[0]
            ? post.requires.map((value) => ({
                require: value,
              }))
            : [{ require: "" }, { require: "" }, { require: "" }],
        prefers:
          edit && post.prefers?.[0]
            ? post.prefers.map((value) => ({
                prefer: value,
              }))
            : [{ prefer: "" }, { prefer: "" }, { prefer: "" }],
        adjustment: edit ? post.adjustment : "140h 〜 180h",
        interviews: edit ? post.interviews : "",
        times: edit ? post.times : "",
        remote: edit ? post.remote : "あり",
        distribution: edit ? post.distribution : "プライム",
        span: edit ? post.span : 30,
        note: edit ? post.note : "",
        status: edit ? post.status : "新規",
        memo: edit ? post.memo : "",
      }
    : index === "resources" && {
        display: edit ? post.display : "public",
        name: edit ? post.name : "",
        roman: edit ? post.roman : "",
        position: edit ? post.position : "フロントエンドエンジニア",
        sex: edit ? post.sex : "男性",
        age: edit ? post.age : 18,
        body: edit ? post.body : "",
        belong: edit ? post.belong : "",
        station: edit ? post.station : "",
        period: edit ? post.period : "",
        costs: {
          min: edit ? post.costs.min : "",
          max: edit ? post.costs.max : "",
          contract: edit ? post.costs.contract : "",
          display: edit ? post.costs.display : "public",
          type: edit ? post.costs.type : "スキル見合",
        },
        handles:
          edit && post.handles?.[0]
            ? post.handles.map((value) => ({
                handle: value,
              }))
            : [{ handle: "" }, { handle: "" }, { handle: "" }],
        tools:
          edit && post.tools?.[0]
            ? post.tools.map((value) => ({
                tool: value,
              }))
            : [{ tool: "" }, { tool: "" }, { tool: "" }],
        skills:
          edit && post.skills?.[0]
            ? post.skills.map((value) => ({
                skill: value,
              }))
            : [{ skill: "" }, { skill: "" }, { skill: "" }],
        parallel: edit ? post.parallel : "なし",
        note: edit ? post.note : "",
        status: edit ? post.status : "新規",
        memo: edit ? post.memo : "",
      };
};
