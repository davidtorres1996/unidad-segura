import bot from "@bot-whatsapp/bot";
import QRPortalWeb from "@bot-whatsapp/portal";
import BaileysProvider from "@bot-whatsapp/provider/baileys";
import JsonFileAdapter from "@bot-whatsapp/database/json";
import linkPreview from 'link-preview-js';
import "dotenv/config";

import { flowConsulta } from "./flows/flowConsulta.js";
import { flowPregunta } from "./flows/flowPregunta.js";
import { flowAyuda } from "./flows/flowAyuda.js";
import { flowWelcome } from "./flows/flowWelcome.js";


const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = bot.createFlow([
        flowConsulta,
        flowPregunta,
        flowAyuda,
        flowWelcome

    ])
    const adapterProvider = bot.createProvider(BaileysProvider)

    bot.createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
