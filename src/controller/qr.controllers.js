import { join, dirname } from 'node:path';
import { createReadStream, existsSync} from 'node:fs'
import { fileURLToPath } from 'node:url';

const name = process.env.QR_FILE ?? 'bot';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const qrController = async (_, res) => {
    const qrSource = [
        join(process.cwd(), `${name}.qr.png`),
        join(__dirname, '..', `${name}.qr.png`),
        join(__dirname, `${name}.qr.png`),
    ].find((i) => existsSync(i));

    const qrMark = [
        join(__dirname, 'dist', 'water-mark.png'),
        join(__dirname, '..', 'dist', 'water-mark.png'),
    ].find((i) => existsSync(i));
    const fileStream = createReadStream(qrSource ?? qrMark);

    res.writeHead(200, { 'Content-Type': 'image/png' });
    fileStream.pipe(res);
}