const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function addData(databaseId, data) {
    try {
        const newPage = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "Name": { title: [{ text: { content: data.name } }] },
                "Number": { number: data.number },
                "Title": { rich_text: [{ text: { content: data.title } }] },
                "ID": { rich_text: [{ text: { content: data.id } }] },
                ...(data.vol && { "Vol": { select: { name: data.vol } } }),
                ...(data.score && { "Score": { select: { name: data.score } } }),
                ...(data.date && { "Date": { date: { start: data.date } } }),
                ...(data.writer && { "Writer": { rich_text: [{ text: { content: data.writer } }] } }),
                ...(data.penciler && { "Penciler": { rich_text: [{ text: { content: data.penciler } }] } }),
                ...(data.labels && { "Label": { multi_select: data.labels.map(label => ({ name: label })) } }),
                "Order": { number: data.order }
            },
        });

        console.log(`Nueva página creada en la base de datos ${databaseId}:`, newPage);
    } catch (error) {
        console.error("Error al agregar datos a la base de datos:", error);
    }
}

async function main() {
    const wikiData = {
        databaseId: "994834b0b3f54c7790f50d544c95e9e2",
        name: "X-Men",
        number: 3,
        title: "Second Genesis2",
        score: "☆",
        id: "P003-0002",
        labels: ["Spiderman", "Avengers"],
        order: 2
    };

    const localData = {
        databaseId: "ccf12b1f5b8443939d2c85ae058ea164",
        name: "AMS",
        vol: "VOL 1",
        number: 19,
        title: "Part 11",
        date: "1999-01-01",
        writer: "A",
        penciler: "B",
        id: "AMS01-00010",
        order: 19
    };

    //await addData(wikiData.databaseId, wikiData);
    await addData(localData.databaseId, localData);
}

main();
