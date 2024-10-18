import React from 'react';
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { tv } from 'tailwind-variants';

const card = tv({
    slots: {
        containerMain: 'min-w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-950'
    }
});

const { containerMain } = card();

function Home() {
    return (
        <div className={containerMain()}>
            <Navbar />
            <Header />
        </div>
    )
}

export default Home;