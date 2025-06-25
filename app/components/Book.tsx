"use client";
import React, { useState } from "react";

// Dummy Mapbox autocomplete input (replace with real Mapbox input if needed)
function MapboxAutocompleteInput({
    value,
    onChange,
    placeholder,
    onFocus,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    onFocus?: () => void;
}) {
    return (
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={onFocus}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}

const helperImages = [
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", // pickup
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // dropoff
];

export default function Book() {
    const [step, setStep] = useState(1);
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [focusedInput, setFocusedInput] = useState<"pickup" | "dropoff" | null>(null);

    // Step content definitions
    return (
        <div className=" bg-gray-50">
            <div className="justify-items-center-safe">
                <div className="min-h-screen flex flex-col md:flex-row max-w-[60rem]">
                    {/* Left: Intro/instructions */}
                    <div className="md:w-1/2 bg-gray-50 flex flex-col justify-center p-8 space-y-6">
                        <a href="/">
                            <img src="/logo.svg" alt="Logo" className="w-24 mb-4" />
                        </a>
                        <h1 className="text-3xl font-bold text-gray-900">Business cargo delivery on demand</h1>
                        <p className="text-gray-600">
                            Zerquera Logistics offers reliable and insured delivery of goods for businesses. On your schedule. Fast and professional service.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Request a pickup",
                                "We handle the transport",
                                "Confirm delivery with ease"
                            ].map((text, index) => (
                                <li key={index} className="flex items-start space-x-3 text-gray-900 text-base">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 font-semibold text-sm">
                                        {index + 1}
                                    </div>
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                        <img
                            src="/VanWithLugger.svg"
                            alt="Illustration"
                            className="w-full max-w-sm rounded-xl"
                        />
                        <div className="flex items-start space-x-3 text-blue-800 bg-blue-50 p-4 rounded-lg text-sm">
                            <i className="bi bi-info-circle-fill text-lg mt-1"></i>
                            <span>
                                As you continue through the form, you will see additional details about your business delivery request here.
                            </span>
                        </div>
                    </div>

                    {/* Right: Booking steps */}
                    <div className="md:w-1/2 p-10 bg-white flex flex-col justify-center">
                        {step === 1 && (
                            <div className="flex flex-col space-y-6 items-start text-left w-full max-w-sm mx-auto">
                                <div className="w-full">
                                    <h2 className="text-sm font-semibold text-yellow-600 mb-2">STEP {step}/5</h2>
                                    <div className="flex justify-between items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <div
                                                key={s}
                                                className={`flex-1 h-1 rounded-full ${step >= s ? 'bg-yellow-400' : 'bg-gray-200'
                                                    }`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">Pickup &amp; drop-off</h1>
                                <p className="text-gray-500">Enter your pickup and drop-off addresses</p>

                                <div className="space-y-6 w-full">
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-900">Pickup address</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-gray-400">↑</span>
                                            <MapboxAutocompleteInput
                                                value={pickup}
                                                onChange={setPickup}
                                                placeholder="Enter address…"
                                                onFocus={() => setFocusedInput("pickup")}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-900">Drop-off address</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-gray-400">↓</span>
                                            <MapboxAutocompleteInput
                                                value={dropoff}
                                                onChange={setDropoff}
                                                placeholder="Enter address…"
                                                onFocus={() => setFocusedInput("dropoff")}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {focusedInput === "pickup" && (
                                    <div className="mt-8 text-center">
                                        <img src="/searchLocation.svg" alt="How to search" className="mx-auto w-32 mb-4" />
                                        <h2 className="text-lg font-semibold text-gray-900">How to search</h2>
                                        <p className="text-gray-500 text-sm mt-2">
                                            Enter an address or business name above and select from the suggested results.
                                        </p>
                                    </div>
                                )}

                                <button
                                    className="w-full mt-8 py-3 rounded-xl text-white font-semibold transition text-center bg-blue-600 hover:bg-blue-700"
                                    onClick={() => setStep(2)}
                                    disabled={false}
                                >
                                    Continue
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="flex flex-col space-y-6 items-start text-left w-full max-w-sm mx-auto">
                                <div className="w-full">
                                    <h2 className="text-sm font-semibold text-yellow-600 mb-2">STEP {step}/5</h2>
                                    <div className="flex justify-between items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <div
                                                key={s}
                                                className={`flex-1 h-1 rounded-full ${step >= s ? 'bg-yellow-400' : 'bg-gray-200'
                                                    }`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                <h1 className="text-3xl font-bold text-gray-900">Vehicle</h1>
                                <p className="text-gray-500">Select a vehicle</p>

                                <div className="grid grid-cols-3 gap-4 w-full">
                                    {["Pickup", "Van", "XL"].map((type) => (
                                        <button
                                            key={type}
                                            className="flex flex-col items-center border rounded-lg p-3 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        >
                                            <img src={`/${type.toLowerCase()}-selection.svg`} alt={type} className="w-12 h-12 mb-2" />
                                            <span className="font-medium text-gray-700">{type}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="w-full bg-blue-50 p-4 rounded-lg flex items-center justify-between text-sm">
                                    <div>
                                        <p className="font-semibold text-blue-800">
                                            <span className="text-blue-600">Save 35%</span> Get 1 Helper
                                        </p>
                                        <p className="text-gray-600">Be ready to help if it's too heavy.</p>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
                                    </div>
                                </div>

                                <img src="/van-dimensions.svg" alt="Lite size" className="w-full" />

                                <div className="w-full space-y-2">
                                    <h2 className="text-xl font-bold text-gray-900">Lite <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">1 Helper</span></h2>
                                    <p className="text-lg font-semibold text-gray-800">$51.78 + <span className="text-blue-800">$0.95</span> per min labor</p>
                                    <p className="text-sm text-gray-600">
                                        Perfect for moving items or small loads. Be ready to help if needed.
                                    </p>
                                </div>

                                <div className="flex justify-between w-full mt-6">
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-lg"
                                        onClick={() => setStep(1)}
                                    >
                                        ←
                                    </button>
                                    <button
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                                        onClick={() => setStep(3)}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="flex flex-col space-y-6 items-start text-left w-full max-w-sm mx-auto">
                                <div className="w-full">
                                    <h2 className="text-sm font-semibold text-yellow-600 mb-2">STEP {step}/5</h2>
                                    <div className="flex justify-between items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <div
                                                key={s}
                                                className={`flex-1 h-1 rounded-full ${step >= s ? 'bg-yellow-400' : 'bg-gray-200'
                                                    }`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                <h1 className="text-3xl font-bold text-gray-900">Arrival time</h1>
                                <p className="text-gray-500">Choose a time you'd like us to arrive at your pickup location.</p>

                                <div className="w-full">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Select day</h3>
                                    <div className="flex gap-2">
                                        {["Fri", "Sat", "Sun", "Mon", "More"].map((day, idx) => (
                                            <button
                                                key={day}
                                                className={`flex flex-col items-center justify-center rounded-lg border ${idx === 0 ? 'bg-blue-700 text-white' : 'border-gray-300'
                                                    } px-3 py-2 w-14 h-16`}
                                            >
                                                <span className="text-sm font-medium">{day}</span>
                                                <span className="text-lg font-bold">{27 + idx}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-full">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Select time</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { time: "10am - 11am", available: true },
                                            { time: "11am - 12pm", available: false },
                                            { time: "12pm - 1pm", available: false },
                                            { time: "1pm - 2pm", available: false },
                                            { time: "2pm - 3pm", available: true },
                                            { time: "3pm - 4pm", available: true },
                                        ].map(({ time, available }) => (
                                            <button
                                                key={time}
                                                className={`px-3 py-2 rounded-lg border ${available ? 'border-gray-300' : 'line-through text-gray-400 border-gray-200'
                                                    } ${time === "10am - 11am" && available ? 'bg-blue-700 text-white' : ''}`}
                                                disabled={!available}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between w-full mt-6">
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-lg"
                                        onClick={() => setStep(2)}
                                    >
                                        ←
                                    </button>
                                    <button
                                        className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold"
                                        onClick={() => setStep(4)}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 4 && (
                            <div className="flex flex-col space-y-6 items-start text-left w-full max-w-sm mx-auto">
                                <div className="w-full">
                                    <h2 className="text-sm font-semibold text-yellow-600 mb-2">STEP {step}/5</h2>
                                    <div className="flex justify-between items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <div
                                                key={s}
                                                className={`flex-1 h-1 rounded-full ${step >= s ? 'bg-yellow-400' : 'bg-gray-200'
                                                    }`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                <h1 className="text-3xl font-bold text-gray-900">What are you moving?</h1>
                                <p className="text-gray-500">Add photos or a description of your item(s).</p>

                                <div className="w-full space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-1">Item(s) description or order #</label>
                                        <textarea
                                            placeholder="Sofa and cabinet&#10;Order #12345"
                                            className="w-full p-3 border border-gray-300 rounded-xl resize-none"
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-1">Photos</label>
                                        <p className="text-sm text-gray-500 mb-2">Add photos of your item(s) or a picture of your order receipt.</p>
                                        <div className="w-full h-32 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                                            <span>⬆ Upload images</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                                            Add additional contacts <span className="text-gray-400 font-normal">(optional)</span>
                                        </label>
                                        <p className="text-sm text-gray-500 mb-2">They will receive updates about your delivery.</p>
                                        <input
                                            type="tel"
                                            placeholder="Enter phone number…"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between w-full mt-6">
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-lg"
                                        onClick={() => setStep(3)}
                                    >
                                        ←
                                    </button>
                                    <button
                                        className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold"
                                        onClick={() => setStep(5)}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 5 && (
                            <div className="flex flex-col space-y-6 items-start text-left w-full max-w-sm mx-auto">
                                <div className="w-full">
                                    <h2 className="text-sm font-semibold text-yellow-600 mb-2">STEP 5/5</h2>
                                    <div className="flex justify-between items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <div
                                                key={s}
                                                className={`flex-1 h-1 rounded-full ${step >= s ? 'bg-yellow-400' : 'bg-gray-200'}`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                <h1 className="text-3xl font-bold text-gray-900">Contact information</h1>
                                <p className="text-gray-500">
                                    This information is used to stay in touch with you about your delivery.
                                </p>

                                <div className="w-full space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-1">Phone number</label>
                                        <div className="flex items-center px-3 py-2 border border-gray-300 rounded-xl">
                                            <span className="mr-2">📞</span>
                                            <input
                                                type="tel"
                                                placeholder="Enter phone number"
                                                className="w-full outline-none"
                                            />
                                        </div>
                                        <button className="mt-2 w-full bg-gray-200 text-gray-500 font-semibold py-2 px-4 rounded-xl cursor-not-allowed">
                                            Send verification code
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-400 mb-1">Email address</label>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-xl text-gray-400"
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-400 mb-1">First and last name <span className="text-gray-400 font-normal">(optional)</span></label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="First name"
                                                className="w-1/2 px-4 py-2 border border-gray-200 rounded-xl text-gray-400"
                                                disabled
                                            />
                                            <input
                                                type="text"
                                                placeholder="Last name"
                                                className="w-1/2 px-4 py-2 border border-gray-200 rounded-xl text-gray-400"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between w-full mt-6">
                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-lg"
                                        onClick={() => setStep(4)}
                                    >
                                        ←
                                    </button>
                                    <button
                                        className="px-6 py-3 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
                                        disabled
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}