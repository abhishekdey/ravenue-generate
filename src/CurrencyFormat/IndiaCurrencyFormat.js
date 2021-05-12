const FormatNumber = ({
  revenue
}) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "decimal",
    currency: "INR"
  });
  return revenue ? `₹ ${formatter.format(revenue)}` : 0;
}

export default FormatNumber;