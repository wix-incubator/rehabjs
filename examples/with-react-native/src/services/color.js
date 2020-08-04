
export const getColors = async (page) => {
  const response = await fetch(
    'https://reqres.in/api/unknown' + (page ? `?page=${page}` : ''),
  );
  return await response.json();
};
