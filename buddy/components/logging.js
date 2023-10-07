import { serverUrl } from '../service/dataService';

export const clickLogger = async (type, gender) => {
    payload = {
        type: type,
        gender: gender
    };
    try {
        await fetch(serverUrl + "click_logging", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    } catch (e) { console.log(e) }

};