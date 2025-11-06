import {getToken, getUserId} from '../../util/jwtToken'
import { create } from 'zustand'
import axios from 'axios'

const dev_api_url = 'http://localhost:4000/'
const prod_api_url = 'https://xenial-edyth-spakaknel-65446e30.koyeb.app/'

export const useClientBookingStore = create((set) => ({
    loading: false,
    error: null,
    success: false,
    booking: null,
    clientBookings: [],
    reviews: [],

    bookAppointment: async (adId, bookingDate) => {
        // const token = getToken()
        // const userId = getUserId()

        // if (!token || !userId) {
        //     set({ error: 'Unauthorized: Missing token or userId' })
        //     return
        // }

        const bookingData = {
            adId,
            bookDate: bookingDate.toISOString(),
        }


        try {
            set({ loading: true, error: null, success: false })

            const response = await axios.post(
                `${prod_api_url}api/client/book-service`,
                bookingData,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )

            set({
                loading: false,
                success: true,
                booking: response.data,
            })
            console.log('✅ Booking success:', response.data)
            return response.data
        } catch (error) {
            console.error('❌ Booking failed:', error)
            set({
                loading: false,
                error: error.response?.data?.message || 'Booking failed. Try again.',
            })
        }
    },

    fetchMyBookings: async () => {
        set({ loading: true, error: null })
        try {

        const response = await axios.get(
            `${prod_api_url}api/client/my-bookings`,
            {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
            }
        )

        set({ clientBookings: response.data, loading: false })
        } catch (error) {
        console.error('Error fetching client bookings:', error)
        set({ error, loading: false })
        }
    },

    fetchReviews: async () => {
        try {
            const response = await axios.get(
                `${prod_api_url}api/client/getreview`
            )
            set({ reviews: response.data })
        } catch (error) {
            console.log(error)

        }
    },

    resetBookingState: () => set({
        loading: false,
        error: null,
        success: false,
        booking: null,
        clientBookings: []
    }),
}))
