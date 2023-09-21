import React from 'react';

export default function Text({ result }) {
    return (
        <div className=''>
            <h1 className = "text-3xl text-center mt-6 font-bold text-rose-500 p-5" >Your meal plan </h1>
            <div className='border p-3 m-6 rounded-xl bg-rose-100'>

                {result ? (
                    result.split('\n').map((meal, index) => (
                    <div key={index} className="mb-2 border-b-[3px] border-b-slate-300  mt-3 max-w-8xl text-center text-slate-700">
                        {meal}
                    </div>
                    ))
                ) : (
                    <p>Waiting.....</p>
                )}
            </div>
        </div>
    );
}