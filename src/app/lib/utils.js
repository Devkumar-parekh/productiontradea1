// import { Revenue } from "./definitions";

export const formatCurrency = (amount) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (dateStr, locale = "en-US") => {
  const date = new Date(dateStr);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export async function generateSHA256Hash(data) {
  // Encode the data as a Uint8Array
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  // Hash the data
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
export function encodeDate(date) {
  const dateString = date.toISOString(); // Convert date to ISO string
  const encodedDate = btoa(dateString); // Encode using Base64
  return encodedDate;
}
export function decodeDate(encodedDate) {
  const dateString = atob(encodedDate); // Decode Base64
  return new Date(dateString); // Create a Date object
}

// ENCODER_KEY;
function xorEncryptDecrypt(input) {
  const key = process.env.ENCODER_KEY || "devtestsecret";
  let output = "";
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(
      input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return output;
}

export function encodeWithKey(data) {
  // Encrypt the data with the key
  const encryptedData = xorEncryptDecrypt(data);
  // Encode the encrypted data to base-64
  return btoa(encryptedData);
}

export function decodeWithKey(encodedData) {
  // Decode from base-64
  const encryptedData = atob(encodedData);
  // Decrypt the data with the key
  return xorEncryptDecrypt(encryptedData);
}
