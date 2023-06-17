export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Extract the day, month, and year
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear().toString();
    
    // Format the date as "MM/DD/YYYY"
    const formattedDate = `${month}/${day}/${year}`;
    
    return formattedDate;
  }
  