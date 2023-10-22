import botWhatsappp from '@bot-whatsapp/bot'
import BaileysProvider from '@bot-whatsapp/provider/baileys'
import MockAdapter from '@bot-whatsapp/database/mock'
import fs from 'node:fs'
import axios from 'axios'

const { createBot, createProvider, createFlow, addKeyword } = botWhatsappp

const catObject = {
    tag: 'cat',
    msg: ' '
}

const getRandomCat = async (tag, msg) => {
    try {
        const res = await axios.get(`https://cataas.com/cat/${tag}`, {
            responseType: 'stream'
        });
        
        const imagePath = 'cat.jpg'; 
        const imageStream = fs.createWriteStream(imagePath);
        res.data.pipe(imageStream);

        await new Promise((resolve) => {
            imageStream.on('finish', resolve);
        });


        console.log(tag, msg)

        return imagePath;
    } catch (error) {
        console.error('error getting kitten image :(', error);
        return null;
    }
}

const flowCat = 
    addKeyword(['!cat', '!catAngry', '!catSad', '!catCute'])
    .addAction( async (ctx) => {
        if (ctx.body.includes("!cat")) {
            catObject.tag = 'cat';
            catObject.msg = '🐈 🐈 🐈';
        }
        if (ctx.body.includes("!catCute")) {
            catObject.tag = 'cute';
            catObject.msg = '^•ﻌ•^ฅ♡ ⋆⭒˚｡⋆';
        }  
        if (ctx.body.includes("!catAngry")) {
            catObject.tag = 'angry';
            catObject.msg = '😾 😾 😾';
        }  
        if (ctx.body.includes("!catSad")) {
            catObject.tag = 'sad';
            catObject.msg = '😿 😿 😿';
        } 

        await getRandomCat(catObject.tag, catObject.msg)  

    })
    .addAnswer(catObject.msg, { media: './cat.jpg', sensitive: true  })

export const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowCat])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

