import React from "react";

const HeroSection = () => {
    return (
        <div className="relative w-full min-h-screen font-[Verdana]">
            <img
                src="https://storage.googleapis.com/a1aa/image/229fcd1f-8c38-4871-a95f-a6d6e940bb7f.jpg"
                alt="Barber shop interior with a barber cutting a customer's hair, dimly lit with warm tones"
                className="w-full h-[100vh] object-cover brightness-40"
            />
            <div className="absolute inset-0 flex flex-col justify-start pt-30 sm:pt-28 md:justify-center md:pt-0 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-48">
                <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-md">
                    Empowering Barbers Digitally.
                </h1>
                <p className="text-white text-xs sm:text-sm mt-2 max-w-xs">
                    Your Types. Your Style. Your Color.
                </p>
                <button className="mt-6 bg-blue-600 text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-md w-max">
                <a href="/auth">
                    Get Started
                </a>
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
