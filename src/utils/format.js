export const formatCurrency = (n) =>
  `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export const percentChange = (curr, prev) => {
  if (!prev) return 0;
  return +(((curr - prev) / prev) * 100).toFixed(1);
};

export const classNames = (...args) => args.filter(Boolean).join(" ");
