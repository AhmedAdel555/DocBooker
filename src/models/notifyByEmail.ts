import client from "../types/clientType";
import nodemailer from "nodemailer";
import convig from '../utils/env.config';
class NotifyByEmail {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: `${convig.TRANSPORTEREMAIL}`,
      pass: `${convig.TRANSPORTERPASSWORD}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  public sendEmail(client:client, message:string) : void{
    console.log(client);
    const mailOptions: nodemailer.SendMailOptions = {
      from: `${convig.TRANSPORTEREMAIL}`,
      to: `hamadadola.2002@gmail.com`,
      subject: 'DoctorBooker.com',
      text: message,
    };

    this.transporter.sendMail(mailOptions, function (error: Error | null, info: nodemailer.SentMessageInfo) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

export default NotifyByEmail;