
import { getOtp } from "./mailosaurHelper"

export const getOTP = async(email) => {
        const localPart = email.split('@')[0];
        const otp = await getOtp(localPart);
        return otp;
    }