interface HeaderProps {
  title: string;
  subTitle: string;
}

export const Header = ({ title, subTitle }: HeaderProps) => {
  return (
    <header data-testid="sr-header">
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
    </header>
  );
};
