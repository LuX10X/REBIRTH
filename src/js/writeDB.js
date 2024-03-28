const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function addDataToDB(databaseId, properties) {
    try {
        const newPage = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: properties,
        });

        console.log(`Nueva página creada en la base de datos:`, newPage);
    } catch (error) {
        console.error("Error al agregar datos a la base de datos:", error);
    }
}

async function main(databaseId, properties) {
    try {
        await addDataToDB(databaseId, properties);
    } catch (error) {
        console.error("Error en la ejecución principal:", error);
    }
}

const databaseType = process.argv[2];
if (databaseType !== 'wiki' && databaseType !== 'local') {
    console.error("Por favor, especifique 'wiki' o 'local' como argumento.");
} else {
    const databases = {
        'wiki': {
            id: "994834b0b3f54c7790f50d544c95e9e2",
            properties: {
                "Name": { title: [{ text: { content: "X-Men" } }] },
                "Number": { number: 2 },
                "Title": { rich_text: [{ text: { content: "Second Genesis" } }] },
                "Score": { select: { name: "☆" }},
                "ID": { rich_text: [{ text: { content: "P003-0002" } }] }
            }
        },
        'local': {
            id: "ccf12b1f5b8443939d2c85ae058ea164",
            properties: {
                "Name": { title: [{ text: { content: "AMS" } }] },
                "Vol": { select: { name: "VOL 1" } },
                "Number": { number: 19 },
                "Title": { rich_text: [{ text: { content: "Part 11" } }] },
                "Date": { date: { start: "1999-01-01" } },
                "Writer": { rich_text: [{ text: { content: "A" } }] },
                "Penciler": { rich_text: [{ text: { content: "B" } }] },
                "ID": { rich_text: [{ text: { content: "AMS01-00010" } }] }
            }
        }
    };
    
    main(databases[databaseType].id, databases[databaseType].properties);
}
