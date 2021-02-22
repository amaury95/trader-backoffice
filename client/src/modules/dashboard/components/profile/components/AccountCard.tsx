import { ProfileViewProps } from "../Profile";
import { Card, Divider, Icon, Image, Statistic } from "semantic-ui-react";
import { CurrencyDisplay } from "components/CurrencyDisplay";

export default function AccountCard({ account }: ProfileViewProps) {
  const { username, name, email, balance, fee } = account;

  return (
    <Card>
      <Image
        src={`https://react.semantic-ui.com/images/avatar/large/matthew.png`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header textAlign="center">{name}</Card.Header>
        <Card.Meta textAlign="center">
          <span>{username}</span>
        </Card.Meta>
        <Card.Description textAlign="center">
          <Divider />
          <Statistic size="small" color="green">
            <Statistic.Value>
              <CurrencyDisplay amount={balance} currency="USD" />
            </Statistic.Value>
            <Statistic.Label>Balance</Statistic.Label>
          </Statistic>
          <Divider />
          <Statistic size="mini" color="blue">
            <Statistic.Value>{fee * 100}%</Statistic.Value>
            <Statistic.Label>Fees</Statistic.Label>
          </Statistic>
          <Divider />
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="center">
        <a href={`mailto:${email}`}>
          <Icon name="mail" />
          {email}
        </a>
      </Card.Content>
    </Card>
  );
}
