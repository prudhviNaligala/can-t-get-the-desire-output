// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props

  const {id, title, amount, type} = transactionDetails

  const deleteList = () => {
    deleteTransaction(id)
  }

  return (
    <li className="history-container">
      <p className="title-txt">{title}</p>
      <p className="amount-txt">{amount}</p>
      <p className="type-txt">{type}</p>
      <div>
        <button type="button" className="del-button" onClick={deleteList}>
          <img
            className="del-image"
            data-testid="delete"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}
export default TransactionItem
