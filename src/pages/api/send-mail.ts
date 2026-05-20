import { admin } from "constant";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type Data = {
  error: Error;
  message: string;
};

export const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@yarderp.com",
    pass: "Noreplyyarderp@2023",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Data>>
) {
  if (req.method === "POST") {
    const { to, subject, html, contactData } = req.body;
    admin.database().ref(`/contact`).push(contactData);
    transporter.sendMail(
      {
        from: `YardERP <noreply@yarderp.com>`,
        to,
        subject,
        html,
      },
      (err, info) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: "success" });
      }
    );
  }
}
