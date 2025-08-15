'use client'

import { ContactProps } from 'common/types'
import { Footer, Contact } from 'components'

export default function WhoWeAre() {
  const officers: ContactProps[] = [
    { name: 'Anthony Giannell', title: 'President' },
    { name: 'Edwin Samson', title: 'Executive Director' },
    { name: 'Amy Samson', title: 'Secretary' },
    { name: 'Sydney Giannell', title: 'Treasurer' }
  ]
  return (
    <div>
      <section className='flex flex-col items-center justify-between w-full h-screen bg-ahBlue'>
        <div className='absolute top-20 flex flex-col items-center justify-between w-full h-[calc(100%_-_5rem)] px-8 md:px-24 py-12'>
          {officers.map((officer, index) => (
            <Contact key={index} name={officer.name} title={officer.title} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
