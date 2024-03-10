const { Client } = require("@notionhq/client");
const fs = require('fs');
const { type } = require("os");

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

async function readDataDBLocal() {
    const databaseId = "ccf12b1f5b8443939d2c85ae058ea164";//ID DE LA DB LOCAL

    try {
        const readPage = await notion.databases.retrieve({
            database_id: databaseId,
        });
        
        fs.writeFileSync('infoDBLocal.json', JSON.stringify(readPage, null, 2));

        console.log("Datos de la base de datos local:", readPage)
    } catch (error) {
        console.error("Error al mostrar los datos de la base de datos:", error);
    }
}

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
          "1 Name": {
            "type": "title",
            "title": {}
          },
          "2 Vol": {
            "type": "select",
            "select": {}
          },
          "3 Number": {
            "type": "number",
            "number": {}
          },
          "4 Title": {
            "type": "rich_text",
            "rich_text": {}
          },
          "5 Date": {
            "type": "date",
            "date": {}
          },
          "6 Writer": {
            "type": "rich_text",
            "rich_text": {}
          },
          "7 Penciler": {
            "type": "rich_text",
            "rich_text": {}
          },
          "8 ID": {
            "type": "rich_text",
            "rich_text": {}
          }
        }
      });

      console.log('Base de datos creada:', response);
    } catch (error) {
      console.error('Error al crear la base de datos:', error);
    }
}

async function main() {
    try{
        //await readDataDBLocal();
        await createNotionDatabase();
    } catch (error) {
        console.error("Error en la ejecución principal:", error);
    }
}

main();