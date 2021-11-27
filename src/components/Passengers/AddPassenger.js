import { useMutation } from 'react-query';
import { useFormik } from 'formik';

const postPassenger = async (item) => {
  // axios.post("https://api.instantwebtools.net/v1/passenger/", item)
  return await fetch(`https://api.instantwebtools.net/v1/passenger/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(item),
  }).then((res) => res.json());
};

function AddPassenger() {
  const mutation = useMutation((item) => postPassenger(item));
  const formik = useFormik({
    initialValues: {
      name: '',
      trips: 0,
      airline: 1,
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      mutation.mutate({
        name: values.name,
        trips: values.trips,
        airline: values.airline,
      });
    },
  });

  return (
    <div>
      <h1>Submit form</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Name
          <input id="name" type="text" onChange={formik.handleChange} />
        </label>
        <label>
          Trips
          <input id="trips" type="number" onChange={formik.handleChange} />
        </label>
        <label>
          Airline:
          <input id="airline" type="number" onChange={formik.handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {mutation.isLoading && <p>Please wait</p>}
      {mutation.isSuccess && <p>Success! ID: {mutation.data.data._id}</p>}
    </div>
  );
}

export default AddPassenger;
