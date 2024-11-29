export  const formatDate = (dateString) => {
    const date = new Date(dateString);  
    const pad = (num) => num.toString().padStart(2, '0');  
    const day = pad(date.getUTCDate());
    const month = pad(date.getUTCMonth() + 1); // Months are zero-based
    const year = date.getUTCFullYear();
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

