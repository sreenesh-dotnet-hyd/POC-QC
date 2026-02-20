import axios, { HttpStatusCode } from "axios";
import { connectionString } from "../api/connectionStrings";
import type { Sample } from "../types/sample.types";

export async function fetchData() {
    try {
        const response = await axios.get(connectionString);
        if (!response.data) {
            throw new Error("no data fetched!");
        } else {
            return response.data;
        }

    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function PostData(sample: Sample) {
    try {

        const response = await axios.post(connectionString, { ...sample, "id": 0 });
        return response.data;
    }
    catch (err) {
        throw err;
    }
}

export async function DeleteData(sampleId: string) {
    try {
        const response = await axios.delete(connectionString + "/" + sampleId);
        if (response.status == 200) {
            console.log('sucess')
        }
    }
    catch (err) {
        throw err;
    }
}

export async function PutData(sample: Sample) {
    try {
        const response = await axios.put(connectionString + "/" + sample.sampleId, sample);
        if (response.status == 200) {
            console.log('sucess')
        }
    }catch (err) {
        throw err;
    }
}