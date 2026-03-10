import { setCompanies } from '@/Redux/companyslice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompanies = async () => {
        try{
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials:true});
            console.log('Companies API Response:', res.data);
            const ok = res.data.success || res.data.sucess;
            if (ok) {
              dispatch(setCompanies(res.data.companies || []));
            } else {
              console.log('API returned false success');
              dispatch(setCompanies(null));
            }
        } catch (e) {
          console.log('Error fetching company:', e);
          dispatch(setCompanies(null));
        }
    }
    fetchCompanies();
  },[dispatch])
}

export default useGetAllCompanies