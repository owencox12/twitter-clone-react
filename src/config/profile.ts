import { AxiosInstance } from "axios"
import { patchObjType } from "../types/profileTypes"


export const profileApi = (instance: AxiosInstance) => ({
    async updateProfile (id: string | undefined, obj: patchObjType) {
        await instance.patch(`/user/${id}/update`, obj)
    }
})