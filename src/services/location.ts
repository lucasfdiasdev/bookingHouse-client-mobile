import axios from 'axios';

import { Location } from '../types/locationIQ';
import { endpoints } from '../constants/Constants';

export const getSuggestedLoction = async (text: string, limit?: number) => {
  try {
    let finalLimit = 8;
    if (limit) finalLimit = limit;
    
    const url = `${endpoints.autoComplete}?location=${text}&limit=${finalLimit}`;
    const { data } = await axios.get<Location[]>(url);

    if (data) return data;

    return[];

  } catch (error) {
    console.log(error);
    return [];

  };
};

export const searchLoction = async (text: string) => {
  try {
    
    const url = `${endpoints.search}?location=${text}`;
    const { data } = await axios.get<Location[]>(url);

    if (data) return data;

    return[];

  } catch (error) {
    console.log(error);
    return [];

  };
};