export const base_url = "http://localhost:8000";

export const apiPath = {
    AUTH:{
        REGISTER:"/api/auth/register",
        LOGIN:"/api/auth/login",
        GET_PROFILE:"/api/auth/get_profile"
    },
    GARBAGE:{
        CREATE:"/api/garbage/createGarbage",
        GET_USERS:"/api/garbage/getUserGarbage",
        GET_ALL:"/api/garbage/getAllGarbages",
        GET_ALL_ID:"/api/garbage/getAllGarbageIds",
        UPDATE:(id)=>`/api/garbage/updateGarbage/${id}`,
        DELETE:(id)=>`/api/garbage/deleteGarbage/${id}`,
        DISPOSED:(id)=>`/api/garbage/disposeStatus/${id}`,
    },
    DRIVER:{
        CREATE:"/api/driver/createDriver",
        GET_DRIVER:"/api/driver/getDriver",
        GET_ALL_DRIVER:"/api/driver/getAllDrivers",
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
        REMOVE_GARBAGE:(id)=>`/api/area/removeGarbage/${id}`,
        GET_ASSIGNED_GARBAGES:(id)=>`/api/area/getAssignedGarbages/${id}`,
        GET_ALL_DRIVER_ID:`/api/area/getAllDriverId`,
        GET_ALL_GARBAGE_DRIVER:`/api/area/getGarbageForDriver`

    }
}