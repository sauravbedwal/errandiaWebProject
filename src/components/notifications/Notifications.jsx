import React, { useState } from "react";
const Notifications = () => {

  const [activeTab, setActiveTab] = useState("Announcements");

  const notifications = [
    { title: "Hello Errandians!", message: "Errandia version 2 is here 😎", time: "30 mins" },
    { title: "Hello Errandians!", message: "Errandia version 2 is here 😎", time: "1 day" },
    { title: "Hello Errandians!", message: "Errandia version 2 is here 😎", time: "2 days" },
    { title: "Hello Errandians!", message: "Errandia version 2 is here 😎", time: "1 week" },
    { title: "Hello Errandians!", message: "Errandia version 2 is here 😎", time: "2 weeks" },
    { title: "Hello Errandians!", message: "Errandia version 2 is here 😎", time: "1 month" },
  ];


  return (
    <>
      <div className="container privacy-content mt-5 mb-5">
      <div className="p-6 w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="d-flex justify-content-between flex-wrap items-center mb-4">
        <h3 className="text-xl font-bold">Notifications</h3>
        <div className="gap-2 d-flex">
        <button className="text-sm px-4 py-2 border rounded-md" style={{backgroundColor:"#E5E8FF"}}>3 unread</button>
        <button className="text-sm px-4 py-2 border rounded" style={{backgroundColor:"#E5E8FF"}} id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false">...</button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <button className="dropdown-item">
            Mark all as read
          </button>
        </li>
        <li>
          <button className="dropdown-item">
            Notification Settings
          </button>
        </li>
      </ul>
      </div>
      </div>

      {/* Tabs */}
      <div className="d-flex justify-content-center tabs-notifications mb-4" style={{borderBottom: "1px solid #677A90"}}>
        <button
          onClick={() => setActiveTab("Announcements")}
          className={`py-2 px-4 w-100 tab-btn ${
            activeTab === "Announcements" ? "active" : "text-gray-500"
          }`}
        >
          Announcements
        </button>
        <button
          onClick={() => setActiveTab("Errands")}
          className={`py-2 px-4 w-100 tab-btn ${
            activeTab === "Errands" ? "active" : "text-gray-500"
          }`}
        >
          Errands
        </button>
        <button
          onClick={() => setActiveTab("Deliveries")}
          className={`py-2 px-4 w-100 tab-btn ${
            activeTab === "Deliveries" ? "active" : "text-gray-500"
          }`}
        >
          Deliveries
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Announcements" &&
          notifications.map((notif, index) => (
            <div
              key={index}
              className="d-flex justify-content-between items-center p-3 mb-2 bg-gray-50 rounded-lg"
              style={{cursor:"pointer"}}
            >
              <div className="d-flex gap-2">
              <div>
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_9698_54909)">
<path d="M50 25C50 38.8072 38.8071 50 25 50C11.1929 50 0 38.8072 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z" fill="#2718FF"/>
<path d="M50 25C50 38.8072 38.8071 50 25 50C11.1929 50 0 38.8072 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z" stroke="#E5E8FF"/>
<path d="M23.5722 27.9973L25.7789 33.6225C26.1628 34.605 25.6997 35.7212 24.7438 36.1171C23.7872 36.5116 22.7003 36.0358 22.3148 35.054L18.918 26.4727" stroke="#E5E8FF" stroke-width="1.704" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M30.8804 15.2227L16.5785 19.9058C15.3618 20.2777 14.5764 21.4877 14.7101 22.7841C14.5764 24.0806 15.3618 25.2908 16.5785 25.6625L30.8804 30.3456" stroke="#E5E8FF" stroke-width="1.704" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M31.5806 30.4607C33.6443 30.4607 35.3174 27.0242 35.3174 22.785C35.3174 18.546 33.6443 15.1094 31.5806 15.1094C29.5168 15.1094 27.8438 18.546 27.8438 22.785C27.8438 27.0242 29.5168 30.4607 31.5806 30.4607Z" stroke="#E5E8FF" stroke-width="1.704" stroke-miterlimit="10" stroke-linecap="square"/>
<path d="M32.5059 22.7832C32.5032 21.3241 31.4347 20.0994 30.0227 19.9375C29.8064 20.8695 29.6992 21.8249 29.7032 22.7832C29.6992 23.7414 29.8064 24.6968 30.0227 25.629C31.4347 25.467 32.5032 24.2422 32.5059 22.7832Z" fill="#E5E8FF"/>
</g>
<defs>
<clipPath id="clip0_9698_54909">
<rect width="50" height="50" fill="white"/>
</clipPath>
</defs>
</svg>
</div>
<div>
                <h5 className="font-semibold">{notif.title}</h5>
                <p className="text-sm text-gray-600 mb-0">{notif.message}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{notif.time}</span>
            </div>
          ))}

        {activeTab === "Errands" && (
          <p className="text-gray-500 text-center py-4">No new errands notifications.</p>
        )}

        {activeTab === "Deliveries" && (
          <p className="text-gray-500 text-center py-4">No new deliveries notifications.</p>
        )}
      </div>
    </div>
      </div>
    </>
  );
};

export default Notifications;
