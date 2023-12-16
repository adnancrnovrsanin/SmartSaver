import React from 'react';
import Hero from "../../assets/hero.jpeg"
import { observer } from 'mobx-react-lite';
import { CustomH1 } from '@/components/Typography/CustomH1';
import { CustomH2 } from '@/components/Typography/CustomH2';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

  const navigate = useNavigate();

  function handleSubmit(e:any): void {
    e.preventDefault();
    navigate("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center w-100% overflow-hidden my-10">
      <div className="flex flex-row items-center justify-center">
        <img src={Hero} alt="Hero" className="w-1/2 rounded-lg " />
        <div className="ml-8">
          <CustomH1 text="Welcome to Smart Saver" className='slide-in-right'/>
          <p className="text-lg mt-4 slide-in-left">
            Manage all your electric devices for the comfort of your home.
          </p>
        </div>
      </div>
      <div className="mt-32">
        <CustomH1 text='About Our App' className="slide-in-left mb-32 "/>
        <p className="text-lg mt-4 slide-in-right text-slate-400">
          Our app is designed to help you easily manage and control all your electric devices
          within your home. From turning on and off lights to adjusting thermostat settings,
          our app provides a seamless experience for managing your smart home.
        </p>
      </div>
      <div className="mt-32">
        <CustomH1 text="Let's get started" className="slide-in-left mb-32"/>
        <Button variant="contained" onClick={handleSubmit} className="slide-in-right mb-32">Let's start</Button>
      </div>
    </div>
  );
};

export default observer(LandingPage);
