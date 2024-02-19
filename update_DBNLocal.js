const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function updateDataToDBLocal() {
    const pageId = '64a14e36-9403-40b6-915d-88576ee88528';  
    const name = "AMS";
    const vol = "VOL 1";
    const number = 19;
    const title = "Part 11";
    const date = "1999-01-01";
    const writer = "A";
    const penciler = "B";
    const id = "AMS01-00010";
    
    try {
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
                "ID": { rich_text: [{ text: { content: id } }] }
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