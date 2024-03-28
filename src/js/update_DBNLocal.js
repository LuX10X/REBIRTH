const { Client } = require("@notionhq/client");
const fs = require("fs").promises;

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function getDataById(id) {
    try {
        const data = await fs.readFile("itemsDBLocal.json", "utf-8");
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

async function updateDataToDBLocal() {
    const idToFind = "AMS01-00001";//dato de entrada

    const name = "AMS";
    const vol = "VOL 1";
    const number = 1;
    const title = "Part 2";
    const date = "1999-01-01";
    const writer = "A";
    const penciler = "B";
    //const id = "AMS01-00001";
    
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
                "Vol": { select: { name: vol } },
                "Number": { number: number },
                "Title": { rich_text: [{ text: { content: title } }] },
                "Date": { date: { start: date } },
                "Writer": { rich_text: [{ text: { content: writer } }] },
                "Penciler": { rich_text: [{ text: { content: penciler } }] },
                //"ID": { rich_text: [{ text: { content: id } }] }
            },
        });

        console.log("Datos actulizados en la base de datos local:",newData);
    } catch (error) {
        console.error("Error al actualizar datos en la base de datos.", error);
    }
}

async function main() {
    await updateDataToDBLocal();
}

main();