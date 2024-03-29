import { useState, useEffect } from "react";
// components
import { Legend } from "./Legend";
export interface FormData {
  type: string;
  time_range: string;
  limit: string;
}
export interface FormProps {
  handleFormUpdate: (formData: FormData) => void;
  logOut: () => void;
}

export const Form = ({ handleFormUpdate, logOut }: FormProps) => {
  const [formData, setFormData] = useState({
    type: "tracks",
    time_range: "short_term",
    limit: "10",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // tell useEffect to watch for changes to formData, once changed, prop the value
  // prevously without a useEffect we were propping the data before it was updated
  useEffect(() => {
    handleFormUpdate(formData);
  }, [formData, handleFormUpdate]);

  return (
    <section className="form-legend-container">
      <form>
        <h2>Customize Your Receipt</h2>
        <fieldset>
          <h3>Music</h3>
          <div className="input-container">
            <input
              type="radio"
              name="type"
              id="tracks"
              value="tracks"
              checked={formData.type === "tracks"}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="tracks">Tracks</label>

            <input
              type="radio"
              name="type"
              id="artists"
              value="artists"
              checked={formData.type === "artists"}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="artists">Artists</label>
          </div>
        </fieldset>
        <fieldset>
          <h3>Time Period</h3>
          <div className="input-container">
            <input
              type="radio"
              name="time_range"
              id="short_term"
              value="short_term"
              checked={formData.time_range === "short_term"}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="short_term">Last Month</label>

            <input
              type="radio"
              name="time_range"
              id="medium_term"
              value="medium_term"
              checked={formData.time_range === "medium_term"}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="medium_term">Last 6 Months</label>

            <input
              type="radio"
              name="time_range"
              id="long_term"
              value="long_term"
              checked={formData.time_range === "long_term"}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="long_term" className="long-term-label">
              All Time
            </label>
          </div>
        </fieldset>
        <fieldset>
          <h3>Length</h3>
          <div className="input-container">
            <input
              type="radio"
              name="limit"
              id="10"
              value="10"
              checked={formData.limit === "10"}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="10">Top 10</label>

            <input
              type="radio"
              name="limit"
              id="50"
              value="50"
              checked={formData.limit === "50"}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="50">Top 50</label>
          </div>
        </fieldset>
      </form>
      <Legend tracksSelected={formData.type === "tracks"} logOut={logOut} />
    </section>
  );
};
