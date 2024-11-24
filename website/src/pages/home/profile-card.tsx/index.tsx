import { basicAxios } from '@/services/basicAxios';
import { _USER_PROFILE } from '@/types';
import { useEffect, useState } from 'react';
import Loader from '../../../components/ui/loader';
import { API_ENDPOINTS } from '@/const';
// import './profile-card.css';

// export type _USER_PROFILE = {
//     user_id: string;
//     user_type: string;
//     email: string;
//     user_name: string;
//     broker: string;
// }

const ProfileCard = () => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<_USER_PROFILE>();

    useEffect(() => {
        async function getUser() {
            try {
                const res = await basicAxios(API_ENDPOINTS.ME, undefined, undefined, 'GET');
                // console.log('User:', res.data);

                setUser(res.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        }

        getUser();
    }, []);
    return (
        loading ? <Loader /> :
            user &&
            <div className='border border-input rounded-xl text-card-foreground shadow  p-4 bg-[#000000] w-[300px] '>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <img className='h-12 w-12 rounded-full' src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' alt='User avatar' />
                    </div>
                    <div className='ml-4'>
                        <div className='text-sm font-medium text-white'>{user.user_name}</div>
                        <div className='text-sm font-medium text-gray-400'>{user.email}</div>
                    </div>
                </div>
                <div className='mt-4'>
                    <div className='text-sm font-medium text-gray-400'>Broker: {user.broker}</div>
                </div>
            </div>
    );
}

export default ProfileCard;