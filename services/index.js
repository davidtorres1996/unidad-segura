import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

class GoogleSheetService {
  jwtFromEnv = undefined;
  doc = undefined;

  constructor(id = undefined) {
    if (!id) {
      throw new Error("ID_UNDEFINED");
    }

    this.jwtFromEnv = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: SCOPES,
    });
    this.doc = new GoogleSpreadsheet(id, this.jwtFromEnv);
  }


  searchAndReturnRowByPhoneNumber = async (phoneNumber) => {
    try {
      await this.doc.loadInfo();
      const sheet = this.doc.sheetsByIndex[0]; // La primera hoja
  
      const rows = await sheet.getRows(); // Obtener todas las filas
  
      for (const row of rows) {
        let foundPhoneNumber = false;
        const rowData = {};
  
        for (const [index, value] of row._rawData.entries()) {
          const columnName = sheet.headerValues[index];
          rowData[columnName] = value;
  
          if (value === phoneNumber) {
            foundPhoneNumber = true;
          }
        }
  
        if (foundPhoneNumber) {
          return rowData;
        }
      }
      return null; // Retorna null si no se encuentra el número de teléfono
    } catch (err) {
      console.log("Error:", err);
      return null;
    }
  };
  
  
  /**
   * 
   * @param {*} data
   */
  saveOrder = async (data = {}) => {
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[1]; // the first sheet

    const order = await sheet.addRow({
      fecha: data.fecha,
      telefono: data.telefono,
      nombre: data.nombre,
      pedido: data.pedido,
      observaciones: data.observaciones,
    });

    return order
  };
}

export default GoogleSheetService;
