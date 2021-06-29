import Link from "next/link";
// import Image from "next/image";
import Navbar from "../compo/Navbar";
import Head from "next/head";
import { useState } from "react";
import hazel from "../public/hazel.jpg";
import tubby from "../public/tubby.jpg";
import whiskey from "../public/whiskey.jpg";
// import useDimensions from 'react-cool-dimensions';
// import { buildDogsFilePath, extractDogs } from './api/dogs';
// import { API_URL } from '../config/index.js';
// import useSWR from 'swr';

const data = [
  {
    name: "Whiskey",
    age: 5,
    src: '/whiskey.jpg' ,
    facts: [
      "Whiskey loves eating popcorn.",
      "Whiskey is a terrible guard dog.",
      "Whiskey wants to cuddle with you!",
    ],
  },
  {
    name: "Hazel",
    age: 3,
    src: '/hazel.jpg' ,
    facts: [
      "Hazel has soooo much energy!",
      "Hazel is highly intelligent.",
      "Hazel loves people more than dogs.",
    ],
  },
  {
    name: "Tubby",
    age: 4,
    src: '/tubby.jpg' ,
    facts: [
      "Tubby is not the brightest dog",
      "Tubby does not like walks or exercise.",
      "Tubby loves eating food.",
    ],
  },
];

export async function getStaticProps(context) {
  return {
    props: { data },
  };
}
////////////////

function DogList(props) {
  const [dogs, setDogs] = useState(props.data);

  // const { observe, width } = useDimensions({
  // 	breakpoints: { XS: 0, SM: 320, MD: 480, LG: 640 },
  // 	updateOnBreakpointChange: true,
  // });

  if (!dogs) return "...loading";
  return (
    <>
      <Head>
        <title>Dogs shelter</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='keywords'
          content='dogs, dogs shelter, smart dogs, cute dogs'
        />
        <meta name='description' content='Find the right dog for you' />
      </Head>
      <Navbar dogs={dogs} />
      <div className='container'>
        <div className='DogList'>
          <h1 className='display-1 text-center mt-3 mb-5 ' id='txt'>
            Dog List!
          </h1>
          <div className='row justify-content-around'>
            {dogs.map((d) => (
              <div className='Dog col-lg-4 text-center' key={d.name}>
               
                <img
                  className='image'
                  src={d.src}
                  alt={d.name}
                  // width='260px'
                  // height='260px'
                
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
