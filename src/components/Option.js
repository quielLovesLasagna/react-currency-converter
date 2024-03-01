export default function Option({ currencySymbol, currencyName }) {
	return (
		<option
			value={currencySymbol}
		>{`${currencyName} (${currencySymbol})`}</option>
	);
}
