const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function addDataToDBWiki() {
    const databaseId = "994834b0b3f54c7790f50d544c95e9e2";//ID DE LA DB WIKI NO CAMBIAR
    const name = "X-Men";
    const number = 2;
    const title = "Second Genesis";
    const score = "☆";
    const id = "P003-0002";
    const labels = ["Spiderman","Avengers"];
    const order = 1;

    try {
        const labelOptions = labels.map(label => ({ name: label })); // Crear objetos de opciones de etiqueta

        const newPage = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "Name": { title: [{ text: { content: name } }] },
                "Number": { number: number },
                "Title": { rich_text: [{ text: { content: title } }] },
                "Score": { select: { name: score,}},
                "ID": { rich_text: [{ text: { content: id } }] },
                "Label": { multi_select: labelOptions},
                "Order": { number: order }
            },
        });

        console.log("Nueva página creada en la base de datos wiki:", newPage);
    } catch (error) {
        console.error("Error al agregar datos a la base de datos:", error);
    }
}

async function main() {
    await addDataToDBWiki();
}

main();