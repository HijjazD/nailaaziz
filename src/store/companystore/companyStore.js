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
}))
