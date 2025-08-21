interface IChildren {
  children: ReactNode;
}

interface IMenuItem {
  onClick?: () => void;
  href?: string;
  name: string;
}
