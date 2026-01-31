import { z } from "zod";


export const emailOTPschema = z.object({
  otp: z.string().min(6, {
    message : "Verification code at least 6-digits."
  })
});


export type EmailOTP = z.infer<typeof emailOTPschema>;
