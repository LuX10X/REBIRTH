const { Client } = require("@notionhq/client");
const fs = require("fs").promises;

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function getDataById(id) {
    try {
        const data = await fs.readFile("itemsDBWiki.json", "utf-8");
        const items = JSON.parse(data);
        const item = items.find(item => item.ID === id);
        if (item) {
            return item.id;
        } else {
            console.error("No se encontró ningún elemento con el ID proporcionado:", id);
            return null;
        }
    } catch (error) {
        console.error("Error al leer el archivo JSON:", error);
        throw error;
    }
}

async function updateDataToDBWiki() {
    const idToFind = "P003-0002";//DATO DE ENTRADA

    const name = "X-Men2";
    const number = 1;
    const title = "Part 2";
    const score = "☆☆";
    //const id = "P003-0002";
    
    try {
        const item = await getDataById(idToFind);
        if (!item) {
            console.error("No se encontró ningún elemento con el ID proporcionado.");
            return;
        }

        const pageId = item
        const newData = await notion.pages.update({
            page_id: pageId,
            properties: {
                "Name": { title: [{ text: { content: name } }] },
                "Number": { number: number },
                "Title": { rich_text: [{ text: { content: title } }] },
                "Score": { select: { name: score,}},
                //"ID": { rich_text: [{ text: { content: id } }] }
            },
        });

        console.log("Datos actulizados en la base de datos wiki:",newData);
    } catch (error) {
        console.error("Error al actualizar datos en la base de datos.", error);
    }
}

async function main() {
    await updateDataToDBWiki();
}

main();