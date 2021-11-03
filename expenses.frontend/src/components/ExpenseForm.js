import { React, useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DeleteExpense, EditExpense, NewExpense } from '../services/expenses';
import { useDispatch } from 'react-redux';

const ExpenseForm = ({ expense, setIsEditing }) => {
  const descriptions = [
    'Groceries',
    'Credit Card',
    'Student Loans',
    'Eating out',
    'Gas'
  ];
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState(descriptions[0]);
  const [isNewExpense, setIsNewExpense] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (expense !== undefined) {
      setIsNewExpense(false);
      setAmount(expense.amount);
    } else {
      setIsNewExpense(true);
    }
  }, [expense]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (isNewExpense) {
          NewExpense(dispatch, {
            description: description,
            amount: Number(amount)
          });
        } else {
          EditExpense(dispatch, {
            id: expense.id,
            description: description,
            amount: Number(amount)
          });
          setIsEditing(false);
        }
      }}
    >
      <Row>
        <Col>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='select'
            onChange={(e) => setDescription(e.target.value)}
          >
            {' '}
            {descriptions.map((d) => (
              <option>{d}</option>
            ))}
          </Form.Control>
        </Col>
        <Col>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type='number'
            step='0.01'
            placeholder={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Col>
        <div style={{ marginTop: 'auto' }}>
          {isNewExpense ? (
            <Button variant='primary' type='submit'>
              Add
            </Button>
          ) : (
            <div>
              <Button
                style={{ marginRight: '2px' }}
                variant='danger'
                onClick={() => DeleteExpense(dispatch, expense)}
              >
                Delete
              </Button>
              <Button
                style={{ marginRight: '2px' }}
                Delete
                variant='success'
                type='submit'
              >
                {' '}
                Save
              </Button>
              <Button
                style={{ marginRight: '2px' }}
                Delete
                variant='default'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </Row>
    </Form>
  );
};

export default ExpenseForm;
