// Para crear una cookie de forma nativa:

// Define el nombre y el valor de la cookie
let cookieName = "nombreDeLaCookie";
let cookieValue = "Valor de la cookie";

// Crea la cadena de texto de la cookie sin fecha de expiración
const cookieString = cookieName + "=" + cookieValue + "; path=/";

// Establece la cookie en el navegador
document.cookie = cookieString;


// Define el nombre y el valor de la cookie
let cookieNameTtl = "CookieQueSeAutoDestruye";
let cookieValueTtl = "Valor de la cookie que se autodestruye";

// Crea la fecha de expiración (dentro de un segundo)
let expirationDate = new Date();
expirationDate.setTime(expirationDate.getTime() + 1000);

// Crea la cadena de texto de la cookie con fecha de expiración
const cookieStringTtl = cookieNameTtl + "=" + cookieValueTtl + "; expires=" + expirationDate.toUTCString() + "; path=/";

// Establece la cookie en el navegador
document.cookie = cookieStringTtl;