import { useState } from "react";
import Form from "./Form";
import Option from "./Option";
import { currencyEntries, currenciesFullName, currenciesSymbol } from "./Data";

export default function App() {
	const [amount, setAmount] = useState("");
	const [currencyFrom, setCurrencyFrom] = useState("EUR");
	const [currencyTo, setCurrencyTo] = useState("USD");
	const [result, setResult] = useState("0.00");
	const [isConverting, setIsConverting] = useState(false);
	const [error, setError] = useState("");

	async function convert() {
		try {
			if (!amount) {
				setResult("");
				return;
			}

			setIsConverting(true);
			setError("");

			const res = await fetch(
				`https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`
			);

			if (!res.ok) {
				throw new Error("There was a problem fetching the data...");
			}

			const data = await res.json();

			if (data.response === "False") {
				throw new Error("Could not convert currency...");
			}

			const rate = data.rates[currencyTo];

			setResult(rate);
		} catch (err) {
			console.log(err);
			setError(err.message);
		} finally {
			setIsConverting(false);
		}
	}

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
