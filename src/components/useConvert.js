import { useState } from "react";

export function useConvert() {
	const [amount, setAmount] = useState("");
	const [result, setResult] = useState("0.00");
	const [isConverting, setIsConverting] = useState(false);
	const [error, setError] = useState("");
	const [currencyFrom, setCurrencyFrom] = useState("EUR");
	const [currencyTo, setCurrencyTo] = useState("USD");

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

	return {
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
	};
}
