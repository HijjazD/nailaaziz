import {useEffect} from 'react'

import { useCompanyStore } from '../store/companystore/companyStore'

const CompanyDashboard = () => {
  const { bookings, loading, error, fetchBookings } = useCompanyStore()

  useEffect(() => {
    fetchBookings()
    console.log("bookings", bookings)
  },[fetchBookings])

  if (loading) return <div className='pt-30'>Loading bookings...</div>
  if (error) return <div className='pt-30'>Error fetching bookings.</div>

  return (
    <div className='p-4 w-screen min-h-screen pt-30 bg-blue-300'>
      <h1 className='text-xl font-bold mb-4'>Company Dashboard</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='p-2 border'>#</th>
                <th className='p-2 border'>Service Name</th>
                <th className='p-2 border'>Client</th>
                <th className='p-2 border'>Date</th>
                <th className='p-2 border'>Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b.id}>
                  <td className='p-2 border text-center'>{i + 1}</td>
                  <td className='p-2 border'>{b.serviceName}</td>
                  <td className='p-2 border'>{b.userName}</td>
                  <td className='p-2 border'>
                    {new Date(b.bookDate).toLocaleString()}
                  </td>
                  <td className='p-2 border'>{b.reservationStatus}</td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => changeBookingStatus(b.id, 'Approve')}
                    >
                      Approve
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => changeBookingStatus(b.id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CompanyDashboard