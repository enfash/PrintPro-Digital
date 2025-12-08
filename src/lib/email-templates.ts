
interface EmailTemplateProps {
  name: string;
  phone: string;
  email?: string;
  jobType: string;
  message: string;
  fileName?: string;
  fileSize?: number;
  agreeToUpdates: boolean;
}

export function generateAdminEmailHTML({
  name,
  phone,
  email,
  jobType,
  message,
  fileName,
  fileSize,
  agreeToUpdates,
}: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Print Order</title>
</head>
<body style="margin:0; padding:0; background:#f5f7f9; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7f9;">
    <tr>
      <td align="center" style="padding: 24px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background:#4659cd; padding:24px; color:#ffffff; text-align:center;">
              <h1 style="margin:0; font-size:22px; font-weight:600;">🎨 New Print Order Request</h1>
              <p style="margin:8px 0 0; font-size:14px; opacity:0.95;">
                BOMedia
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px 24px;">
              
              <!-- Customer Name -->
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">CUSTOMER NAME</p>
                <p style="margin:6px 0 0; font-size:15px; color:#111827; font-weight:500;">
                  ${name}
                </p>
              </div>

              <!-- Phone -->
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">PHONE</p>
                <p style="margin:6px 0 0; font-size:15px; color:#111827;">
                  ${phone}
                  <a href="https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '234')}" style="display:inline-block; margin-left:8px; color:#16a34a; text-decoration:none; font-weight:600; font-size:13px; background:#dcfce7; padding:2px 8px; border-radius:12px;">
                    Start Chat ↗
                  </a>
                </p>
              </div>

              ${email ? `
              <!-- Email -->
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">EMAIL</p>
                <a href="mailto:${email}" style="display:inline-block; margin:6px 0 0; font-size:15px; color:#2563eb; text-decoration:none;">
                  ${email}
                </a>
              </div>
              ` : ''}

              <!-- Job Type -->
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">JOB TYPE</p>
                <p style="margin:6px 0 0; font-size:15px; color:#111827;">
                  ${jobType}
                  <span style="background:#e0e7f8; color:#3c49b4; font-size:11px; padding:4px 8px; border-radius:12px; margin-left:8px; font-weight:600;">
                    Priority
                  </span>
                </p>
              </div>

              <!-- Message -->
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">
                  MESSAGE / REQUIREMENTS
                </p>
                <div style="margin-top:8px; padding:14px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; font-size:14px; line-height:1.6; white-space: pre-wrap; color:#374151;">
                  ${message}
                </div>
              </div>

              ${fileName ? `
              <!-- Artwork -->
              <div style="margin-bottom:20px;">
                <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase; letter-spacing:0.5px; font-weight:600;">ARTWORK</p>
                <p style="margin:6px 0 0; font-size:14px; color:#2563eb; font-weight:500;">
                  📎 ${fileName} ${fileSize ? `(${(fileSize / 1024 / 1024).toFixed(2)} MB)` : ''}
                </p>
              </div>
              ` : ''}

              <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />

              ${agreeToUpdates ? `
              <p style="font-size:13px; color:#374151; margin:0; display:flex; align-items:center;">
                <span style="color:#10b981; margin-right:6px; font-size:16px;">✓</span> Customer agreed to receive order updates
              </p>
              ` : ''}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateCustomerEmailHTML(name: string, jobType: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background:#f0f3fc; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f3fc;">
    <tr>
      <td align="center" style="padding: 24px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background:#4659cd; padding:24px; color:#ffffff; text-align:center;">
              <h1 style="margin:0; font-size:22px; font-weight:600;">✅ Order Received!</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px 24px;">
              <h2 style="color:#4659cd; margin:0 0 16px; font-size:20px;">Thanks for your order, ${name}!</h2>
              <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#374151;">
                We have received your request for a <strong>${jobType}</strong>.
              </p>
              <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#374151;">
                Our team will review your details and artwork, and we'll get back to you shortly with a quote.
              </p>
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />
              <p style="font-size:14px; color:#6b7280; margin:0 0 8px;">
                <strong style="color:#111827;">BOMedia</strong>
              </p>
              <p style="font-size:14px; color:#6b7280; margin:0 0 8px;">
                Lagos, Nigeria
              </p>
              <p style="font-size:14px; margin:0;">
                <a href="https://wa.me/2348022247567" style="color:#4659cd; text-decoration:none; font-weight:600;">
                  WhatsApp: +234 802 224 7567
                </a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
