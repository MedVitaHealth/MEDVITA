import React from 'react';
import { useState, useEffect } from 'react';
const MessageOutput = () => {
    return (
        <div>
            <article className="mt-20 mb-2 ml-2 rounded-xl bg-gray-300 bg-opacity-60 p-2 ring ring-indigo-50 sm:p-4 lg:p-6 w-1/3" style={{position:'fixed',left:15}}>
                <div className="flex items-start sm:gap-4">
                    <div>
                        <h2 className="mt-2 text-sm font-medium sm:text-lg">
                            <div> Some Interesting Podcast Title
                            Some Interesting Podcast Title
                            Some Interesting Podcast Title
                            Some Interesting Podcast Title </div>
                        </h2>
                    </div>
                </div>
            </article>
        </div>
    );
    }
export default MessageOutput;