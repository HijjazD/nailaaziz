import {useEffect} from 'react'

import { useClientBookingStore } from '../store/clientstore/clientBookingStore'

const ClientBookings = () => {
    const { loading, error, fetchMyBookings, clientBookings } = useClientBookingStore()

    useEffect(() => {
        fetchMyBookings()
    },[fetchMyBookings])

    if (loading) return <div className='pt-30'>Loading your bookings...</div>
    if (error) return <div className='pt-30'>Error fetching your bookings.</div>
  return (
    <div className='p-4 text-amber-800 pt-30 bg-blue-300 w-screen min-h-screen'>
      <h1 className='text-xl font-bold mb-4'>My Bookings</h1>

      {clientBookings.length === 0 ? ( 
        <p>No bookings yet.</p>
      ) : (
        <table className='min-w-full border border-gray-300'>
          <thead>
            <tr className='bg-amber-100'>
              <th className='p-2 border'>#</th>
              <th className='p-2 border'>Service Name</th>
              <th className='p-2 border'>Date</th>
              <th className='p-2 border'>Status</th>
              <th className='p-2 border'>Review Status</th>
            </tr>
          </thead>
          <tbody>
            {clientBookings.map((b, i) => (
              <tr key={b.id}>
                <td className='p-2 border text-center'>{i + 1}</td>
                <td className='p-2 border'>{b.serviceName}</td>
                <td className='p-2 border'>
                  {new Date(b.bookDate).toLocaleString()}
                </td>
                <td className='p-2 border'>{b.reservationStatus}</td>
                <td className='p-2 border'>{b.reviewStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ClientBookings