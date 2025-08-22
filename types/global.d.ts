interface IChildren {
  children: ReactNode;
}

interface IMenuItem {
  onClick?: () => void;
  href?: string;
  name: string;
}

interface IPagination {
  page?: number;
  perPage?: number;
}

interface IListResponse<T> {
  items: Array<T>;
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
