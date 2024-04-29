import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const emailHost: string = process.env.EMAIL_SMTP!;
        const emailUser: string = process.env.EMAIL_USER!;
        const emailPass: string = process.env.EMAIL_PASS!;
        const emailPort: number = Number(process.env.EMAIL_PORT!);
        const body = await req.json();
        const {
            firstName,
            lastName,
            email,
            tel,
            password,
            passwordConfirm,
            accountType,
        } = body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !tel ||
            !password ||
            !passwordConfirm ||
            !accountType
        ) {
            return new NextResponse(
                "Dados inválidos, verifique e tente novamente",
                { status: 401 },
            );
        }

        const userExists = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (userExists) {
            return new NextResponse("Usuário já está cadastrado", {
                status: 405,
            });
        }

        if (password !== passwordConfirm) {
            return new NextResponse(
                "Senhas não coincidem, verifique e tente novamente",
                { status: 401 },
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        let user;

        if (accountType === "Student") {
            user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    tel,
                    password: hashedPassword,
                    accountType: AccountRole.STUDENT,
                },
            });

            if (body.subject && body.description) {
                await prisma.request.create({
                    data: {
                        subject: body.subject,
                        description: body.description,
                        userIds: [user.id],
                    },
                });
            }

            const transport = nodemailer.createTransport({
                host: emailHost,
                port: emailPort,
                auth: {
                    user: emailUser,
                    pass: emailPass,
                },
            });

            const mailData = {
                from: emailUser,
                to: email,
                subject: "Confirme sua conta - O Sapiente",
                html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-50 {
    width: 300px !important;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_2 .v-col-border { border-top: 0px solid transparent !important;border-left: 0px solid transparent !important;border-right: 0px solid transparent !important;border-bottom: 0px solid transparent !important; } #u_content_image_2 .v-container-padding-padding { padding: 40px 10px 10px !important; } #u_column_3 .v-col-border { border-top: 0px solid transparent !important;border-left: 0px solid transparent !important;border-right: 0px solid transparent !important;border-bottom: 0px solid transparent !important; } #u_content_text_1 .v-container-padding-padding { padding: 10px !important; } #u_content_text_1 .v-text-align { text-align: center !important; } #u_content_text_6 .v-container-padding-padding { padding: 10px 10px 20px !important; } #u_content_image_4 .v-container-padding-padding { padding: 20px 10px 40px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ecf0f1;"><![endif]-->
    
  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="background-color: #f0f5f8;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #f0f5f8;height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
        
  <h1 class="v-text-align" style="margin: 0px; color: #393f42; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 30px; font-weight: 700;">Ative Sua Conta e Desbloqueie um Mundo de Conhecimento</h1>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-border" style="background-color: #f0f5f8;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_2" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="background-color: #f0f5f8;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_image_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 10px;font-family:'Raleway',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="cid:image-1" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 80%;max-width: 224px;" width="224"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-border" style="background-color: #f0f5f8;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_3" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="background-color: #f0f5f8;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:80px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
        
  <div class="v-text-align" style="font-size: 16px; color: #393f42; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;"><span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiaVppZVJ3elpVbXhzTkswWkZOMThraiIsInBhc3RlSUQiOjE2NjAxMjUwNzksImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;" style="line-height: 22.4px;"></span><span data-buffer="&lt;!--(figma)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(/figma)--&gt;" style="line-height: 22.4px;"></span>Sua busca pelo conhecimento começa aqui. Clique no botão de confirmação e prepare-se para uma experiência educacional incrível.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
        
  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div class="v-text-align" align="left">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/?id=${user.id}&confirmed=true&type=student" style="height:39px; v-text-anchor:middle; width:214px;" arcsize="10.5%"  stroke="f" fillcolor="#03c988"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
    <a href="http://localhost:3000/?id=${user.id}&confirmed=true&type=student" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #03c988; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 16px;font-weight: 700; ">
      <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 19.2px;">Confirmar minha conta</span></span>
    </a>
    <!--[if mso]></center></v:roundrect><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="background-color: #37474f;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #37474f;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_text_6" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px;font-family:'Raleway',sans-serif;" align="left">
        
  <div class="v-text-align" style="font-size: 14px; color: #ffffff; line-height: 170%; text-align: center; word-wrap: break-word;">
    <p style="line-height: 170%;">POLÍTICA DE PRIVACIDADE  |   SITE</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Raleway',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_image_4" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px;font-family:'Raleway',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="cid:image-2" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 146px;" width="146"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
`,
                attachments: [
                    {
                        filename: "image-1.png",
                        path: "public/assets/images/image-1.png",
                        cid: "image-1",
                    },
                    {
                        filename: "image-2.png",
                        path: "public/assets/images/image-2.png",
                        cid: "image-2",
                    },
                ],
            };

            transport.sendMail(mailData, (error) => {
                if (error) {
                    console.log("[ERROR_ON_CONFIRMATION_EMAIL]", error);

                    return new NextResponse(
                        "Ocorreu um erro no envio do e-mail de confirmação da sua conta",
                        {
                            status: 400,
                        },
                    );
                }
            });
        }

        if (accountType === "Professor") {
            user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    tel,
                    password: hashedPassword,
                    accountType: AccountRole.PROFESSOR,
                },
            });
        }

        if (!user) {
            return new NextResponse(
                "Ocorreu um erro durante a criação da conta, tente novamente",
                {
                    status: 400,
                },
            );
        }

        return NextResponse.json({ id: user.id });
    } catch (error: any) {
        console.log("[ERROR_PROFESSOR_PRE_REGISTER]", error);
        return new NextResponse(
            "Ocorreu um erro durante o cadastro, tente novamente!",
            {
                status: 400,
            },
        );
    }
}
