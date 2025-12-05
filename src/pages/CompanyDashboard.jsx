import { useEffect, useState } from "react";
import { useCompanyStore } from "../store/companystore/companyStore";
import { Calendar, User, Phone, Edit2, Save, X, CheckCircle, XCircle, AlertCircle, Sparkles } from 'lucide-react';

const CompanyDashboard = () => {
  const { bookings, loading, error, fetchBookings, changeBookingStatus, updateBooking } =
    useCompanyStore();
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleEdit = (booking) => {
    setEditId(booking.id);
    setEditedData({
      bookDate: new Date(
          new Date(booking.bookDate).getTime() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16),
      reservationStatus: booking.reservationStatus,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    const dto = { id, ...editedData };
    await updateBooking(dto);
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      'approved': 'bg-green-100 text-green-800 border-green-300',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'rejected': 'bg-red-100 text-red-800 border-red-300',
      'completed': 'bg-blue-100 text-blue-800 border-blue-300'
    }
    return styles[status?.toLowerCase()] || 'bg-stone-100 text-stone-800 border-stone-300'
  }

  const getStatusIcon = (status) => {
    const lowerStatus = status?.toLowerCase()
    if (lowerStatus === 'approved' || lowerStatus === 'completed') {
      return <CheckCircle size={16} />
    } else if (lowerStatus === 'rejected') {
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
          <p className='text-stone-600 text-lg font-medium'>Loading bookings...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center w-screen min-h-screen bg-[#F9F8F4]'>
        <div className="text-center bg-white p-8 rounded-3xl border-2 border-red-200 max-w-md">
          <XCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-stone-900 mb-2">Error</h2>
          <p className='text-stone-600'>Error fetching bookings. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-screen min-h-screen bg-[#F9F8F4] pt-24 pb-12 px-6 md:px-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles size={32} className="text-[#C5A059]" />
          <h1 className='font-serif text-4xl md:text-5xl font-bold text-stone-900'>
            Booking Management
          </h1>
        </div>
        <p className="text-stone-600 text-lg">
          Manage and track all client appointments
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-stone-200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F9F8F4] rounded-full mb-6">
              <Calendar size={36} className="text-[#C5A059]" />
            </div>
            <h2 className="font-serif text-2xl text-stone-900 mb-3">No Bookings Yet</h2>
            <p className="text-stone-600 text-lg">
              Bookings will appear here once clients start making appointments.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-3xl overflow-hidden border-2 border-stone-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F9F8F4] border-b-2 border-stone-200">
                      <th className="p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-xs">#</th>
                      <th className="p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-xs">Service</th>
                      <th className="p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-xs">Client</th>
                      <th className="p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-xs">Phone</th>
                      <th className="p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-xs">Date & Time</th>
                      <th className="p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-xs">Status</th>
                      <th className="p-4 text-center font-bold text-stone-900 uppercase tracking-wider text-xs">Actions</th>
                      <th className="p-4 text-left font-bold text-stone-900 uppercase tracking-wider text-xs">Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <tr key={b.id} className="border-b border-stone-100 hover:bg-[#F9F8F4] transition-colors">
                        <td className="p-4 text-stone-600 font-semibold">{i + 1}</td>
                        
                        <td className="p-4">
                          <span className="font-serif text-base text-stone-900 font-semibold">
                            {b.serviceName}
                          </span>
                        </td>
                        
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-[#C5A059]" />
                            <span className="text-stone-700 font-medium">{b.userName}</span>
                          </div>
                        </td>
                        
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-[#C5A059]" />
                            <span className="text-stone-600">{b.userPhone}</span>
                          </div>
                        </td>

                        {/* Editable Date */}
                        <td className="p-4">
                          {editId === b.id ? (
                            <input
                              type="datetime-local"
                              name="bookDate"
                              value={editedData.bookDate}
                              onChange={handleChange}
                              className="border-2 border-stone-300 px-3 py-2 rounded-xl w-full focus:border-[#C5A059] focus:outline-none transition-colors text-sm"
                            />
                          ) : (
                            <span className="text-stone-700 font-medium text-sm">
                              {new Date(b.bookDate).toLocaleString("en-GB", {
                                timeZone: "Asia/Kuala_Lumpur",
                                dateStyle: "medium",
                                timeStyle: "short"
                              })}
                            </span>
                          )}
                        </td>

                        {/* Editable Status */}
                        <td className="p-4">
                          {editId === b.id ? (
                            <select
                              name="reservationStatus"
                              value={editedData.reservationStatus}
                              onChange={handleChange}
                              className="border-2 border-stone-300 px-3 py-2 rounded-xl w-full focus:border-[#C5A059] focus:outline-none transition-colors text-sm font-semibold uppercase"
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="APPROVED">APPROVED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>
                          ) : (
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 font-semibold text-xs uppercase tracking-wider ${getStatusBadge(b.reservationStatus)}`}>
                              {getStatusIcon(b.reservationStatus)}
                              {b.reservationStatus}
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            {editId === b.id ? (
                              <>
                                <button
                                  className="flex items-center gap-1 px-4 py-2 bg-[#C5A059] text-white rounded-full hover:bg-stone-900 transition-all font-semibold text-sm"
                                  onClick={() => handleSave(b.id)}
                                >
                                  <Save size={16} />
                                  Save
                                </button>
                                <button
                                  className="flex items-center gap-1 px-4 py-2 bg-stone-300 text-stone-900 rounded-full hover:bg-stone-400 transition-all font-semibold text-sm"
                                  onClick={handleCancel}
                                >
                                  <X size={16} />
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                className="flex items-center gap-1 px-4 py-2 bg-[#F9F8F4] text-stone-900 border-2 border-stone-300 rounded-full hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-semibold text-sm"
                                onClick={() => handleEdit(b)}
                              >
                                <Edit2 size={16} />
                                Edit
                              </button>
                            )}
                          </div>
                        </td>
                        
                        <td className="p-4">
                          <span className="text-stone-600 font-medium text-sm capitalize">
                            {b.reviewStatus || 'Not Reviewed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {bookings.map((b, i) => (
                <div key={b.id} className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-[#F9F8F4] text-stone-600 rounded-full font-bold text-xs mb-2">
                        #{i + 1}
                      </span>
                      <h3 className="font-serif text-xl text-stone-900 font-bold mb-2">
                        {b.serviceName}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-[#C5A059]" />
                      <span className="text-stone-700 font-medium text-sm">{b.userName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#C5A059]" />
                      <span className="text-stone-600 text-sm">{b.userPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#C5A059]" />
                      <span className="text-stone-700 font-medium text-sm">
                        {editId === b.id ? (
                          <input
                            type="datetime-local"
                            name="bookDate"
                            value={editedData.bookDate}
                            onChange={handleChange}
                            className="border-2 border-stone-300 px-3 py-2 rounded-xl w-full focus:border-[#C5A059] focus:outline-none mt-1"
                          />
                        ) : (
                          new Date(b.bookDate).toLocaleString("en-GB", {
                            timeZone: "Asia/Kuala_Lumpur",
                            dateStyle: "medium",
                            timeStyle: "short"
                          })
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    {editId === b.id ? (
                      <select
                        name="reservationStatus"
                        value={editedData.reservationStatus}
                        onChange={handleChange}
                        className="border-2 border-stone-300 px-3 py-2 rounded-xl w-full focus:border-[#C5A059] focus:outline-none font-semibold text-sm uppercase"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 font-semibold text-xs uppercase tracking-wider ${getStatusBadge(b.reservationStatus)}`}>
                        {getStatusIcon(b.reservationStatus)}
                        {b.reservationStatus}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {editId === b.id ? (
                      <>
                        <button
                          className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-[#C5A059] text-white rounded-full hover:bg-stone-900 transition-all font-semibold text-sm"
                          onClick={() => handleSave(b.id)}
                        >
                          <Save size={16} />
                          Save
                        </button>
                        <button
                          className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-stone-300 text-stone-900 rounded-full hover:bg-stone-400 transition-all font-semibold text-sm"
                          onClick={handleCancel}
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="w-full flex items-center justify-center gap-1 px-4 py-2 bg-[#F9F8F4] text-stone-900 border-2 border-stone-300 rounded-full hover:border-[#C5A059] hover:text-[#C5A059] transition-all font-semibold text-sm"
                        onClick={() => handleEdit(b)}
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                    )}
                  </div>

                  {b.reviewStatus && (
                    <div className="mt-3 pt-3 border-t border-stone-200">
                      <span className="text-xs text-stone-500 uppercase tracking-wider">Review: </span>
                      <span className="text-stone-700 font-medium text-sm capitalize">{b.reviewStatus}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
