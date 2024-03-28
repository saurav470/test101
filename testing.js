import axios from 'axios'

async function t() {
  return await axios.get("http://localhost:8001/test"
  );
}

const arr = [];

for (let i = 0; i < 12; i++) {
  arr.push(t());
}
const test = async () => {

  try {
    const responses = await Promise.all(arr);
    responses.forEach(response => {
      console.log(response.status,response.data);
    });
  } catch (error) {
    console.log(error.message);
  }
};

test();
