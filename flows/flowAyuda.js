import bot from "@bot-whatsapp/bot";
import { typing, delay, sendReaction } from '../utils/utils.js';

export const flowAyuda = bot.addKeyword(["Ayuda", "por favor ayuda", "necesito ayuda", "estoy en peligro", "necesito asistencia", "socorro",
"auxilio", "por favor", "socorro", "ayúdame por favor", "ayuda urgente", "necesito ayuda inmediata",
"estoy en problemas", "por favor", "auxilio", "ayúdenme", "necesito asesoramiento", "ayuda por favor",
"socorro estoy en peligro", "auxilio", "urgente", "necesito apoyo", "ayuda necesaria"])
.addAction(async (ctx, { flowDynamic, provider, gotoFlow }) => {

    await sendReaction(provider, ctx, "🚖");
    await typing(provider, ctx, 2000);
    await flowDynamic('Si desea reportar un suceso o chófer, puede llamar directamente al 911 dando click al siguiente enlace:\nhttps://bit.ly/US-911')

})
