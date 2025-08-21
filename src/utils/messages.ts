export const appMessage = {
  auth: "به سیستم وارد شدید",
  createArticle: "مقاله با موفقیت ایجاد شد",
  expiration: "نشست شما منقضی شده است",
  signout: "شما از حساب کاربری خود خارج شدید",
  updateProfile: "پروفایل کاربری با موفقیت به روز شد",
  invalidArticleBody: "بدنه مقاله باید حداقل شامل ۲۰۰ کاراکتر باشد",
};

export const backendMessages = {
  userNotFound: "کاربر پیدا نشد",
  authorizationFailed: "احراز هویت موفق نبود",
  updateProfileFailed: "آپدیت پروفایل موفقیت آمیز نبود",
  userDuplication: "این حساب کاربری از قبل وجود دارد",
  internalServerError: "خطای سرور، به مدیر سامانه اطلاع دهید",
};

export const systemMessages: Record<number, string> = {
  404: "پیدا نشد",
  500: backendMessages.internalServerError,
};
