type Props = {
  name: string;
};

const Title = ({ name }: Props) => {
  return <h2 className="text-lg font-bold text-theme">{name}</h2>;
};
export default Title;
