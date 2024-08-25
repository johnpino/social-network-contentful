import { EntryProps, SysLink } from "contentful-management";

const createEntry = async (type: string, fields: Record<string, string | SysLink | Array<any> |undefined | null >) => {
  const mappedFields: Record<string, Record<string, string | SysLink | Array<string> | undefined | null>> = {};

  for (const key in fields) {
    mappedFields[key] = {
      [process.env.CONTENTFUL_LOCALE as string]: fields[key],
    };
  }

  const response = await fetch(
    `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
        "X-Contentful-Content-Type": type,
      },
      body: JSON.stringify({
        fields: mappedFields,
      }),
    }
  );

  const data: EntryProps = await response.json();

  return data;
};

export default createEntry;
