import type {Actions} from "./$types"

export const actions = {
    default: async (request) => {
        console.log("default action")
    }
} satisfies Actions;