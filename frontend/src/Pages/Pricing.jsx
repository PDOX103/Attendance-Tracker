import React, { useState } from 'react';

const Pricing = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Regular */}
        <div 
          className={`bg-white p-6 rounded-2xl shadow-lg text-center cursor-pointer transition transform ${selected === 'regular' ? 'scale-105 border-2 border-blue-500' : ''}`}
          onClick={() => setSelected('regular')}
        >
          <h2 className="text-xl font-semibold">Regular</h2>
          <p className="text-gray-600 mt-2">Basic features for individuals</p>
          <p className="text-3xl font-bold mt-4">$9.99/mo</p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>✔ Basic Support</li>
            
            <li>✔ Single User</li>
          </ul>
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-xl">BUY</button>
        </div>

        {/* Advance  */}
        <div 
          className={`bg-white p-6 rounded-2xl shadow-lg text-center cursor-pointer transition transform ${selected === 'advance' ? 'scale-105 border-2 border-blue-500' : ''}`}
          onClick={() => setSelected('advance')}
        >
          <h2 className="text-xl font-semibold ">Advance</h2>
          <p className="text-gray-600 mt-2">For growing businesses</p>
          <p className="text-3xl font-bold mt-4">$19.99/mo</p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>✔ Priority Support</li>
            
            <li>✔ Up to 5 Users</li>
          </ul>
          <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-xl">BUY</button>
        </div>

        {/* Premium */}
        <div 
          className={`bg-white p-6 rounded-2xl shadow-lg text-center cursor-pointer transition transform ${selected === 'premium' ? 'scale-105 border-2 border-blue-500' : ''}`}
          onClick={() => setSelected('premium')}
        >
          <h2 className="text-xl font-semibold">Premium</h2>
          <p className="text-gray-600 mt-2">For enterprises</p>
          <p className="text-3xl font-bold mt-4">$49.99/mo</p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>✔ 24/7 Support</li>
            
            <li>✔ Unlimited Users</li>
          </ul>
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-xl">BUY</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
