import Link from 'next/link';
import { dogs } from '../helpers/dogs';

function Navbar(props) {
	const dogLinks = dogs.map((dog) => (
		<li className='nav-item' key={dog.name}>
			<Link href={`/${dog.name}`}>
				<a className='nav-link'>{dog.name}</a>
			</Link>
		</li>
	));
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<Link className='navbar-brand' href='/'>
				Dog App
			</Link>

			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarNav'
				aria-controls='navbarNav'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon' />
			</button>
			<div className='collapse navbar-collapse' id='navbarNav'>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<Link href='/'>
							<a className='nav-link'>Home</a>
						</Link>
						<h1>dogs</h1>
					</li>
					{dogLinks}
				</ul>
			</div>
		</nav>
	);
}
export default Navbar;
