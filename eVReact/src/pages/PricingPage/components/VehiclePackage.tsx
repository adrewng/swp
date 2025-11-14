import { useQuery } from '@tanstack/react-query'
import { createSearchParams, Link } from 'react-router-dom'
import packageApi from '~/apis/package.api'
import { path } from '~/constants/path'

export default function VehiclePackage() {
  const { data: vehiclePackageData } = useQuery({
    queryKey: ['vehicle-package'],
    queryFn: packageApi.getVehiclePackage
  })

  const vehiclePackage = vehiclePackageData?.data.data

  return (
    <section className='grid md:grid-cols-2 gap-8 mb-20'>
      {vehiclePackage &&
        vehiclePackage.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 border-neutral-200 hover:border-black`}
          >
            <h2 className='text-2xl font-semibold text-neutral-900'>{pkg.name}</h2>
            <p className='text-neutral-500 mt-2 min-h-[48px]'>{pkg.description}</p>
            <div className='mt-6 flex items-end gap-1'>
              <span className='text-5xl font-bold text-neutral-900'>{Number(pkg.cost).toLocaleString('vi-VN')}₫</span>
              <span className='text-sm text-neutral-400 mb-2'>/month</span>
            </div>
            <Link
              to={{
                pathname: path.checkout,
                search: createSearchParams({
                  id: pkg.id.toString(),
                  product_type: pkg.product_type
                }).toString()
              }}
            >
              <button
                className={`mt-8 w-full py-3 rounded-xl text-base font-semibold transition-all duration-300 bg-black text-white hover:bg-neutral-800`}
              >
                Mua gói này
              </button>
            </Link>

            <ul className='mt-8 space-y-3 text-sm text-neutral-700'>
              {pkg.feature.split(',').map((f: string, i: number) => (
                <li key={i} className='flex items-center'>
                  <svg
                    className='w-5 h-5 text-black mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </section>
  )
}
