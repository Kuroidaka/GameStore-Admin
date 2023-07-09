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
  

export const formatMoney = (money) => {
    // Create our number formatter.

    if(typeof(money) === 'string') {
        money = Number(money)
    }
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(money)
}