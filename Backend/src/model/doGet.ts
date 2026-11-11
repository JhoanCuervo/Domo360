/** Atiende las solicitudes GET del Web App y devuelve el frontend.
 * @param {GoogleAppsScript.Events.DoGet} _e Datos enviados por Apps Script.
 * @returns {GoogleAppsScript.HTML.HtmlOutput} Página del frontend.
 */
const doGet = (
  _e: GoogleAppsScript.Events.DoGet,
): GoogleAppsScript.HTML.HtmlOutput => {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("Domo360")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");
};
export default doGet;
