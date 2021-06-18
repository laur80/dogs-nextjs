import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getDog } from '../helpers/dogs';
import { API_URL } from '../config/index.js';
import { useState, useEffect } from 'react';

export async function getServerSideProps(context) {
	const { params } = context;
	console.log(params);
	const res = await fetch(`${API_URL}/api/dogs`);
	const dogs = await res.json();

	return {
		props: { dogs },
	};
}

export default function DogDetails(props) {
	const { dogs } = props;
	const [data, setData] = useState(dogs[0]);

	const router = useRouter();
	const id = router.query.dog;

	let dog = getDog(id);

	// async function getApiData() {
	// 	const res = await fetch(`${API_URL}/api/dogs/refresh`);
	// 	const dg = await res.json();
	// 	return dg;
	// }

	// useEffect(async () => {
	// 	const freshdogs = await getApiData();

	// 	setData(freshdogs);
	// }, []);

	// if (!data && !dog) {
	// 	return '...loading';
	// }
	//pre-render
	return (
		<>
			<h1>{data.name}</h1>
			<Image src={data.src} alt={data.name} width='250' height='300' />
			<p>{data.facts}</p>
		</>
	);
	//after component mount
	return (
		<div className='DogDetails row justify-content-center mt-5'>
			<div className='col-11 col-lg-5'>
				<div className='DogDetails-card card'>
					<Image
						className='card-img-top'
						src={dog.src}
						alt={dog.name}
						width='250'
						height='300'
					/>
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
	);
}
