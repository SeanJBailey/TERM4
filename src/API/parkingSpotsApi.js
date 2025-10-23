export const saveAll = async (parkingSpots) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch("http://localhost:8080/parking-spot/saveAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(parkingSpots),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving parking spots:", error);
    throw error;
  }
};
