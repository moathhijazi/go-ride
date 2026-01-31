import { z } from "zod";


export const restSchema = z.object({
  fullName: z.string().min(6, {
    message : "Full name must be at least 6 letters"
  }),
  phoneNumber : z.string().min(9 , {
    message : "Phone number must be 10-digits"
  })
});


export type RestSchema = z.infer<typeof restSchema>;
