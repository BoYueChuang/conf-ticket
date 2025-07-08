export interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'CONF TICKET' }) => {
  // 組件邏輯
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};
