import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

export const Card = styled.div<CardProps>`
  padding: 22px 32px;
  border-radius: 5px;
  background: ${p => (p.total ? p.theme.colors.card_bg_secondary : p.theme.colors.card_bg_primary)};
  color: ${p => (p.total ? p.theme.colors.textSecundary : p.theme.colors.text)};
  border: 1px solid ${p => p.theme.colors.card_border_primary};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: ${p => p.theme.colors.text};
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: ${p => p.theme.colors.transactions_bg};
      font-size: 16px;
      font-weight: normal;
      color: ${p => p.theme.colors.text};

      &.title {
        color: ${p => p.theme.colors.transactions_title};
      }

      &.income {
        color: ${p => p.theme.colors.transactions_income};
      }

      &.outcome {
        color: ${p => p.theme.colors.transactions_outcome};
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
