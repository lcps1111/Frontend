import { serverUrl } from '../service/dataService';

export const clickLogger = async (type, gender) => {
    const payload = {
        type,
        gender
    };

    try {
        const response = await fetch(serverUrl + "click_logging", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('Failed to log click. Status:', response.status, 'Response:', errorData);
        }

    } catch (e) { console.log("Error logging click:", e) }

};