import React from 'react';

export default function Footer() {
    return (
        <footer className=" text-black">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="mb-6 flex items-center space-x-2">
              <span className="text-2xl font-bold">
                Kid<span className="text-blue-500">Code</span>
              </span>
                        </div>
                        <div className="text-gray-400">
                            Our educational platform makes learning programming fun and engaging for kids.
                        </div>
                    </div>
                    <div>
                        <div className="mb-4 font-medium">Address</div>
                        <div className="text-gray-400">
                            Sidi Djilali, <br /> 400 Logements, <br /> Sidi Bel Abbés, Dz
                        </div>
                    </div>
                    <div>
                        <div className="mb-4 font-medium">Links</div>
                        <nav aria-label="Footer Navigation" className="text-gray-400">
                            <ul className="space-y-2">
                                <li>
                                    <a className="hover:text-blue-500 hover:underline" href="/">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-blue-500 hover:underline" href="/benefits">
                                        Benifits
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-blue-500 hover:underline" href="/courses">
                                        Courses
                                    </a>
                                </li>
                                <li>
                                    <a className="hover:text-blue-500 hover:underline" href="/profile">
                                        Profile
                                    </a>
                                </li>


                            </ul>
                        </nav>
                    </div>
                    <div>
                        <div className="mb-4 font-medium">Subscribe to our Newsletter</div>
                        <div>
                        <input
                                type="email"
                                className="mb-2 w-full rounded-md bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                            <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8">
                    <div className="flex flex-wrap justify-between">
                        <div className="text-gray-400">© 2024 KidCode | All Rights Reserved</div>
                        <div className="space-x-4">
                            <a className="text-gray-400 hover:text-blue-500" href="#">
                                Privacy Policy
                            </a>
                            <span>|</span>
                            <a className="text-gray-400 hover:text-blue-500" href="#">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}