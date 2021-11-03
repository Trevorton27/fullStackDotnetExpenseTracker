using Expenses.DB;
using System;
using System.Collections.Generic;
using System.Text;

namespace Expenses.Core
{
  public  interface IExpensesServices
    {
        List<Expense> GetExpenses();
        Expense GetExpenseById(int id);
        Expense CreateExpense(Expense expense);

        void DeleteExpense(Expense expense);

        Expense EditExpense(Expense expense);
    }
}
