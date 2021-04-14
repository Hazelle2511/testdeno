// TODO: modify the body object!

  /*const headers = {
    cors: true,
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "content-type": "application/json; charset=utf8",
    "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
  };


export async function handler (req: object) {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ok: true})
  }
}*/


  const headers = {
    cors: true,
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "content-type": "application/json; charset=utf8",
    "cache-control": "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
  };

export async function handler(req: APIGatewayProxyEvent, context: Context) {
    try {
      let body: any = req!.body || "no body"
      body = atob(body)
      const json: any = JSON.parse(body)
      console.log("json", json)
      if (json.email && json.host && json.lang) {
        const to = json.email
        const lang = json.lang
        const from = json.host
        const client = new SmtpClient()
        const translations: any = {
          en:
            {
              emptyEmail: 'You must enter an email!', syntaxEmail: 'You must provide a valid email!', subject: `Sign up to ${from}`,
              html: 'It is advised to launch this link with Chrome, Firefox or Opera to finish sign up', success: "Thanks, the email was sent to your box (don't forget to check your junk)", error: 'The email could not be sent!',
              help: 'Copy paste this text in the url bar of your browser if the link above does not work',
              emailFromPreviouslyDeletedAccount: '(Warning, you already created and deleted an account with this email)'
            },
            es: {
              emptyEmail: 'Debe ingresar un correo electrónico', syntaxEmail: 'Debe ingresar un correo electrónico correcto!', subject: `Registrese a ${from}`,
              html: 'Es mejor seguir este link en Chrome, Firefox u Opera para terminar el proceso de registración', success: 'Gracias, el correo electrónico se mandó con éxito (no olvide verificar sus correos indeseables)', error: 'El correo electrónico no se pudó mandar!',
              help: 'Copie pegue este texto en la barra de URL de su navegador si el link anterior no sirve',
              emailFromPreviouslyDeletedAccount: '(Cuidado, ya usted creó y borró una cuenta con ese correo)'
            },
            fr: {
              emptyEmail: 'Vous devez renseigner un email', syntaxEmail: 'Vous devez renseigner un email valide!', subject: `Inscrivez vous à ${from}`,
              html: "Il est préférable de lancer ce lien dans Chrome, Firefox ou Opera pour terminer l'inscription", success: "Merci, l'email a été envoyé à votre boîte (n'oubliez pas de vérifier vos spams)", error: "L'email n'a pu être délivré!",
              help: "Copiez-collez ce texte dans la barre d'url de votre navigateur si le lien ne fonctionne pas",
              emailFromPreviouslyDeletedAccount: '(Attention, vous avez déjà créé et supprimé un compte avec cet email)'
            },
            vi: {
              emptyEmail: 'Bạn phải nhập email', syntaxEmail: 'bạn phải nhập một email hợp lệ!', subject: `Đăng ký để  ${from}`,
              html: "Bạn nên khởi chạy liên kết này với Chrome, Firefox hoặc Opera để hoàn tất quá trình đăng ký", success: "Cảm ơn, email đã được gửi đến hộp của bạn (đừng quên kiểm tra thư rác của bạn)", error: "không thể gửi email!",
              help: "Sao chép, dán văn bản này vào thanh url của trình duyệt của bạn nếu liên kết ở trên không hoạt động",
              emailFromPreviouslyDeletedAccount: '(Cảnh báo, bạn đã tạo và xóa tài khoản bằng email này)'
            }
        }
        if (to.trim() !== '') {
          if (to.includes('@')) {
            const _id = `org.couchdb.user:${to}`
            const usersDB = couch.database('_users')
            const userDoc: any = await usersDB.get(_id)
            console.log('userDoc', userDoc)
            if (userDoc.reason === 'missing' || userDoc.reason === 'deleted') {
              /*
              A blank line identifies the end of the mail headers and the start of the mail body. Use one of the following options to fix this:
                Change the first line of the data set so that it does not contain a colon (:). Any simple text will do (for example, This is an email.).
                */
              // codeyourbest artgreg@outlook.fr account
              // const connectConfig: any = { hostname: "in-v3.mailjet.com", port: 465, username: "dfcdf42ddca4a78b4c10d3fbaf351495", password: 'cae81c86db2a5a9c8c52bb2b2e8b0825' }
              // prepagosparami@gmail.com accounts
              const connectConfig: any = { hostname: "in-v3.mailjet.com", port: 465, username: "efb506189b10c02f7af41638cb8a9a2c", password: '8f1ec72cc3e73ddde6d8c498a6942d95' }
              const signUpLink = `http://${from}/finish-signup?email=${to}`
              const b64: string = base64.fromUint8Array(new TextEncoder().encode(translations[lang].subject));
              const subject = `=?utf-8?B?${b64}?=`
              const content = `${translations[lang].html}<br/>
              <a href="${signUpLink}">${from}</a><br/>${translations[lang].help}<br/>${signUpLink}`
              await client.connectTLS(connectConfig)
              // from must be like this www.domain.ext
              const from2: string = (from.includes('.') && !from.includes('netlify')) ? from.substring(from.indexOf('.') + 1, from.lastIndexOf('.')) : 'prepagosparami'
              await client.send({ from: `${from2}@gmail.com`, to, subject, content })
              await client.close()
              return {
                headers,
                body: JSON.stringify({ ok: userDoc.reason === 'deleted' ? translations[lang].success + translations[lang].emailFromPreviouslyDeletedAccount : translations[lang].success })
              }
            } // end if missing user
            return {
              headers,
              body: JSON.stringify({ error: "This user already exists in our database! If it's you, you may ask for a new password instead!" })
            }
          } // end @
          return {
            headers,
            body: JSON.stringify({ error: translations[lang].syntaxEmail })
          }
        }
        return {
          headers,
          body: JSON.stringify({ error: translations[lang].emptyEmail })
        }
      }
      return {
        headers,
        body: JSON.stringify({ error: "missing param for this endpoint" })
      }
    } catch (e) {
      console.log(e)
      return {
        headers,
        body: JSON.stringify(e)
      }
    }
  }
// Example responses

/* Forward requester to a new path
export async function handler (req: object) {
  return {
    statusCode: 302,
    headers: {
      'location': '/about',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
*/

/* Respond with successful resource creation
export async function handler (req: object) {
  return {
    statusCode: 201,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify({ok: true})
  }
}
*/

/* Deliver client-side JS
export async function handler (req: object) {
  return {
    headers: {
      'content-type': 'text/javascript; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: 'console.log("Hello world!")',
  }
}
*/
