import { useEffect, useState } from "react";
import { useCompanyStore } from "../store/companystore/companyStore";

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

  if (loading) return <div className="pt-30">Loading bookings...</div>;
  if (error) return <div className="pt-30">Error fetching bookings.</div>;

  return (
    <div className="p-4 w-screen min-h-screen pt-30 bg-blue-300">
      <h1 className="text-xl font-bold mb-4">Company Dashboard</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Service Name</th>
                <th className="p-2 border">Client</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
                <th className="p-2 border">Review</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, i) => (
                <tr key={b.id}>
                  <td className="p-2 border text-center">{i + 1}</td>
                  <td className="p-2 border">{b.serviceName}</td>
                  <td className="p-2 border">{b.userName}</td>
                  <td className="p-2 border">{b.userPhone}</td>

                  {/* Editable Date */}
                  <td className="p-2 border">
                    {editId === b.id ? (
                      <input
                        type="datetime-local"
                        name="bookDate"
                        value={editedData.bookDate}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      new Date(b.bookDate).toLocaleString("en-GB", {
                        timeZone: "Asia/Kuala_Lumpur",
                        dateStyle: "medium",
                        timeStyle: "short"
                      })  
                    )}
                  </td>

                  {/* Editable Status */}
                  <td className="p-2 border">
                    {editId === b.id ? (
                      <select
                        name="reservationStatus"
                        value={editedData.reservationStatus}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded w-full"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVE</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    ) : (
                      b.reservationStatus
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-2 border text-center space-x-2">
                    {editId === b.id ? (
                      <>
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={() => handleSave(b.id)}
                        >
                          Save
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {/* <button
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          onClick={() => changeBookingStatus(b.id, "Approve")}
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          onClick={() => changeBookingStatus(b.id, "Rejected")}
                        >
                          Reject
                        </button> */}
                        <button
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          onClick={() => handleEdit(b)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </td>
                  <td className="p-2 border">{b.reviewStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
