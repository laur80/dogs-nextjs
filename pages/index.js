import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../compo/Navbar';
import { API_URL } from '../config/index.js';
import useSWR from 'swr';
import { buildDogsFilePath, extractDogs } from './api/dogs';
import { useState, useEffect } from 'react';

export async function getStaticProps(context) {
	// const { params } = context;
	let filename = 'dt.json';
	const filePath = buildDogsFilePath(filename);
	const dogs = extractDogs(filePath);

	return {
		props: { dogs },
	};
}
////////////////

function DogList(props) {
	const [dogs, setDogs] = useState(props.dogs.dogs);

	const { data, error } = useSWR(`${API_URL}/api/dogs`);

	useEffect(() => {
		if (data) {
			// console.log(data.dogs);
			setDogs(data.dogs);
		}
	}, [data]);

	if (error) return <p>Failed to load.</p>;

	if (!dogs && !data) return '...loading';

	return (
		<>
			<Navbar dogs={dogs} />
			<div className='DogList'>
				<h1 className='display-1 text-center mt-3 mb-5'>Dog List!</h1>
				<div className='row'>
					{dogs.map((d) => (
						<div className='Dog col-lg-4 text-center' key={d.name}>
							<Image src={d.src} alt={d.name} width='250' height='300' />
							<h3 className='mt-3'>
								<Link href={`/${d.name}`}>
									<a className='underline'>{d.name}</a>
								</Link>
							</h3>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default DogList;
