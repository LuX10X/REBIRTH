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
        
        fs.writeFileSync('dataDBLocal.json', JSON.stringify(readPage, null, 2));

        console.log("Datos de la base de datos local:", readPage)
    } catch (error) {
        console.error("Error al mostrar los datos de la base de datos:", error);
    }
}

async function readDataFromFile() {
    try {
        const rawData = fs.readFileSync('dataDBLocal.json');
        const data = JSON.parse(rawData);

        const objectsList = [];

        data.results.forEach(page => {
            const objectData = {};

            objectData.id = page.id;

            const properties = page.properties;

            Object.keys(properties).forEach(propertyKey => {
                const property = properties[propertyKey];
                if (property.type === 'title' || property.type === 'rich_text') {
                    objectData[propertyKey] = property[property.type][0].text.content;
                } else if (property.type === 'number') {
                    objectData[propertyKey] = property.number;
                } else if (property.type === 'date') {
                    objectData[propertyKey] = property.date.start;
                } else if (property.type === 'select') {
                    objectData[propertyKey] = property.select.name;
                }
            });

            objectsList.push(objectData);
        });

        console.log("Datos leídos del archivo:", objectsList);

        fs.writeFileSync('itemsDBLocal.json', JSON.stringify(objectsList, null, 2));

        return objectsList;
    } catch (error) {
        console.error("Error al leer el archivo:", error);
        return null;
    }
}

async function main() {
    try{
        await readDataDBLocal();
        await readDataFromFile();
    } catch (error) {
        console.error("Error en la ejecución principal:", error);
    }
}

main();