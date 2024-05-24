"use client"
export default function Overview() {

    return(


        <>
            <main className="flex-1 overflow-hidden transition-all duration-200">
                <header aria-label="Main Header"
                        className="bg-slate-100 relative mx-4 mt-4 rounded-md px-4 py-5 shadow-sm md:mx-10">
                    <div className="flex items-center justify-between space-x-4 md:space-x-0">

                        <div className="flex items-center space-x-2 mx-10">
                            <div className="relative md:block">
                                <input type="text" placeholder="Search"
                                       className="peer h-10 w-32 rounded-lg border border-gray-300 bg-white px-4 pl-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 md:w-48"/>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-blue-500"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M8 11a4 4 0 118 0 4 4 0 01-8 0zm8 0a8 8 0 11-16 0 8 8 0 0116 0z"/>
                                </svg>
                            </div>
                            <button
                                className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-50 text-gray-400 shadow-lg hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 17h5l-1.405-1.405C19.158 14.977 20 13.553 20 12a8 8 0 10-8 8c1.553 0 2.977-.842 3.595-2.095L15 17z"/>
                                </svg>
                            </button>
                            <button
                                className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-50 text-gray-400 shadow-lg hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="mt-4 flex justify-between px-4 text-slate-500 md:px-10">
                    <h2 className="text-xl font-medium md:pl-0">Overview</h2>
                </div>

                <div className="m-4 grid grid-cols-1 gap-4 md:m-10 md:grid-cols-2 lg:grid-cols-3">

                    <div
                        className="flex h-48 items-center justify-between overflow-hidden rounded-xl bg-white px-4 py-4 shadow-sm">
                        <div>
                            <h3 className="mb-1 text-xl font-medium text-gray-600">Total Users</h3>
                            <p className="text-base text-gray-400">April 2024</p>
                            <p className="text-2xl font-medium text-gray-500">100,221</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-200" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                      d="M12 11c-3.866 0-7 3.134-7 7 0 1.105.895 2 2 2h10c1.105 0 2-.895 2-2 0-3.866-3.134-7-7-7zm0-3c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"/>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="flex h-48 items-center justify-between overflow-hidden rounded-xl bg-white px-4 py-4 shadow-sm">
                        <div>
                            <h3 className="mb-1 text-xl font-medium text-gray-600">Total Transactions</h3>
                            <p className="text-base text-gray-400">April 2024</p>
                            <p className="text-2xl font-medium text-gray-500">1,540</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-200" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                      d="M17 9V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v2M7 9V7a2 2 0 00-2-2H3a2 2 0 00-2 2v2m2 10v-2a2 2 0 00-2-2H1a2 2 0 00-2 2v2m20-8V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m0 0v10m0-10H3v10m2-8h10m-4 4v-4m0 4h4m0 0v4m0-4H3"/>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="flex h-48 items-center justify-between overflow-hidden rounded-xl bg-white px-4 py-4 shadow-sm">
                        <div>
                            <h3 className="mb-1 text-xl font-medium text-gray-600">Pending Orders</h3>
                            <p className="text-base text-gray-400">April 2024</p>
                            <p className="text-2xl font-medium text-gray-500">720</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-200" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                                      d="M13 16V8M11 16V8m4 4H7"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

}