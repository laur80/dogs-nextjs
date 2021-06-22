import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../compo/Navbar';
import { buildDogsFilePath, extractDogs } from './api/dogs';
import { useState, useEffect } from 'react';
import hazel from '../public/hazel.jpg';
// import { API_URL } from '../config/index.js';
// import useSWR from 'swr';

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

	// const { data, error } = useSWR(`${API_URL}/api/dogs`);

	// useEffect(() => {
	// 	if (data) {
	// 		// console.log(data.dogs);
	// 		setDogs(data.dogs);
	// 	}
	// }, [data]);

	// if (error) return <p>Failed to load.</p>;

	if (!dogs) return '...loading';
	return (
		<>
			<Navbar dogs={dogs} />
			<div className='container'>
				<div className='DogList'>
					<h1 className='display-1 text-center mt-3 mb-5'>Dog List!</h1>
					<div className='row justify-content-around'>
						{dogs.map((d) => (
							<div className='Dog col-lg-4 text-center' key={d.name}>
								<Image
									src={d.src}
									alt={d.name}
									className='image'
									width={100}
									height={100}
									layout='responsive'
									eager='true'
								/>
								<h3 className='mt-3'>
									<Link href={`/${d.name}`}>
										<a className='underline'>{d.name}</a>
									</Link>
								</h3>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default DogList;
