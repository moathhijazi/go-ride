import { User } from '@/types/user';
import * as Secure from "expo-secure-store";
import { useState } from "react";
import { useApi } from '@/hooks/use-api';

export const useAuth = () => {
    const [isAuthenticated , setAuth] = useState(false);
    const [user , setUser] = useState<User | null>(null);
    const [infoCompleted , setInfoCompleted] = useState(false);

    const [loading , setLoading] = useState(true);
    const { post } = useApi();
    const USER_KEY = 'secure-user';

    const fetchUser = async () => {
        try{
            const response = await post('/get-user');
            
        }catch(e){
            
        }finally{

        }
    }
}