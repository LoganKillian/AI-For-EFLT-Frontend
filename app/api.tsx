// api.ts
const BASE_URL = 'http://127.0.0.1:5000/api'; // Make sure this points to your Flask backend

export const fetchData = async (districts: string[]) => {
    const queryString = new URLSearchParams({ district_name: districts.join(',') }).toString();
    const response = await fetch(`${BASE_URL}/filter_data?${queryString}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};
