const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function addDataToDBLocal() {
    const databaseId = "ccf12b1f5b8443939d2c85ae058ea164";//ID DE LA DB LOCAL
    const name = "AMS";
    const vol = "VOL 1";
    const number = 19;
    const title = "Part 11";
    const date = "1999-01-01";
    const writer = "A";
    const penciler = "B";
    const id = "AMS01-00010";
    const order = 19;

    try {
        const newPage = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "Name": { title: [{ text: { content: name } }] },
                "Vol": { select: { name: vol } },
                "Number": { number: number },
                "Title": { rich_text: [{ text: { content: title } }] },
                "Date": { date: { start: date } },
                "Writer": { rich_text: [{ text: { content: writer } }] },
                "Penciler": { rich_text: [{ text: { content: penciler } }] },
                "ID": { rich_text: [{ text: { content: id } }] },
                "Order": { number: order }
            },
        });

        console.log("Nueva página creada en la base de datos local:", newPage);
    } catch (error) {
        console.error("Error al agregar datos a la base de datos:", error);
    }
}

async function main() {
    await addDataToDBLocal();
}

main();
