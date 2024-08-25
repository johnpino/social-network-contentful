"use server"

import { signIn } from "@/auth";

const signInAction = async () => {
    await signIn("github");
}

export {
    signInAction
}