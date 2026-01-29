import axiosInstance from "./axiosInstance";

// ارسال کد OTP به شماره موبایل
export const sendOTP = async (mobile_number) => {
  try {
    const res = await axiosInstance.post("chelseru/otp/send/", { mobile_number });
    return res.data; // { details: "The OTP code was sent correctly." }
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
};

export const loginWithOTP = async (mobile_number, code) => {
  try {
    const res = await axiosInstance.post("chelseru/authenticate/", {
      mobile_number,
      code,
      group: 0 // همیشه 0
    });
    return res.data; // { access: "...", refresh: "..." }
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw err;
  }
};