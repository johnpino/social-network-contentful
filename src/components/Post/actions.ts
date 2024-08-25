"use server"

import createComment from "@/utils/createComment"
import { EntryProps } from "contentful-management"

const submitCommentAction = async (id: string, version: number, author: EntryProps['fields'], formData: FormData) => {
    await createComment(id, formData.get('comment') as string, version, author)
}

export {
    submitCommentAction
}