import React from 'react'
import Image from 'next/image'
import { assets, infoList, toolsData } from '../../../assets/assets'

const About = () => {
  return (
    <section id='about' className='w-full py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950'>
      <div className='container mx-auto px-6 md:px-12'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold font-Ovo mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'>About Me</h1>
          <p className='text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>
            I am a frontend developer from KPK, Pakistan with 4 years of experience building exceptional digital experiences.
          </p>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full'></div>
        </div>

        <div className='flex flex-col lg:flex-row items-center gap-12 md:gap-20'>  
          <div className='w-64 sm:w-80 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 z-10'></div>
              <Image 
                src={assets.user_image} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-3xl" 
              />
            </div>
          </div>
          
          <div className='flex-1'>
            <p className='mb-10 text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl font-Ovo'>
              I'm an experienced frontend developer with a demonstrated history of working in the information technology and services industry. Skilled in React, Next.js, Tailwind CSS, and JavaScript. Strong engineering professional with a Bachelor's degree focused in Computer Science from the University of Peshawar.
            </p>
            
            <div className='mb-12'>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl'>
                {infoList.map(({icon, iconDark, title, description}) => (
                  <li 
                    className='border border-gray-200 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:-translate-y-2 duration-300 hover:shadow-xl bg-white dark:bg-gray-800 group'
                    key={title}
                  > 
                    <div className='flex items-start gap-4'>
                      <div className='w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300'>
                        <Image 
                          src={icon} 
                          alt={title} 
                          className='w-6 h-6 group-hover:brightness-200 transition-all' 
                        />
                      </div>
                      <div>
                        <h3 className='mb-2 font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>{title}</h3>
                        <p className='text-gray-600 dark:text-gray-400'>{description}</p>
                      </div>
                    </div>
                  </li>
                ))} 
              </ul>
            </div>
            
            <div>
              <h4 className='mb-6 text-xl font-semibold text-gray-800 dark:text-gray-200 font-Ovo flex items-center'>
                <span className='w-8 h-1 bg-blue-600 mr-3'></span>
                Tools I use
              </h4>
              <ul className='flex flex-wrap items-center gap-4 md:gap-6'>
                {toolsData.map((tool, index) => (
                  <li 
                    className='flex items-center justify-center w-14 sm:w-16 aspect-square border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:-translate-y-2 hover:shadow-xl duration-300 group' 
                    key={index}
                  >
                    <Image 
                      src={tool} 
                      alt={`Tool ${index}`} 
                      className='w-8 h-8 group-hover:scale-110 transition-transform duration-300' 
                    />
                  </li>  
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About