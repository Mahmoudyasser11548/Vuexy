import React from 'react'

const ButtonSubmit = (prop) => {
  const {loading} = prop
  return (
    <>
      {loading ? (
        <div className='w-100 my-2'>
          <button type="submit" className="btn btn-primary text-center" disabled>
            Loading...
          </button>
        </div>
      ) : (
        <div className='w-100 my-2'>
          <button type="submit" className="btn btn-primary text-center">
            Apply
          </button>
        </div>
      )}
    </>
  )
}

export default ButtonSubmit