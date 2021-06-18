import Link from 'next/link';
import Image from 'next/image';
import { dogs } from '../helpers/dogs';

function DogList() {
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
