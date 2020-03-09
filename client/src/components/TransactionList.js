import React from 'react'

const TransactionList = () => {
  return (
    <>
      <h3>History</h3>
      <li className="minus">
        Cash <span>-$400</span><button className="delete-btn">x</button>
      </li>
    </>
  )
}

export default TransactionList
