import { getToken } from "../../util/jwtToken";
import {create} from 'zustand'
import axios from 'axios'

const dev_api_url = 'http://localhost:4000/'
const prod_api_url = 'https://xenial-edyth-spakaknel-65446e30.koyeb.app/'

export const useCompanyStore = create((set,get) => ({
    bookings: [],
    loading: false,
    error: null,

    fetchBookings: async() => {
        set({ loading: true, error:null })
        try {
            const token = getToken()
            const response = await axios.get(
                `${prod_api_url}api/company/reservations`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            )
            console.log(response.data)
            set({ bookings: response.data, loading: false })
        } catch (error) {
            console.error('Error fetching bookings:', error)
            set({ error, loading: false })
        }
    },
    changeBookingStatus: async (id, status) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(
            `${prod_api_url}api/company/booking/${id}/${status}`,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
            );

            // ✅ Update frontend state immediately
            set((state) => ({
            bookings: state.bookings.map((b) =>
                b.id === id ? { ...b, reservationStatus: status } : b
            ),
            loading: false,
            }));
        } catch (error) {
            console.log("error changing booking status", error);
            set({ error, loading: false });
        }
    },

    updateBooking: async (updatedData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put(
            `${prod_api_url}api/company/update-booking`,
            updatedData, // directly send reservationDTO
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, // cookie-based auth
            }
            );

            // ✅ Update frontend immediately
            set((state) => ({
                bookings: state.bookings.map((b) =>
                    b.id === updatedData.id
                    ? { ...b, ...updatedData, bookDate: new Date(updatedData.bookDate) }
                    : b
                ),
                loading: false,
            }));

            console.log("Booking updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating booking:", error);
            set({ error, loading: false });
        }
    },


}))
