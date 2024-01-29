import React from 'react';
import { InputField } from '@/components/FormFields/InputField';
import MailIcon from '@/components/icons/MailIcon';
import LockIcon from '@/components/icons/LockIcon';

const SignIn: React.FC = () => {
  return (
    <div className="p-4 sm:p-12.5 xl:p-17.5">
      <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign In to the website
      </h2>

      <form>
        <InputField
          label="Email"
          id="signin-email"
          type="email"
          placeholder="Enter your email"
          icon={<MailIcon />}
        />

        <InputField
          label="Type Password"
          id="signin-password"
          type="password"
          placeholder="6+ Characters, 1 Capital letter"
          icon={<LockIcon />}
        />

        <div className="mb-5">
          <input
            type="submit"
            value="Sign In"
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </div>
  );
};

export default SignIn;
