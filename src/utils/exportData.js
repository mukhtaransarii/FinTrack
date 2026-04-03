// src/utils/exportData.js

export function exportJSON(transactions) {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], {
    type: "application/json",
  });
  downloadFile(blob, "transactions.json");
}

export function exportCSV(transactions) {
  const headers = ["id", "date", "title", "amount", "category", "type"];
  const rows = transactions.map((tx) =>
    headers.map((h) => tx[h]).join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  downloadFile(blob, "transactions.csv");
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
