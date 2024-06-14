// pages/_app.js
import "../app/globals.css" // Proje yapınıza göre yolu ayarlayın

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
