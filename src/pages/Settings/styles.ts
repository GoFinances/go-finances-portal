import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const BtnAddNewSetting = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid ${p => p.theme.colors.primary};
  background: ${p => p.theme.colors.primary};
  color: #FFF;
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: ${p => p.theme.colors.dark};
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: ${p => p.theme.colors.primary};
      font-size: 16px;
      font-weight: normal;
      color: ${p => p.theme.colors.dark};

      &.title {
        color: ${p => p.theme.colors.grey};
      }

      &.income {
        color: ${p => p.theme.colors.grey};
      }

      &.outcome {
        color: ${p => p.theme.colors.grey};
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
