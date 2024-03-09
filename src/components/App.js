import Form from "./Form";
import Option from "./Option";
import { currencyEntries, currenciesFullName, currenciesSymbol } from "./Data";
import { useConvert } from "./useConvert";

export default function App() {
	const {
		amount,
		setAmount,
		result,
		isConverting,
		error,
		currencyFrom,
		currencyTo,
		setCurrencyFrom,
		setCurrencyTo,
		convert,
	} = useConvert();

	// ! -- Invoke convert func to convert currency
	function handleConvert() {
		convert();
	}

	// ! -- Displable user to select the same currency
	function checkCurrency(currency1, currency2, setterFunc) {
		if (currency1 !== currency2) {
			setterFunc();
		}
	}

	return (
		<main className="main">
			<div className="container">
				<h1 className="container__heading">Currency converter</h1>
				<Form
					amount={amount}
					currencyFrom={currencyFrom}
					currencyTo={currencyTo}
					setAmount={setAmount}
					setCurrencyFrom={setCurrencyFrom}
					setCurrencyTo={setCurrencyTo}
					checkCurrency={checkCurrency}
				>
					{currencyEntries.map((_, i) => (
						<Option
							currencySymbol={currenciesSymbol[i]}
							currencyName={currenciesFullName[i]}
							key={i}
						/>
					))}
				</Form>
				<h2 className="result">
					<span>Exchange Rate {`(${currencyTo})`}</span>
					{!amount && !result && "Please enter amount!"}
					{error && error}
					{isConverting && "Converting..."}
					{!isConverting && !error && result}
				</h2>
				<button className="convert-btn" onClick={handleConvert}>
					Convert
				</button>
			</div>
		</main>
	);
}
