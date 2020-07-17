export const getUser = async () => {
  const response = await fetch('https://reqres.in/api/users/2');
  const {data} = await response.json();
  return data;
};
