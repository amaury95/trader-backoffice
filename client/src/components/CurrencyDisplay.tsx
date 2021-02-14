import { Money } from "ts-money";

interface Props {
  amount: number | null;
  currency: string;
}
const formatter = (currency: string, minimumFractionDigits: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits,
    style: "currency",
    currency,
  });

export const CurrencyDisplay = ({ currency, ...props }: Props) => {
  const amount = props.amount || 0;

  const { code, decimal_digits } = Money.fromDecimal(
    amount,
    currency,
    Math.ceil
  ).getCurrencyInfo();

  return <span>{formatter(code, decimal_digits).format(amount)}</span>;
};
