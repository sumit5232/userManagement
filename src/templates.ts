const emailTemplates = {
    passwordReset: (props: {
      email: string;
      token: string;
      userId: string;
      newUser?: boolean;
    }) => ({
      to: props.email,
      subject: props.newUser
        ? 'New User | Password Reset'
        : 'Forget Password Request',
      html: (props.newUser === true
        ? [
          `
  //         <!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <link rel="preconnect" href="https://fonts.googleapis.com" />
  //     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  //     <link
  //       href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Montserrat:wght@500;600;700;800;900&family=PT+Sans:ital,wght@0,700;1,700&family=Poppins:wght@300;400;500;600;700;800;900&family=Readex+Pro:wght@300;400;500;600;700&display=swap"
  //       rel="stylesheet"
  //     />
  //     <link rel="stylesheet" href="https://lucent-speculoos-e68e55.netlify.app/assets/scss/index.css" />
  //     <title>Reset Password</title>
  //   </head>
  //   <body >
  //     <div class="container">
  //     <header>
  //       <img src="https://lucent-speculoos-e68e55.netlify.app/assets/image/Wecall Logo.svg" alt="" class="wecall-logo" />
  //     </header>
  //     <section class="reset-password-section">
  //       <img src="https://lucent-speculoos-e68e55.netlify.app/assets/image/lock-icon.svg" alt="" class="lock-icon" />
  //       <h1 class="password-reset-label">Password reset</h1>
  //       <div class="card">
  //         <h2 class="password-request-label">
  //           You are receiving this email because we received a password reset
  //           request for your account.
  //         </h2>
  //         <p class="visit-address-label">
  //           To reset your password, visit the following address:
  //         </p>
  //         <a href="${process.env.FRONTEND_URL}/password-reset/${props.token}" class="reset-button">Click here to reset your password</a>
  //         <p class="your-email">
  //           Your email: <span class="email"> ${props.email} </span>
  //         </p>
  //         <p class="link-expire-label">
  //           If above link expires, then request another
  //           <a href="https://dev.analytics.improveourcredit.com/forget-password"> password reset </a>
  //         </p>
  //       </div>
  //     </section>
  //     <footer>
  //       <p class="copyright-label">
  //         Copyright 2023 <span>Wecall</span> . All Rights Reserved
  //       </p>
  //     </footer>
  //     </div> 
  //   </body>
  // </html>
  ////////////////////////////frftutui///////////////////
  // <!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <link rel="preconnect" href="https://fonts.googleapis.com" />
  //     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  //     <link
  //       href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Montserrat:wght@500;600;700;800;900&family=PT+Sans:ital,wght@0,700;1,700&family=Poppins:wght@300;400;500;600;700;800;900&family=Readex+Pro:wght@300;400;500;600;700&display=swap"
  //       rel="stylesheet"
  //     />
  //     <link rel="stylesheet" href="https://lucent-speculoos-e68e55.netlify.app/assets/scss/index.css" />
  //     <title>Reset Password</title>
  //   </head>
  //   <body >
  //     <div class="container">
  //     <header>
  //       <img src="https://lucent-speculoos-e68e55.netlify.app/assets/image/Wecall Logo.svg" alt="" class="wecall-logo" />
  //     </header>
  //     <section class="reset-password-section">
  //       <img src="https://lucent-speculoos-e68e55.netlify.app/assets/image/lock-icon.svg" alt="" class="lock-icon" />
  //       <h1 class="password-reset-label">Password reset</h1>
  //       <div class="card">
  //         <h2 class="password-request-label">
  //           You are receiving this email because we received a password reset
  //           request for your account.
  //         </h2>
  //         <p class="visit-address-label">
  //           To reset your password, visit the following address:
  //         </p>
  //         <button class="reset-button"><a href="${process.env.FRONTEND_URL}/password-reset/${props.token}" class="reset-button">Click here to reset your password</a>
  //                 <p class="your-email">
  //                   Your email: <span class="email"> ${props.email} </span>
  //                 </p></button>
  //         <p class="your-email">
  //           Your email: <span class="email"> email@example.com </span>
  //         </p>
  //         <p class="link-expire-label">
  //           If above link expires, then request another
  //           <a href="https://dev.analytics.improveourcredit.com/forget-password"> password reset </a>
  //         </p>
  //       </div>
  //     </section>
  //     <footer>
  //       <p class="copyright-label">
  //         Copyright 2023 <span>Wecall</span> . All Rights Reserved
  //       </p>
  //     </footer>
  //     </div> 
  //   </body>
  // </html>
  doctype html
  html(lang="en")
    head
      meta(charset="UTF-8")
      meta(name="viewport", content="width=device-width, initial-scale=1.0")
      link(rel="preconnect", href="https://fonts.googleapis.com")
      link(rel="preconnect", href="https://fonts.gstatic.com", crossorigin)
      link(href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Montserrat:wght@500;600;700;800;900&family=PT+Sans:ital,wght@0,700;1,700&family=Poppins:wght@300;400;500;600;700;800;900&family=Readex+Pro:wght@300;400;500;600;700&display=swap", rel="stylesheet")
      link(rel="stylesheet", href="https://lucent-speculoos-e68e55.netlify.app/assets/scss/index.css")
      title Reset Password
    body
      .container
        header
          svg.wecall-logo
            // Inline SVG content for your WeCall Logo
            path(d="M100 50A50 50 0 110 50a50 50 0 01100 0 50 50 0 110 50", fill="#007BFF")
        section.reset-password-section
          svg.lock-icon
            // Inline SVG content for your Lock Icon
            path(d="M50 100V50a2 2 0 012-2h4a2 2 0 012 2v50a2 2 0 01-2 2H52a2 2 0 01-2-2zm-6-74a10 10 0 0120 0v40a10 10 0 01-20 0z", fill="#000")
          h1.password-reset-label Password reset
          .card
            h2.password-request-label
              | You are receiving this email because we received a password reset
              | request for your account.
            p.visit-address-label To reset your password, visit the following address:
            button.reset-button
              a(href=process.env.FRONTEND_URL + "/password-reset/" + props.token, class="reset-button") Click here to reset your password
              p.your-email
                | Your email:
                span.email= props.email
            p.your-email
              | Your email:
              span.email email@example.com
            p.link-expire-label
              | If the above link expires, then request another
              a(href="https://dev.analytics.improveourcredit.com/forget-password") password reset
        footer
          p.copyright-label Copyright 2023
            span Wecall
            | . All Rights Reserved
  
  `
            // `<p>Hi there, your account has been create, please use link below to enter new password.</p>`,
            // `<p>Password reset link is <a href="${process.env.FRONTEND_URL}/password-reset/${props.token}">here</a></p>`,
            // `<p>If above link expires, then request another <a href="${
            //   process.env.FRONTEND_URL +
            //   '/auth/password-reset-request/' +
            //   String(props.userId)
            // }">password reset </p>`,
            // 'Regards,',
            // 'Wecall Team',
          ]
        : [
          `
          <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Montserrat:wght@500;600;700;800;900&family=PT+Sans:ital,wght@0,700;1,700&family=Poppins:wght@300;400;500;600;700;800;900&family=Readex+Pro:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="https://lucent-speculoos-e68e55.netlify.app/assets/scss/index.css" />
      <title>Reset Password</title>
    </head>
    <body >
      <div class="container">
      <header>
        <img src="https://lucent-speculoos-e68e55.netlify.app/assets/image/Wecall Logo.svg" alt="" class="wecall-logo" />
      </header>
      <section class="reset-password-section">
        <img src="https://lucent-speculoos-e68e55.netlify.app/assets/image/lock-icon.svg" alt="" class="lock-icon" />
        <h1 class="password-reset-label">Password reset</h1>
        <div class="card">
          <h2 class="password-request-label">
            You are receiving this email because we received a password reset
            request for your account.
          </h2>
          <p class="visit-address-label">
            To reset your password, visit the following address:
          </p>
          <a href="${process.env.FRONTEND_URL}/password-reset/${props.token}" class="reset-button">Click here to reset your password</a>
          <p class="your-email">
            Your email: <span class="email"> ${props.email} </span>
          </p>
          <p class="link-expire-label">
            If above link expires, then request another
            <a href="https://dev.analytics.improveourcredit.com/forget-password"> password reset </a>
          </p>
        </div>
      </section>
      <footer>
        <p class="copyright-label">
          Copyright 2023 <span>Wecall</span> . All Rights Reserved
        </p>
      </footer>
      </div> 
    </body>
  </html>
          `
          ]
      ).join('<br>'),
    }),
  
    shareReport: (props: {
      email: string;
      reportId: string;
      permission: string;
    }) => ({
      to: props.email,
      subject: 'Call Logs Report',
      html: [
        'Hello,',
        'A call logs report has been shared with you.',
        'Please click on the link below to ' + props.permission + ' the report.',
        process.env.FRONTEND_URL + '/reports/reporting/' + props.reportId,
        'Regards,',
        'Wecall Team',
      ].join('<br>'),
    }),
    updateSharedReport: (props: {
      email: string;
      reportId: string;
      permission: string;
    }) => ({
      to: props.email,
      subject: 'Call Logs Report',
      html: [
        'Hello,',
        'A call logs report has been updated, which was shared with you.',
        'Please click on the link below to ' + props.permission + ' the report.',
        process.env.FRONTEND_URL + '/reports/reporting/' + props.reportId,
        'Regards,',
        'Wecall Team',
      ].join('<br>'),
    }),
  };
  
  export default emailTemplates;