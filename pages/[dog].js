import Link from 'next/link';
import Image from 'next/image';
// import Navbar from '../compo/Navbar';
import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { getDog } from '../helpers/dgs';
import { API_URL } from '../config/index.js';
import { useState } from 'react';
import { buildDogsFilePath, extractDogs } from './api/dogs';
// import hazel from '../public/hazel.jpg';

// 1st Method: prepare data/props on SS for function DogDetails

export async function getServerSideProps(context) {
	const { params } = context;
	const name = params.dog;
	let filename = 'dt.json';
	const filePath = buildDogsFilePath(filename);
	const dogs = extractDogs(filePath);
	const dgs = dogs.dogs;

	const dg = dogs.dogs.find((dog) => dog.name === name);

	return {
		props: { dg, dgs },
	};
}

// 2nd Methos: prepare data/props and dinamic paths for Static pages

// export async function getStaticProps(context) {
// 	const { params } = context;
// 	const name = params.dog;
// 	let filename = 'dt.json';
// 	const filePath = buildDogsFilePath(filename);
// 	const dogs = extractDogs(filePath);
// const dgs =dogs.dogs
// 	const dg = dogs.dogs.find((dog) => dog.name === name);

// 	return {
// 		props: { dg,dgs },
// 	};
// }

// export async function getStaticPaths() {
// 	return {
// 		paths: [
// 			{ params: { dog: 'hazel' } },
// 			{ params: { dog: 'tubby' } },
// 			{ params: { dog: 'whiskey' } },
// 		],
// 		fallback: false,
// 	};
// }

//////////////////////////////////////////////////

export default function DogDetails(props) {
	const [dog, setDog] = useState(props.dg);
	const dogs = props.dgs;

	if (!dog) return '...loading';
	//pre-render
	return (
		<>
			<Head>
				<title>{dog.name}</title>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='description' content={dog.src} />
				<meta name='keywords' content='dog' />
			</Head>
			<div className='DogDetails row justify-content-center mt-5'>
				<div className='col-11 col-lg-5'>
					<div className='DogDetails-card card'>
						<img className='card-img-top' src={dog.src} alt={dog.name} />
						<div className='card-body'>
							<h2 className='card-title'>{dog.name}</h2>
							<h4 className='card-subtitle text-muted'>{dog.age} years old</h4>
						</div>
						<ul className='list-group list-group-flush'>
							{dog.facts.map((fact, i) => {
								<li className='list-group-item' key={i}>
									{fact}
								</li>;
							})}
						</ul>
						<div className='card-body'>
							<Link href='/'>
								<a className='btn btn-info'>Go Back</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
