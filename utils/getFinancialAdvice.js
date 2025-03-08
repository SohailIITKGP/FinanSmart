const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  try {
    const response = await fetch("/api/getFinancialAdvice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalBudget, totalIncome, totalSpend }),
    });

    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    return data.advice;
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    return "Sorry, I couldn't fetch financial advice at this moment.";
  }
};

export default getFinancialAdvice;
