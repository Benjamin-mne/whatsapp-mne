const publicSite = process.env.PUBLIC_URL ?? 'http://localhost';
const port = process.env.PORT || 8080;

export const banner = () => {
    console.log(``);
    console.log(`---- 🤖 ESCANEAR QR:`);
    console.log(``);
    console.log(`- Puedes visitar: ${publicSite}:${port}/qr`);
    console.log(`- Se ha creado un archivo que finaliza en: qr.png`)
    console.log(``);
};