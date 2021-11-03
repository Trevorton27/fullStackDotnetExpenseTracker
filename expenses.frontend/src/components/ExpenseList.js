import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses } from '../services/expenses';
import { Button, Row, Col } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expensesSlice.expenses);

  useEffect(() => {
    GetExpenses(dispatch);
  }, [dispatch]);

  return expenses.map((e) => {
    return (
      <div key={e.id} style={{ marginBottome: '1rem' }}>
        <ListRow expense={e} />
      </div>
    );
  });
};

const ListRow = ({ expense }) => {
  const [isEditing, setIsEditing] = useState(false);
  return isEditing ? (
    <ExpenseForm expense={expense} setIsEditing={setIsEditing} />
  ) : (
    <div>
      <Row>
        <Col>{expense.description} </Col>
        <Col>${expense.amount} </Col>
        <Button variant='warning' onClick={() => setIsEditing(!isEditing)}>
          Edit
        </Button>
      </Row>{' '}
      <hr />
    </div>
  );
};
export default ExpenseList;
