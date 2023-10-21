import botWhatsappp from '@bot-whatsapp/bot'
import BaileysProvider from '@bot-whatsapp/provider/baileys'
import MockAdapter from '@bot-whatsapp/database/mock'

const { createBot, createProvider, createFlow, addKeyword } = botWhatsappp

const flowPrincipal = addKeyword(['!hola' ]).addAnswer('¡Hola! 👁️')

export const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

