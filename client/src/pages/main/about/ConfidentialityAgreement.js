import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ConfidentialityAgreement = () => {
  return (
    <>
      <div className="nav-bg p-1 py-3 sticky top-0">
        <div className="container-section flex  items-center relative">
          <button className="absolute">
            <Link to={"/main/About"}>
              {" "}
              <IoIosArrowBack className="text-xl" />
            </Link>
          </button>
          <h1 className="heading-h1 gray-50  text-lg text-center flex justify-center items-center m-auto">
            Confidentiality Agreement
          </h1>
        </div>
      </div>
      <div className="container-section mt-5">
        <p className="mb-3 text-sm gray-50 ">
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about your privacy rights and the law protects
          You.
        </p>
        <p className="fs-sm gray-50">
          Interpretation and Definitions <br />
          Interpretation
        </p>
        <p className="text-sm gray-50 mb-3">
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions.
        </p>
        <p className="text-sm gray-50 mb-3">
          The following definitions shall have the same meaning regardless of
          whether they appear in singular or in plural.
        </p>
        <p className="text-sm gray-50 mb-3">
          Definitions <br />
          For the purposes of this Privacy Policy:
        </p>
        <p className="text-sm gray-50 mb-3">
          You means the individual accessing or using the Service, or the
          company, or other legal entity on behalf of which such individual is
          accessing or using the Service, as applicable.
        </p>
        <p className="text-sm gray-50 mb-3">
          <b>Company</b>(referred to as either "the Company", "We","Us" or "our"
          in this Agreement) refers to daman.
        </p>
        <p className="text-sm gray-50 mb-3">
          <b>Affiliate</b> means an entity that controls, is controlled by or is
          under common control with a party where "control" means owenrship of
          50% or more of the shres, equity interest or other securities entitled
          to vote for election of directors or other managing authority.
          <br />
          <b>Account</b> means a unique account created for you to access our
          Service or parts of our Service. <br />
          <b>Website</b> refers to <span className="color-blue">daman</span>{" "}
          accessible from <span className="color-blue">daman</span> <br />
          <b>Service</b> refers to the Website. <br />
          <b>Country</b> refers to; Dhaka, Bangaladesh <br />
          <b>Servic Provider</b> means any natural or legal person who processes
          the data on behalf of the Company. It refers to third-party companies
          or individuals employed by the Company to facilitate the Service, to
          provide the Service on behalf of the Company, to perform services
          related to the Service is used.
        </p>
      </div>
    </>
  );
};

export default ConfidentialityAgreement;
