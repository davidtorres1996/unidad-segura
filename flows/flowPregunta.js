import bot from "@bot-whatsapp/bot";
import { typing, delay, sendReaction } from '../utils/utils.js';

export const flowPregunta = bot.addKeyword(bot.EVENTS.ACTION)
    .addAnswer('*¿Abordo la unidad?*\nResponda con un: *SI* o *N0*')
    .addAction({ capture: true }, async (ctx, { flowDynamic, provider, fallBack }) => {
        const cuerpo = ctx.body.toLowerCase(); // Convertir el valor de ctx.body a minúsculas
        if (cuerpo === 'si') {
            // Si ctx.body es igual a 'si', hacer algo
            await sendReaction(provider, ctx, "🚖");
            await typing(provider, ctx, 2000);
            await flowDynamic('Gracias por usar Unidad Segura, tenga un buen viaje.')
            await typing(provider, ctx, 2000);
            await flowDynamic('Si desea reportar un suceso o chófer, puede llamar directamente al 911 dando click al siguiente enlace:\nhttps://bit.ly/US-911')
            await typing(provider, ctx, 2000);
            await flowDynamic('Reportes del uso de la aplicación o quejas: www.UnidadSegura.com')
        
        
        } else if (cuerpo === 'no') {
            // Si ctx.body es igual a 'no', hacer algo diferente
            await sendReaction(provider, ctx, "🚖");
            await flowDynamic(' Porfavor escriba nuevamente solo el número de la siguiente unidad:');
        } else {
            // Si no es 'si' ni 'no', hacer otra cosa
            fallBack()
        }

    })
