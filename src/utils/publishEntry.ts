import { EntryProps } from "contentful-management";

const publishContentfulEntry = async (entry: EntryProps) => {
  const response = await fetch(
    `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries/${entry.sys.id}/published`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`,
        "X-Contentful-Version": `${entry.sys.version}`,
      },
    }
  );

  const data = await response.json()

  return data
};

export default publishContentfulEntry;
