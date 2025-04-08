import axios from "axios";

const getCoinbaseAssetsList = async () => {
    try {
        const response = await axios.get(`/api/coinbase/assets-list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching assets list:', error);
    }
};

export {
    getCoinbaseAssetsList,
}