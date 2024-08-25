import { EntryProps } from "contentful-management";

const getEntry = async (id: string) => {
  const baseUrl = `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries/${id}`;
  const searchParams = `?access_token=${process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`;
  const url = `${baseUrl}${searchParams}`;

  const response = await fetch(url);
  const data: EntryProps = await response.json();

  return data;
};

export default getEntry