import axios from "axios";
import { slideConnectionString } from "../api/connectionStrings";

export const fetchSlidesData = async ()=>{
try{
    const res = await axios.get(slideConnectionString);
    if(res){
        const data = res.data;
        return data;
    }else{
        console.log("failed to fetch");
    }
}catch(err){
    throw err;
}
}

export const fetchSlidesCountData = async ()=>{
try{
    const res = await axios.get(slideConnectionString+"/slide-count");
    if(res){
        const data = res.data;
        return data;
    }else{
        console.log("failed to fetch");
    }
}catch(err){
    throw err;
}
}


export async function PostSlideData(slide: Slide) {
    try {

        const response = await axios.post(connectionString, { ...sample, "id": 0 });
        return response.data;
    }
    catch (err) {
        throw err;
    }
}

export async function DeleteSlideData(slideId: string) {
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

