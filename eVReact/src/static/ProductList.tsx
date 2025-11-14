import { BsCalendar } from 'react-icons/bs'
import { FaCar, FaChevronDown, FaCog, FaHeart, FaStar, FaUsers } from 'react-icons/fa'
import { MdOutlineLocationOn } from 'react-icons/md'

// Tailwind v4 rewrite — full file with correct container + layout

const Header = () => (
  <header className='sticky top-0 z-20 flex items-center justify-between bg-white/80 backdrop-blur border-b border-zinc-200 px-4 md:px-8 h-16'>
    <div className='font-black tracking-wide text-lg'>OPTIMUM</div>
    <nav className='hidden md:flex gap-6 text-sm'>
      <a href='#' className='font-medium text-zinc-900'>
        Booking
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        About Us
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Support
      </a>
      <a href='#' className='text-zinc-600 hover:text-zinc-900'>
        Terms & Conditions
      </a>
    </nav>
    <div className='flex items-center gap-4'>
      <FaHeart className='text-zinc-700' />
      <div className='size-8 rounded-full overflow-hidden ring-1 ring-zinc-200'>
        <img src='https://picsum.photos/32' alt='User' className='size-full object-cover' />
      </div>
    </div>
  </header>
)

const BookingSection = () => (
  <section className='container pt-10 md:pt-16'>
    <div className='grid lg:grid-cols-2 gap-10 items-start'>
      <div>
        <h1 className='text-3xl md:text-5xl font-extrabold leading-tight'>Book car in easy steps</h1>
        <p className='mt-4 text-zinc-600 max-w-prose'>
          Renting a car brings you freedom, and we'll help you find the best car for you at a great price.
        </p>
        <div className='mt-6 flex flex-wrap items-center gap-6'>
          <div className='flex -space-x-2 items-center'>
            {[0, 1, 2].map((i) => (
              <img
                key={i}
                src='https://randomuser.me/api/portraits/men/3{i}.jpg'
                alt='Avatar'
                className='size-9 rounded-full ring-2 ring-white'
              />
            ))}
            <span className='ml-3 text-sm text-zinc-700'>+24</span>
          </div>
          <div className='flex items-center gap-2 text-amber-500'>
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className='shrink-0' />
            ))}
            <span className='ml-2 text-sm text-zinc-700'>Trust by 10 million customers</span>
          </div>
        </div>
      </div>

      <div className='rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 p-4 md:p-6'>
        <div className='grid md:grid-cols-2 gap-4'>
          {/* Row 1 */}
          <div className='space-y-1'>
            <label className='text-sm font-medium text-zinc-700 flex items-center gap-2'>
              <MdOutlineLocationOn /> Pick-up
            </label>
            <div className='relative'>
              <input
                type='text'
                placeholder='London (LHR - Heathrow)'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
              />
              <FaChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500' />
            </div>
          </div>
          <div className='space-y-1'>
            <label className='text-sm font-medium text-zinc-700 flex items-center gap-2'>
              <MdOutlineLocationOn /> Drop-off
            </label>
            <div className='relative'>
              <input
                type='text'
                placeholder='London (LGW - Gatwick)'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
              />
              <FaChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500' />
            </div>
          </div>

          {/* Row 2 */}
          <div className='space-y-1'>
            <label className='text-sm font-medium text-zinc-700 flex items-center gap-2'>
              <BsCalendar /> Pick-up Date
            </label>
            <div className='relative'>
              <input
                type='text'
                placeholder='18 December'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
              />
              <FaChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500' />
            </div>
          </div>
          <div className='space-y-1'>
            <label className='text-sm font-medium text-zinc-700 flex items-center gap-2'>
              <BsCalendar /> Drop-off Date
            </label>
            <div className='relative'>
              <input
                type='text'
                placeholder='19 December'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
              />
              <FaChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500' />
            </div>
          </div>

          {/* Row 3 */}
          <div className='space-y-1'>
            <label className='text-sm font-medium text-zinc-700'>Pick-up Time</label>
            <div className='relative'>
              <input
                type='text'
                placeholder='10:00'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
              />
              <FaChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500' />
            </div>
          </div>
          <div className='space-y-1'>
            <label className='text-sm font-medium text-zinc-700'>Drop-off Time</label>
            <div className='relative'>
              <input
                type='text'
                placeholder='10:00'
                className='w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-zinc-900'
              />
              <FaChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const FilterSidebar = () => (
  <aside className='hidden lg:block w-72 shrink-0 space-y-6'>
    <h2 className='text-lg font-semibold'>Filter By ❤️</h2>

    {/* Car Type */}
    <div className='rounded-2xl border border-zinc-200 p-4'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold'>Car Type</h3>
        <span className='text-xl leading-none'>-</span>
      </div>
      <ul className='mt-3 space-y-3 text-sm text-zinc-700'>
        {['Coupe (24)', 'Hatchback (12)', 'Sedan (16)', 'MPV (28)', 'SUV (20)'].map((label) => (
          <li key={label} className='flex items-center gap-2'>
            <FaCar className='shrink-0' />
            <label className='flex items-center gap-2'>
              <input type='checkbox' className='size-4' /> {label}
            </label>
          </li>
        ))}
      </ul>
    </div>

    {/* Capacity */}
    <div className='rounded-2xl border border-zinc-200 p-4'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold'>Capacity</h3>
        <span className='text-xl leading-none'>-</span>
      </div>
      <ul className='mt-3 space-y-3 text-sm text-zinc-700'>
        {['2-5 (100)', '6 or more (4)'].map((label) => (
          <li key={label} className='flex items-center gap-2'>
            <label className='flex items-center gap-2'>
              <input type='checkbox' className='size-4' /> {label}
            </label>
          </li>
        ))}
      </ul>
    </div>

    {/* Recommendation */}
    <div className='rounded-2xl border border-zinc-200 p-4'>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold'>Customer Recommendation</h3>
        <span className='text-xl leading-none'>-</span>
      </div>
      <ul className='mt-3 space-y-3 text-sm text-zinc-700'>
        {['70% & up (72)', '40% & up (28)'].map((label) => (
          <li key={label} className='flex items-center gap-2'>
            <label className='flex items-center gap-2'>
              <input type='checkbox' className='size-4' /> {label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  </aside>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CarCard = ({ car }: { car: any }) => (
  <div className='group rounded-2xl border border-zinc-200 overflow-hidden bg-white hover:shadow-lg transition-shadow'>
    <div className='flex items-start justify-between p-4'>
      <div>
        <h3 className='font-semibold'>{car.name}</h3>
        <p className='text-sm text-zinc-600'>{car.type}</p>
      </div>
      <FaHeart className='text-zinc-500' />
    </div>
    <div className='aspect-[3/1] w-full overflow-hidden'>
      <img src={car.image} alt={car.name} className='size-full object-cover' />
    </div>
    <div className='p-4 flex items-center justify-between'>
      <div className='flex items-center gap-4 text-sm text-zinc-700'>
        <span className='inline-flex items-center gap-1'>
          <FaUsers /> {car.passengers}
        </span>
        <span className='inline-flex items-center gap-1'>
          <FaCog /> {car.transmission}
        </span>
      </div>
      <div className='font-semibold'>{car.price}</div>
    </div>
  </div>
)

const CarList = () => {
  const cars = [
    {
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      passengers: 2,
      transmission: 'Manual',
      price: '$400/d',
      image:
        'https://images.unsplash.com/photo-1620246473111-e1e79601362e?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=300&fit=crop&ixlib=rb-4.0.3'
    },
    {
      name: 'Mini Cooper 5-DOOR',
      type: 'Hatchback',
      passengers: 4,
      transmission: 'Matic',
      price: '$364/d',
      image:
        'https://images.unsplash.com/photo-1605330310235-97e3c9a17441?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=300&fit=crop&ixlib=rb-4.0.3'
    },
    {
      name: 'Toyota GR Supra',
      type: 'Coupe',
      passengers: 2,
      transmission: 'Manual',
      price: '$360/d',
      image:
        'https://images.unsplash.com/photo-1607599026771-337d10c0e527?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=300&fit=crop&ixlib=rb-4.0.3'
    },
    {
      name: 'Porsche 911 Turbo',
      type: 'Coupe',
      passengers: 2,
      transmission: 'Manual',
      price: '$468/d',
      image:
        'https://images.unsplash.com/photo-1596489397666-e8224749622d?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=300&fit=crop&ixlib=rb-4.0.3'
    },
    {
      name: 'Porsche Taycan 4S',
      type: 'Coupe',
      passengers: 2,
      transmission: 'Manual',
      price: '$424/d',
      image:
        'https://images.unsplash.com/photo-1626241285072-520e03e5c7a2?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=300&fit=crop&ixlib=rb-4.0.3'
    },
    {
      name: 'Mini Cooper Works',
      type: 'Coupe',
      passengers: 4,
      transmission: 'Matic',
      price: '$360/d',
      image:
        'https://images.unsplash.com/photo-1616790937812-70b13501a350?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=300&fit=crop&ixlib=rb-4.0.3'
    }
  ]
  return (
    <div className='min-w-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
      {cars.map((car, index) => (
        <CarCard key={index} car={car} />
      ))}
    </div>
  )
}

const ProductList = () => (
  <div className='min-h-screen bg-zinc-50 text-zinc-900'>
    <Header />
    <main className='container'>
      <BookingSection />
      <section className='py-10 md:py-14 grid grid-cols-1 lg:[grid-template-columns:18rem_minmax(0,1fr)] gap-6 lg:gap-10'>
        <FilterSidebar />
        <CarList />
      </section>
    </main>
  </div>
)

export default ProductList
