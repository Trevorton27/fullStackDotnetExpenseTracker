import {
  setExpenses,
  newExpense,
  editExpense,
  deleteExpense
} from '../app/expensesSlice';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44300/expenses'
});

export const GetExpenses = async (dispatch) => {
  try {
    //api call
    const { data } = await axiosInstance.get();
    dispatch(setExpenses(data));
  } catch (error) {
    console.log('Error');
  }
};

export const NewExpense = async (dispatch, expense) => {
  try {
    const { data } = await axiosInstance.post('', expense);
    dispatch(newExpense(data));
  } catch (error) {
    console.log('Error');
  }
};

export const EditExpense = async (dispatch, expense) => {
  try {
    await axiosInstance.put('', expense);
    dispatch(editExpense(expense));
  } catch (error) {
    console.log('error');
  }
};

export const DeleteExpense = async (dispatch, expense) => {
  try {
    await axiosInstance.delete('', { data: { ...expense } });
    dispatch(deleteExpense(expense));
  } catch {
    console.log('Error!');
  }
};
