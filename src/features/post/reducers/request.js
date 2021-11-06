export const addRequest = (state, action) => {
  if (state.entries.persons.posts.length) {
    state.entries.persons.posts = [
      {
        uid: action.payload.user.uid,
        profile: {
          nickName: action.payload.user.profile.nickName,
          position: action.payload.user.profile.position,
          age: action.payload.user.profile.age,
          sex: action.payload.user.profile.sex,
          handles: action.payload.user.profile.handles,
          costs: action.payload.user.profile.costs,
          period: action.payload.user.profile.period,
          location: action.payload.user.profile.location,
          body: action.payload.user.profile.body,
        },
        icon: action.payload.user.icon,
        request: "hold",
      },
      ...state.entries.persons.posts,
    ];
  }
};
