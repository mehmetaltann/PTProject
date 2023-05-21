import axios from "axios";
import { BASE_URL } from "../utils/localData";

const getData = async (exlink, rejectWithValue) => {
  try {
    const res = await axios.get(`${BASE_URL}/${exlink}`);
    return res.data;
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
};

const postData = async (data, exlink, rejectWithValue) => {
  try {
    const res = await axios.post(`${BASE_URL}/${exlink}`, data);
    return res.data;
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
};

const deleteData = async (id, exlink, rejectWithValue) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${exlink}/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue({ error: err.message });
  }
};

const dataServices = {
  getData,
  postData,
  deleteData,
};

export default dataServices;
