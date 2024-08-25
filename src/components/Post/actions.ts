"use server"

import createComment from "@/utils/createComment"
import createReaction from "@/utils/createReaction"
import { EntryProps } from "contentful-management"

const submitCommentAction = async (id: string, version: number, author: EntryProps['fields'], formData: FormData) => {
    await createComment(id, formData.get('comment') as string, version, author)
}

const submitReactionAction = async (type: string, postId: string, authorId: string) => {
    await createReaction(type, postId, authorId)
}

export {
    submitCommentAction,
    submitReactionAction
}