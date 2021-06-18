import Link from 'next/link';
import { useRouter } from 'next/router';
import { dogs } from '../helpers/dogs';

function DogDetails() {
	const router = useRouter();
	const id = router.query.dog;

	function getDog(id) {
		let d = dogs.find((dog) => dog.name === id);
		// console.log('dog', d);
		return d;
	}

	let dog = getDog(id);
	console.log(dog);
	if (!dog) {
		return 'tew';
	}

	return (
		<div className='DogDetails row justify-content-center mt-5'>
			<div className='col-11 col-lg-5'>
				<div className='DogDetails-card card'>
					{/* <img className='card-img-top' src={dog.src} alt={dog.name} /> */}
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

export default DogDetails;
