interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  collectionId: string;
}

interface IUserInfoSlice {
  info?: IUser;
  avatar?: string;
  isLoading: boolean;
}