import React, { useState, useEffect } from 'react';
import { service1, service2, service3, service4 } from '../constants/services';

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { useClientBookingStore } from '../store/clientstore/clientBookingStore';

import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null);

  const { bookAppointment, loading, error, success, resetBookingState } = useClientBookingStore();

  const navigate = useNavigate()

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleBookingAppointment = async(e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time")
      return
    }

    const combinedDateTime = new Date(selectedDate);
    combinedDateTime.setHours(selectedTime.getHours());
    combinedDateTime.setMinutes(selectedTime.getMinutes());

    console.log('Service:', selectedService?.name);
    console.log('Combined date/time:', combinedDateTime.toISOString());
    await bookAppointment(selectedService.id, combinedDateTime);
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        closeModal();
        navigate('/client/dashboard/mybookings'); // ✅ correct path
        resetBookingState(); // optional cleanup from zustand
      }, 1500);
    }
  }, [success, navigate, closeModal, resetBookingState]);


  return (
    <section className='w-screen min-h-screen bg-amber-300 pt-30 pl-2.5 pr-5'>
      {[service1, service2, service3, service4].map((service, index) => (
        <div key={index} className="relative w-full max-w-5xl mx-auto mb-6">
          {/* Shadow card */}
          <div className="absolute top-2 left-2 w-full h-[310px] bg-black rounded-3xl"></div>

          {/* Main card */}
          <div className="relative w-full bg-blue-400 rounded-3xl h-[300px] border-4 border-black">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white">{service.name}</h3>
              <p className="text-white mt-2">{service.description}</p>
            </div>
            <div className="absolute bottom-6 left-6">
              <button
                onClick={() => openModal(service)}
                className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md relative shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">
              Book Appointment
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              You are booking: <strong>{selectedService?.name}</strong>
            </p>

            {/* Date Picker */}
            <div className="flex flex-col items-center mb-6">
              <label className="font-semibold text-gray-800 mb-2">
                Select appointment date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full text-center"
                placeholderText="Choose a date"
              />
            </div>

            {/* Time Picker */}
            <div className="flex flex-col items-center mb-6">
              <label className="font-semibold text-gray-800 mb-2">
                Select appointment time:
              </label>
              <DatePicker
                selected={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full text-center"
                placeholderText="Choose a time"
              />
            </div>

            {/* Status Messages */}
            <div className="text-center mb-4 h-6">
              {loading && <p className="text-blue-600 font-medium">Booking in progress...</p>}
              {error && <p className="text-red-600 font-medium">{error}</p>}
              {success && <p className="text-green-600 font-medium">Booking confirmed!</p>}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={closeModal}
                disabled={loading}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingAppointment}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                {loading ? 'Booking...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClientDashboard;
