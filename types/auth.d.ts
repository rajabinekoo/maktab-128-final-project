interface ILoginResDto {
  record: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  token: string;
}
