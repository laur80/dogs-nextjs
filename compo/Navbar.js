import Link from 'next/link';
import Head from 'next/head';
// import { dgs } from '../helpers/dgs';

function Navbar({ dogs, title, keywords, description, children }) {
	const dogLinks = dogs.map((dog) => (
		<li className='nav-item' key={dog.name}>
			<Link href={`/${dog.name}`}>
				<a className='nav-link'>{dog.name}</a>
			</Link>
		</li>
	));
	// console.log('nav', dogs);
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
			</Head>

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
		</>
	);

	Navbar.defaultProps = {
		title: 'Dogs shelter| Find the cutest and smart dogs',
		description: 'Find the right dog for you',
		keywords: 'dogs, dogs shelter, smart dogs, cute dogs',
	};
}
export default Navbar;
