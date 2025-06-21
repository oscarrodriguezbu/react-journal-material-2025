import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "dgmznkfua",
  api_key: "517319215422273",
  api_secret: "4trCPPOhVTAzEx5V9FbvOnoKFcM",
  secure: true,
});

describe("Pruebas en fileUpload", () => {
  test("debe de subir el archivo correctamente a cloudinary", async () => {
    const imageUrl =
      "https://res.cloudinary.com/dgmznkfua/image/upload/v1750054133/jorunal/uikhazeuj1u7rnxdemew.jpg?w=164&h=164&fit=crop&auto=format&dpr=2";
    //   "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");
    // "Binary Large Object" (Objeto Binario Grande), 
    // es un tipo de dato que se utiliza para almacenar grandes cantidades de datos binarios, 
    // como imágenes, videos, archivos de audio u otros datos no estructurados
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    // console.log(url);

    //limpieza de la imagen subida para el test
    const segments = url.split("/"); //crea un array separando por /
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    // console.log(imageId);

    const cloudResp = await cloudinary.api.delete_resources(
      ["jorunal/" + imageId], //en teoria es journal, pero lo escribí mal en mi cloudinary y me da pereza cambiar todo
      {
        resource_type: "image",
      }
    );
    // console.log({ cloudResp })
  });

  test("debe de retornar null", async () => {
    const file = new File([], "foto.jpg");
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
