import classes from "./Card.module.css";

type CardProps = {
  children?: React.ReactNode;
  className?: string | undefined;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
};

export default Card;
