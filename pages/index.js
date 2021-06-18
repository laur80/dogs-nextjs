import Link from 'next/link';
import Image from 'next/image';
import { API_URL } from '../config/index.js';
// import { dogs } from '../helpers/dogs';

export async function getServerSideProps(context) {
	const { params } = context;
	// console.log(params);
	const res = await fetch(`${API_URL}/api/dogs`);
	const dogs = await res.json();

	return {
		props: { dogs },
	};
}

function DogList(props) {
	const { dogs } = props;
	return (
		<>
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
