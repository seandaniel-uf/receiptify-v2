interface HeaderProps {
  title: string;
  subTitle: string;
}

export const Header = ({ title, subTitle }: HeaderProps) => {
  return (
    <header>
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
    </header>
  );
};
