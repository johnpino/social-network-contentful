import type { Adapter } from "@auth/core/adapters"
 
export const MyAdapter: Adapter = {
    createUser(user){
        console.log('user is', user)
        return user
    }
}