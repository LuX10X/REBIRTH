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

async function deleteDataToDBLocal() {
    const idToFind = "P003-0002";//DATO DE ENTRADA
    
    try {
        const item = await getDataById(idToFind);
        if (!item) {
            console.error("No se encontró ningún elemento con el ID proporcionado.");
            return;
        }

        const pageId = item
        const deleteData = await notion.pages.update({
            page_id: pageId,
            archived: true,
        });

        console.log("Datos eliminados de la base de datos wiki:",deleteData);
    } catch (error) {
        console.error("Error al eliminar datos en la base de datos.", error);
    }
}

async function main() {
    await deleteDataToDBLocal();
}

main();