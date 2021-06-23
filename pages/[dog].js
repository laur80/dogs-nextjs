import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../compo/Navbar';
import Head from 'next/head';
import { useState } from 'react';
import hazel from '../public/hazel.jpg';
import tubby from '../public/tubby.jpg';
import whiskey from '../public/whiskey.jpg';
// import { API_URL } from '../config/index.js';
// import { buildDogsFilePath, extractDogs } from './api/dogs';
// import { useRouter } from 'next/router';

const data = [
	{
		name: 'Whiskey',
		age: 5,
		src: whiskey,
		facts: [
			'Whiskey loves eating popcorn.',
			'Whiskey is a terrible guard dog.',
			'Whiskey wants to cuddle with you!',
		],
	},
	{
		name: 'Hazel',
		age: 3,
		src: hazel,
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

// export async function getServerSideProps(context) {
// 	const { params } = context;
// 	const name = params.dog;
// 	const dg = data.find((dog) => dog.name === name);

// 	return {
// 			props: { dog: dg },
// 	};
// }

// 2nd Methos: prepare data/props and dinamic paths for Static pages

export async function getStaticProps(context) {
	const { params } = context;
	const name = params.dog;
	const dg = data.find((dog) => dog.name === name);
	if (!dg) {
		return { notFound: true };
	}

	return {
		props: { dog: dg },
	};
}

export async function getStaticPaths() {
	const ids = data.map((i) => i.name);
	const paths = ids.map((id) => ({ params: { dog: id } }));
	// console.log(params);
	return {
		paths: paths,
		fallback: false,
	};
}

//////////////////////////////////////////////////

export default function DogDetails(props) {
	// const [dog, setDog] = useState(dg);
	const { dog } = props;
	let dts = dog.facts;
	// console.log(dog);

	const details = dts.map((fact, i) => (
		<li className='list-group-item' key={i}>
			{fact}
		</li>
	));
	// console.log('lol', dog.src);

	if (!dog) return '...loading';

	return (
		<>
			<Head>
				<title>{dog.name}</title>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='keywords' content={dog.name} />
				<meta name='description' content={dog.facts} />
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
