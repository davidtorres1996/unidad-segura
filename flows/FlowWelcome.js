import bot from "@bot-whatsapp/bot";
import { typing, delay, sendReaction } from '../utils/utils.js';
import { agregarTelefono } from '../utils/telefonos.js';


export const flowWelcome = bot.addKeyword(["Hola", "hola", "ola", "hi", "buenas", "dias", "tardes", "Noches", "buenos días", "buenas tardes",
    "buenas noches", "saludos", "hello", "good morning", "good afternoon", "good evening", "buen día",
    "buenas tardes", "buenas noches", "qué tal", "cómo estás", "cómo te va", "cómo va todo",
    "cómo te encuentras", "qué hay", "qué pasa", "qué tal estás", "qué haces", "cómo va el día",
    "cómo va la tarde", "cómo va la noche", "hola amigo", "hola amiga", "hola a todos", "hola a todas",
    "saludos cordiales", "saludos afectuosos", "saludos desde [lugar]", "un saludo", "buenos días amigo",
    "buenos días amiga", "buenos días a todos", "buenos días a todas", "buenas tardes amigo",
    "buenas tardes amiga", "buenas tardes a todos", "buenas tardes a todas", "buenas noches amigo",
    "buenas noches amiga", "buenas noches a todos", "buenas noches a todas", "buenas noches", "dulces sueños", "hola…", "hola."])
    .addAction(async (ctx, { flowDynamic, provider, gotoFlow }) => {

                await sendReaction(provider, ctx, "🚖");
                await typing(provider, ctx, 2000);
                await flowDynamic(`Hola *${ctx.pushName}* 👋\nGracias por usar el chat de Unidad Segura, a continuación le explicaré los pasos a seguir.\n\n*PASO 1 >* Escriba el número de la unidad.\n*PASO 2 >* Revise la información enviada y valide los datos con la unidad.\n\nEstos son los 2 sencillos pasos a seguir, gracias por utilizar Unidad Segura.`)


    })