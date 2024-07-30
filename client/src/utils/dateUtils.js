export const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`;

    return formattedDate;
};