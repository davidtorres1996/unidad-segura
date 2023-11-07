import bot from "@bot-whatsapp/bot";
import GoogleSheetService from "../services/index.js";
import { typing, delay, sendReaction } from '../utils/utils.js';
import { flowPregunta } from "./flowPregunta.js";


const googleSheet = new GoogleSheetService(
    "12iW_x5xQuvLBQiPnvx63CJwWT6zWICtZYiAphlHj7As"
);


export const flowConsulta = bot.addKeyword(bot.EVENTS.WELCOME)
    .addAction(async (ctx, { flowDynamic, provider, gotoFlow }) => {

        const id = ctx.from
        const fechaYHoraActual = new Date();

        const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
        const diaSemana = diasSemana[fechaYHoraActual.getDay()];
        const dia = fechaYHoraActual.getDate();
        const mes = fechaYHoraActual.getMonth() + 1; // ¡Nota! Enero es 0
        const anio = fechaYHoraActual.getFullYear();
        const hora = fechaYHoraActual.getHours();
        const minutos = fechaYHoraActual.getMinutes();
        const segundos = fechaYHoraActual.getSeconds();



            await sendReaction(provider, ctx, "🚖");
            typing(provider, ctx, 2000);


            const data = await googleSheet.searchAndReturnRowByPhoneNumber(ctx.body);

            if (data !== null) {

                await flowDynamic(`Hola *${ctx.pushName}* 👋\n*Hoy es:*\n${diaSemana} - ${dia} - ${anio}\n⌚️ ${hora}:${minutos}:${segundos}\n\n*> Unidad* ${data['Numero de unidad']}\n*> Chofer:* ${data['Nombre del chofer']}\n*> Placas* - ${data['Numero de placa']}\n*> UNIDAD VERIFICADA*`)
                await gotoFlow(flowPregunta)

            } else {

                await flowDynamic(`Hola *${ctx.pushName}*\nEl número de la unidad NO está registrada o no se reconoce la unidad.`)
                await typing(provider, ctx, 2000);
                await flowDynamic(`Porfavor escriba un nuevo número de unidad.\nFecha de consulta: ${diaSemana} - ${dia} - ${anio}`)

            }


    })