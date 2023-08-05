import client from "../types/clientType";
import nodemailer from "nodemailer";
import convig from '../utils/env.config';
class NotifyByEmail {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${convig.TRANSPORTEREMAIL}`,
      pass: `${convig.TRANSPORTERPASSWORD}`,
    },
  });
  public sendEmail(client:client, message:string) : void{
    const mailOptions: nodemailer.SendMailOptions = {
      from: `${convig.TRANSPORTEREMAIL}`,
      to: `${client.email}`,
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