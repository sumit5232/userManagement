
import { Transporter, createTransport } from 'nodemailer';

const transporter: Transporter = createTransport({
  service: 'Gmail', 
  auth: {
    user: 'sumit.yadav@adstia.com', // Your email address
    pass: 'locr stbq uadi dzmw', 
  },
});

export default transporter;
