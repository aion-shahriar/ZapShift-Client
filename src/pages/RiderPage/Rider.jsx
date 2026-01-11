import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const { register, handleSubmit, control } = useForm();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((center) => center.region);

  const regions = [...new Set(regionsDuplicate)];

  const riderRegion = useWatch({ control, name: "region" });

  const districtsByRegion = (region) => {
    const filteredCenters = serviceCenters.filter(
      (center) => center.region === region
    );
    const districts = filteredCenters.map((center) => center.district);
    return districts;
  };

  const hanleRiderApplicaion = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          title:
            "Your application has been submitted. We will reach out within 7 days.",
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl text-primary">Be a Rider</h2>

      <form
        onSubmit={handleSubmit(hanleRiderApplicaion)}
        className="space-y-6 mt-12 text-black"
      >
        {/* Two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Rider info */}

          <div>
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">Rider Details</h4>

              <label className="label mt-4">Rider Name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder=" Name"
              />

              <label className="label mt-4">Rider Email</label>
              <input
                type="email"
                {...register("email")}
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Email"
              />

              {/* Rider region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Regions</legend>
                <select
                  {...register("region")}
                  defaultValue="Pick a region"
                  className="select"
                >
                  <option disabled={true}>Pick a region</option>
                  {regions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Rider district */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Districts</legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a district"
                  className="select"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtsByRegion(riderRegion).map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </fieldset>

              <label className="label mt-4">Your Address</label>
              <input
                type="text"
                {...register("address")}
                className="input w-full"
                placeholder="Rider Address"
              />

              <label className="label mt-4">Rider Phone No.</label>
              <input
                type="text"
                {...register("phone")}
                className="input w-full"
                placeholder="Rider Phone No."
              />
            </fieldset>
          </div>

          {/* Receiver info */}
          <div>
            <fieldset className="fieldset">
              <h4 className="text-2xl font-semibold">More Details</h4>

              <label className="label mt-4">driving license</label>
              <input
                type="text"
                {...register("license")}
                className="input w-full"
                placeholder="Driving License"
              />

              <label className="label mt-4">NID</label>
              <input
                type="text"
                {...register("nid")}
                className="input w-full"
                placeholder="NID"
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-primary text-black"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
