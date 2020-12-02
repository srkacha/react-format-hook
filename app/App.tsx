/*
	Potrebno je napraviti React hook za filtriranje, sortiranje i pretrazivanje podataka.
	Hook treba da prima array objekata odredjene strukture. U ovom slucaju koristimo array user-a iz users.json fajla.
	Hook treba da vraca formatirane podatke kao i funkcije za sortiranje, pretrazivanje i filtriranje.
	
	Funkcija za pretrazivanje prima string i pretrazuje sve propertije na user objektu.
	Funkcija za filtriranje prima funkciju koju poziva za svaki entry u array-u.
	Funkcija za sortiranje moze da prime string (property name) po kojem treba da odradi standardni sort
	ili da primi funkciju za sortiranje (slicno kao i filter funkcija).
	
	Koristiti React i TypeScript i parcel.
	Pozeljno je napisati testove za hok.

	Puno srece ;-)
*/

import React from 'react';
import users from './users.json';
import { useEffect } from 'react';
import useFormattedData from './hooks/useFormattedData';

const App = () => {
	const { formatted, sortBy, filter, search } = useFormattedData(users);

	useEffect(() => {
		search('anderson');
		filter(({ zip }) => zip > 486);
		sortBy('firstName');
	}, []);

	return (
		<div>
			{formatted.map(({ id, firstName, lastName, birthdate }) => (
				<div key={id}>
					<div>
						{firstName} {lastName}
					</div>
					<div>{birthdate}</div>
				</div>
			))}
		</div>
	);
};

export default App;