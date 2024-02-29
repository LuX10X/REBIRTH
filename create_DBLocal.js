const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function duplicatePage(pageId) {
    try {
        const response = await notion.request({
            path: `pages/${pageId}/duplicate`,
            method: 'post'
        });

        console.log("Página duplicada exitosamente:", response);
        return response;
    } catch (error) {
        console.error("Error al duplicar la página:", error);
        throw error;
    }
}

async function main() {
    try {
        const pageId = "8b480ab250434579b08e16003f8e17ef"; // ID de la página que deseas duplicar
        await duplicatePage(pageId);
    } catch (error) {
        console.error("Error en la ejecución principal:", error);
    }
}

main();
