import axios from "axios";
import { User } from "../types/user";
import { endpoints } from "../constants/Constants";
import { handleError } from "../utils/handleErrors";

type DataRes = {data: User};

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.register, {
      email,
      password,
      firstName,
      lastName
    });
    if (data) return data;
    
    return null;

  } catch (error) {
    handleError(error);
  };

};

export const loginUser = async (
  email: string,
  password: string
) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.login, {
      email,
      password
    });
    
    if (data) return data;
    return null;

  } catch (error) {
    handleError(error);  
  };
};

export const facebookLoginOrRegister = async (accesToken: string) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.facebook, {
      accesToken
    });

    if (data) return data;

    return null;

  } catch (error) {
    handleError(error);
  };
};

export const googleLoginOrRegister = async (accesToken: string) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.google, {
      accesToken
    });

    if (data) return data;

    return null;

  } catch (error) {
    handleError(error);
  };

};

export const appleLoginOrRegister = async (identityToken: string) => {
  try {
    const { data }: DataRes = await axios.post(endpoints.apple, {
      identityToken,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};