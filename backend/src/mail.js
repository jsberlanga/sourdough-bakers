const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

// const emailOutput = text => `
//   <div className="email" style="
//     border: 2px solid grey;
//     padding: 20px;
//     font-family: sans-serif;
//     line-height: 2;
//     font-size: 20px;
//   ">
//     <h2>Sourdough Bakers</h2>
//     <p>${text}</p>
//   </div>
// `;

const emailOutput = text => `
<body>
  <div style="">
    <!--[if mso | IE]>
      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
        <tr>
      
            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
          <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
            <tr>
              <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                <div style="font-family:sans-serif;font-size:36px;line-height:1;text-align:left;color:#e4508f;"> Sourdough Bakers </div>
              </td>
            </tr>
            <tr>
              <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                <p style="border-top:solid 4px #e4508f;font-size:1;margin:0px auto;width:100%;"> </p>
                      <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #e4508f;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <div style="font-family:sans-serif;font-size:20px;line-height:1;text-align:left;color:#414F5D;"> ${text}</div>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>
          
        </tr>
      
                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
  </div>
</body>

`;

exports.transport = transport;
exports.emailOutput = emailOutput;
