const { Client } = require("@notionhq/client");
const fs = require('fs');

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function readDataDBLocal() {
    const databaseId = "ccf12b1f5b8443939d2c85ae058ea164";//ID DE LA DB LOCAL

    try {
        const readPage = await notion.databases.query({
            database_id: databaseId,
        });
        
        fs.writeFileSync('dataDBLocal2.json', JSON.stringify(readPage, null, 2));

        console.log("Datos de la base de datos 'Other Day':", readPage)
    } catch (error) {
        console.error("Error al mostrar los datos de la base de datos:", error);
    }
}

async function main() {
    await readDataDBLocal();
}

main();