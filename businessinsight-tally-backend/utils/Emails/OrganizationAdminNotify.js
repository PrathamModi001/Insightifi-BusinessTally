export const OrganizationAdminNotify = (
  inviterFirstname,
  firstname,
  inviteeRole
) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    dir="ltr"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    lang="en"
  >
    <head>
      <meta charset="UTF-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta content="telephone=no" name="format-detection" />
      <title>Empty template</title>
      <!--[if (mso 16)
        ]><style type="text/css">
          a {
            text-decoration: none;
          }
        </style><!
      [endif]-->
      <!--[if gte mso 9
        ]><style>
          sup {
            font-size: 100% !important;
          }
        </style><!
      [endif]-->
      <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <!--[if !mso]><!-- -->
      <link
        href="https://fonts.googleapis.com/css2?family=Prompt:wght@500&display=swap"
        rel="stylesheet"
      />
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
        u + .body img ~ div div {
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
        .es-button-border:hover > a.es-button {
          color: #ffffff !important;
        }
        @media only screen and (max-width: 600px) {
          .es-m-p0r {
            padding-right: 0px !important;
          }
          .es-m-p20b {
            padding-bottom: 20px !important;
          }
          *[class="gmail-fix"] {
            display: none !important;
          }
          p,
          a {
            line-height: 150% !important;
          }
          h1,
          h1 a {
            line-height: 120% !important;
          }
          h2,
          h2 a {
            line-height: 120% !important;
          }
          h3,
          h3 a {
            line-height: 120% !important;
          }
          h4,
          h4 a {
            line-height: 120% !important;
          }
          h5,
          h5 a {
            line-height: 120% !important;
          }
          h6,
          h6 a {
            line-height: 120% !important;
          }
          h1 {
            font-size: 30px !important;
            text-align: left;
          }
          h2 {
            font-size: 24px !important;
            text-align: left;
          }
          h3 {
            font-size: 20px !important;
            text-align: left;
          }
          h4 {
            font-size: 24px !important;
            text-align: left;
          }
          h5 {
            font-size: 20px !important;
            text-align: left;
          }
          h6 {
            font-size: 16px !important;
            text-align: left;
          }
          .es-header-body h1 a,
          .es-content-body h1 a,
          .es-footer-body h1 a {
            font-size: 30px !important;
          }
          .es-header-body h2 a,
          .es-content-body h2 a,
          .es-footer-body h2 a {
            font-size: 24px !important;
          }
          .es-header-body h3 a,
          .es-content-body h3 a,
          .es-footer-body h3 a {
            font-size: 20px !important;
          }
          .es-header-body h4 a,
          .es-content-body h4 a,
          .es-footer-body h4 a {
            font-size: 24px !important;
          }
          .es-header-body h5 a,
          .es-content-body h5 a,
          .es-footer-body h5 a {
            font-size: 20px !important;
          }
          .es-header-body h6 a,
          .es-content-body h6 a,
          .es-footer-body h6 a {
            font-size: 16px !important;
          }
          .es-menu td a {
            font-size: 14px !important;
          }
          .es-header-body p,
          .es-header-body a {
            font-size: 14px !important;
          }
          .es-content-body p,
          .es-content-body a {
            font-size: 14px !important;
          }
          .es-footer-body p,
          .es-footer-body a {
            font-size: 14px !important;
          }
          .es-infoblock p,
          .es-infoblock a {
            font-size: 12px !important;
          }
          .es-m-txt-c,
          .es-m-txt-c h1,
          .es-m-txt-c h2,
          .es-m-txt-c h3,
          .es-m-txt-c h4,
          .es-m-txt-c h5,
          .es-m-txt-c h6 {
            text-align: center !important;
          }
          .es-m-txt-r,
          .es-m-txt-r h1,
          .es-m-txt-r h2,
          .es-m-txt-r h3,
          .es-m-txt-r h4,
          .es-m-txt-r h5,
          .es-m-txt-r h6 {
            text-align: right !important;
          }
          .es-m-txt-j,
          .es-m-txt-j h1,
          .es-m-txt-j h2,
          .es-m-txt-j h3,
          .es-m-txt-j h4,
          .es-m-txt-j h5,
          .es-m-txt-j h6 {
            text-align: justify !important;
          }
          .es-m-txt-l,
          .es-m-txt-l h1,
          .es-m-txt-l h2,
          .es-m-txt-l h3,
          .es-m-txt-l h4,
          .es-m-txt-l h5,
          .es-m-txt-l h6 {
            text-align: left !important;
          }
          .es-m-txt-r img,
          .es-m-txt-c img,
          .es-m-txt-l img {
            display: inline !important;
          }
          .es-m-txt-r .rollover:hover .rollover-second,
          .es-m-txt-c .rollover:hover .rollover-second,
          .es-m-txt-l .rollover:hover .rollover-second {
            display: inline !important;
          }
          .es-m-txt-r .rollover span,
          .es-m-txt-c .rollover span,
          .es-m-txt-l .rollover span {
            line-height: 0 !important;
            font-size: 0 !important;
          }
          .es-spacer {
            display: inline-table;
          }
          a.es-button,
          button.es-button {
            font-size: 18px !important;
            line-height: 120% !important;
          }
          a.es-button,
          button.es-button,
          .es-button-border {
            display: inline-block !important;
          }
          .es-m-fw,
          .es-m-fw.es-fw,
          .es-m-fw .es-button {
            display: block !important;
          }
          .es-m-il,
          .es-m-il .es-button,
          .es-social,
          .es-social td,
          .es-menu {
            display: inline-block !important;
          }
          .es-adaptive table,
          .es-left,
          .es-right {
            width: 100% !important;
          }
          .es-content table,
          .es-header table,
          .es-footer table,
          .es-content,
          .es-footer,
          .es-header {
            width: 100% !important;
            max-width: 600px !important;
          }
          .adapt-img {
            width: 100% !important;
            height: auto !important;
          }
          .es-mobile-hidden,
          .es-hidden {
            display: none !important;
          }
          .es-desk-hidden {
            width: auto !important;
            overflow: visible !important;
            float: none !important;
            max-height: inherit !important;
            line-height: inherit !important;
          }
          tr.es-desk-hidden {
            display: table-row !important;
          }
          table.es-desk-hidden {
            display: table !important;
          }
          td.es-desk-menu-hidden {
            display: table-cell !important;
          }
          .es-menu td {
            width: 1% !important;
          }
          table.es-table-not-adapt,
          .esd-block-html table {
            width: auto !important;
          }
          .es-social td {
            padding-bottom: 10px;
          }
          .h-auto {
            height: auto !important;
          }
          .es-text-4927 .es-text-mobile-size-18,
          .es-text-4927 .es-text-mobile-size-18 * {
            font-size: 18px !important;
            line-height: 150% !important;
          }
          .es-text-2217,
          .es-text-2217 p,
          .es-text-2217 a,
          .es-text-2217 h1,
          .es-text-2217 h2,
          .es-text-2217 h3,
          .es-text-2217 h4,
          .es-text-2217 h5,
          .es-text-2217 h6,
          .es-text-2217 ul,
          .es-text-2217 ol,
          .es-text-2217 li,
          .es-text-2217 span,
          .es-text-2217 sup,
          .es-text-2217 sub,
          .es-text-2217 u,
          .es-text-2217 b,
          .es-text-2217 strong,
          .es-text-2217 em,
          .es-text-2217 i {
            font-size: 18px !important;
          }
        }
        @media screen and (max-width: 384px) {
          .mail-message-content {
            width: 414px !important;
          }
        }
        #outlook a {
          padding: 0;
        }
        .es-button {
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
        @media only screen and (max-width: 600px) {
          p,
          ul li,
          ol li,
          a {
            line-height: 150% !important;
          }
          h1,
          h2,
          h3,
          h1 a,
          h2 a,
          h3 a {
            line-height: 120% !important;
          }
          h1 {
            font-size: 30px !important;
            text-align: left;
          }
          h2 {
            font-size: 24px !important;
            text-align: left;
          }
          h3 {
            font-size: 20px !important;
            text-align: left;
          }
          .es-header-body h1 a,
          .es-content-body h1 a,
          .es-footer-body h1 a {
            font-size: 30px !important;
            text-align: left;
          }
          .es-header-body h2 a,
          .es-content-body h2 a,
          .es-footer-body h2 a {
            font-size: 24px !important;
            text-align: left;
          }
          .es-header-body h3 a,
          .es-content-body h3 a,
          .es-footer-body h3 a {
            font-size: 20px !important;
            text-align: left;
          }
          .es-menu td a {
            font-size: 14px !important;
          }
          .es-header-body p,
          .es-header-body ul li,
          .es-header-body ol li,
          .es-header-body a {
            font-size: 14px !important;
          }
          .es-content-body p,
          .es-content-body ul li,
          .es-content-body ol li,
          .es-content-body a {
            font-size: 14px !important;
          }
          .es-footer-body p,
          .es-footer-body ul li,
          .es-footer-body ol li,
          .es-footer-body a {
            font-size: 14px !important;
          }
          .es-infoblock p,
          .es-infoblock ul li,
          .es-infoblock ol li,
          .es-infoblock a {
            font-size: 12px !important;
          }
          *[class="gmail-fix"] {
            display: none !important;
          }
          .es-m-txt-c,
          .es-m-txt-c h1,
          .es-m-txt-c h2,
          .es-m-txt-c h3 {
            text-align: center !important;
          }
          .es-m-txt-r,
          .es-m-txt-r h1,
          .es-m-txt-r h2,
          .es-m-txt-r h3 {
            text-align: right !important;
          }
          .es-m-txt-l,
          .es-m-txt-l h1,
          .es-m-txt-l h2,
          .es-m-txt-l h3 {
            text-align: left !important;
          }
          .es-m-txt-r img,
          .es-m-txt-c img,
          .es-m-txt-l img {
            display: inline !important;
          }
          .es-button-border {
            display: inline-block !important;
          }
          a.es-button,
          button.es-button {
            font-size: 18px !important;
            display: inline-block !important;
          }
          .es-adaptive table,
          .es-left,
          .es-right {
            width: 100% !important;
          }
          .es-content table,
          .es-header table,
          .es-footer table,
          .es-content,
          .es-footer,
          .es-header {
            width: 100% !important;
            max-width: 600px !important;
          }
          .es-adapt-td {
            display: block !important;
            width: 100% !important;
          }
          .adapt-img {
            width: 100% !important;
            height: auto !important;
          }
          .es-m-p0 {
            padding: 0px !important;
          }
          .es-m-p0r {
            padding-right: 0px !important;
          }
          .es-m-p0l {
            padding-left: 0px !important;
          }
          .es-m-p0t {
            padding-top: 0px !important;
          }
          .es-m-p0b {
            padding-bottom: 0 !important;
          }
          .es-m-p20b {
            padding-bottom: 20px !important;
          }
          .es-mobile-hidden,
          .es-hidden {
            display: none !important;
          }
          tr.es-desk-hidden,
          td.es-desk-hidden,
          table.es-desk-hidden {
            width: auto !important;
            overflow: visible !important;
            float: none !important;
            max-height: inherit !important;
            line-height: inherit !important;
          }
          tr.es-desk-hidden {
            display: table-row !important;
          }
          table.es-desk-hidden {
            display: table !important;
          }
          td.es-desk-menu-hidden {
            display: table-cell !important;
          }
          .es-menu td {
            width: 1% !important;
          }
          table.es-table-not-adapt,
          .esd-block-html table {
            width: auto !important;
          }
          table.es-social {
            display: inline-block !important;
          }
          table.es-social td {
            display: inline-block !important;
          }
          .es-desk-hidden {
            display: table-row !important;
            width: auto !important;
            overflow: visible !important;
            max-height: inherit !important;
          }
          .h-auto {
            height: auto !important;
          }
        }
        @media screen and (max-width: 384px) {
          .mail-message-content {
            width: 414px !important;
          }
        }
      </style>
    </head>
    <body
      class="body"
      style="
        width: 100%;
        font-family: arial, 'helvetica neue', helvetica, sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        padding: 0;
        margin: 0;
        height: 100%;
        margin: 0;
      "
    >
      <div
        dir="ltr"
        class="es-wrapper-color"
        lang="en"
        style="background-color: #f6f6f6"
      >
        <!--[if gte mso 9
          ]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#ffffff"></v:fill> </v:background
        ><![endif]-->
        <table
          class="es-wrapper"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          role="none"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            background-repeat: repeat;
            background-position: center top;
            background-color: #f6f6f6;
            margin: 0;
          "
        >
          <tr>
            <td valign="top" style="padding: 0; margin: 0; margin: 0">
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-header"
                align="center"
                role="none"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  table-layout: fixed !important;
                  width: 100%;
                  background-color: transparent;
                  background-repeat: repeat;
                  background-position: center top;
                "
              >
                <tr>
                  <td
                    align="center"
                    bgcolor="#e5e6ef"
                    style="
                      padding: 0;
                      margin: 0;
                      margin: 0;
                      background-color: #e5e6ef;
                    "
                  >
                    <table
                      bgcolor="#f3e2d8"
                      class="es-header-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: #ffffff;
                        border-top: 1px solid transparent;
                        border-right: 1px solid transparent;
                        border-left: 1px solid transparent;
                        width: 500px;
                      "
                      role="none"
                    >
                      <tr>
                        <td
                          align="left"
                          bgcolor="#e5e6ef"
                          style="
                            padding: 0;
                            margin: 0;
                            margin: 0;
                            padding-top: 20px;
                            padding-right: 20px;
                            padding-left: 20px;
                            background-color: #e5e6ef;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="none"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                class="es-m-p0r"
                                valign="top"
                                align="center"
                                style="
                                  padding: 0;
                                  margin: 0;
                                  margin: 0;
                                  width: 460px;
                                "
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        margin: 0;
                                        font-size: 0px;
                                      "
                                    >
                                      <a
                                        href="https://main.dwcasvifhe8g8.amplifyapp.com/"
                                        target="_blank"
                                        style="
                                          -webkit-text-size-adjust: none;
                                          -ms-text-size-adjust: none;
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #2cb543;
                                          font-size: 14px;
                                        "
                                        ><img
                                          class="adapt-img"
                                          src="cid:unique@kreata.ee"
                                          alt
                                          style="
                                            display: block;
                                            border: 0px;
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                          "
                                          width="177"
                                      /></a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                class="es-content"
                cellspacing="0"
                cellpadding="0"
                align="center"
                role="none"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  table-layout: fixed !important;
                  width: 100%;
                "
              >
                <tr class="es-visible-simple-html-only">
                  <td
                    class="es-info-area es-stripe-html"
                    align="center"
                    bgcolor="#E5E6EF"
                    style="
                      padding: 0;
                      margin: 0;
                      margin: 0;
                      background-color: #e5e6ef;
                    "
                  >
                    <table
                      class="es-content-body"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: #e5e6ef;
                        width: 500px;
                      "
                      cellspacing="0"
                      cellpadding="0"
                      bgcolor="#E5E6EF"
                      align="center"
                      role="none"
                    >
                      <tr>
                        <td
                          align="left"
                          style="padding: 20px; margin: 0; margin: 0"
                        >
                          <table
                            width="100%"
                            cellspacing="0"
                            cellpadding="0"
                            role="none"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                class="es-m-p0r es-m-p20b"
                                valign="top"
                                align="center"
                                style="
                                  padding: 0;
                                  margin: 0;
                                  margin: 0;
                                  width: 460px;
                                "
                              >
                                <table
                                  width="100%"
                                  cellspacing="0"
                                  cellpadding="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      class="es-infoblock"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        line-height: 120%;
                                        font-size: 0px;
                                        color: #cccccc;
                                        margin: 0;
                                      "
                                    >
                                      <img
                                        class="adapt-img"
                                        src="https://fitmjvn.stripocdn.email/content/guids/CABINET_0d71d49034ae71e9fc9c6ea70677feb4/images/group_89_Ouc.png"
                                        alt
                                        style="
                                          display: block;
                                          border: 0px;
                                          outline: none;
                                          text-decoration: none;
                                          -ms-interpolation-mode: bicubic;
                                        "
                                        width="370"
                                      />
                                    </td>
                                  </tr>
                                  <tr class="es-mobile-hidden">
                                    <td
                                      align="left"
                                      class="es-infoblock"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        line-height: 36px;
                                        font-size: 12px;
                                        color: #cccccc;
                                        margin: 0;
                                        padding-top: 25px;
                                      "
                                    >
                                      <h1
                                        style="
                                          margin: 0;
                                          line-height: 45px;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          font-size: 30px;
                                          font-style: normal;
                                          font-weight: normal;
                                          color: #333333;
                                          margin: 0;
                                          letter-spacing: 0;
                                        "
                                      >
                                        <strong
                                          >Hi ${inviterFirstname},A Message
                                          From&nbsp;Insightifi!👋🏻</strong
                                        >
                                      </h1>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="left"
                                      class="es-infoblock es-text-4927"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        line-height: 22px;
                                        font-size: 12px;
                                        color: #cccccc;
                                        margin: 0;
                                        padding-bottom: 20px;
                                        padding-left: 5px;
                                      "
                                    >
                                      <h6
                                        style="
                                          margin: 0;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          mso-line-height-rule: exactly;
                                          letter-spacing: 0;
                                          font-size: 16px;
                                          font-style: normal;
                                          font-weight: normal;
                                          line-height: 19px;
                                          color: #333333;
                                        "
                                      >
                                        <br />
                                      </h6>
                                      <h6
                                        style="
                                          margin: 0;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          mso-line-height-rule: exactly;
                                          letter-spacing: 0;
                                          font-size: 18px;
                                          font-style: normal;
                                          font-weight: normal;
                                          line-height: 27px;
                                          color: #333333;
                                        "
                                        class="es-text-mobile-size-18"
                                      >
                                        The user with the name ${firstname} has been successfully registered as a ${inviteeRole}.
                                      </h6>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="left"
                                      style="padding: 0; margin: 0; margin: 0"
                                    >
                                      <span
                                        class="es-button-border msohide"
                                        style="
                                          border-style: solid;
                                          border-color: #2cb543;
                                          background: #1595e7;
                                          border-width: 0px 0px 2px 0px;
                                          display: inline-block;
                                          border-radius: 30px;
                                          width: auto;
                                          mso-hide: all;
                                        "
                                        >
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="left"
                                      class="es-infoblock es-text-2217"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        line-height: 22px;
                                        font-size: 12px;
                                        color: #cccccc;
                                        margin: 0;
                                        padding-top: 20px;
                                        padding-left: 5px;
                                      "
                                    >
                                      <h6
                                        style="
                                          margin: 0;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          mso-line-height-rule: exactly;
                                          letter-spacing: 0;
                                          font-size: 18px;
                                          font-style: normal;
                                          font-weight: normal;
                                          line-height: 27px !important;
                                          color: #333333;
                                        "
                                      >
                                        Regards,
                                      </h6>
                                      <h6
                                        style="
                                          margin: 0;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          mso-line-height-rule: exactly;
                                          letter-spacing: 0;
                                          font-size: 18px;
                                          font-style: normal;
                                          font-weight: normal;
                                          line-height: 27px !important;
                                          color: #333333;
                                        "
                                      >
                                        <strong>Insightifi Team</strong>
                                      </h6>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  
    `;
};
