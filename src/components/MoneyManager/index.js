import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails/index'

import TransactionItem from '../TransactionItem/index'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onDeleteList = id => {
    const {transactionList} = this.state
    const filteredList = transactionList.filter(eachList => eachList.id !== id)

    this.setState({
      transactionList: filteredList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption

    const newTransactionList = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransactionList],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeInputType = event => {
    this.setState({optionId: event.target.value})
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(eachExpenses => {
      if (eachExpenses.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachExpenses.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachIncome => {
      if (eachIncome.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachIncome.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    let expenseAmount = 0
    let balanceAmount = 0
    transactionList.forEach(eachBalance => {
      if (eachBalance.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachBalance.amount
      } else {
        expenseAmount += eachBalance.amount
      }
    })
    balanceAmount = incomeAmount - expenseAmount
    return balanceAmount
  }

  render() {
    const {transactionList, titleInput, amountInput, optionId} = this.state

    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="heading-container">
          <h1>Hi Richard</h1>
          <p>Welcome back to your money Manager</p>
        </div>
        <div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
        </div>
        <div className="transaction-history-container">
          <div className="transaction-container">
            <div className="form-container">
              <form className="form" onSubmit={this.onAddTransaction}>
                <h1>Add transaction</h1>
                <label htmlFor="title">title</label>
                <input
                  className="input"
                  id="title"
                  type="text"
                  placeholder="TITLE"
                  onChange={this.onChangeTitleInput}
                />
                <label htmlFor="amount">amount</label>
                <input
                  className="input"
                  id="amount"
                  data-testid="balanceAmount"
                  type="text"
                  placeholder="AMOUNT"
                  onChange={this.onChangeAmountInput}
                />
                <label htmlFor="type">Type</label>
                <select
                  className="input"
                  onChange={this.onChangeInputType}
                  id="type"
                >
                  {transactionTypeOptions.map(eachItem => (
                    <option key={eachItem.optionId} value={eachItem.optionId}>
                      {eachItem.displayText}
                    </option>
                  ))}
                </select>
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
          </div>
          <div className="transaction-history">
            <h1>History</h1>
            <ul>
              <li className="history-details">
                <p className="text amount">Title</p>
                <p className="amount">Amount</p>
                <p className="text">Type</p>
              </li>
              {transactionList.map(eachList => (
                <TransactionItem
                  key={eachList.id}
                  transactionDetails={eachList}
                  deleteTransaction={this.onDeleteList}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
