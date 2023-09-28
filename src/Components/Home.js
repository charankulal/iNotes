import React from "react";

export default function Home() {
  return (
    <div>
      <h2 className="text-center">Add a note</h2>
      <form className="form" action="">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Example textarea
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3 text-center">
    <button type="submit" className="btn btn-primary mb-3">Add Notes</button>
  </div>
      </form>
      <h2 className="text-center">Your notes</h2>
    </div>
  );
}
