'use server';

import fs from 'node:fs';
import base64 from 'base64-js';
import { gzip, tgz } from 'compressing';

export default async function compressFile(formData: FormData) {
    const file = formData.get('file') as File;
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    await gzip.compressFile(fileBuffer, './tmp.gz', {
        relativePath: './',
    });

    const data = fs.readFileSync('./tmp.gz');
    const hexString = data.toString('hex');
    // const base64Data = Buffer.from(binaryString);
    // const base64String = base64Data.toString('base64')
    // console.log(binaryString);
    // console.log(base64String);
    fs.unlink('./tmp.gz', (err) => {
        if (err) {
            console.error('Error deleting the file:', err);
        } else {
            console.log('File deleted successfully.');
        }
    });
    return hexString;
}
