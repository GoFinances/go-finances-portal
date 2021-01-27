import React, { useState, useEffect } from 'react';
import * as Icons from 'react-icons/all';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import { useTheme } from '../../hooks/theme';
import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer, MessageEmpty } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string; background_color_light: string; background_color_dark: string; icon: string; };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}



const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      try {
        const { data: { success, message, result } } = await api.get(`/transactions`);
        if (!success)
          throw new Error(message);

        setBalance(result.balance);
        setTransactions(result.transactions);

      } catch (err) {
        if (err instanceof Error)
          addToast({
            type: 'error',
            title: 'Atenção',
            description: err.message
          });
      }
    }
    loadTransactions();
  }, [addToast]);


  return (<>
    <Header />
    <Container>
      <CardContainer>
        <Card>
          <header>
            <p>Entradas</p>
            <img src={income} alt="Income" />
          </header>
          <h1 data-testid="balance-income">{Boolean(balance.income) ? formatValue(Number(balance.income)) : ''}</h1>
        </Card>
        <Card>
          <header>
            <p>Saídas</p>
            <img src={outcome} alt="Outcome" />
          </header>
          <h1 data-testid="balance-outcome">{Boolean(balance.outcome) ? formatValue(Number(balance.outcome)) : ''}</h1>
        </Card>
        <Card total>
          <header>
            <p>Total</p>
            <img src={total} alt="Total" />
          </header>
          <h1 data-testid="balance-total">{Boolean(balance.total) ? formatValue(Number(balance.total)) : ''}</h1>
        </Card>
      </CardContainer>

      {!Boolean(transactions.length) ?
        <MessageEmpty>Não há dados cadastros</MessageEmpty>
        : <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => {
                const [, iconName] = transaction.category.icon.split('/');
                const Icon = (Icons as any)[iconName];

                return (
                  <tr key={transaction.id}>
                    <td className={transaction.type}>{transaction.title}</td>
                    <td className={transaction.type}>{transaction.type === "outcome" ? "-" : ""} {formatValue(Number(transaction.value))}</td>
                    <td className="icon" > <Icon size={25} color={theme.title === 'light' ? transaction.category.background_color_light : transaction.category.background_color_dark} /> {transaction.category.title}</td>
                    <td>{formatDate(transaction.created_at)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableContainer>}

    </Container>
  </>);
};

export default Dashboard;
