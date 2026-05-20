const MailStyle = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  background: #fafafa;
}
.img-logo {
  width: 180px;
  margin: auto;
}
.tbl-bordered {
  border: 1px solid #ddd;
  width: 800px;
  margin: 20px auto;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
}
tr {
  border: 1px solid #ddd;
}
th {
  display: block;
}
th,
h3 {
  padding: 10px 0;
}
td {
  padding: 10px;
  line-height: 1.7em;
}
.bg-expo {
  background-image: linear-gradient(to right, #0D70AE , #B1336E);
  color: #fff;
}
.link {
  text-decoration: none;
}
.icon-link {
  display: inline-flex;
  align-items: center;
  gap: 1em;
}
.icon-margin-right {
  margin-right: 10px;
}
.social-icon {
  margin: 0.5em 0.2em !important;
  cursor: pointer !important;
}
a {
  text-decoration: none;
}
@media only screen and (max-width: 600px) {
  table {
    width: 100% !important;
  }
  tr td {
    width: 100% !important;
    display: block !important;
  }
}
`;

const MailHeader = `
<tr>
  <td colspan="100%" align="center">
    <img
      src="https://www.yarderp.com/_next/static/media/logo.f0924f01.png"
      class="img-logo"
      alt=""
    />
  </td>
</tr>
<tr>
  <td class="bg-expo" colspan="100%" align="center">YardErp</td>
</tr>
`;

const MailFooter = `
<tr>
  <td align="left" class="icon-link" colspan="100%">
    <img
      src="https://searchingyard-web-api.herokuapp.com/assets/mail-icon.png"
      height="15px"
      alt=""
      class="icon-margin-right"
    />
    <a href="mailto: mailto:info@yarderp.com" style="font-size: mailto:12px">info@yarderp.com</a>
  </td>
</tr>

`;

export const normalMailBody = (content: string, name: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thanks for getting in touch with us.</title>
    <style>${MailStyle}</style>
  </head>
  <body>
    <table class="tbl-bordered">
      ${MailHeader}
      <tr>
        <td colspan="100%">
          <h3>Dear ${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
          <p>
            ${content}
          </p>
          <br />
          <p>
            If you have any further questions before we get back to you, feel free to call us or hit reply and send them through.          
          </p>
          <br />
          <b>
            <p>Thanks & Regards</p>
            <p>TEAM YardERP</p>
          </b>
        </td>
      </tr>
      ${MailFooter}
    </table>
  </body>
</html>`;
