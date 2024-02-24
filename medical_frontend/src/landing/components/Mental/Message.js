import React from 'react';
import { useState, useEffect } from 'react';
const MessageInput = (props) => {
const {users} = props;
console.log(users);
return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
    {users.map((user, index) => (
        <article key={index} className="mt-4 mr-6 mb-2 ml-2 rounded-xl bg-white p-2 ring ring-indigo-50 sm:p-4 lg:p-6 w-1/3">
            <div className="items-start sm:gap-4">
                <div>
                    <h2 className="mt-2 text-sm font-medium sm:text-lg">
                        {user} 
                    </h2>
                </div>
            </div>
        </article>
    ))}
</div>
);
    }
export default MessageInput;