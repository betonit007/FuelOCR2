import React from 'react'

const BudgetExpenses = () => {
	return (
		<div className="inc-exp-container">
			<div>
				<h4>Budget</h4>
				<p className="money plus">0</p>
			</div>
			<div>
				<h4>Spent</h4>
				<p className="money minus">-0</p>
			</div>
		</div>
	)
}

export default BudgetExpenses
