/* eslint-disable @next/next/no-img-element */
'use client'
import { products } from './products'

function App() {
  const handlePlay = async (prodcut) => {
    const resp = await fetch('api/checkout', {
      method: 'POST',
      body: JSON.stringify(prodcut),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const session = await resp.json()
    window.location = session.url
  }

  return (
    <div className='px-44'>
      <h1 className='text-3xl font-bold m-10 text-center'>
        Productos
      </h1>

      <div className='grid grid-cols-3 gap-10'>
        {products.map((product, i) => (
          <div
            key={i}
            className='bg-slate-800 text-center p-4 rounded-md text-white'
          >
            <h2 className='font-bold text-lg'>
              {product.name}
            </h2>
            <p className='text-3xl font-bold'>
              €{product.price / 100}
            </p>
            <img
              src={product.image}
              alt={product.name}
              className='w-full'
            />
            <button
              className='bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full'
              onClick={() => handlePlay(product)}
            >
              Pagar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
