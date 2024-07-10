import { jsPDF } from "jspdf";


type TemplateType = "risk-assessment" | "collaboration-agreement" | "declaration-of-consent";

export const useQuestionnaireTemplate = ( questionnaireId: string, templateType: TemplateType ) => {
  const doc = new jsPDF({

  });

  

};






const riskAssessmentTemplate = ()=>{
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice V1</title>

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">

      <link rel="stylesheet" type="text/css" href="styles.css">

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>

  <body>
      <section id="invoice">
          <div class="container m-4  pb-2">
              <div class="text-center">
                  <h3 class="display-7 fw-bold">Format voor Risicotaxatie voor het Aannemen van Jongeren in een Jeugdzorginstelling</h3>
              </div>
              <div class="border-top border-bottom my-5 py-3">
                  <table>
                      <tr>
                          <td style="width: 70%;">
                              <b class="text-primary">1. Algemene Informatie</b>
                              <p class="m-0">Naam jongere: <strong>.....</strong></p>
                              <p class="m-0">Geboortedatum: <strong>.....</strong>
                              <p class="m-0">Geslacht: <strong>.....</strong></p>
                              <p class="m-0">Datum van intake: <strong>.....</strong></p>
                              <p class="m-0">Naam en functie van de intaker: <strong>.....</strong></p>
                          </td>
                          <td style="width: 70%;" >
                              <b class="text-primary">2. Achtergrondinformatie</b>
                              <p class="m-0">Gezinssituatie: <strong>.......</strong></p>
                              <p class="m-0">Onderwijs/werk: <strong>.....</strong>
                              <p class="m-0">Huidige woonsituatie: <strong>.....</strong></p>
                              <p class="m-0">Sociale netwerk: <strong>.....</strong></p>
                              <p class="m-0">Eventuele eerdere hulpverlening: <strong>.....</strong></p>
                          </td>
                      </tr>
                  </table>
              </div>
              
              <div class="border-bottom my-5 py-3">
                  <table>
                      <tr>
                          
                          <td style="width: 70%;">
                              <b class="text-primary">3. Gedrag en Psychosociale Status</b>
                              <p class="m-0">Gezinssituatie: <strong>.....</strong></p>
                              <p class="m-0">Onderwijs/werk: <strong>.....</strong>
                              <p class="m-0">Huidige woonsituatie: <strong>.....</strong></p>
                              <p class="m-0">Sociale netwerk: <strong>.....</strong></p>
                              <p class="m-0">Eventuele eerdere hulpverlening: <strong>.....</strong></p>
                          </td>
                      </tr>
              </table>
              </div>
              
              <div class=" border-bottom my-5 py-3">
                  <table>
                      <tr>
                          <td style="width: 70%;">
                              <b class="text-primary">4. Delictgedrag</b>
                              <p class="m-0">Omschrijving van gepleegde delicten: <strong>.....</strong></p>
                              <p class="m-0">Frequentie en ernst van de delicten: <strong>.....</strong>
                              <p class="m-0">Leeftijd van eerste delict: <strong>.....</strong></p>
                              <p class="m-0">Context en omstandigheden rondom delicten: <strong>.....</strong></p>
                              <p class="m-0">Reactie van de jongere op de delicten (berouw, inzicht, etc.): <strong>.....</strong></p>
                          </td>
                          
                      </tr>
                  </table>
              </div>
              
              <div class=" border-bottom my-5 py-3">
                  <table>
                      <tr>
                          <td style="width: 70%;">
                              <b class="text-primary">5. Risicofactoren</b>
                              <p class="m-0">Persoonlijke risicofactoren (impulsiviteit, agressie, etc.): <strong>.....</strong></p>
                              <p class="m-0">Omgevingsrisicofactoren (probleemgezinnen, slechte buurt, etc.): <strong>.....</strong>
                              <p class="m-0">Risico op herhaling van delictgedrag: <strong>.....</strong></p>
                              <p class="m-0">Risico op middelenmisbruik: <strong>.....</strong></p>
                          </td>
                          
                      </tr>
                  </table>
              </div>
              <div class=" border-bottom my-5 py-3">
                  <table>
                      <tr>
                          <td style="width: 70%;">
                              <b class="text-primary">6. Beschermende Factoren</b>
                              <p class="m-0">Sterke punten van de jongere: <strong>.....</strong></p>
                              <p class="m-0">Positieve invloeden in het leven van de jongere: <strong>.....</strong>
                              <p class="m-0">Beschikbare ondersteunende diensten en hulpverlening: <strong>.....</strong></p>
                              <p class="m-0">Copingstrategieën van de jongere: <strong>.....</strong></p>
                              
                          </td>
                          
                      </tr>
                  </table>
              </div>
              <div class=" border-bottom my-5 py-3">
                  <table>
                      <tr>
                          <td style="width: 70%;">
                              <b class="text-primary">7. Behoeften en Aanbevelingen</b>
                              <p class="m-0">Specifieke behoeften van de jongere (psychologische hulp, onderwijsbegeleiding, etc.): <strong>.....</strong></p>
                              <p class="m-0">Aanbevolen interventies en programma’s: <strong>.....</strong>
                              <p class="m-0">Betrokkenheid van andere instanties of professionals: <strong>.....</strong></p>
                              <p class="m-0">Plan van aanpak voor risicobeheersing: <strong>.....</strong></p>
                              
                          </td>
                          
                      </tr>
                  </table>
              </div>
              <div class=" border-bottom my-5 py-3">
                  <table>
                      <tr>
                          <td style="width: 70%;">
                              <b class="text-primary">8. Conclusie en Advies</b>
                              <p class="m-0">Samenvatting van bevindingen: <strong>.....</strong></p>
                              <p class="m-0">Advies over opname in de instelling: <strong>.....</strong>
                              <p class="m-0">Eventuele voorwaarden of aandachtspunten voor opname: <strong>.....</strong></p>
                              <p class="m-0">Naam en handtekening van de intaker: <strong>.....</strong></p>
                              <p class="m-0">Datum van rapportage: <strong>.....</strong></p>
                              
                          </td>
                          
                      </tr>
                  </table>
              </div>
              <div class="my-5 py-3">
                  <table>
                          <tr>
                              <td style="width: 70%;">
                                  <b class="text-primary">9. Evaluatie en Monitoring</b>
                                  <p class="m-0">Plan voor regelmatige evaluatie van de jongere: <strong>.....</strong></p>
                                  <p class="m-0">Criteria voor succes en voortgangsmetingen: <strong>.....</strong>
                                  <p class="m-0">Tijdschema voor evaluatiegesprekken: <strong>.....</strong></p>
                              </td>
                              
                          </tr>
                  </table>
              </div>

            
              
              
          

          </div>
      </section>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
          crossorigin="anonymous"></script>
      <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

  </body>

  </html>
  `;
}