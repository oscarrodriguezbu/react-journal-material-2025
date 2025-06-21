// En caso de necesitar la implementación del FetchAPI
import "whatwg-fetch"; // <-- yarn add whatwg-fetch
import "setimmediate"; //esto es importante para las pruebas de subir archivos con clooudinary

require("dotenv").config({ //configuracion para la variable de entorno en testing
  path: ".env.test",
});

jest.mock("./src/helpers/getEnvironments", () => ({
  getEnvironments: () => ({ ...process.env }),
}));
