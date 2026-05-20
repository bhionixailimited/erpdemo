type Props = {
  name: string;
};

const Title = ({ name }: Props) => {
  return <h2 className="font-bold uppercase md:text-lg text-theme">{name}</h2>;
};
export default Title;
