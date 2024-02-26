const { Client } = require("@notionhq/client");
const fs = require('fs');

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function createNotionDatabase() {
    try {
        const response = await notion.databases.create({
            parent: {
                type: "page_id",
                page_id: "8c60eb161c304ac4b7b5f197d51d14ea",
            },
            icon: {
                type: "emoji",
                emoji: "4️⃣",
            },
            cover: {
                type: "external",
                external: {
                    url: "https://www.akiracomics.com/imagenes/poridentidad?identidad=ab835df9-78cf-4b00-88d8-2eb7a8bdf297&ancho=850&alto=",
                },
            },
            title: [
                {
                    type: "text",
                    text: {
                        content: "Future Fundation",
                    },
                },
            ],
            description: [
                {
                    type: "text",
                    text: {
                        content: "Tabla",
                    },
                },
            ],
            is_inline: true,
            properties: {
                "Name": {
                    "type": "title",
                    "title": {}
                }
            }
        });

        console.log('Base de datos creada con la propiedad "Name":', response);

        // Guardar las propiedades restantes en un archivo JSON
        const propertiesToCreate = {
            "Vol": { "type": "select", "select": {} },
            "Number": { "type": "number", "number": {} },
            "Title": { "type": "rich_text", "rich_text": {} },
            "Date": { "type": "date", "date": {} },
            "Writer": { "type": "rich_text", "rich_text": {} },
            "Penciler": { "type": "rich_text", "rich_text": {} },
            "ID": { "type": "rich_text", "rich_text": {} }
        };
        fs.writeFileSync('propertiesToCreate.json', JSON.stringify(propertiesToCreate, null, 2));

        return response.id;
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
    }
}

async function addPropertiesFromJson(databaseId) {
    try {
        const propertiesJson = fs.readFileSync('propertiesToCreate.json', 'utf-8');
        const propertiesToAdd = JSON.parse(propertiesJson);

        const propertyKeys = Object.keys(propertiesToAdd);

        for (const key of propertyKeys) {
            const property = propertiesToAdd[key];
            const response = await notion.databases.update({
                database_id: databaseId,
                properties: {
                    [key]: property
                }
            });
            console.log(`Propiedad "${key}" agregada a la base de datos.`, response);
        }

    } catch (error) {
        console.error('Error al agregar las propiedades desde el archivo JSON:', error);
    }
}

async function main() {
    try {
        const databaseId = await createNotionDatabase();
        await addPropertiesFromJson(databaseId);
    } catch (error) {
        console.error("Error en la ejecución principal:", error);
    }
}

main();
