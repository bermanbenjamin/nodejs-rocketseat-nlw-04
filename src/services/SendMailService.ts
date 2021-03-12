import nodemailer, { Transporter } from "nodemailer";
import { resolve } from "path";
import handlebars from "handlebars";
import fs from "fs";

class SendMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async execute(to: string, subject: string, variables: object, body: string) {
    const templateFileContent = fs.readFileSync(npsPath).toString("utf8");

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse({
      name: to,
      title: subject,
      description: body,
    });

    from: "NPS <noreplay@nps.com.br>",

    const message = await this.client.sendMail(variables);

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
