import React, { useState, useEffect } from 'react';
import { service1, service2, service3, service4 } from '../constants/services';
import { Sparkles, Calendar, Clock } from 'lucide-react';

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
        navigate('/client/dashboard/mybookings');
        resetBookingState();
      }, 1500);
    }
  }, [success, navigate, resetBookingState]);

  return (
    <section className='w-screen min-h-screen bg-[#F9F8F4] pt-24 pb-12 px-6 md:px-12'>
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles size={24} className="text-[#C5A059]" />
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 font-bold">
            Book Your Experience
          </h1>
        </div>
        <p className="text-stone-600 text-lg max-w-2xl mx-auto">
          Choose from our curated wellness services designed to restore balance and vitality.
        </p>
      </div>

      {/* Service Cards */}
      <div className="max-w-6xl mx-auto space-y-8">
        {[service1, service2, service3, service4].map((service, index) => (
          <div key={index} className="group relative">
            {/* Shadow effect */}
            <div className="absolute top-2 left-2 w-full h-full bg-stone-900 rounded-3xl opacity-20"></div>

            {/* Main card */}
            <div className="relative w-full bg-white rounded-3xl border-2 border-stone-200 overflow-hidden hover:border-[#C5A059] transition-all duration-300 hover:shadow-xl">
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-stone-600 text-base md:text-lg leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                  <button
                    onClick={() => openModal(service)}
                    className="px-8 py-3 bg-[#C5A059] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-stone-900 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-6"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-3xl p-8 md:p-10 w-full max-w-lg relative shadow-2xl border-2 border-stone-200">
            {/* Header with icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F9F8F4] rounded-full mb-4">
                <Sparkles size={28} className="text-[#C5A059]" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-2">
                Book Appointment
              </h2>
              <p className="text-stone-600 text-lg">
                {selectedService?.name}
              </p>
            </div>

            {/* Date Picker */}
            <div className="mb-6">
              <label className="flex items-center gap-2 font-semibold text-stone-900 mb-3 text-sm uppercase tracking-wider">
                <Calendar size={18} className="text-[#C5A059]" />
                Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                className="border-2 border-stone-300 rounded-xl px-4 py-3 w-full text-center font-medium focus:border-[#C5A059] focus:outline-none transition-colors"
                placeholderText="Choose a date"
              />
            </div>

            {/* Time Picker */}
            <div className="mb-8">
              <label className="flex items-center gap-2 font-semibold text-stone-900 mb-3 text-sm uppercase tracking-wider">
                <Clock size={18} className="text-[#C5A059]" />
                Select Time
              </label>
              <DatePicker
                selected={selectedTime}
                onChange={(time) => setSelectedTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="border-2 border-stone-300 rounded-xl px-4 py-3 w-full text-center font-medium focus:border-[#C5A059] focus:outline-none transition-colors"
                placeholderText="Choose a time"
              />
            </div>

            {/* Status Messages */}
            <div className="text-center mb-6 min-h-[24px]">
              {loading && (
                <p className="text-[#C5A059] font-semibold animate-pulse">
                  Booking in progress...
                </p>
              )}
              {error && (
                <p className="text-red-600 font-semibold">{error}</p>
              )}
              {success && (
                <p className="text-green-600 font-semibold">✓ Booking confirmed!</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={closeModal}
                disabled={loading}
                className="flex-1 bg-stone-200 text-stone-900 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-stone-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingAppointment}
                disabled={loading}
                className="flex-1 bg-[#C5A059] text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-stone-900 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
