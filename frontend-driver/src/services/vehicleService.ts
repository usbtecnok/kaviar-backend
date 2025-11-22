import axios from "../utils/axios";

const vehicleService = {
    create: async (data: any) => {
        const res = await axios.post("/vehicles/create", data);
        return res.data;
    },
};

export default vehicleService;
