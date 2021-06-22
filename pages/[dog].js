import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../compo/Navbar';
import Head from 'next/head';
import { useState } from 'react';
// import { API_URL } from '../config/index.js';
// import { buildDogsFilePath, extractDogs } from './api/dogs';
// import { useRouter } from 'next/router';
// import { getDog } from '../helpers/dgs';
import hazel from '../public/hazel.jpg';
import tubby from '../public/tubby.jpg';
import whiskey from '../public/whiskey.jpg';

const data = [
	{
		name: 'Whiskey',
		age: 5,
		src: hazel,
		facts: [
			'Whiskey loves eating popcorn.',
			'Whiskey is a terrible guard dog.',
			'Whiskey wants to cuddle with you!',
		],
	},
	{
		name: 'Hazel',
		age: 3,
		src: whiskey,
		facts: [
			'Hazel has soooo much energy!',
			'Hazel is highly intelligent.',
			'Hazel loves people more than dogs.',
		],
	},
	{
		name: 'Tubby',
		age: 4,
		src: tubby,
		facts: [
			'Tubby is not the brightest dog',
			'Tubby does not like walks or exercise.',
			'Tubby loves eating food.',
		],
	},
];

// 1st Method: prepare data/props on SS for function DogDetails

export async function getServerSideProps(context) {
	// console.log('lp', data);
	const { params } = context;
	const name = params.dog;
	// let filename = 'dt.json';
	// const filePath = buildDogsFilePath(filename);
	// const dogs = extractDogs(filePath);
	// const dgs = dogs.dogs;

	const dg = data.find((dog) => dog.name === name);
	// console.log('fff', dg);

	return {
		props: { dg },
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
	let dts = dog.facts;

	const details = dts.map((fact, i) => (
		<li className='list-group-item' key={i}>
			{fact}
		</li>
	));
	// console.log('lol', dog.src);

	if (!data) return '...loading';

	return (
		<>
			<Head>
				<title>{dog.name}</title>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='description' content={dog.src} />
				<meta name='keywords' content='dog' />
			</Head>
			<Navbar dogs={data} />
			<div className='container'>
				<div className='DogDetails row justify-content-center mt-5'>
					<div className='col-11 col-lg-5'>
						<div className='DogDetails-card card'>
							<Image
								className='card-img-top img'
								src={dog.src}
								alt={dog.name}
								width={100}
								height={100}
								layout='responsive'
								// eager='true'
							/>
							<div className='card-body'>
								<h2 className='card-title'>{dog.name}</h2>
								<h4 className='card-subtitle text-muted'>
									{dog.age} years old
								</h4>
							</div>
							{details}
							<ul className='list-group list-group-flush'></ul>
							<div className='card-body'>
								<Link href='/'>
									<a className='btn btn-info'>Go Back</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
