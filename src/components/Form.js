export default function Form({
	amount,
	currencyFrom,
	currencyTo,
	setAmount,
	setCurrencyFrom,
	setCurrencyTo,
	children,
	checkCurrency,
}) {
	return (
		<form className="form">
			<div className="form__wrapper">
				<input
					type="number"
					className="form__input"
					placeholder="Amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
			</div>
			<div className="form__wrapper">
				<label htmlFor="from">From</label>
				<select
					className="form__input"
					id="from"
					value={currencyFrom}
					onChange={(e) =>
						checkCurrency(e.target.value, currencyTo, () =>
							setCurrencyFrom(e.target.value)
						)
					}
				>
					{children}
				</select>
			</div>
			<div className="form__wrapper">
				<label htmlFor="to">To</label>
				<select
					className="form__input"
					id="to"
					value={currencyTo}
					onChange={(e) =>
						checkCurrency(e.target.value, currencyFrom, () =>
							setCurrencyTo(e.target.value)
						)
					}
				>
					{children}
				</select>
			</div>
		</form>
	);
}
