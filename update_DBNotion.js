const { Client } = require("@notionhq/client");

const notion = new Client({
    auth: "secret_EoxNTywQpCYhhUS80hURa31q4JNRfQvNWYYw0oPVxLX",
});

(async () => {
  const pageId = '6b1ea05f-d834-4db7-8d48-cd02c4f97ea5';
  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      Penciler: {
        rich_text: [
          {
            text: {
              content: "C",
            },
          }
        ]
      },
      ID: {
        rich_text: [
          {
            text: {
              content: "AMS01-00015",
            },
          }
        ]
      },
      Date: {
        date: {
          start: "1999-01-02",
        }
      },
      Vol: {
        select: {
          name: "VOL 2",
        }
      },
      Number: {
        number: 10
      },
      Writer: {
        rich_text: [
          {
            text: {
              content: "C",
            },
          }
        ]
      },
      Title: {
        rich_text: [
          {
            text: {
              content: "Part 15",
            },
          }
        ]
      },
      Name: {
        title: [
          {
            text: {
              content: "AMS4",
            },
          }
        ]
      }
    },
  });
  console.log(response);
})();
