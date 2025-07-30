export const base_url = "http://localhost:8000";

export const apiPath = {
    AUTH:{
        REGISTER:"/api/auth/register",
        LOGIN:"/api/auth/login",
        GET_PROFILE:"/api/auth/get_profile"
    },
    GARBAGE:{
        CREATE:"/api/garbage/createGarbage",
        GET_ONE:(id)=>`/api/garbage/getOneGarbage/${id}`,
        GET_ALL:"/api/garbage/getAllGarbages",
        UPDATE:(id)=>`/api/garbage/updateGarbage/${id}`,
        DELETE:(id)=>`/api/garbage/deleteGarbage/${id}`,
        DISPOSED:(id)=>`/api/garbage/disposeStatus${id}`,
    },
    DRIVER:{
        CREATE:"/api/driver/createDriver",
        GET_DRIVER:"/api/driver/getDriver",
        UPDATE:(id)=>`/api/driver/updateDriver/${id}`,
        DELETE:(id)=>`/api/driver/deleteDriver/${id}`
    },
    AREA:{
        CREATE:"/api/area/createArea",
        GET:"/api/area/getArea",
        GET_FOR_DRIVER:"/api/area/getAreaForDriver",
        UPDATE:(id)=>`/api/area/updateArea/${id}`,
        DELETE:(id)=>`/api/area/deleteArea/${id}`,
        ASSIGN_DRIVER:(id)=>`/api/area/assignDriver/${id}`,
        REMOVE_DRIVER:(id)=>`/api/area/removeDriver/${id}`,
        ASSIGN_GARBAGE:(id)=>`/api/area/assignGarbage/${id}`,
        REMOVE_GARBAGE:()=>`/api/area/removeGarbage/${id}`
    }
}