const { Client } = require("@notionhq/client");
const fs = require("fs").promises;

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function getDataById(id, file) {
    try {
        const data = await fs.readFile(file, "utf-8");
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

async function deleteData(databaseId, file, id) {
    try {
        const item = await getDataById(id, file);
        if (!item) {
            console.error("No se encontró ningún elemento con el ID proporcionado.");
            return;
        }

        const pageId = item;
        const deleteData = await notion.pages.update({
            page_id: pageId,
            archived: true,
        });

        console.log(`Datos eliminados de la base de datos:`, deleteData);
    } catch (error) {
        console.error("Error al eliminar datos en la base de datos:", error);
    }
}

async function main() {
    const wikiData = {
        databaseId: "994834b0b3f54c7790f50d544c95e9e2",//creo no se esta usando este dato
        id: "P003-0002",
        file: "itemsDBWiki.json"
    };

    const localData = {
        databaseId: "ccf12b1f5b8443939d2c85ae058ea164",//creo no se esta usando este dato
        id: "AMS01-00003",
        file: "itemsDBLocal.json"
    };

    await deleteData(wikiData.databaseId, wikiData.file, wikiData.id);
    await deleteData(localData.databaseId, localData.file, localData.id);
}

main();
