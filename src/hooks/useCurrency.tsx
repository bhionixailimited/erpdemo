const useCurrency = ({
  value,
  nationType,
  style,
  currencyType,
}: {
  value: number;
  nationType: string;
  style: string;
  currencyType: string;
}) => {
  return new Intl.NumberFormat(nationType, {
    currency: currencyType,
    style: style,
  }).format(value);
};

export default useCurrency;
