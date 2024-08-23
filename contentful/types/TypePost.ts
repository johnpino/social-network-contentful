import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCommentSkeleton } from "./TypeComment";
import type { TypeUserSkeleton } from "./TypeUser";

export interface TypePostFields {
    title?: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.RichText;
    likedBy?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeUserSkeleton>>;
    comments?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCommentSkeleton>>;
}

export type TypePostSkeleton = EntrySkeletonType<TypePostFields, "post">;
export type TypePost<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePostSkeleton, Modifiers, Locales>;
