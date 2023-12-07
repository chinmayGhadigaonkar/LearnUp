function formatDateDifference(timestamp) {
  const currentDate = new Date();
  const originalDate = new Date(timestamp);

  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

  // Check if it's today
  if (
    currentDate.getFullYear() === originalDate.getFullYear() &&
    currentDate.getMonth() === originalDate.getMonth() &&
    currentDate.getDate() === originalDate.getDate()
  ) {
    return "Today";
  }

  // Check if it's yesterday
  const yesterday = new Date(currentDate - oneDay);
  if (
    yesterday.getFullYear() === originalDate.getFullYear() &&
    yesterday.getMonth() === originalDate.getMonth() &&
    yesterday.getDate() === originalDate.getDate()
  ) {
    return "Yesterday";
  }

  // Calculate date difference
  const yearDifference = currentDate.getFullYear() - originalDate.getFullYear();
  const monthDifference = currentDate.getMonth() - originalDate.getMonth();

  let formattedDate = "";

  if (yearDifference > 0) {
    formattedDate +=
      yearDifference === 1 ? "1 year" : `${yearDifference} years`;
  }

  if (monthDifference > 0) {
    if (formattedDate.length > 0) {
      formattedDate += ", ";
    }
    formattedDate +=
      monthDifference === 1 ? "1 month" : `${monthDifference} months`;
  }

  if (formattedDate.length === 0) {
    // Return today or yesterday if it didn't match earlier conditions
    return "Some time"; // You can adjust this to handle cases not covered
  }

  return formattedDate + " ago";
}

// Replace 'uploadedTimestamp' with the actual timestamp of the uploaded data
// const uploadedTimestamp = "2023-11-20T09:03:09.766Z";
// const formattedDifference = formatDateDifference(uploadedTimestamp);
// console.log(formattedDifference);

export default formatDateDifference;
