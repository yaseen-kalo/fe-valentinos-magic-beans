export const parsePrice = (priceText) => {
    if (!priceText) throw new Error("Price text is empty or undefined");

    // Remove all non-digit, non-comma, non-dot characters
    let cleaned = priceText.replace(/[^0-9.,]/g, "");

    // Handle pure cent integers (like 4798 → 47.98)
    if (/^\d{3,}$/.test(cleaned) && !cleaned.includes(",") && !cleaned.includes(".")) {
        cleaned = cleaned.slice(0, -2) + "." + cleaned.slice(-2);
    } else {
        // Replace comma with dot for decimal numbers
        cleaned = cleaned.replace(",", ".");
    }

    const parsed = parseFloat(cleaned);
    if (isNaN(parsed)) throw new Error(`Cannot parse price from text: "${priceText}"`);
    return parsed;
};