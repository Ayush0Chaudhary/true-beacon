// export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';


export const API_ENDPOINTS = {
    
    // AUTH API
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    STATUS: '/user/status',
    ME: '/user/profile',

    // USERS API
    HOLDINGS: '/users/portfolio/holdings',
    ORDER: '/users/order/place_order',

};
