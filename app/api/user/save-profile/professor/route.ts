import axios from "axios";
import S3 from "aws-sdk/clients/s3";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

// TODO adicionar função para enviar email de confirmação
export async function PATCH(req: NextRequest) {
  //   try {
  //     const s3 = new S3({
  //       region: "sa-east-1",
  //       accessKeyId: process.env.NEXT_S3_PUBLIC_ACCESS_KEY,
  //       secretAccessKey: process.env.NEXT_S3_PUBLIC_SECRET_KEY,
  //       signatureVersion: "v4",
  //     });
  //
  //     const body = await req.formData();
  //     const profilePhoto: File | null = body.get("profilePhoto") as unknown as File;
  //     const themes: string[] = JSON.parse(body.get("themes") as unknown as string);
  //     const aboutMe: string = body.get("aboutMe") as string;
  //     const id: string = body.get("id") as string;
  //     let updatedProfessor = null;
  //
  //     if (themes.length === 0 || !aboutMe || !id) {
  //       return new NextResponse("Dados inválidos, verifique e tente novamente", {
  //         status: 401,
  //       });
  //     }
  //
  //     if (profilePhoto) {
  //       const bytes = await profilePhoto.arrayBuffer();
  //       const buffer = Buffer.from(bytes);
  //
  //       let errorOnS3 = false;
  //
  //       const fileParams = {
  //         Bucket: `${process.env.NEXT_S3_PUBLIC_BUCKET_NAME}/profile`,
  //         Key: profilePhoto.creditCvc,
  //         Expires: 600,
  //         ContentType: profilePhoto.type,
  //       };
  //
  //       const url = await s3.getSignedUrlPromise("putObject", fileParams);
  //
  //       updatedProfessor = await prisma.user.update({
  //         where: {
  //           id,
  //           accountType: AccountRole.PROFESSOR,
  //         },
  //         data: {
  //           themes,
  //           aboutMe,
  //           profilePhoto: `${process.env.NEXT_S3_PUBLIC_URL}/profile/${profilePhoto.creditCvc}`,
  //           isCompleted: true,
  //         },
  //       });
  //
  //       if (!updatedProfessor) {
  //         return new NextResponse("Cadastro não encontrado", { status: 404 });
  //       }
  //
  //       await axios
  //         .put(url, buffer, {
  //           headers: {
  //             "Content-type": String(profilePhoto.type),
  //           },
  //         })
  //         .then(() => {
  //           errorOnS3 = false;
  //         })
  //         .catch((error) => {
  //           if (error) {
  //             errorOnS3 = true;
  //           }
  //         });
  //
  //       if (errorOnS3) {
  //         await prisma.user.update({
  //           where: {
  //             id,
  //             accountType: AccountRole.PROFESSOR,
  //           },
  //           data: {
  //             profilePhoto: "",
  //           },
  //         });
  //
  //         return new NextResponse("Ocorreu um erro durante o envio, tente novamente!", {
  //           status: 424,
  //         });
  //       }
  //     } else {
  //       updatedProfessor = await prisma.user.update({
  //         where: {
  //           id,
  //           accountType: AccountRole.PROFESSOR,
  //         },
  //         data: {
  //           themes,
  //           aboutMe,
  //           isCompleted: true,
  //         },
  //       });
  //     }
  //
  //     const transport = nodemailer.createTransport({
  //       host: "sandbox.smtp.mailtrap.io",
  //       port: 2525,
  //       auth: {
  //         user: process.env.MAILTRAP_USER,
  //         pass: process.env.MAILTRAP_PASS,
  //       },
  //     });
  //
  //     const mailData = {
  //       from: "atendimento@osapiente.com.br",
  //       to: updatedProfessor.email,
  //       subject: "Confirme sua conta - O Sapiente",
  //       html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  // <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  // <head>
  // <!--[if gte mso 9]>
  // <xml>
  //   <o:OfficeDocumentSettings>
  //     <o:AllowPNG/>
  //     <o:PixelsPerInch>96</o:PixelsPerInch>
  //   </o:OfficeDocumentSettings>
  // </xml>
  // <![endif]-->
  //   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <meta name="x-apple-disable-message-reformatting">
  //   <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  //   <title></title>
  //
  //     <style type="text/css">
  //       @media only screen and (min-width: 620px) {
  //   .u-row {
  //     width: 600px !important;
  //   }
  //   .u-row .u-col {
  //     vertical-align: top;
  //   }
  //
  //   .u-row .u-col-50 {
  //     width: 300px !important;
  //   }
  //
  //   .u-row .u-col-100 {
  //     width: 600px !important;
  //   }
  //
  // }
  //
  // @media (max-width: 620px) {
  //   .u-row-container {
  //     max-width: 100% !important;
  //     padding-left: 0px !important;
  //     padding-right: 0px !important;
  //   }
  //   .u-row .u-col {
  //     min-width: 320px !important;
  //     max-width: 100% !important;
  //     display: block !important;
  //   }
  //   .u-row {
  //     width: 100% !important;
  //   }
  //   .u-col {
  //     width: 100% !important;
  //   }
  //   .u-col > div {
  //     margin: 0 auto;
  //   }
  // }
  // body {
  //   margin: 0;
  //   padding: 0;
  // }
  //
  // table,
  // tr,
  // td {
  //   vertical-align: top;
  //   border-collapse: collapse;
  // }
  //
  // p {
  //   margin: 0;
  // }
  //
  // .ie-container table,
  // .mso-container table {
  //   table-layout: fixed;
  // }
  //
  // * {
  //   line-height: inherit;
  // }
  //
  // a[x-apple-data-detectors='true'] {
  //   color: inherit !important;
  //   text-decoration: none !important;
  // }
  //
  // table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_column_2 .v-col-border { border-top: 0px solid transparent !important;border-left: 0px solid transparent !important;border-right: 0px solid transparent !important;border-bottom: 0px solid transparent !important; } #u_content_image_2 .v-container-padding-padding { padding: 40px 10px 10px !important; } #u_column_3 .v-col-border { border-top: 0px solid transparent !important;border-left: 0px solid transparent !important;border-right: 0px solid transparent !important;border-bottom: 0px solid transparent !important; } #u_content_text_1 .v-container-padding-padding { padding: 10px !important; } #u_content_text_1 .v-text-align { text-align: center !important; } #u_content_text_6 .v-container-padding-padding { padding: 10px 10px 20px !important; } #u_content_image_4 .v-container-padding-padding { padding: 20px 10px 40px !important; } }
  //     </style>
  //
  //
  //
  // <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
  //
  // </head>
  //
  // <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
  //   <!--[if IE]><div class="ie-container"><![endif]-->
  //   <!--[if mso]><div class="mso-container"><![endif]-->
  //   <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
  //   <tbody>
  //   <tr style="vertical-align: top">
  //     <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
  //     <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ecf0f1;"><![endif]-->
  //
  //
  //
  // <div class="u-row-container" style="padding: 0px;background-color: transparent">
  //   <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
  //     <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
  //       <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  //
  // <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="background-color: #f0f5f8;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  // <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  //   <div style="background-color: #f0f5f8;height: 100%;width: 100% !important;">
  //   <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  //
  // <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  //   <tbody>
  //     <tr>
  //       <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
  //
  //   <h1 class="v-text-align" style="margin: 0px; color: #393f42; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 30px; font-weight: 700;">Bem-vindo à Comunidade de Educadores</h1>
  //
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  //
  //   <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  //   </div>
  // </div>
  // <!--[if (mso)|(IE)]></td><![endif]-->
  //       <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  //     </div>
  //   </div>
  //   </div>
  //
  //
  //
  //
  //
  // <div class="u-row-container" style="padding: 0px;background-color: transparent">
  //   <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
  //     <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
  //       <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  //
  // <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-border" style="background-color: #f0f5f8;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  // <div id="u_column_2" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  //   <div style="background-color: #f0f5f8;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  //   <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  //
  // <table id="u_content_image_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  //   <tbody>
  //     <tr>
  //       <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 10px;font-family:'Raleway',sans-serif;" align="left">
  //
  // <table width="100%" cellpadding="0" cellspacing="0" border="0">
  //   <tr>
  //     <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
  //
  //       <img align="center" border="0" src="cid:image-1" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 80%;max-width: 224px;" width="224"/>
  //
  //     </td>
  //   </tr>
  // </table>
  //
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  //
  //   <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  //   </div>
  // </div>
  // <!--[if (mso)|(IE)]></td><![endif]-->
  // <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-border" style="background-color: #f0f5f8;width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  // <div id="u_column_3" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  //   <div style="background-color: #f0f5f8;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  //   <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  //
  // <table id="u_content_text_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  //   <tbody>
  //     <tr>
  //       <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:80px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
  //
  //   <div class="v-text-align" style="font-size: 16px; color: #393f42; line-height: 140%; text-align: left; word-wrap: break-word;">
  //     <p style="line-height: 140%;"><span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiaVppZVJ3elpVbXhzTkswWkZOMThraiIsInBhc3RlSUQiOjE2NjAxMjUwNzksImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;" style="line-height: 22.4px;"></span>Sua expertise é valiosa. Confirme sua conta de professor e comece a inspirar os alunos com seu ensino. Clique no botão abaixo para começar.</p>
  //   </div>
  //
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  //
  // <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  //   <tbody>
  //     <tr>
  //       <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
  //
  //   <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
  // <div class="v-text-align" align="left">
  //   <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/?id=${updatedProfessor.id}&confirmed=true&type=professor" style="height:39px; v-text-anchor:middle; width:214px;" arcsize="10.5%"  stroke="f" fillcolor="#03c988"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
  //     <a href="http://localhost:3000/?id=${updatedProfessor.id}&confirmed=true&type=professor" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #03c988; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 16px;font-weight: 700; ">
  //       <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 19.2px;">Confirmar minha conta</span></span>
  //     </a>
  //     <!--[if mso]></center></v:roundrect><![endif]-->
  // </div>
  //
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  //
  //   <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  //   </div>
  // </div>
  // <!--[if (mso)|(IE)]></td><![endif]-->
  //       <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  //     </div>
  //   </div>
  //   </div>
  //
  //
  //
  //
  //
  // <div class="u-row-container" style="padding: 0px;background-color: transparent">
  //   <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
  //     <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
  //       <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  //
  // <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-border" style="background-color: #37474f;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  // <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  //   <div style="background-color: #37474f;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  //   <!--[if (!mso)&(!IE)]><!--><div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  //
  // <table id="u_content_text_6" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  //   <tbody>
  //     <tr>
  //       <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px;font-family:'Raleway',sans-serif;" align="left">
  //
  //   <div class="v-text-align" style="font-size: 14px; color: #ffffff; line-height: 170%; text-align: center; word-wrap: break-word;">
  //     <p style="line-height: 170%;">POLÍTICA DE PRIVACIDADE  |   SITE</p>
  //   </div>
  //
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  //
  // <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  //   <tbody>
  //     <tr>
  //       <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Raleway',sans-serif;" align="left">
  //
  //   <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
  //     <tbody>
  //       <tr style="vertical-align: top">
  //         <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
  //           <span>&#160;</span>
  //         </td>
  //       </tr>
  //     </tbody>
  //   </table>
  //
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  //
  // <table id="u_content_image_4" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  //   <tbody>
  //     <tr>
  //       <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px;font-family:'Raleway',sans-serif;" align="left">
  //
  // <table width="100%" cellpadding="0" cellspacing="0" border="0">
  //   <tr>
  //     <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
  //
  //       <img align="center" border="0" src="cid:image-2" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 146px;" width="146"/>
  //
  //     </td>
  //   </tr>
  // </table>
  //
  //       </td>
  //     </tr>
  //   </tbody>
  // </table>
  //
  //   <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  //   </div>
  // </div>
  // <!--[if (mso)|(IE)]></td><![endif]-->
  //       <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  //     </div>
  //   </div>
  //   </div>
  //
  //
  //
  //     <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
  //     </td>
  //   </tr>
  //   </tbody>
  //   </table>
  //   <!--[if mso]></div><![endif]-->
  //   <!--[if IE]></div><![endif]-->
  // </body>
  //
  // </html>
  // `,
  //       attachments: [
  //         {
  //           filename: "image-1.png",
  //           path: "public/assets/images/image-1.png",
  //           cid: "image-1",
  //         },
  //         {
  //           filename: "image-2.png",
  //           path: "public/assets/images/image-2.png",
  //           cid: "image-2",
  //         },
  //       ],
  //     };
  //
  //     transport.sendMail(mailData, (error) => {
  //       if (error) {
  //         console.log("[ERROR_ON_CONFIRMATION_EMAIL]", error);
  //
  //         return new NextResponse("Ocorreu um erro no envio do e-mail de confirmação da sua conta", {
  //           status: 400,
  //         });
  //       }
  //     });
  //
  //     return NextResponse.json({
  //       firstName: updatedProfessor.firstName,
  //       lastName: updatedProfessor.lastName,
  //       profilePhoto: updatedProfessor.profilePhoto,
  //       themes: updatedProfessor.themes,
  //       accountType: updatedProfessor.accountType,
  //     });
  //   } catch (error) {
  //     console.log("[ERROR_ON_SAVE_PROFESSOR_PROFILE]", error);
  //
  //     return new NextResponse("Ocorreu um erro durante o cadastro do professor", { status: 400 });
  //   }

  // TODO: atualizar rota para uploadthing
  return new Response("Atualizar rota save-profile", { status: 500 });
}
