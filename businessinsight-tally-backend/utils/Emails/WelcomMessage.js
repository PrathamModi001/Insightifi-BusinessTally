export const WelcomeMessage = (userDetails) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="telephone=no" name="format-detection">
      <title>Empty template</title>
      <!--[if (mso 16)]>
              <style type="text/css">
              a {text-decoration: none;}
              </style>
              <![endif]-->
      <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
      <!--[if gte mso 9]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG></o:AllowPNG>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
      <!--[if !mso]><!-- -->
      <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@500&display=swap" rel="stylesheet">
      <!--<![endif]-->
      <style type="text/css">
          .rollover:hover .rollover-first {
              max-height: 0px !important;
              display: none !important;
          }
  
          .rollover:hover .rollover-second {
              max-height: none !important;
              display: block !important;
          }
  
          .rollover span {
              font-size: 0px;
          }
  
          u+.body img~div div {
              display: none;
          }
  
          #outlook a {
              padding: 0;
          }
  
          span.MsoHyperlink,
          span.MsoHyperlinkFollowed {
              color: inherit;
              mso-style-priority: 99;
          }
  
          a.es-button {
              mso-style-priority: 100 !important;
              text-decoration: none !important;
          }
  
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
          }
  
          .es-desk-hidden {
              display: none;
              float: left;
              overflow: hidden;
              width: 0;
              max-height: 0;
              line-height: 0;
              mso-hide: all;
          }
  
          .es-button-border:hover>a.es-button {
              color: #ffffff !important;
          }
  
          @media only screen and (max-width:600px) {
              .es-m-p0r {
                  padding-right: 0px !important
              }
  
              .es-m-p20b {
                  padding-bottom: 20px !important
              }
  
              *[class="gmail-fix"] {
                  display: none !important
              }
  
              p,
              a {
                  line-height: 150% !important
              }
  
              h1,
              h1 a {
                  line-height: 120% !important
              }
  
              h2,
              h2 a {
                  line-height: 120% !important
              }
  
              h3,
              h3 a {
                  line-height: 120% !important
              }
  
              h4,
              h4 a {
                  line-height: 120% !important
              }
  
              h5,
              h5 a {
                  line-height: 120% !important
              }
  
              h6,
              h6 a {
                  line-height: 120% !important
              }
  
              h1 {
                  font-size: 30px !important;
                  text-align: left
              }
  
              h2 {
                  font-size: 24px !important;
                  text-align: left
              }
  
              h3 {
                  font-size: 20px !important;
                  text-align: left
              }
  
              h4 {
                  font-size: 24px !important;
                  text-align: left
              }
  
              h5 {
                  font-size: 20px !important;
                  text-align: left
              }
  
              h6 {
                  font-size: 16px !important;
                  text-align: left
              }
  
              .es-header-body h1 a,
              .es-content-body h1 a,
              .es-footer-body h1 a {
                  font-size: 30px !important
              }
  
              .es-header-body h2 a,
              .es-content-body h2 a,
              .es-footer-body h2 a {
                  font-size: 24px !important
              }
  
              .es-header-body h3 a,
              .es-content-body h3 a,
              .es-footer-body h3 a {
                  font-size: 20px !important
              }
  
              .es-header-body h4 a,
              .es-content-body h4 a,
              .es-footer-body h4 a {
                  font-size: 24px !important
              }
  
              .es-header-body h5 a,
              .es-content-body h5 a,
              .es-footer-body h5 a {
                  font-size: 20px !important
              }
  
              .es-header-body h6 a,
              .es-content-body h6 a,
              .es-footer-body h6 a {
                  font-size: 16px !important
              }
  
              .es-menu td a {
                  font-size: 14px !important
              }
  
              .es-header-body p,
              .es-header-body a {
                  font-size: 14px !important
              }
  
              .es-content-body p,
              .es-content-body a {
                  font-size: 14px !important
              }
  
              .es-footer-body p,
              .es-footer-body a {
                  font-size: 14px !important
              }
  
              .es-infoblock p,
              .es-infoblock a {
                  font-size: 12px !important
              }
  
              .es-m-txt-c,
              .es-m-txt-c h1,
              .es-m-txt-c h2,
              .es-m-txt-c h3,
              .es-m-txt-c h4,
              .es-m-txt-c h5,
              .es-m-txt-c h6 {
                  text-align: center !important
              }
  
              .es-m-txt-r,
              .es-m-txt-r h1,
              .es-m-txt-r h2,
              .es-m-txt-r h3,
              .es-m-txt-r h4,
              .es-m-txt-r h5,
              .es-m-txt-r h6 {
                  text-align: right !important
              }
  
              .es-m-txt-j,
              .es-m-txt-j h1,
              .es-m-txt-j h2,
              .es-m-txt-j h3,
              .es-m-txt-j h4,
              .es-m-txt-j h5,
              .es-m-txt-j h6 {
                  text-align: justify !important
              }
  
              .es-m-txt-l,
              .es-m-txt-l h1,
              .es-m-txt-l h2,
              .es-m-txt-l h3,
              .es-m-txt-l h4,
              .es-m-txt-l h5,
              .es-m-txt-l h6 {
                  text-align: left !important
              }
  
              .es-m-txt-r img,
              .es-m-txt-c img,
              .es-m-txt-l img {
                  display: inline !important
              }
  
              .es-m-txt-r .rollover:hover .rollover-second,
              .es-m-txt-c .rollover:hover .rollover-second,
              .es-m-txt-l .rollover:hover .rollover-second {
                  display: inline !important
              }
  
              .es-m-txt-r .rollover span,
              .es-m-txt-c .rollover span,
              .es-m-txt-l .rollover span {
                  line-height: 0 !important;
                  font-size: 0 !important
              }
  
              .es-spacer {
                  display: inline-table
              }
  
              a.es-button,
              button.es-button {
                  font-size: 18px !important;
                  line-height: 120% !important
              }
  
              a.es-button,
              button.es-button,
              .es-button-border {
                  display: inline-block !important
              }
  
              .es-m-fw,
              .es-m-fw.es-fw,
              .es-m-fw .es-button {
                  display: block !important
              }
  
              .es-m-il,
              .es-m-il .es-button,
              .es-social,
              .es-social td,
              .es-menu {
                  display: inline-block !important
              }
  
              .es-adaptive table,
              .es-left,
              .es-right {
                  width: 100% !important
              }
  
              .es-content table,
              .es-header table,
              .es-footer table,
              .es-content,
              .es-footer,
              .es-header {
                  width: 100% !important;
                  max-width: 600px !important
              }
  
              .adapt-img {
                  width: 100% !important;
                  height: auto !important
              }
  
              .es-mobile-hidden,
              .es-hidden {
                  display: none !important
              }
  
              .es-desk-hidden {
                  width: auto !important;
                  overflow: visible !important;
                  float: none !important;
                  max-height: inherit !important;
                  line-height: inherit !important
              }
  
              tr.es-desk-hidden {
                  display: table-row !important
              }
  
              table.es-desk-hidden {
                  display: table !important
              }
  
              td.es-desk-menu-hidden {
                  display: table-cell !important
              }
  
              .es-menu td {
                  width: 1% !important
              }
  
              table.es-table-not-adapt,
              .esd-block-html table {
                  width: auto !important
              }
  
              .es-social td {
                  padding-bottom: 10px
              }
  
              .h-auto {
                  height: auto !important
              }
  
              .es-text-4927 .es-text-mobile-size-18,
              .es-text-4927 .es-text-mobile-size-18 * {
                  font-size: 18px !important;
                  line-height: 150% !important
              }
          }
  
          @media screen and (max-width:384px) {
              .mail-message-content {
                  width: 414px !important
              }
          }
      </style>
  </head>
  
  <body class="body" style="widPth:100%;height:100%;padding:0;Margin:0">
      <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#F6F6F6">
          <!--[if gte mso 9]>
                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                          <v:fill type="tile" color="#ffffff"></v:fill>
                      </v:background>
                  <![endif]-->
          <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
              <tbody>
                  <tr>
                      <td valign="top" style="padding:0;Margin:0">
                          <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                              <tbody>
                                  <tr>
                                      <td align="center" bgcolor="#e5e6ef" style="padding:0;Margin:0;background-color:#e5e6ef">
                                          <table bgcolor="#f3e2d8" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;border-top:1px solid transparent;border-right:1px solid transparent;border-left:1px solid transparent;width:500px" role="none">
                                              <tbody>
                                                  <tr>
                                                      <td align="left" bgcolor="#e5e6ef" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px;background-color:#e5e6ef">
                                                          <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:460px">
                                                                          <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="cid:unique@kreata.ee" alt style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="177"></td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                          <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
                              <tbody>
                                  <tr class="es-visible-simple-html-only">
                                      <td class="es-info-area es-stripe-html" align="center" bgcolor="#E5E6EF" style="padding:0;Margin:0;background-color:#E5E6EF">
                                          <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E5E6EF;width:500px" cellspacing="0" cellpadding="0" bgcolor="#E5E6EF" align="center" role="none">
                                              <tbody>
                                                  <tr>
                                                      <td align="left" style="padding:20px;Margin:0">
                                                          <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                              <tbody>
                                                                  <tr>
                                                                      <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:460px">
                                                                          <p><br></p>
                                                                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px" class="esd-text"><br>
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td align="center" class="es-infoblock" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://main.dwcasvifhe8g8.amplifyapp.com/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"><img class="adapt-img" src="https://fhpfpuz.stripocdn.email/content/guids/CABINET_0d71d49034ae71e9fc9c6ea70677feb4/images/group_89_Ouc.png" alt style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="370"></a></td>
                                                                                  </tr>
                                                                                  <tr class="es-mobile-hidden">
                                                                                      <td align="left" class="es-infoblock esd-text" style="padding:0;Margin:0;padding-top:25px">
                                                                                          <h1 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:30px;font-style:normal;font-weight:normal;line-height:45px;color:#333333"><strong>Hi ${userDetails.firstname} ${userDetails.lastname},A Big Welcome<br>to our Insightifi!👋🏻</strong></h1>
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td align="left" class="es-infoblock es-text-4927" style="padding:0;Margin:0;padding-bottom:20px;padding-left:5px">
                                                                                          <h6 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:24px !important;color:#333333">&nbsp;</h6>
                                                                                          <h6 class="es-text-mobile-size-18" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:27px;color:#333333">Thank you for choosing INSIGHTIFI ! &nbsp;&nbsp;&nbsp;&nbsp;</h6>
                                                                                          <h6 class="es-text-mobile-size-18" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:27px;color:#333333"><br></h6>
                                                                                          <h6 class="es-text-mobile-size-18" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:27px;color:#333333">We're delighted to welcome you to Insightifi! We're here to empower you with the tools and insights you need to make data-driven decisions and unlock new possibilities for your business.</h6>
                                                                                          <h6 class="es-text-mobile-size-18" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:27px;color:#333333"><br></h6>
                                                                                          <h6 class="es-text-mobile-size-18" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:27px;color:#333333">Need help?&nbsp;</h6>
                                                                                          <h6 class="es-text-mobile-size-18" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:27px;color:#333333">Reach out to our support team at ${process.env.SMTP_MAIL}.Best Welcome aboard!</h6><br class="es-text-mobile-size-18">
                                                                                          <h6 class="es-text-mobile-size-18" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:27px;color:#333333">The Insightifi Team</h6>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </body>
  
  </html>
        `;
};
