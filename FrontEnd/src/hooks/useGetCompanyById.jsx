import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setSingleCompany } from '@/Redux/companyslice';

const useGetCompanyById = (id) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompany = async () => {
        try{
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`,{withCredentials:true});
            console.log('Jobs API Response:', res.data);
            const ok = res.data.success || res.data.sucess;
            if (ok) {
              dispatch(setSingleCompany(res.data.company || []));
            } else {
              console.log('API returned false success');
              dispatch(setSingleCompany(null));
            }
        } catch (e) {
          console.log('Error fetching company:', e);
          dispatch(setSingleCompany(null));
        }
    }
    fetchCompany();
  },[id, dispatch])
}

export default useGetCompanyById
