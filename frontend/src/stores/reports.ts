import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useReportsStore = defineStore('reports', () => {
    const reports = ref<[{
        id: String,
        location: {
            city: String,
            address: String,
            latitude: Number,
            longitude: Number,
            },
        pic: String,
        riskLevel: Number,
        date: Date,
        username: String
    }]>();

    function setReports(newReports: [{
        id: String; 
        location: {
            city: String;
            address: String;
            latitude: Number;
            longitude: Number;
        }; 
        pic: String; 
        riskLevel: Number; 
        date: Date; 
        username: String;
        }]) {
        reports.value = newReports
    } 
    return { reports, setReports }
})