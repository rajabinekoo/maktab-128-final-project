export const urls = {
  auth: {
    signup: "/apis/auth/signup",
    signin: "/apis/auth/signin",
  },
  user: {
    info: "/apis/user",
    update: "/apis/user",
    changePassword: "/apis/user",
  },
  article: {
    create: "/apis/article",
    publishToggle: (id: string) => `/apis/article/${id}`,
  },
};
