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

//FORMA 1 CON IF
async function updateData(id, file, newData) {
    try {
        const item = await getDataById(id, file);
        if (!item) {
            console.error("No se encontró ningún elemento con el ID proporcionado.");
            return;
        }

        const pageId = item;
        const properties = {
            "Name": { title: [{ text: { content: newData.name } }] },
            "Number": { number: newData.number },
            "Title": { rich_text: [{ text: { content: newData.title } }] },
            "Order": { number: newData.order }
        };

        if (newData.score) properties["Score"] = { select: { name: newData.score }};
        if (newData.vol) properties["Vol"] = { select: { name: newData.vol }};
        if (newData.labels) properties["Label"] = { multi_select: newData.labels.map(label => ({ name: label })) };
        if (newData.date) properties["Date"] = { date: { start: newData.date } };
        if (newData.writer) properties["Writer"] = { rich_text: [{ text: { content: newData.writer } }] };
        if (newData.penciler) properties["Penciler"] = { rich_text: [{ text: { content: newData.penciler } }] };

        const updatedData = await notion.pages.update({
            page_id: pageId,
            properties: properties,
        });

        console.log(`Datos actualizados en la base de datos:`, updatedData);
    } catch (error) {
        console.error("Error al actualizar datos en la base de datos:", error);
    }
}

//FORMA 2 SIN IF
async function updateData(id, file, newData) {
    try {
        const item = await getDataById(id, file);
        if (!item) {
            console.error("No se encontró ningún elemento con el ID proporcionado.");
            return;
        }

        const pageId = item;
        const properties = {
            "Name": { title: [{ text: { content: newData.name } }] },
            "Number": { number: newData.number },
            "Title": { rich_text: [{ text: { content: newData.title } }] },
            "Order": { number: newData.order }
        };

        const optionalProperties = {
            "Score": { select: { name: newData.score }},
            "Vol": { select: { name: newData.vol }},
            "Label": { multi_select: newData.labels.map(label => ({ name: label })) },
            "Date": { date: { start: newData.date } },
            "Writer": { rich_text: [{ text: { content: newData.writer } }] },
            "Penciler": { rich_text: [{ text: { content: newData.penciler } }] }
        };

        for (const [key, value] of Object.entries(optionalProperties)) {
            if (newData[key]) {
                properties[key] = value;
            }
        }

        const updatedData = await notion.pages.update({
            page_id: pageId,
            properties: properties,
        });

        console.log(`Datos actualizados en la base de datos:`, updatedData);
    } catch (error) {
        console.error("Error al actualizar datos en la base de datos:", error);
    }
}


async function main() {

    const wikiData = {
        databaseId: "994834b0b3f54c7790f50d544c95e9e2",//creo no se esta usando este dato
        id: "P003-0002",
        file: "itemsDBWiki.json",
        newData: {
            name: "X-Men",
            number: 3,
            title: "Second Genesis2",
            score: "☆",
            labels: ["Spiderman", "Avengers"],
            order: 2
        }
        
    };

    const localData ={
        databaseId: "ccf12b1f5b8443939d2c85ae058ea164",//creo no se esta usando este dato
        id: "AMS01-00010",
        file: "itemsDBLocal.json",
        newData: {
            name: "AMS",
            vol: "VOL 1",
            number: 19,
            title: "Part 11",
            date: "1999-01-01",
            writer: "A",
            penciler: "B",
            order: 19
        }
    };

    await updateData(wikiData.id, wikiData.file, wikiData.newData);
    await updateData(localData.id, localData.file, localData.newData);
}

main();
