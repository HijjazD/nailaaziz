import { useEffect } from 'react'
import { useClientBookingStore } from '../store/clientstore/clientBookingStore'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Sparkles } from 'lucide-react'

const ClientBookings = () => {
    const { loading, error, fetchMyBookings, clientBookings } = useClientBookingStore()

    useEffect(() => {
        fetchMyBookings()
    }, [fetchMyBookings])

    const getStatusBadge = (status) => {
        const styles = {
            'confirmed': 'bg-green-100 text-green-800 border-green-300',
            'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
            'cancelled': 'bg-red-100 text-red-800 border-red-300',
            'completed': 'bg-blue-100 text-blue-800 border-blue-300'
        }
        return styles[status?.toLowerCase()] || 'bg-stone-100 text-stone-800 border-stone-300'
    }

    const getStatusIcon = (status) => {
        const lowerStatus = status?.toLowerCase()
        if (lowerStatus === 'confirmed' || lowerStatus === 'completed') {
            return <CheckCircle size={16} />
        } else if (lowerStatus === 'cancelled') {
            return <XCircle size={16} />
        } else {
            return <AlertCircle size={16} />
        }
    }

    if (loading) {
        return (
            <div className='flex items-center justify-center w-screen min-h-screen bg-[#F9F8F4]'>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#C5A059] border-t-transparent mx-auto mb-4"></div>
                    <p className='text-stone-600 text-lg font-medium'>Loading your bookings...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex items-center justify-center w-screen min-h-screen bg-[#F9F8F4]'>
                <div className="text-center bg-white p-8 rounded-3xl border-2 border-red-200 max-w-md">
                    <XCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="font-serif text-2xl text-stone-900 mb-2">Oops!</h2>
                    <p className='text-stone-600'>Error fetching your bookings. Please try again later.</p>
                </div>
            </div>
        )
    }

    return (
        <div className='w-screen min-h-screen bg-[#F9F8F4] pt-24 pb-12 px-6 md:px-12'>
            {/* Page Header */}
            <div className="max-w-6xl mx-auto mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <Calendar size={32} className="text-[#C5A059]" />
                    <h1 className='font-serif text-4xl md:text-5xl font-bold text-stone-900'>
                        My Bookings
                    </h1>
                </div>
                <p className="text-stone-600 text-lg">
                    Track and manage your wellness appointments
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                {clientBookings.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border-2 border-stone-200">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F9F8F4] rounded-full mb-6">
                            <Sparkles size={36} className="text-[#C5A059]" />
                        </div>
                        <h2 className="font-serif text-2xl text-stone-900 mb-3">No Bookings Yet</h2>
                        <p className="text-stone-600 text-lg mb-6">
                            Start your wellness journey by booking your first appointment.
                        </p>
                        <a 
                            href="/client/dashboard"
                            className="inline-block px-8 py-3 bg-[#C5A059] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-stone-900 transition-all shadow-md hover:shadow-lg"
                        >
                            Browse Services
                        </a>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block bg-white rounded-3xl overflow-hidden border-2 border-stone-200 shadow-sm">
                            <table className='w-full'>
                                <thead>
                                    <tr className='bg-[#F9F8F4] border-b-2 border-stone-200'>
                                        <th className='p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-sm'>#</th>
                                        <th className='p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-sm'>Service</th>
                                        <th className='p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-sm'>Date & Time</th>
                                        <th className='p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-sm'>Status</th>
                                        <th className='p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-sm'>Review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientBookings.map((b, i) => (
                                        <tr key={b.id} className='border-b border-stone-100 hover:bg-[#F9F8F4] transition-colors'>
                                            <td className='p-4 text-stone-600 font-semibold'>{i + 1}</td>
                                            <td className='p-4'>
                                                <span className="font-serif text-lg text-stone-900 font-semibold">
                                                    {b.serviceName}
                                                </span>
                                            </td>
                                            <td className='p-4'>
                                                <div className="flex items-center gap-2 text-stone-600">
                                                    <Clock size={16} className="text-[#C5A059]" />
                                                    <span className="font-medium">
                                                        {new Date(b.bookDate).toLocaleString('en-US', {
                                                            dateStyle: 'medium',
                                                            timeStyle: 'short'
                                                        })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='p-4'>
                                                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-semibold text-sm uppercase tracking-wider ${getStatusBadge(b.reservationStatus)}`}>
                                                    {getStatusIcon(b.reservationStatus)}
                                                    {b.reservationStatus}
                                                </span>
                                            </td>
                                            <td className='p-4'>
                                                <span className="text-stone-600 font-medium capitalize">
                                                    {b.reviewStatus || 'Not Reviewed'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {clientBookings.map((b, i) => (
                                <div key={b.id} className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="inline-block px-3 py-1 bg-[#F9F8F4] text-stone-600 rounded-full font-bold text-xs mb-2">
                                                #{i + 1}
                                            </span>
                                            <h3 className="font-serif text-xl text-stone-900 font-bold">
                                                {b.serviceName}
                                            </h3>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-stone-600">
                                            <Clock size={16} className="text-[#C5A059]" />
                                            <span className="font-medium text-sm">
                                                {new Date(b.bookDate).toLocaleString('en-US', {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 font-semibold text-xs uppercase tracking-wider ${getStatusBadge(b.reservationStatus)}`}>
                                            {getStatusIcon(b.reservationStatus)}
                                            {b.reservationStatus}
                                        </span>
                                        <span className="inline-flex items-center px-3 py-1.5 bg-stone-100 text-stone-600 rounded-full font-medium text-xs">
                                            {b.reviewStatus || 'Not Reviewed'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ClientBookings
