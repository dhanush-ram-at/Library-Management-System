const getDaysDifference = (dueDate, returnDate) => {
  const due    = new Date(dueDate);
  const ret    = new Date(returnDate);
 
  // difference in milliseconds → convert to days
  const diffMs   = ret - due;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
 
  // if negative or zero, the book was returned on time → 0 days late
  return diffDays > 0 ? diffDays : 0;
};
 
module.exports = { getDaysDifference };